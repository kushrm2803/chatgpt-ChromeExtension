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
  console.log("Got selected text ",info.selectionText);
  if (info.menuItemId === "openWithChatGPT") {
    // Send a message to the content script to fetch the selected text
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: fetchSelectedText,
      args: [info.selectionText],
    });
  }
});

//Error in this function
function fetchSelectedText(selectedText) {
  chrome.storage.local.set({ selectedText: selectedText }, () => {
    console.log("Selected text saved:", selectedText);
  });

  // Open the popup
  chrome.action.openPopup();
}
