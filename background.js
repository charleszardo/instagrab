var parent = chrome.contextMenus.create({
  "title": "Instagrab",
  "contexts": ["page"],
  "documentUrlPatterns": ["*://*.instagram.com/*"],
  "onclick": testFnc
});


function testFnc(info, tab) {
  chrome.tabs.sendMessage(tab.id, {});
}
// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//   console.log('about to send msg');
//   console.log(info);
//   console.log(tab);
//   chrome.tabs.sendMessage(tab.id, {});
//   console.log('msg sent');
// })

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('msg received');
    console.log(request);
    console.log(sender);
    console.log(sendResponse);
    if( request.message === "get_img_src" ) {
      chrome.downloads.download({url: request.src});
    }
  }
);
