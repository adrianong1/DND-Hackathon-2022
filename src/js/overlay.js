const ACRONYM_MAX_LENGTH = 20

// create overlay, hidden for now
let overlayContainer = document.createElement("div");
overlayContainer.setAttribute("id", "definition-overlay");
let acronymContainer = document.createElement("div");
acronymContainer.setAttribute("id", "acronym");
let definitionListContainer = document.createElement("ol");
definitionListContainer.setAttribute("id", "definitions-list");
overlayContainer.appendChild(acronymContainer);
overlayContainer.appendChild(definitionListContainer);
document.body.appendChild(overlayContainer);


// hide overlay if user clicks outside of overlay
window.onclick = (event) => {
    if (!event.path.includes(overlayContainer)) {
        overlayContainer.style.display = "none";
    }
}


// hide overlay if user resizes the window
window.onresize = (event) => {
    overlayContainer.style.display = "none";
}


// load dark mode on start up
chrome.storage.sync.get("dark-mode", async ({"dark-mode": darkMode}) => {
    setDarkMode(darkMode);
});


// listen for messages from other scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request["text"] != undefined) {
        setOverlay(request["text"]);
    }
    else if (request["dark-mode"] != undefined) {
        setDarkMode(request["dark-mode"]);
    }
});


function setOverlay(acronym) {
    if (acronym.length > ACRONYM_MAX_LENGTH) {
        acronym = "Make sure the selected text is an acronym!";
        setOverlayContents(acronym, []);
    } else {
        chrome.storage.sync.get("enable-english", ({"enable-english": enableEnglish}) => {
            chrome.storage.sync.get("enable-french", ({"enable-french": enableFrench}) => {
                let definitions = [];
                let english_definitions = enableEnglish ? ENGLISH_ACRONYMS[acronym] : [];
                let french_definitions = enableFrench ? FRENCH_ACRONYMS[acronym] : [];
                english_definitions = english_definitions == undefined ? [] : english_definitions;
                french_definitions = french_definitions == undefined ? [] : french_definitions;
    
                if (english_definitions && french_definitions) {
                    definitions = english_definitions.concat(french_definitions);
                } else {
                    definitions = english_definitions ? english_definitions : french_definitions;
                }

                definitions ? definitions : [];
                
                if (definitions.length == 0) {
                    acronym = 'No definition found for "' + acronym + '".';
                }

                setOverlayContents(acronym, definitions);
            });
        });
    }
}


function setOverlayContents(acronym, definitions) {
    // move overlay to the bottom left corner of the selected text
    selectedTextRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    overlayContainer.style.top = selectedTextRect.bottom + window.scrollY + "px";
    overlayContainer.style.left = selectedTextRect.right + window.scrollX + "px";

    // setup overlay contents
    acronymContainer.innerHTML = acronym;
    definitionListContainer.innerHTML = ""; // clear children
    for (const definition of definitions) {
        let definitionContainer = document.createElement("li");
        definitionContainer.classList.add("definition");
        definitionContainer.innerHTML = definition;
        definitionListContainer.append(definitionContainer);
    }

    // display overlay
    overlayContainer.style.display = "block";
}


function setDarkMode(darkMode) {
    darkMode ? 
        overlayContainer.classList.add("dark-mode") :
        overlayContainer.classList.remove("dark-mode");
}