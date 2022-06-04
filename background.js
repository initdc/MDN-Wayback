// Copyright 2021 Google LLC
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd
const storage = localStorage;

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: "options.html",
  });
});

let actionEnabled = true;
chrome.action.onClicked.addListener((tab) => {
  if (actionEnabled) {
    chrome.action.disable();
  } else {
    chrome.action.enable();
  }
  actionEnabled = !actionEnabled;
  let currentText = await chrome.action.getBadgeText({});
  if (!currentText) {
    chrome.action.setBadgeText({ text: 'hi :)' });
    showBadgeText();
  }
});

