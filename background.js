chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "https://html5zombo.com/" });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.mdn) {
    chrome.tabs.create({ url: "https://html5zombo.com/" });
  }
});
