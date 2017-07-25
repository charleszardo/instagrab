var clickedElement;

document.addEventListener("mousedown", function(event){
  clickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let img = $(clickedElement).siblings().children()[0],
        imageSrc = $(img).attr("src");

    if (imageSrc) {
      chrome.runtime.sendMessage({"message": "get_img_src", "src": imageSrc});
    }
});
