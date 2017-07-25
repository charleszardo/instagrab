var parent = chrome.contextMenus.create({
  "title": "Instagrab",
  "contexts": ["page"],
  "documentUrlPatterns": ["*://*.instagram.com/*"]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  chrome.tabs.sendMessage(tab.id, {});
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "get_img_src" ) {
      chrome.downloads.download({url: request.src},
                                             function(id) {
      });
      console.log(request);
    }
  }
);
