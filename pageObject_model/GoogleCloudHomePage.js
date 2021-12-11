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

    async searchQuery() {
        // await browser.refresh();
        let searchButton = await browser.$(this.searchButtonXpath);
        await this.waitUntilElementToBeClickable(searchButton);
        await searchButton.click();
        await searchButton.setValue('Google Cloud Platform Pricing Calculator');
        await browser.keys('Enter');
    }

    async openCalculator() {
        await this.searchQuery();
        let contect = await this;
        try {
            let linkCalculator = await browser.$(this.linkCalculatorXpath);
            await this.waitUntilElementToBeClickable(linkCalculator);
            await linkCalculator.click();
        } catch (error) {
            if (
                error.message.includes(
                    'Failed, after waiting for the element to be clickable'
                )
            ) {
                await contect.openPage(GoogleCloudHome.urlGoogleCloudHome);
                await contect.searchQuery();
                // let linkCalculator = await browser.$(
                //     this.linkTwoForPricingXpath
                // );

                // await this.waitUntilElementToBeClickable(linkCalculator);
                // await linkCalculator.click();

                // linkCalculator = await browser.$(
                //     this.linkTwoForCalculatorXpath
                // );

                // await this.waitUntilElementToBeClickable(linkCalculator);
                // await linkCalculator.click();
            } else {
                throw error;
            }
        }
    }
}

export let GoogleCloudHome = new GoogleCloudHomePage();
