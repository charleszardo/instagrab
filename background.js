var parent = chrome.contextMenus.create({
  "title": "Instagrab",
  "contexts": ["all"],
  "documentUrlPatterns": ["*://*.instagram.com/*"]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  chrome.tabs.sendMessage(tab.id, {});
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "get_img_src" ) {
      chrome.downloads.download({url: request.src});
    }
  }
);
