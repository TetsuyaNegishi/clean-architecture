
import { Step, BeforeSuite, BeforeSpec, AfterSpec, AfterSuite, BeforeScenario } from "gauge-ts";
import { expect } from 'chai'
import * as puppeteer from 'puppeteer';

const createSelector = (testId: string) => {
    return `[data-testid=${testId}]`
}

const SELECTOR = {
    TODO_ITEM: createSelector("todo-item"),
    TODO_DELETE_BUTTON: createSelector("todo-delete-button")
}

export default class StepImplementation {
    private browser: puppeteer.Browser;
    private page: puppeteer.Page;

    @BeforeSuite()
    public async setupBrowser() {
        this.browser = await puppeteer.launch({headless: false})
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

    @Step("TodoListが<count>件表示されている")
    public async countTodoList(count: string) {
        const selector = SELECTOR.TODO_ITEM;
        await this.page.waitFor(selector);
        const todoElements = await this.page.$$(selector);
        const actual = `${todoElements.length}`;

        expect(actual).to.equal(count)
    }

    @Step("<order>番目のTodoListのタイトルに<title>が表示されている")
    public async displayTodoListTitle(order: number, title: string) {
        const selector = `[data-testid=todo-title]`
        await this.page.waitFor(selector)
        const titleList = await this.page.$$eval(selector, elements => {
            return elements.map(element => element.textContent)
        })
        const actual = titleList[order - 1]
        expect(actual).to.equal(title)
    }

    @Step("<order>番目のTodoListのチェックボックスが<checked>である")
    public async displayTodoListCheckbox(order: number, checked: string) {
        const isChecked = this.transformStringToBoolean(checked)
        const todoElement = await this.getTodoElementByOrder(order)

        const selector = `[data-testid=todo-checkbox] input[type=radio]`
        const actual = await todoElement.$eval(selector, item => item.checked)
        expect(actual).to.equal(isChecked)
    }

    @Step("<order>番目のTodoListのチェックボックスをクリックする")
    public async clickTodoListCheckbox(order: number) {
        const selector = `[data-testid=todo-checkbox] input[type=radio]`
        const checkboxElement = await this.page.$$(selector)
        const targetElement = checkboxElement[order - 1]

        targetElement.click()
    }

    @Step("<order>番目のTodoListの削除ボタンをクリックする")
    public async clickTodoListDeleteButton(order: number) {
        const todoElement = await this.getTodoElementByOrder(order);

        const selector = SELECTOR.TODO_DELETE_BUTTON;
        const deleteButton = await todoElement.$(selector);

        deleteButton.click()
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
