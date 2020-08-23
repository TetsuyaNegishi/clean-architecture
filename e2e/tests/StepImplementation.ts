
import { Step, BeforeSuite, BeforeSpec, AfterSpec, AfterSuite } from "gauge-ts";
import { equal } from "assert";
import * as puppeteer from 'puppeteer';

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

    @Step("Learn Reactへのリンクが表示されている")
    public async displayLearnReact() {
        await this.page.waitForSelector('.App-link')
        const text = await this.page.$eval('.App-link', selector => {
            return selector.textContent
        })
        equal(text, 'Learn React')
    }

    @Step("<order>番目のTodoListのタイトルに<title>が表示されている")
    public async displayTodoListTitle(order: number, title: string) {
        const selector = `[data-testid=todo-title]`
        await this.page.waitFor(selector)
        const titleList = await this.page.$$eval(selector, elements => {
            return elements.map(element => element.textContent)
        })
        const actual = titleList[order - 1]
        equal(actual, title)
    }

    @Step("<order>番目のTodoListのチェックボックスが<isChecked>である")
    public async displayTodoListCheckbox(order: number, isChecked: string) {
        const selector = `[data-testid=todo-checkbox] input[type=radio]`
        await this.page.waitFor(selector)
        const checkedList = await this.page.$$eval(selector, elements => {
            return elements.map(element => element.checked)
        })
        const actual = checkedList[order - 1]
        equal(actual, isChecked.toLowerCase() === "true")
    }
}
