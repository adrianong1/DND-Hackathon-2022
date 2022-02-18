// When the button is clicked, inject setPageBackgroundColor into current page
// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
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

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});


// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}


// toggle dark mode switch depending on dark mode setting
chrome.storage.sync.get("dark-mode", async (darkMode) => {
    darkModeSwitch.checked = darkMode;
    setDarkMode(darkMode);
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