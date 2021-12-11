import '@babel/polyfill';
import { expect } from 'chai';
import {
    BrowsersDriver,
    GoogleCloudHome,
    CalculatorHome,
    CompletedForm,
    YopmailHome,
} from '../../../pageObject_model/index.js';
import { CalculatorFactory } from '../../../bisinessObject/CalculatorFactory.js';

// npx wdio run ./wdio.conf.js --spec YopmailHomePage.spec.js

describe('Data previously entered in the field', function () {
    let CalculatorData = CalculatorFactory.getCalculatorForm();
    before(async function () {
        await CompletedForm.openPage(GoogleCloudHome.urlGoogleCloudHome);
        await CompletedForm.openCalculator();
        await CompletedForm.enterFrame(CalculatorHome.frameOneXpath);
        await CompletedForm.enterFrame(CalculatorHome.frameTwoXpath);
        await CompletedForm.selectSection();
        await CompletedForm.fillInput('4');
        await CompletedForm.fillForm(CalculatorData);
        await CompletedForm.submitForm();
        await CompletedForm.getAllField(CompletedForm);
        await CompletedForm.addEmail();
        await YopmailHome.openAndSwitchNewTab(YopmailHome.urlYopmail);
        await YopmailHome.openPage(YopmailHome.urlYopmail);
        await YopmailHome.openRandomEmail();
        await YopmailHome.getEmailAdress();
        await YopmailHome.switchTab('Google Cloud Pricing Calculator');
        await CompletedForm.exitFrame();
        await CompletedForm.exitFrame();
        await CompletedForm.enterFrame(CalculatorHome.frameOneXpath);
        await CompletedForm.enterFrame(CalculatorHome.frameTwoXpath);
        await CompletedForm.fillEmail(YopmailHome.emailContent);
        await CompletedForm.sendEmail();
        await YopmailHome.switchTab('YOPmail');
        await YopmailHome.checkMail();
        await YopmailHome.updateMail();
        await YopmailHome.enterFrame(YopmailHome.iframeMailXpath);
        await YopmailHome.getTotalCost();
    });

    it('The rental price is the same as the price in the email', function () {
        expect(CompletedForm.price).to.include(YopmailHome.totalMonthCost);
    });
});
