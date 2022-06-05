const MDN_KEYS = ["mozilla", "mdn1", "mdn3"];
const MDN_INSTANCES = ["developer.mozilla.org", "mdn1.moz.one", "mdn3.moz.one"];

const storage = chrome.storage.local;

let onClickedEvent = () => {};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.mdn) {
    chrome.action.setPopup({ popup: "" });

    const location = new URL(request.location.href);
    const hostname = location.hostname;
    const index = MDN_INSTANCES.indexOf(hostname);
    if (index !== -1) {
      storage.get(MDN_KEYS[index], (result) => {
        const dbHostname = result[MDN_KEYS[index]];
        console.log(dbHostname);
        location.hostname = dbHostname;

        // onClickedEvent not onClickedEvent()
        chrome.action.onClicked.removeListener(onClickedEvent);
        onClickedEvent = () => chrome.tabs.create({ url: location.href });
        chrome.action.onClicked.addListener(onClickedEvent);
      });
    }
  } else {
    chrome.action.setPopup({ popup: "popup.html" });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: "options.html",
  });
});
