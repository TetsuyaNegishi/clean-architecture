
import { Step, BeforeSuite, BeforeSpec, AfterSpec, AfterSuite, BeforeScenario } from "gauge-ts";
import { expect } from 'chai'
import puppeteer from 'puppeteer';
import { Pool } from "pg";
import * as fastcsv from 'fast-csv';
import * as fs from 'fs'

const createSelector = (testId: string) => {
    return `[data-testid=${testId}]`
}

const SELECTOR = {
    TODO_ITEM: createSelector("todo-item"),
    TODO_TITLE: createSelector("todo-title"),
    TODO_CHECKBOX: `${createSelector("todo-checkbox")} input[type=radio]`,
    TODO_DELETE_BUTTON: createSelector("todo-delete-button"),
    TODO_TITLE_INPUT_FIELD: `${createSelector("todo-title-input-field")} > input`,
    ADD_TODO_BUTTON: createSelector("add-todo-button")
}

const database = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
})

export default class StepImplementation {
    private browser: puppeteer.Browser;
    private page: puppeteer.Page;

    @BeforeSuite()
    public async setupBrowser() {
        await this.storeApiData()
        this.browser = await puppeteer.launch({headless: false})
    }

    private async storeApiData() {
        const sourcePath = 'web/source/test.csv'
        await database.query("TRUNCATE todo")
        await fs.createReadStream(sourcePath)
            .pipe(fastcsv.parse({headers: true}))
            .on('data', (data) => {
                database.query("INSERT INTO todo(id, title, checked) VALUES($1, $2, $3)", Object.values(data))
            });
    }

    @AfterSuite()
    public async closeBrowser() {
        await this.browser.close();
    }

    @BeforeSpec()
    public async openLocalhostPage() {
        this.page = await this.browser.newPage();
        await this.page.goto('http://localhost:3000/')
    }

    @AfterSpec()
    public async closePage() {
        await this.page.close();
    }

    @BeforeScenario()
    public async reloadPage() {
        await this.page.reload();
    }

    @BeforeScenario({tags: ['resetApi']})
    public async resetDB() {
        await this.storeApiData()
    }

    @Step("TodoListが<count>件表示されている")
    public async countTodoList(count: string) {
        const selector = SELECTOR.TODO_ITEM;

        await this.page.waitForFunction(`document.querySelectorAll("${selector}").length == ${count}`);
        const todoElements = await this.page.$$(selector);
        const actual = `${todoElements.length}`;

        expect(actual).to.equal(count)
    }

    @Step("<order>番目のTodoListのタイトルに<title>が表示されている")
    public async displayTodoListTitle(order: number, title: string) {
        const todoElement = await this.getTodoElementByOrder(order)

        const selector = SELECTOR.TODO_TITLE
        const actual = await todoElement.$eval(selector, item => item.textContent);

        expect(actual).to.equal(title)
    }

    @Step("<order>番目のTodoListのチェックボックスが<checked>である")
    public async displayTodoListCheckbox(order: number, checked: string) {
        const isChecked = this.transformStringToBoolean(checked)
        const todoElement = await this.getTodoElementByOrder(order)

        const selector = SELECTOR.TODO_CHECKBOX
        const actual = await todoElement.$eval(selector, item => item.checked)
        expect(actual).to.equal(isChecked)
    }

    @Step("<order>番目のTodoListのチェックボックスをクリックする")
    public async clickTodoListCheckbox(order: number) {
        const todoElement = await this.getTodoElementByOrder(order)

        const selector = SELECTOR.TODO_CHECKBOX
        const targetElement = await todoElement.$(selector);

        await targetElement.click()
    }

    @Step("<order>番目のTodoListの削除ボタンをクリックする")
    public async clickTodoListDeleteButton(order: number) {
        const todoElement = await this.getTodoElementByOrder(order);

        const selector = SELECTOR.TODO_DELETE_BUTTON;
        const targetElement = await todoElement.$(selector);

        await targetElement.click()
    }

    @Step("新規TodoListのタイトル入力欄に<title>と入力する")
    public async fillNewTodoListTitleInput(title: string) {
        const selector = SELECTOR.TODO_TITLE_INPUT_FIELD;
        await this.page.type(selector, title);
    }

    @Step("TodoListの新規登録ボタンをクリックする")
    public async clickAddTodoButton() {
        const selector = SELECTOR.ADD_TODO_BUTTON;
        const targetElement = await this.page.$(selector)
        await targetElement.click();
    }

    private transformStringToBoolean(text: string): boolean {
        return text.toLowerCase() === "true"
    }

    private async getTodoElementByOrder(order: number) {
        const selector = `${SELECTOR.TODO_ITEM}:nth-of-type(${order})`
        await this.page.waitFor(selector)
        const todoElement = await this.page.$(selector)
        return todoElement
    }
}
