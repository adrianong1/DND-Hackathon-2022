let color = '#3aa757';
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});


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


// create help option in context menu
chrome.contextMenus.create({
    id: "help",
    title: "Help!"
});


// send information to overlay.js about selected text
chrome.contextMenus.onClicked.addListener((data, tab) => {
    if (data.menuItemId == "definition") {
        if (tab.id && data.selectionText) {
            chrome.tabs.sendMessage(tab.id, {text: data.selectionText});
        }
    }
    else if (data.menuItemId == "help") {
        chrome.tabs.create({
            url: "../html/help.html"
        });
    }
});