import '@babel/polyfill';
import { expect } from 'chai';
import { PastebinHome } from '../../../pageObject_model/index.js';
import { PasteFactory } from '../../../bisinessObject/PasteFactory.js';

// npx wdio run ./wdio.conf.js --spec task1.spec.js

describe('Function multiply for Calculator', function () {
    let FirstPaste = PasteFactory.getFirstPaste();
    before(async function () {
        await PastebinHome.openPage(PastebinHome.urlPastebinHome);
        await PastebinHome.addNewPaste(FirstPaste.text);

        await PastebinHome.fillSelect(
            PastebinHome.expirationSelectXpath,
            PastebinHome.expirationListXpath,
            PastebinHome.itemXpath,
            FirstPaste.expirationTime
        );
        await PastebinHome.addPasteName(FirstPaste.name);
        await PastebinHome.sendPaste();
    });
});
