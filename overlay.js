let overlayContainer = document.createElement("div");
overlayContainer.setAttribute("id", "definition-overlay");
let acronymContainer = document.createElement("div");
acronymContainer.setAttribute("id", "acronym");
let definitionListContainer = document.createElement("ol");
definitionListContainer.setAttribute("id", "definitions-list");

overlayContainer.appendChild(acronymContainer);
overlayContainer.appendChild(definitionListContainer);
document.body.appendChild(overlayContainer);

window.onclick = (event) => {
    // hide overlay if user clicks outside of overlay
    if (event.target != overlay) {
        overlay.style.display = "none";
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // move overlay to the bottom left corner of the selected text
    selectedTextRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    overlayContainer.style.top = selectedTextRect.bottom + "px";
    overlayContainer.style.left = selectedTextRect.right + "px";

    // setup overlay contents
    acronymContainer.innerHTML = request.text;

    definitionListContainer.innerHTML = ""; // clear list
    definitions = [request.text, request.text, request.text];
    for (const definition of definitions) {
        let definitionContainer = document.createElement("li");
        definitionContainer.classList.add("definition");
        definitionContainer.innerHTML = definition + "'s definition";
        definitionListContainer.append(definitionContainer);
    }

    // display overlay
    overlayContainer.style.display = "block";
})