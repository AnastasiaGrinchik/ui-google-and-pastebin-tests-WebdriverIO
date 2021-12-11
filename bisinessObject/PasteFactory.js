import { Paste } from './paste.js';

export class PasteFactory {
    static getFirstPaste() {
        let pasteParametrs = {
            name: 'helloweb',
            text: 'Hello from WebDriver',
            expirationTime: '10 Minutes',
        };
        return new Paste(pasteParametrs);
    }

    static getSecondPaste() {
        let pasteParametrs = {
            name: 'how to gain dominance among developers',
            text: 'git config --global user.name "New Sheriff in Town"\ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code")\ngit push origin master --force',
            expirationTime: '10 Minutes',
            syntax: 'Bash',
        };
        return new Paste(pasteParametrs);
    }
}
// let FirstPaste = PasteFactory.getFirstPaste();
// console.log(FirstPaste);
