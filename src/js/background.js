// open help page on install
chrome.runtime.onInstalled.addListener((reason) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: "../html/help.html"
        });
    }
});


// create get definition option in menu when right-clicking
chrome.contextMenus.create({
    id: "definition",
    title: 'Get definition for acronym "%s"',
    contexts: ["selection"]
});


// send information to overlay.js about selected text
chrome.contextMenus.onClicked.addListener((data, tab) => {
    if (data.menuItemId == "definition") {
        if (tab.id && data.selectionText) {
            chrome.tabs.sendMessage(tab.id, {text: data.selectionText});
        }
    }
});

// load default settings
chrome.storage.sync.get("enable-english", async ({"enable-english": enableEnglish}) => {
    if (enableEnglish == undefined) {
        chrome.storage.sync.set({"enable-english": true});
    }
});

chrome.storage.sync.get("enable-french", async ({"enable-french": enableFrench}) => {
    if (enableFrench == undefined) {
        chrome.storage.sync.set({"enable-french": true});
    }
});