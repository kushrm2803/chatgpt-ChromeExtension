//script runs when the user opens the extension's popup.
document.addEventListener("DOMContentLoaded", () => {
  console.log("Popup loaded");
  // Send a message to the background script to get the selected text
  chrome.runtime.sendMessage({ action: "getSelectedText" }, (response) => {
    const selectedText = response.text || "No text selected";
    console.log("Retrieved selected text:", selectedText);
    document.getElementById(
      "response"
    ).innerText = `You selected: ${selectedText}`;
    const userInput = prompt("Enter your prompt:");
    // Send user input to the background script
    chrome.runtime.sendMessage({ action: "getUserInput", userInput });
  });
});
