// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
// function genericOnClick(info, tab) {
//   console.log("item " + info.menuItemId + " was clicked");
//   console.log("info: " + JSON.stringify(info));
//   console.log("tab: " + JSON.stringify(tab));
// }
//
// // Create one test item for each context type.
// var contexts = ["page","selection","link","editable","image","video",
//                 "audio"];
// for (var i = 0; i < contexts.length; i++) {
//   var context = contexts[i];
//   var title = "Test '" + context + "' menu item";
//   var id = chrome.contextMenus.create({"title": title, "contexts":[context],
//                                        "onclick": genericOnClick});
//   console.log("'" + context + "' item:" + id);
// }


// background (event) page
var parent = chrome.contextMenus.create({
  "title": "Save Image",
  "id": "0",
  "contexts": ["all"]
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
