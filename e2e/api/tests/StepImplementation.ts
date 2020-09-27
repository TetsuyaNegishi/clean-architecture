
import { Step, DataStoreFactory, AfterScenario  } from "gauge-ts";
import { expect } from 'chai';
import axios from 'axios';
import { Pool } from 'pg';
import * as fastcsv from 'fast-csv';
import * as fs from 'fs'

const API_URL = "http://localhost:4000"

const database = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
})

export default class StepImplementation {
    @Step("todoテーブルに<path>のデータを用意する")
    public async storeTodoTable(path: string) {
        await database.query("TRUNCATE todo")
        const rows = await this.importCsvRows(path)
        for await (const row of rows) {
            await database.query("INSERT INTO todo(id, title, checked) VALUES($1, $2, $3)", Object.values(row))
        }
    }

    private importCsvRows(path: string): Promise<object[]> {
        const data = []
        return new Promise((resolve, reject) => {
            fs.createReadStream(path)
            .pipe(fastcsv.parse({headers: true}))
            .on('data', async (row) => {
                data.push(row)
            })
            .on('end', () => {
                resolve(data)
            })
            .on('error', reject);
        })
    }

    @Step("apiの<path>にGetリクエストを投げる")
    public async getApi(path: string) {
        const url = `${API_URL}${path}`
        const { data } = await axios.get(url)
        this.setJson(data)
    }

    @Step("apiの<path>にbody<body>でPatchリクエストを投げる")
    public async patchApi(path: string, body: string) {
        const url = `${API_URL}${path}`
        const { data } = await axios.patch(url, JSON.parse(body))
        this.setJson(data)
    }


    @Step("レスポンスのJsonの<keys>が<value>となる")
    public matchJsonValue(keys: string, value: string) {
        const json = this.getResponseJson()
        const actual = keys.split('.').reduce((prev, current) => {
            return prev[current]
        }, json)
        expect(actual).to.equal(value)
    }

    @Step("レスポンスのJsonの<keys>がBooleanの<value>となる")
    public matchJsonBooleanValue(keys: string, value: string) {
        const json = this.getResponseJson()
        const actual = keys.split('.').reduce((prev, current) => {
            return prev[current]
        }, json)
        const expected = value === 'true'
        expect(actual).to.equal(expected)
    }

    private setJson(json: unknown) {
        DataStoreFactory.getScenarioDataStore().put("JSON", json)
    }

    private getResponseJson() {
        return DataStoreFactory.getScenarioDataStore().get("JSON")
    }

    @AfterScenario()
    public clearDataStore() {
        DataStoreFactory.getScenarioDataStore().clear()
    }
}
