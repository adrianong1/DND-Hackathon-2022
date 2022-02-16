let overlay = document.createElement("div");
overlay.setAttribute("id", "definition-overlay");
document.body.appendChild(overlay);

window.onclick = (event) => {
    // hide overlay if user clicks outside of overlay
    if (event.target != overlay) {
        overlay.style.display = "none";
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // move overlay to the bottom left corner of the selected text
    selectedTextRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    overlay.style.top = selectedTextRect.bottom + "px";
    overlay.style.left = selectedTextRect.right + "px";

    // replace overlay text and display
    overlay.innerHTML = request.text;
    overlay.style.display = "block";
})