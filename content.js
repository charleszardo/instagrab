var clickedElement;

document.addEventListener("mousedown", function(event){
  clickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let imageSrc = $(clickedElement).parent().find("img").attr("src");

    chrome.runtime.sendMessage({"message": "get_img_src", "src": imageSrc});
});
