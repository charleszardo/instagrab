var clickedElement;

document.addEventListener("mousedown", function(event){
  clickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // clickedElement.remove();
    $clickedEl = $(clickedElement);
    $sibling = $($clickedEl.siblings()[0]);
    // $img = $sibling.children();
    console.log($sibling);
  // chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  //   console.log(response);
  // });
});
