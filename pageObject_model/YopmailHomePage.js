import { elementToBeClickable } from 'wdio-wait-for';
import { BasicPage, BrowsersDriver } from './BasicPage.js';

export class YopmailHomePage extends BasicPage {
    constructor() {
        super();
        this.urlYopmail = 'https://yopmail.com';
        this.buttonRandomEmailXpath =
            '//a[@href="email-generator"]//div[@class="txtlien"]';
        this.emailAdressXpath = '//*[@id="egen"]';
        this.buttonCheckEmailXpath = '//button[@onclick="egengo();"]';
        this.totalMonthCostXpath =
            '//*[@id="mail"]//h3[contains(text(), "USD")]';
        this.iframeMailXpath = '//iframe[@id="ifmail"]';
        this.buttonUpdateXpath = '//*[@id="refresh"]';
    }

    async openRandomEmail() {
        let buttonRandomEmail = await browser.$(this.buttonRandomEmailXpath);
        await this.waitUntilElementToBeClickable(buttonRandomEmail);
        await buttonRandomEmail.click();
    }

    async getEmailAdress() {
        let email = await browser.$(this.emailAdressXpath);
        this.emailContent = await email.getText();
    }

    async checkMail() {
        let buttonCheckEmail = await browser.$(this.buttonCheckEmailXpath);
        await this.waitUntilElementToBeClickable(buttonCheckEmail);
        await buttonCheckEmail.click();
    }

    async updateMail() {
        let buttonUpdate = await browser.$(this.buttonUpdateXpath);
        await this.waitUntilElementToBeClickable(buttonUpdate);
        await buttonUpdate.click();
    }

    async getTotalCost() {
        try {
            let cost = await browser.$(this.totalMonthCostXpath);
            this.totalMonthCost = await cost.getText();
        } catch (error) {
            if (error.message.includes('Waiting for element')) {
                await this.updateMail();
                let cost = await browser.$(this.totalMonthCostXpath);
                this.totalMonthCost = await cost.getText();
            } else {
                throw error;
            }
        }
    }
}

export let YopmailHome = new YopmailHomePage();
