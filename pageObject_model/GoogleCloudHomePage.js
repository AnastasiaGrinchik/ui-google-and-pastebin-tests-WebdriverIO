import { elementToBeClickable } from 'wdio-wait-for';
import { BasicPage } from './BasicPage.js';

export class GoogleCloudHomePage extends BasicPage {
    constructor(driver) {
        super(driver);
        this.urlGoogleCloudHome = 'https://cloud.google.com';
        this.searchButtonXpath =
            '//input[@class="devsite-search-field devsite-search-query"]';
        this.linkCalculatorXpath =
            '//*[@data-ctorig="https://cloud.google.com/products/calculator"]/b';
        this.linkTwoForPricingXpath =
            '//a[@href="https://cloud.google.com/identity-platform/pricing?hl=en"]';
        this.linkTwoForCalculatorXpath =
            '//a[@href="/products/calculator#tab=identity-platform"]';
    }

    async openCalculator() {
        let searchButton = await browser.$(this.searchButtonXpath);
        await this.waitUntilElementToBeClickable(searchButton);
        await searchButton.click();
        await searchButton.setValue('Google Cloud Platform Pricing Calculator');
        await browser.keys('Enter');

        let linkCalculator = await browser.$(this.linkCalculatorXpath);
        await this.waitUntilElementToBeClickable(linkCalculator);
        await linkCalculator.click();
    }
}

export let GoogleCloudHome = new GoogleCloudHomePage();
