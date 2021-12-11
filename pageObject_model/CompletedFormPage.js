import { elementToBeClickable } from 'wdio-wait-for';
import { CalculatorHomePage } from './CalculatorHomePage.js';

export class CompletedFormPage extends CalculatorHomePage {
    constructor() {
        super();
        this.completedFormXpath = '//*[@id="resultBlock"]';
        this.VMClassXpath =
            '//*[@id="compute"]//div[contains(text(), "VM class")]';
        this.instanceTypeXpath =
            '//*[@id="compute"]//div[contains(text(), "Instance type")]';
        this.regionXpath =
            '//*[@id="compute"]//div[contains(text(), "Region")]';
        this.localSSDXpath =
            '//*[@id="compute"]//div[contains(text(), "Local SSD")]';
        this.termXpath =
            '//*[@id="compute"]//div[contains(text(), "Commitment term")]';
        this.priceXpath =
            '//*[@id="resultBlock"]//b[contains(text(), "Total Estimated Cost:")]';
        this.buttonAddEmailXpath = '//*[@id="email_quote"]';
        this.formEmailXpath = '//form[@name="emailForm"]';
        this.inputEmailXpath = '//input[@ng-model="emailQuote.user.email"]';
        this.buttonSendEmailXpath = '//button[@aria-label="Send Email"]';
    }

    async getTextFromForm(object, key, fieldXpath) {
        let completedForm = await browser.$(this.completedFormXpath);
        let field = await completedForm.$(fieldXpath);
        field = await field.getText();
        object[key] = await field;
    }

    async getAllField(obj) {
        await this.getTextFromForm(obj, 'VMClass', obj.VMClassXpath);
        await this.getTextFromForm(obj, 'region', obj.regionXpath);
        await this.getTextFromForm(obj, 'localSSD', obj.localSSDXpath);
        await this.getTextFromForm(obj, 'term', obj.termXpath);
        await this.getTextFromForm(obj, 'instanceType', obj.instanceTypeXpath);
        await this.getTextFromForm(obj, 'price', obj.priceXpath);
    }

    async addEmail() {
        let completedForm = await browser.$(this.completedFormXpath);
        let buttonAddEmail = await completedForm.$(this.buttonAddEmailXpath);
        await this.waitUntilElementToBeClickable(buttonAddEmail);
        await buttonAddEmail.click();
    }

    async fillEmail(data) {
        let form = await browser.$(this.formEmailXpath);
        let inputEmail = await form.$(this.inputEmailXpath);
        await inputEmail.setValue(data);
    }

    async sendEmail() {
        let form = await browser.$(this.formEmailXpath);
        let buttonSend = await form.$(this.buttonSendEmailXpath);
        await this.waitUntilElementToBeClickable(buttonSend);
        await buttonSend.click();
    }
}

export let CompletedForm = new CompletedFormPage();
