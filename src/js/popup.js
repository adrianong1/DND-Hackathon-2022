let englishCheckbox = document.getElementById("English");
let frenchCheckbox = document.getElementById("French");

englishCheckbox.addEventListener('change', e => {

    if(e.target.checked){
        console.log("English checkboxed");
        //search in english
    }
});

frenchCheckbox.addEventListener('change', e => {

    if(e.target.checked){
        console.log("French checkboxed");
        //search in french
    }
});


let darkModeSwitch = document.getElementById("dark-mode-switch");
darkModeSwitch.addEventListener("change", async (event) => {
    setDarkMode(event.target.checked);
});

async function setDarkMode(darkMode) {
    chrome.storage.sync.set({"dark-mode": darkMode});
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.tabs.sendMessage(tab.id, {"dark-mode": darkMode});
}

// toggle dark mode switch depending on dark mode setting
chrome.storage.sync.get("dark-mode", async (darkMode) => {
    darkModeSwitch.checked = darkMode;
    setDarkMode(darkMode);
});