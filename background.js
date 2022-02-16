let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.contextMenus.create({
    id: "definition",
    title: "Get Definition",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
    if (tab.id && data.selectionText) {
        chrome.tabs.sendMessage(tab.id, {text: data.selectionText}, (response) => {
            console.log(response.definition)
        });
    }
})