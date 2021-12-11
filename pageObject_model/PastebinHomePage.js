import { elementToBeClickable } from 'wdio-wait-for';
import { BasicPage } from './BasicPage.js';

export class PastebinHomePage extends BasicPage {
    constructor() {
        super();
        this.urlPastebinHome = 'https://pastebin.com';
        this.formXpath = '//*[@id="w0"]';
        this.textareaXpath = '//*[@id="postform-text"]';
        this.buttonCloseBannerXpath = '//*[@id="hideSlideBanner"]';
        this.syntaxSelectXpath = '//*[@id="select2-postform-format-container"]';
        this.syntaxListXpath =
            '//*[@id="select2-postform-format-results"]/li[@class="select2-results__option"]/ul';
        this.expirationSelectXpath =
            '//*[@id="select2-postform-expiration-container"]';
        this.expirationListXpath =
            '//*[@id="select2-postform-expiration-results"]';
        this.itemXpath = '//li[contains(text(), "RAW")]';
        this.pasteTitleXpath = '//*[@id="postform-name"]';
        this.buttonCreateNewPasteXpath =
            '//*[@class="btn -big" and @type="submit"]';
    }

    async addNewPaste(data) {
        let fieldOfPaste = await browser.$(this.textareaXpath);
        await fieldOfPaste.setValue(data);
    }

    async fillSelect(selectXpath, selectListXpath, locatorXpath, optionText) {
        let form = await browser.$(this.formXpath);

        let select = await form.$(selectXpath);

        try {
            await select.click();
        } catch (error) {
            if (error.message.includes('element click intercepted')) {
                let buttonCloseBanner = await browser.$(
                    this.buttonCloseBannerXpath
                );
                await buttonCloseBanner.click();
                await select.click();
            } else {
                throw error;
            }
        }

        let selectList = await browser.$(selectListXpath);

        async function setSearchWordAndSelectOption(locatorXpath, optionText) {
            let itemLocator = await locatorXpath.replace('RAW', optionText);
            let selectItem = await selectList.$(itemLocator);
            // await this.waitUntilElementToBeClickable(selectItem);
            await selectItem.click();
        }

        async function selectOption() {
            await setSearchWordAndSelectOption(locatorXpath, optionText);
        }
        selectOption();
    }

    async addPasteName(titleContent) {
        let form = await browser.$(this.formXpath);
        let pasteTitle = await form.$(this.pasteTitleXpath);
        await pasteTitle.setValue(titleContent);
    }

    async sendPaste() {
        let form = await browser.$(this.formXpath);
        let buttonCreateNewPaste = await form.$(this.buttonCreateNewPasteXpath);
        await this.waitUntilElementToBeClickable(buttonCreateNewPaste);
        await buttonCreateNewPaste.click();
    }
}

export let PastebinHome = new PastebinHomePage();
