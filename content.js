let clickedImg;

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

function getMainImg(el) {
  let parentNode = el.parentElement,
      childNode = parentNode.firstChild,
      grandchildNode = childNode.firstChild;

  if (isLink(el) || isLink(parentNode) || isLink(childNode)) {
    return null;
  } else if (isImg(grandchildNode)) {
    return grandchildNode;
  }

  return null;
}

function getUserPageImgSrc(el) {
  let parentNode = el.parentElement,
      childNode = parentNode.firstChild,
      grandchildNode = childNode.firstChild,
      greatGrandchildNode = grandchildNode.firstChild;

  if (isImg(greatGrandchildNode)) {
    return greatGrandchildNode;
  }

  return null;
}

document.addEventListener("mousedown", function(event){
  clickedEl = event.target;
  // console.log(clickedElement.parentElement.firstChild.firstChild.getAttribute("src"))
  // let x = getImgSrc(clickedElement.parentElement.firstChild.firstChild);
  // console.log(x)

  if (document.location.pathname.split("/").length % 2 === 0) {
    clickedImg = getMainImg(clickedEl);
  } else {
    clickedImg = getUserPageImgSrc(clickedEl);
  }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (clickedImg) {
      let imageSrc = clickedImg.getAttribute("src");

      chrome.runtime.sendMessage({"message": "get_img_src", "src": imageSrc});
    }
});
