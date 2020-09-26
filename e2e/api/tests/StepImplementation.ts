
import { Step, DataStoreFactory  } from "gauge-ts";
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
        await fs.createReadStream(path)
            .pipe(fastcsv.parse({headers: true}))
            .on('data', (data) => {
                database.query("INSERT INTO todo(id, title, checked) VALUES($1, $2, $3)", Object.values(data))
            });
    }

    @Step("apiの<path>にGetリクエストを投げる")
    public async getApi(path: string) {
        const url = `${API_URL}${path}`
        const { data } = await axios.get(url)
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

    private setJson(json: unknown) {
        DataStoreFactory.getScenarioDataStore().put("JSON", json)
    }

    private getResponseJson() {
        return DataStoreFactory.getScenarioDataStore().get("JSON")
    }
}
