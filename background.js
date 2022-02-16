let color = '#3aa757';
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});


// create get definition option in menu when right-clicking
chrome.contextMenus.create({
    id: "definition",
    title: "Get Definition",
    contexts: ["selection"]
});


// send information to overlay.js about selected text
chrome.contextMenus.onClicked.addListener((data, tab) => {
    if (tab.id && data.selectionText) {
        chrome.tabs.sendMessage(tab.id, {text: data.selectionText});
    }
})