const MDN_INSTANCES = ["developer.mozilla.org", "mdn1.moz.one", "mdn3.moz.one"];
const hostname = window.location.hostname;

if (MDN_INSTANCES.indexOf(hostname) !== -1) {
  chrome.runtime.sendMessage({ mdn: true, location: window.location });
} else {
  chrome.runtime.sendMessage({ mdn: false });
}
