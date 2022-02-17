const ACRONYM_MAX_LENGTH = 10


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


// listen for sent data from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let acronym = request.text;
    let definitions = [];
    
    if (acronym.length > ACRONYM_MAX_LENGTH) {
        acronym = "Make sure the selected text is an acronym!";
    } else {
        definitions = getDefinition(acronym);
        if (definitions.length == 0) {
            acronym = 'No definition found for "' + acronym + '".';
        }
    }

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
})


function getDefinition(acronym) {
    let definitions = [];
    let english_definitions = ENGLISH_ACRONYMS[acronym];
    let french_definitions = FRENCH_ACRONYMS[acronym];

    if (english_definitions && french_definitions) {
        definitions = english_definitions.concat(french_definitions);
    } else {
        definitions = english_definitions ? english_definitions : french_definitions;
    }

    return definitions ? definitions : [];
}