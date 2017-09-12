let clickedImg;

function isElement(el) {
  return el && el instanceof HTMLElement;
}

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

function getUserPageImg(el) {
  let parentNode = el.parentElement,
      childNode = parentNode.firstChild,
      grandchildNode = childNode.firstChild,
      greatGrandchildNode = grandchildNode.firstChild;

  if (childNode === el) {
    return null;
  } else if (isImg(greatGrandchildNode)) {
    return greatGrandchildNode;
  }

  return null;
}

document.addEventListener("mousedown", function(event){
  clickedEl = event.target;

  if (document.location.pathname.split("/").length % 2 === 0) {
    clickedImg = getMainImg(clickedEl);
  } else {
    clickedImg = getUserPageImg(clickedEl);
  }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (clickedImg) {
      let imageSrc = clickedImg.getAttribute("src");

      chrome.runtime.sendMessage({"message": "get_img_src", "src": imageSrc});
    }
});
