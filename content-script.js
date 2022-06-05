console.log(window.location);

chrome.runtime.sendMessage({ mdn: true, location: window.location });

console.log(chrome);
console.log(localStorage);
