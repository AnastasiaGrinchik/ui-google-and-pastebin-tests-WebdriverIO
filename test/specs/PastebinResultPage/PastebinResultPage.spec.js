import '@babel/polyfill';
import { expect } from 'chai';
import { Paste } from '../../../bisinessObject/Paste.js';
import { PasteFactory } from '../../../bisinessObject/PasteFactory.js';
import {
    PastebinResults,
    PastebinHome,
} from '../../../pageObject_model/index.js';
import { PastebinHomePage } from '../../../pageObject_model/PastebinHomePage.js';

// npx wdio run ./wdio.conf.js --spec PastebinResultPage.spec.js

describe('New page contains', function () {
    let SecondPaste = PasteFactory.getSecondPaste();

    before(async function () {
        await PastebinResults.openPage(PastebinHome.urlPastebinHome);
        await PastebinResults.addNewPaste(SecondPaste.text);

        await PastebinResults.fillSelect(
            PastebinHome.syntaxSelectXpath,
            PastebinHome.syntaxListXpath,
            PastebinHome.itemXpath,
            SecondPaste.syntax
        );

        await PastebinResults.fillSelect(
            PastebinHome.expirationSelectXpath,
            PastebinHome.expirationListXpath,
            PastebinHome.itemXpath,
            SecondPaste.expirationTime
        );

        await PastebinResults.addPasteName(SecondPaste.name);

        await PastebinResults.sendPaste();

        await PastebinResults.findOutTitleBrowsertab();

        await PastebinResults.pushSavedText(
            PastebinResults,
            'savedSyntax',
            PastebinResults.savedSyntaxXpath
        );

        await PastebinResults.pushSavedText(
            PastebinResults,
            'savedTextArea',
            PastebinResults.savedTextAreaXpath
        );

        // await browser.pause();
    });

    it('Data entered in the input "Paste title" save to tab', function () {
        expect(PastebinResults.titleBrowserTab).to.include(
            'how to gain dominance among developers'
        );
    });
    it('The syntax matches the selected ', function () {
        expect(PastebinResults.savedSyntax).to.be.equal('Bash');
    });
    it('Data entered in the input "Paste title" save to textarea field', function () {
        expect(PastebinResults.savedTextArea).to.deep.equal(SecondPaste.text);
    });
});
