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
chrome.storage.sync.get("dark-mode", async ({"dark-mode": darkMode}) => {
    darkModeSwitch.checked = darkMode;
    setDarkMode(darkMode);
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