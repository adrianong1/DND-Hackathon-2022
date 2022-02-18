/* Help Button Logic */
let helpButton = document.getElementById("help-button");
helpButton.addEventListener("click", (event) => {
    chrome.tabs.create({
        url: "../html/help.html"
    });
});


/* English Checkbox Logic */
let englishCheckbox = document.getElementById("english-checkbox");
chrome.storage.sync.get("enable-english", async ({"enable-english": enableEnglish}) => {
    if (enableEnglish != undefined) {
        englishCheckbox.checked = enableEnglish;
    }
});

englishCheckbox.addEventListener("change", async (event) => {
    chrome.storage.sync.set({"enable-english": event.target.checked});
});


/* French Checkbox Logic */
let frenchCheckbox = document.getElementById("french-checkbox");
chrome.storage.sync.get("enable-french", async ({"enable-french": enableFrench}) => {
    if (enableFrench != undefined) {
        frenchCheckbox.checked = enableFrench;
    }
});

frenchCheckbox.addEventListener("change", async (event) => {
    chrome.storage.sync.set({"enable-french": event.target.checked});
});


/* Dark Mode Switch Logic */
let darkModeSwitch = document.getElementById("dark-mode-switch");
chrome.storage.sync.get("dark-mode", async ({"dark-mode": darkMode}) => {
    if (darkMode != undefined) {
        darkModeSwitch.checked = darkMode;
        setDarkMode(darkMode);
    }
});

darkModeSwitch.addEventListener("change", async (event) => {
    darkMode = event.target.checked;
    chrome.storage.sync.set({"dark-mode": darkMode});
    setDarkMode(darkMode);
});

async function setDarkMode(darkMode) {
    darkMode ?
        document.body.classList.add("dark-mode") :
        document.body.classList.remove("dark-mode");
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.tabs.sendMessage(tab.id, {"dark-mode": darkMode});
}