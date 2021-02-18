"use strict";

function encodeHtml(str){
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

window.onload = function () {
  var nodeSC = document.getElementById('my-node'),
      containerNode = nodeSC.children.item(0),
      preNode = containerNode.children.item(0),
        preCode = preNode.children.item(0);
    preCode.innerHTML = encodeHtml(preCode.innerHTML)
  document.querySelector("link[title=\"".concat(data.theme, "\"]")).removeAttribute("disabled");
  var shadow, bgColor, borderRadius, margins;

  if (data.hasOwnProperty("shadowEnable")) {
    if (data.shadowEnable) shadow = "rgba(0, 0, 0, 0.55) 0px 20px 68px";else shadow = "none";
  } else shadow = "none";

  if (data.hasOwnProperty("backgroundTransparent")) {
    if (data.backgroundTransparent == true) bgColor = "transparent";else {
      if (data.hasOwnProperty("backgroundColor")) bgColor = data.backgroundColor;else bgColor = "#c6d1fb";
    }
  }

  if (data.hasOwnProperty("borderRadius")) borderRadius = data.borderRadius;else borderRadius = 0;
  if (data.hasOwnProperty("margins")) margins = data.margins;else margins = {};
  if (!margins.hasOwnProperty("top")) margins["top"] = 40;
  if (!margins.hasOwnProperty("left")) margins["left"] = 40;
  if (!margins.hasOwnProperty("bottom")) margins["bottom"] = 40;
  if (!margins.hasOwnProperty("right")) margins["right"] = 40;
  document.body.style.backgroundColor = bgColor;
  preNode.style.boxShadow = shadow;
  preNode.style.borderRadius = borderRadius + "px";
  containerNode.style.marginTop = margins.top + "px";
  containerNode.style.marginLeft = margins.left + "px";
  containerNode.style.marginBottom = margins.bottom + "px";
  containerNode.style.marginRight = margins.right + "px";
  hljs.highlightBlock(preNode);
  if (data.hasOwnProperty("showLineNumbers")) if (data.showLineNumbers) hljs.lineNumbersBlock(preNode);
};
