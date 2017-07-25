var clickedElement;

document.addEventListener("mousedown", function(event){
  clickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let imageSrc = $(clickedElement).parent().find("img").attr("src");

    
  // chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  //   console.log(response);
  // });
});
