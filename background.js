const MDN_KEYS = ["mozilla", "mdn1", "mdn3"];
const MDN_INSTANCES = ["developer.mozilla.org", "mdn1.moz.one", "mdn3.moz.one"];

const storage = chrome.storage.local;
let onClickedEvent = () => {};

function myMain(urlString) {
  const location = new URL(urlString);
  const hostname = location.hostname;
  const index = MDN_INSTANCES.indexOf(hostname);

  if (index !== -1) {
    const key = MDN_KEYS[index];
    storage.get([key], (result) => {
      const dbHostname = result[key];
      if (dbHostname) {
        console.log(dbHostname);
        const dbIndex = MDN_INSTANCES.indexOf(dbHostname);
        if (dbIndex === 0) {
          chrome.action.setPopup({ popup: "" });

          chrome.action.setBadgeText({ text: "" });
          chrome.action.setIcon({ path: "/images/favicon-48x48.new.png" });
        } else {
          chrome.action.setPopup({ popup: "" });

          chrome.action.setBadgeText({ text: MDN_KEYS[dbIndex][3] });
          chrome.action.setIcon({ path: "/images/favicon-48x48.png" });
        }

        location.hostname = dbHostname;
        // onClickedEvent not onClickedEvent()
        chrome.action.onClicked.removeListener(onClickedEvent);
        onClickedEvent = () => chrome.tabs.create({ url: location.href });
        chrome.action.onClicked.addListener(onClickedEvent);
      }
    });
  } else {
    chrome.action.setPopup({ popup: "popup.html" });
    chrome.action.setBadgeText({ text: "3" });
    chrome.action.setIcon({ path: "/images/favicon-48x48.png" });
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setPopup({ popup: "popup.html" });
  chrome.action.setBadgeText({ text: "3" });

  chrome.tabs.create({
    url: "options.html",
  });
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  const url = tab.url;
  if (url) {
    myMain(url);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = tab.url;
  if (url) {
    myMain(url);
  }
})