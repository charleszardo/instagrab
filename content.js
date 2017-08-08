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

// experimental area

// recognize AJAX requests:
function injectScript(source) {

    var elem = document.createElement("script"); //Create a new script element
    elem.type = "text/javascript"; //It's javascript
    elem.innerHTML = source; //Assign the source
    document.documentElement.appendChild(elem); //Inject it into the DOM
}

injectScript("("+(function() {

    function bindResponse(request, response) {
        request.__defineGetter__("responseText", function() {
            console.warn('Something tried to get the responseText');
            console.debug(response);
            return response;
        })
    }

    function processResponse(request,caller,method,path) {
        bindResponse(request, request.responseText);
    }

    var proxied = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(method, path, async) {
            var caller = arguments.callee.caller;
            this.addEventListener('readystatechange', function() {
                if (this.readyState === 4)
                    processResponse(this,caller,method,path);
            }, true);
        return proxied.apply(this, [].slice.call(arguments));
    };
}).toString()+")()");

// begin developing mouseover approach

// get all images
let imgList = [...document.querySelectorAll("img")];

// filter out profile images
imgList.filter(img => img.width > 30);

// get class name from first image since all have same class/markup
// get DOM node to start traversing
let imgNode = document.querySelector(`.${imgList[0].className}`);

// masking element is a sibling of the node
let siblingNode = imgNode.parentElement.nextElementSibling;

// once class name of sibling node is determined it should be saved somewhere
// so that above work doesn't have to be repeated, slowing down the page

// attach mouseover to all elements with siblingNode class

// attach mouseover event every time and AJAX event occurs (unless better approach is developed)
