var clickedElement;

function isElement(el) {
  return el && el instanceof HTMLElement;
}

// function getImgSrc(currEl, maxNodesDeep = 1, currNodeDepth = 0) {
//   if (!isElement(currEl)) {
//     return null;
//   } else if (currEl.hasAttribute("src")) {
//     return currEl.getAttribute("src");
//   } else if (currNodeDepth < maxNodesDeep) {
//     currNodeDepth += 1;
//     return getImgSrc(currEl.firstChild, maxNodesDeep, currNodeDepth)
//   } else {
//     return null;
//   }
// }
function isLink(el) {
  return el && el.tagName === "A";
}

function isImg(el) {
  return el && el.tagName === "IMG";
}

function getMainImgSrc(el) {
  let parentNode = el.parentElement,
      childNode = parentNode.firstChild,
      grandchildNode = childNode.firstChild;

  if (isLink(el) || isLink(parentNode) || isLink(childNode)) {
    return null;
  } else if (isImg(grandchildNode)) {
    return grandchildNode.getAttribute("src");
  }

  return null;
}

function getUserPageImgSrc(el) {

}

document.addEventListener("mousedown", function(event){
  clickedEl = event.target;
  var x = getMainImgSrc(clickedEl);
  // console.log(clickedElement.parentElement.firstChild.firstChild.getAttribute("src"))
  // let x = getImgSrc(clickedElement.parentElement.firstChild.firstChild);
  // console.log(x)

  if (document.location.pathname.split("/").length % 2 === 0) {
    getMainImgSrc(clickedEl);
  } else {
    getUserPageImgSrc(clickedEl);
  }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let img = $(clickedElement).siblings().children()[0],
        imageSrc = $(img).attr("src");

    if (imageSrc) {
      chrome.runtime.sendMessage({"message": "get_img_src", "src": imageSrc});
    }
});
