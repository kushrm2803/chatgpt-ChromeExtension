//script to run as soon as the Chrome extension is installed or reloaded

let selectedText = '';

// For context Menu
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Started");
  chrome.contextMenus.create({
    id: "openWithChatGPT",
    title: "Open with ChatGPT",
    contexts: ["selection"],
  });
});

// Handle the event
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openWithChatGPT") {
    console.log("Context menu item clicked", info.selectionText);
    selectedText = info.selectionText; // Store the selected text
    openPopup();
  }
});

function openPopup() {
  chrome.windows.create({
    url: "popup.html",
    type: "popup",
    width: 500, 
    height: 350, 
  });
}

// Listen for messages from the popup to get the selected text
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSelectedText') {
    sendResponse({ text: selectedText });
  }
  if (message.action === 'getUserInput') {
    const userInput = message.userInput;
    // Send user input to ChatGPT
    fetchChatGPTResponse(userInput);
  }
});

function fetchChatGPTResponse(userInput) {
  
}
