
import { Step, BeforeSuite, BeforeSpec, AfterSpec, AfterSuite } from "gauge-ts";
import { equal } from "assert";
import * as puppeteer from 'puppeteer';

export default class StepImplementation {
    private browser: puppeteer.Browser;
    private page: puppeteer.Page;

    @BeforeSuite()
    public async setupBrowser() {
        this.browser = await puppeteer.launch()
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
        const text = await this.page.$eval('.App-link', selector => {
            return selector.textContent
        })
        equal(text, 'Learn React')
    }
}
