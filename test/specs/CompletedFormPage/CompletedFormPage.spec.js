import '@babel/polyfill';
import { expect } from 'chai';
import {
    GoogleCloudHome,
    CalculatorHome,
    CompletedForm,
} from '../../../pageObject_model/index.js';
import { CalculatorFactory } from '../../../bisinessObject/CalculatorFactory.js';

// npx wdio run ./wdio.conf.js --spec CompletedFormPage.spec.js

describe('Data previously entered in the field', function () {
    let CalculatorData = CalculatorFactory.getCalculatorForm();
    before(async function () {
        await CompletedForm.openPage(GoogleCloudHome.urlGoogleCloudHome);

        await CompletedForm.openCalculator();
        await CompletedForm.enterFrame(CalculatorHome.frameOneXpath);
        await CompletedForm.enterFrame(CalculatorHome.frameTwoXpath);
        await CompletedForm.selectSection();
        await CompletedForm.fillInput(CalculatorData.numberOfInstance);
        await CompletedForm.fillForm(CalculatorData);
        await CompletedForm.submitForm();
        await CompletedForm.getAllField(CompletedForm);
    });
    it('VM Class - coincided', function () {
        expect(CompletedForm.VMClass).to.include('regularr');
    });
    it('Instance type - coincided', function () {
        expect(CompletedForm.instanceType).to.include('n1-standard-8');
    });
    it('Region - coincided', function () {
        expect(CompletedForm.region).to.include('Frankfurt');
    });
    it('Local SSD - coincided', function () {
        expect(CompletedForm.localSSD).to.include('2x375 GiB');
    });
    it('Сommitment term - coincided', function () {
        expect(CompletedForm.term).to.include('1 Year');
    });
    it('The rental price corresponds ', function () {
        expect(CompletedForm.price).to.include('USD 1,082.77');
    });
});
