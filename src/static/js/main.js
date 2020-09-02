(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleResetBtnClickForSocket = exports.handleFillPaintBtnClick = exports.handleMouseDown = exports.handleMouseMove = void 0;

var _socket = require("./socket");

var canvas = document.getElementById("jsCanvas");
var colors = document.getElementsByClassName("jsColor");
var range = document.getElementById("jsRange");
var fillandPaintBtn = document.getElementById("jsFillBtn");
var saveBtn = document.getElementById("jsSaveBtn");
var body = document.getElementById("body");
var resetBtn = document.getElementById("jsResetBtn");
var DEFAULT_COLOR = "black";
var CANVAS_SIZE = 550;
var ctx = canvas.getContext("2d");
var painting = false;
var filling = false;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

var stopPainting = function stopPainting() {
  painting = false;
};

var startPainting = function startPainting() {
  painting = true;
};

var lineTo = function lineTo(x, y) {
  ctx.lineTo(x, y);
  ctx.stroke();
};

var moveTo = function moveTo(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

function onMouseMove(event) {
  var x = event.offsetX;
  var y = event.offsetY;

  if (painting) {
    (0, _socket.getSocket)().emit("mouseMoved", {
      x: x,
      y: y,
      color: ctx.strokeStyle,
      brushSize: ctx.lineWidth
    });
    lineTo(x, y);
  } else {}
}

function onMouseDown(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  (0, _socket.getSocket)().emit("mouseDowned", {
    x: x,
    y: y,
    color: ctx.fillStyle
  });
  startPainting();
  moveTo(x, y);
}

function onMouseUp(event) {
  stopPainting();
}

ctx.fillRect(30, 50, 20, 100);

function changeColor(e) {
  var color = e.target.style.backgroundColor;
  ctx.strokeStyle = "".concat(color);
  ctx.fillStyle = "".concat(color);
}

function handleRangeValue(e) {
  var value = e.target.value;
  ctx.lineWidth = value;
}

function resetClick() {
  Array.from(colors).forEach(function (color) {
    color.classList.remove("clicked");
  });
}

function addClickedMotion(e) {
  resetClick();
  e.target.classList.add("clicked");
}

var fillorPaintFunction = function fillorPaintFunction(color) {
  console.log("fillorPaintfunction");
  ctx.fillStyle = color;

  if (filling == true) {
    filling = false;
    console.log("filling = false");
    fillandPaintBtn.innerText = "FILL";
  } else {
    filling = true;
    console.log("filling = true");
    fillandPaintBtn.innerText = "PAINT";
  }
};

function handleFirstBtnClick() {
  (0, _socket.getSocket)().emit("fillPaintBtnClicked", {
    color: ctx.fillStyle
  });
  fillorPaintFunction();
}

function handleCanvasClick(color) {
  var currentFillColor = ctx.fillStyle;
  console.log("".concat(currentFillColor, " and ").concat(color));
  console.log(filling);
  ctx.fillStyle = color;

  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }

  ctx.fillStyle = currentFillColor;
}

function handleCmCLick(event) {
  event.preventDefault();
}

function handleSaveBtnClick(event) {
  var dataUrl = canvas.toDataURL("image/png");
  var link = document.createElement("a");
  link.href = dataUrl;
  link.download = "Your Painting";
  document.body.appendChild(link);
  link.click();
}

var reset = function reset() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};

function handleResetBtnClick() {
  (0, _socket.getSocket)().emit("resetBtnClicked");
  reset();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCmCLick);
  range.addEventListener("input", handleRangeValue);
  fillandPaintBtn.addEventListener("click", handleFirstBtnClick);
  saveBtn.addEventListener("click", handleSaveBtnClick);
  resetBtn.addEventListener("click", handleResetBtnClick);
}

Array.from(colors).forEach(function (color) {
  var COLOR = color;
  COLOR.addEventListener("click", changeColor), COLOR.addEventListener("click", addClickedMotion);
});

var handleMouseMove = function handleMouseMove(_ref) {
  var x = _ref.x,
      y = _ref.y,
      color = _ref.color,
      brushSize = _ref.brushSize;
  var currentColor = ctx.strokeStyle;
  ctx.strokeStyle = color;
  ctx.lineWidth = brushSize;
  lineTo(x, y);
  ctx.strokeStyle = currentColor;
};

exports.handleMouseMove = handleMouseMove;

var handleMouseDown = function handleMouseDown(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      color = _ref2.color;
  moveTo(x, y);
  handleCanvasClick(color);
};

exports.handleMouseDown = handleMouseDown;

var handleFillPaintBtnClick = function handleFillPaintBtnClick(_ref3) {
  var color = _ref3.color;
  fillorPaintFunction(color);
};

exports.handleFillPaintBtnClick = handleFillPaintBtnClick;

var handleResetBtnClickForSocket = function handleResetBtnClickForSocket() {
  reset();
};

exports.handleResetBtnClickForSocket = handleResetBtnClickForSocket;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbnZhcy5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29sb3JzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInJhbmdlIiwiZmlsbGFuZFBhaW50QnRuIiwic2F2ZUJ0biIsImJvZHkiLCJyZXNldEJ0biIsIkRFRkFVTFRfQ09MT1IiLCJDQU5WQVNfU0laRSIsImN0eCIsImdldENvbnRleHQiLCJwYWludGluZyIsImZpbGxpbmciLCJ3aWR0aCIsImhlaWdodCIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJzdG9wUGFpbnRpbmciLCJzdGFydFBhaW50aW5nIiwibGluZVRvIiwieCIsInkiLCJzdHJva2UiLCJtb3ZlVG8iLCJiZWdpblBhdGgiLCJvbk1vdXNlTW92ZSIsImV2ZW50Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJlbWl0IiwiY29sb3IiLCJicnVzaFNpemUiLCJvbk1vdXNlRG93biIsIm9uTW91c2VVcCIsImNoYW5nZUNvbG9yIiwiZSIsInRhcmdldCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiaGFuZGxlUmFuZ2VWYWx1ZSIsInZhbHVlIiwicmVzZXRDbGljayIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGRDbGlja2VkTW90aW9uIiwiYWRkIiwiZmlsbG9yUGFpbnRGdW5jdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJpbm5lclRleHQiLCJoYW5kbGVGaXJzdEJ0bkNsaWNrIiwiaGFuZGxlQ2FudmFzQ2xpY2siLCJjdXJyZW50RmlsbENvbG9yIiwiaGFuZGxlQ21DTGljayIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlU2F2ZUJ0bkNsaWNrIiwiZGF0YVVybCIsInRvRGF0YVVSTCIsImxpbmsiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsImRvd25sb2FkIiwiYXBwZW5kQ2hpbGQiLCJjbGljayIsInJlc2V0IiwiaGFuZGxlUmVzZXRCdG5DbGljayIsImFkZEV2ZW50TGlzdGVuZXIiLCJDT0xPUiIsImhhbmRsZU1vdXNlTW92ZSIsImN1cnJlbnRDb2xvciIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZUZpbGxQYWludEJ0bkNsaWNrIiwiaGFuZGxlUmVzZXRCdG5DbGlja0ZvclNvY2tldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBLElBQU1BLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFVBQXhCLENBQWY7QUFDQSxJQUFNQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0csc0JBQVQsQ0FBZ0MsU0FBaEMsQ0FBZjtBQUNBLElBQU1DLEtBQUssR0FBR0osUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLENBQWQ7QUFDQSxJQUFNSSxlQUFlLEdBQUdMLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixXQUF4QixDQUF4QjtBQUNBLElBQU1LLE9BQU8sR0FBR04sUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQWhCO0FBQ0EsSUFBTU0sSUFBSSxHQUFHUCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBLElBQU1PLFFBQVEsR0FBR1IsUUFBUSxDQUFDQyxjQUFULENBQXdCLFlBQXhCLENBQWpCO0FBRUEsSUFBTVEsYUFBYSxHQUFHLE9BQXRCO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLEdBQXBCO0FBRUEsSUFBTUMsR0FBRyxHQUFHWixNQUFNLENBQUNhLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUVBLElBQUlDLFFBQVEsR0FBRyxLQUFmO0FBQ0EsSUFBSUMsT0FBTyxHQUFHLEtBQWQ7QUFFQWYsTUFBTSxDQUFDZ0IsS0FBUCxHQUFlTCxXQUFmO0FBQ0FYLE1BQU0sQ0FBQ2lCLE1BQVAsR0FBZ0JOLFdBQWhCO0FBRUFDLEdBQUcsQ0FBQ00sU0FBSixHQUFnQixPQUFoQjtBQUNBTixHQUFHLENBQUNPLFFBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CUixXQUFuQixFQUFn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QXVCLFFBQXZCQSxLQUF1QjtBQUFBLE1BQWhCQyxTQUFnQixRQUFoQkEsU0FBZ0I7QUFDN0QsTUFBTXlDLFlBQVksR0FBR2pFLEdBQUcsQ0FBQ1EsV0FBekI7QUFDQVIsRUFBQUEsR0FBRyxDQUFDUSxXQUFKLEdBQWtCZSxLQUFsQjtBQUNBdkIsRUFBQUEsR0FBRyxDQUFDUyxTQUFKLEdBQWdCZSxTQUFoQjtBQUNBWixFQUFBQSxNQUFNLENBQUNDLENBQUQsRUFBSUMsQ0FBSixDQUFOO0FBQ0FkLEVBQUFBLEdBQUcsQ0FBQ1EsV0FBSixHQUFrQnlELFlBQWxCO0FBQ0QsQ0FOTTs7OztBQVFBLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsUUFBcUI7QUFBQSxNQUFsQnJELENBQWtCLFNBQWxCQSxDQUFrQjtBQUFBLE1BQWZDLENBQWUsU0FBZkEsQ0FBZTtBQUFBLE1BQVpTLEtBQVksU0FBWkEsS0FBWTtBQUNsRFAsRUFBQUEsTUFBTSxDQUFDSCxDQUFELEVBQUlDLENBQUosQ0FBTjtBQUNBaUMsRUFBQUEsaUJBQWlCLENBQUN4QixLQUFELENBQWpCO0FBQ0QsQ0FITTs7OztBQUtBLElBQU00Qyx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLFFBQWU7QUFBQSxNQUFaNUMsS0FBWSxTQUFaQSxLQUFZO0FBQ3BEbUIsRUFBQUEsbUJBQW1CLENBQUNuQixLQUFELENBQW5CO0FBQ0QsQ0FGTTs7OztBQUlBLElBQU02Qyw0QkFBNEIsR0FBRyxTQUEvQkEsNEJBQStCLEdBQU07QUFDaERSLEVBQUFBLEtBQUs7QUFDTixDQUZNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U29ja2V0IH0gZnJvbSBcIi4vc29ja2V0XCI7XG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNDYW52YXNcIik7XG5jb25zdCBjb2xvcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianNDb2xvclwiKTtcbmNvbnN0IHJhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc1JhbmdlXCIpO1xuY29uc3QgZmlsbGFuZFBhaW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc0ZpbGxCdG5cIik7XG5jb25zdCBzYXZlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc1NhdmVCdG5cIik7XG5jb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2R5XCIpO1xuY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzUmVzZXRCdG5cIik7XG5cbmNvbnN0IERFRkFVTFRfQ09MT1IgPSBcImJsYWNrXCI7XG5jb25zdCBDQU5WQVNfU0laRSA9IDU1MDtcblxuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxubGV0IHBhaW50aW5nID0gZmFsc2U7XG5sZXQgZmlsbGluZyA9IGZhbHNlO1xuXG5jYW52YXMud2lkdGggPSBDQU5WQVNfU0laRTtcbmNhbnZhcy5oZWlnaHQgPSBDQU5WQVNfU0laRTtcblxuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbmN0eC5maWxsUmVjdCgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuXG5jdHguc3Ryb2tlU3R5bGUgPSBERUZBVUxUX0NPTE9SO1xuY3R4LmxpbmVXaWR0aCA9IDIuNTtcblxuY29uc3Qgc3RvcFBhaW50aW5nID0gKCkgPT4ge1xuICBwYWludGluZyA9IGZhbHNlO1xufTtcblxuY29uc3Qgc3RhcnRQYWludGluZyA9ICgpID0+IHtcbiAgcGFpbnRpbmcgPSB0cnVlO1xufTtcbmNvbnN0IGxpbmVUbyA9ICh4LCB5KSA9PiB7XG4gIGN0eC5saW5lVG8oeCwgeSk7XG4gIGN0eC5zdHJva2UoKTtcbn07XG5jb25zdCBtb3ZlVG8gPSAoeCwgeSkgPT4ge1xuICBjdHguYmVnaW5QYXRoKCk7XG4gIGN0eC5tb3ZlVG8oeCwgeSk7XG59O1xuXG5mdW5jdGlvbiBvbk1vdXNlTW92ZShldmVudCkge1xuICBsZXQgeCA9IGV2ZW50Lm9mZnNldFg7XG4gIGxldCB5ID0gZXZlbnQub2Zmc2V0WTtcbiAgaWYgKHBhaW50aW5nKSB7XG4gICAgZ2V0U29ja2V0KCkuZW1pdChcIm1vdXNlTW92ZWRcIiwge1xuICAgICAgeDogeCxcbiAgICAgIHk6IHksXG4gICAgICBjb2xvcjogY3R4LnN0cm9rZVN0eWxlLFxuICAgICAgYnJ1c2hTaXplOiBjdHgubGluZVdpZHRoLFxuICAgIH0pO1xuICAgIGxpbmVUbyh4LCB5KTtcbiAgfSBlbHNlIHtcbiAgfVxufVxuZnVuY3Rpb24gb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgbGV0IHggPSBldmVudC5vZmZzZXRYO1xuICBsZXQgeSA9IGV2ZW50Lm9mZnNldFk7XG4gIGdldFNvY2tldCgpLmVtaXQoXCJtb3VzZURvd25lZFwiLCB7IHg6IHgsIHk6IHksIGNvbG9yOiBjdHguZmlsbFN0eWxlIH0pO1xuICBzdGFydFBhaW50aW5nKCk7XG4gIG1vdmVUbyh4LCB5KTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZVVwKGV2ZW50KSB7XG4gIHN0b3BQYWludGluZygpO1xufVxuXG5jdHguZmlsbFJlY3QoMzAsIDUwLCAyMCwgMTAwKTtcblxuZnVuY3Rpb24gY2hhbmdlQ29sb3IoZSkge1xuICBjb25zdCBjb2xvciA9IGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcbiAgY3R4LnN0cm9rZVN0eWxlID0gYCR7Y29sb3J9YDtcbiAgY3R4LmZpbGxTdHlsZSA9IGAke2NvbG9yfWA7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVJhbmdlVmFsdWUoZSkge1xuICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICBjdHgubGluZVdpZHRoID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHJlc2V0Q2xpY2soKSB7XG4gIEFycmF5LmZyb20oY29sb3JzKS5mb3JFYWNoKChjb2xvcikgPT4ge1xuICAgIGNvbG9yLmNsYXNzTGlzdC5yZW1vdmUoXCJjbGlja2VkXCIpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkQ2xpY2tlZE1vdGlvbihlKSB7XG4gIHJlc2V0Q2xpY2soKTtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImNsaWNrZWRcIik7XG59XG5cbmNvbnN0IGZpbGxvclBhaW50RnVuY3Rpb24gPSAoY29sb3IpID0+IHtcbiAgY29uc29sZS5sb2coXCJmaWxsb3JQYWludGZ1bmN0aW9uXCIpO1xuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gIGlmIChmaWxsaW5nID09IHRydWUpIHtcbiAgICBmaWxsaW5nID0gZmFsc2U7XG4gICAgY29uc29sZS5sb2coXCJmaWxsaW5nID0gZmFsc2VcIik7XG4gICAgZmlsbGFuZFBhaW50QnRuLmlubmVyVGV4dCA9IFwiRklMTFwiO1xuICB9IGVsc2Uge1xuICAgIGZpbGxpbmcgPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKFwiZmlsbGluZyA9IHRydWVcIik7XG4gICAgZmlsbGFuZFBhaW50QnRuLmlubmVyVGV4dCA9IFwiUEFJTlRcIjtcbiAgfVxufTtcblxuZnVuY3Rpb24gaGFuZGxlRmlyc3RCdG5DbGljaygpIHtcbiAgZ2V0U29ja2V0KCkuZW1pdChcImZpbGxQYWludEJ0bkNsaWNrZWRcIiwgeyBjb2xvcjogY3R4LmZpbGxTdHlsZSB9KTtcbiAgZmlsbG9yUGFpbnRGdW5jdGlvbigpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVDYW52YXNDbGljayhjb2xvcikge1xuICBjb25zdCBjdXJyZW50RmlsbENvbG9yID0gY3R4LmZpbGxTdHlsZTtcbiAgY29uc29sZS5sb2coYCR7Y3VycmVudEZpbGxDb2xvcn0gYW5kICR7Y29sb3J9YCk7XG4gIGNvbnNvbGUubG9nKGZpbGxpbmcpO1xuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gIGlmIChmaWxsaW5nKSB7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7XG4gIH1cbiAgY3R4LmZpbGxTdHlsZSA9IGN1cnJlbnRGaWxsQ29sb3I7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUNtQ0xpY2soZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlU2F2ZUJ0bkNsaWNrKGV2ZW50KSB7XG4gIHZhciBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICBsaW5rLmhyZWYgPSBkYXRhVXJsO1xuICBsaW5rLmRvd25sb2FkID0gXCJZb3VyIFBhaW50aW5nXCI7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gIGxpbmsuY2xpY2soKTtcbn1cblxuY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gIGN0eC5maWxsUmVjdCgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlUmVzZXRCdG5DbGljaygpIHtcbiAgZ2V0U29ja2V0KCkuZW1pdChcInJlc2V0QnRuQ2xpY2tlZFwiKTtcbiAgcmVzZXQoKTtcbn1cblxuaWYgKGNhbnZhcykge1xuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG9uTW91c2VEb3duKTtcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG9uTW91c2VVcCk7XG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBzdG9wUGFpbnRpbmcpO1xuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNhbnZhc0NsaWNrKTtcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBoYW5kbGVDbUNMaWNrKTtcbiAgcmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGhhbmRsZVJhbmdlVmFsdWUpO1xuICBmaWxsYW5kUGFpbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUZpcnN0QnRuQ2xpY2spO1xuICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVTYXZlQnRuQ2xpY2spO1xuICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUmVzZXRCdG5DbGljayk7XG59XG5cbkFycmF5LmZyb20oY29sb3JzKS5mb3JFYWNoKChjb2xvcikgPT4ge1xuICBjb25zdCBDT0xPUiA9IGNvbG9yO1xuICBDT0xPUi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hhbmdlQ29sb3IpLFxuICAgIENPTE9SLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRDbGlja2VkTW90aW9uKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gKHsgeCwgeSwgY29sb3IsIGJydXNoU2l6ZSB9KSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRDb2xvciA9IGN0eC5zdHJva2VTdHlsZTtcbiAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gIGN0eC5saW5lV2lkdGggPSBicnVzaFNpemU7XG4gIGxpbmVUbyh4LCB5KTtcbiAgY3R4LnN0cm9rZVN0eWxlID0gY3VycmVudENvbG9yO1xufTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZU1vdXNlRG93biA9ICh7IHgsIHksIGNvbG9yIH0pID0+IHtcbiAgbW92ZVRvKHgsIHkpO1xuICBoYW5kbGVDYW52YXNDbGljayhjb2xvcik7XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlRmlsbFBhaW50QnRuQ2xpY2sgPSAoeyBjb2xvciB9KSA9PiB7XG4gIGZpbGxvclBhaW50RnVuY3Rpb24oY29sb3IpO1xufTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZVJlc2V0QnRuQ2xpY2tGb3JTb2NrZXQgPSAoKSA9PiB7XG4gIHJlc2V0KCk7XG59O1xuIl19
},{"./socket":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNewMessage = void 0;

var _socket = require("./socket");

var jsSendTextForm = document.getElementById("jsSendTextForm");
var jsSendText = document.getElementById("jsSendText");
var jsTextUl = document.getElementById("jsChatUl");

var handleNewMessage = function handleNewMessage(_ref) {
  var nickName = _ref.nickName,
      message = _ref.message;
  createMessage(nickName, message, "received");
};

exports.handleNewMessage = handleNewMessage;

var createMessage = function createMessage(nickName, msg, className) {
  var li = document.createElement("li");
  li.innerHTML = "<span class='".concat(className, "'>").concat(nickName, ":&nbsp</span>").concat(msg);
  jsTextUl.appendChild(li);
};

var handleSendTextFormSubmit = function handleSendTextFormSubmit(e) {
  e.preventDefault();
  var value = jsSendText.value;
  (0, _socket.getSocket)().emit("message", {
    message: value
  });
  console.log(value);
  createMessage("You", value, "sended");
  jsSendText.value = "";
};

jsSendTextForm.addEventListener("submit", handleSendTextFormSubmit);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsianNTZW5kVGV4dEZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwianNTZW5kVGV4dCIsImpzVGV4dFVsIiwiaGFuZGxlTmV3TWVzc2FnZSIsIm5pY2tOYW1lIiwibWVzc2FnZSIsImNyZWF0ZU1lc3NhZ2UiLCJtc2ciLCJjbGFzc05hbWUiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImhhbmRsZVNlbmRUZXh0Rm9ybVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiZW1pdCIsImNvbnNvbGUiLCJsb2ciLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsY0FBYyxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQXZCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHRixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBbkI7QUFDQSxJQUFNRSxRQUFRLEdBQUdILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixVQUF4QixDQUFqQjs7QUFFTyxJQUFNRyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLE9BQTJCO0FBQUEsTUFBeEJDLFFBQXdCLFFBQXhCQSxRQUF3QjtBQUFBLE1BQWRDLE9BQWMsUUFBZEEsT0FBYztBQUN6REMsRUFBQUEsYUFBYSxDQUFDRixRQUFELEVBQVdDLE9BQVgsRUFBb0IsVUFBcEIsQ0FBYjtBQUNELENBRk07Ozs7QUFJUCxJQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNGLFFBQUQsRUFBV0csR0FBWCxFQUFnQkMsU0FBaEIsRUFBOEI7QUFDbEQsTUFBTUMsRUFBRSxHQUFHVixRQUFRLENBQUNXLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWDtBQUNBRCxFQUFBQSxFQUFFLENBQUNFLFNBQUgsMEJBQStCSCxTQUEvQixlQUE2Q0osUUFBN0MsMEJBQXFFRyxHQUFyRTtBQUNBTCxFQUFBQSxRQUFRLENBQUNVLFdBQVQsQ0FBcUJILEVBQXJCO0FBQ0QsQ0FKRDs7QUFNQSxJQUFNSSx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQTJCLENBQUNDLENBQUQsRUFBTztBQUN0Q0EsRUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBRHNDLE1BRTlCQyxLQUY4QixHQUVwQmYsVUFGb0IsQ0FFOUJlLEtBRjhCO0FBR3RDLDJCQUFZQyxJQUFaLENBQWlCLFNBQWpCLEVBQTRCO0FBQUVaLElBQUFBLE9BQU8sRUFBRVc7QUFBWCxHQUE1QjtBQUNBRSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsS0FBWjtBQUNBVixFQUFBQSxhQUFhLENBQUMsS0FBRCxFQUFRVSxLQUFSLEVBQWUsUUFBZixDQUFiO0FBQ0FmLEVBQUFBLFVBQVUsQ0FBQ2UsS0FBWCxHQUFtQixFQUFuQjtBQUNELENBUEQ7O0FBU0FsQixjQUFjLENBQUNzQixnQkFBZixDQUFnQyxRQUFoQyxFQUEwQ1Asd0JBQTFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U29ja2V0IH0gZnJvbSBcIi4vc29ja2V0XCI7XG5cbmNvbnN0IGpzU2VuZFRleHRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc1NlbmRUZXh0Rm9ybVwiKTtcbmNvbnN0IGpzU2VuZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzU2VuZFRleHRcIik7XG5jb25zdCBqc1RleHRVbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNDaGF0VWxcIik7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVOZXdNZXNzYWdlID0gKHsgbmlja05hbWUsIG1lc3NhZ2UgfSkgPT4ge1xuICBjcmVhdGVNZXNzYWdlKG5pY2tOYW1lLCBtZXNzYWdlLCBcInJlY2VpdmVkXCIpO1xufTtcblxuY29uc3QgY3JlYXRlTWVzc2FnZSA9IChuaWNrTmFtZSwgbXNnLCBjbGFzc05hbWUpID0+IHtcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGxpLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz0nJHtjbGFzc05hbWV9Jz4ke25pY2tOYW1lfTombmJzcDwvc3Bhbj4ke21zZ31gO1xuICBqc1RleHRVbC5hcHBlbmRDaGlsZChsaSk7XG59O1xuXG5jb25zdCBoYW5kbGVTZW5kVGV4dEZvcm1TdWJtaXQgPSAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHsgdmFsdWUgfSA9IGpzU2VuZFRleHQ7XG4gIGdldFNvY2tldCgpLmVtaXQoXCJtZXNzYWdlXCIsIHsgbWVzc2FnZTogdmFsdWUgfSk7XG4gIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgY3JlYXRlTWVzc2FnZShcIllvdVwiLCB2YWx1ZSwgXCJzZW5kZWRcIik7XG4gIGpzU2VuZFRleHQudmFsdWUgPSBcIlwiO1xufTtcblxuanNTZW5kVGV4dEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVTZW5kVGV4dEZvcm1TdWJtaXQpO1xuIl19
},{"./socket":6}],3:[function(require,module,exports){
"use strict";

require("./socket.js");

require("./login.js");

require("./notifications.js");

require("./chat.js");

require("./canvas.js");

require("./update.js");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMTEyMTExZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9zb2NrZXQuanNcIjtcbmltcG9ydCBcIi4vbG9naW4uanNcIjtcbmltcG9ydCBcIi4vbm90aWZpY2F0aW9ucy5qc1wiO1xuaW1wb3J0IFwiLi9jaGF0LmpzXCI7XG5pbXBvcnQgXCIuL2NhbnZhcy5qc1wiO1xuaW1wb3J0IFwiLi91cGRhdGUuanNcIjtcbiJdfQ==
},{"./canvas.js":1,"./chat.js":2,"./login.js":4,"./notifications.js":5,"./socket.js":6,"./update.js":7}],4:[function(require,module,exports){
"use strict";

var _socket = require("./socket");

var body = document.querySelector("body");
var loginForm = document.getElementById("jsForm");
var loginInput = document.getElementById("jsInput");
var LOGGED_OUT = "loggedOut";
var LOGGED_IN = "loggedIn";
var NICKNAME = "nickName";
var nickName = localStorage.getItem(NICKNAME);

var login = function login(nickName) {
  window.socket = io.connect("/");
  window.socket.emit("setNickname", {
    nickName: nickName
  });
  (0, _socket.initSocket)();
};

var handleLoginFormSubmit = function handleLoginFormSubmit(e) {
  var newNickName = loginInput.value;
  localStorage.setItem(NICKNAME, "".concat(newNickName));
  loginInput.value = "";
  login(newNickName);
};

loginForm.addEventListener("submit", handleLoginFormSubmit);

if (nickName == null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  login(nickName);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2dpbkZvcm0iLCJnZXRFbGVtZW50QnlJZCIsImxvZ2luSW5wdXQiLCJMT0dHRURfT1VUIiwiTE9HR0VEX0lOIiwiTklDS05BTUUiLCJuaWNrTmFtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2dpbiIsIndpbmRvdyIsInNvY2tldCIsImlvIiwiY29ubmVjdCIsImVtaXQiLCJoYW5kbGVMb2dpbkZvcm1TdWJtaXQiLCJlIiwibmV3Tmlja05hbWUiLCJ2YWx1ZSIsInNldEl0ZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQU1BLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLE1BQXZCLENBQWI7QUFDQSxJQUFNQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixRQUF4QixDQUFsQjtBQUNBLElBQU1DLFVBQVUsR0FBR0osUUFBUSxDQUFDRyxjQUFULENBQXdCLFNBQXhCLENBQW5CO0FBRUEsSUFBTUUsVUFBVSxHQUFHLFdBQW5CO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLFVBQWxCO0FBQ0EsSUFBTUMsUUFBUSxHQUFHLFVBQWpCO0FBRUEsSUFBTUMsUUFBUSxHQUFHQyxZQUFZLENBQUNDLE9BQWIsQ0FBcUJILFFBQXJCLENBQWpCOztBQUVBLElBQU1JLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUNILFFBQUQsRUFBYztBQUMxQkksRUFBQUEsTUFBTSxDQUFDQyxNQUFQLEdBQWdCQyxFQUFFLENBQUNDLE9BQUgsQ0FBVyxHQUFYLENBQWhCO0FBQ0FILEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjRyxJQUFkLENBQW1CLGFBQW5CLEVBQWtDO0FBQUVSLElBQUFBLFFBQVEsRUFBRUE7QUFBWixHQUFsQztBQUNBO0FBQ0QsQ0FKRDs7QUFNQSxJQUFNUyxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQUNDLENBQUQsRUFBTztBQUNuQyxNQUFNQyxXQUFXLEdBQUdmLFVBQVUsQ0FBQ2dCLEtBQS9CO0FBQ0FYLEVBQUFBLFlBQVksQ0FBQ1ksT0FBYixDQUFxQmQsUUFBckIsWUFBa0NZLFdBQWxDO0FBQ0FmLEVBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsR0FBbUIsRUFBbkI7QUFDQVQsRUFBQUEsS0FBSyxDQUFDUSxXQUFELENBQUw7QUFDRCxDQUxEOztBQU9BakIsU0FBUyxDQUFDb0IsZ0JBQVYsQ0FBMkIsUUFBM0IsRUFBcUNMLHFCQUFyQzs7QUFFQSxJQUFJVCxRQUFRLElBQUksSUFBaEIsRUFBc0I7QUFDcEJULEVBQUFBLElBQUksQ0FBQ3dCLFNBQUwsR0FBaUJsQixVQUFqQjtBQUNELENBRkQsTUFFTztBQUNMTixFQUFBQSxJQUFJLENBQUN3QixTQUFMLEdBQWlCakIsU0FBakI7QUFDQUssRUFBQUEsS0FBSyxDQUFDSCxRQUFELENBQUw7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRTb2NrZXQgfSBmcm9tIFwiLi9zb2NrZXRcIjtcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuY29uc3QgbG9naW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc0Zvcm1cIik7XG5jb25zdCBsb2dpbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc0lucHV0XCIpO1xuXG5jb25zdCBMT0dHRURfT1VUID0gXCJsb2dnZWRPdXRcIjtcbmNvbnN0IExPR0dFRF9JTiA9IFwibG9nZ2VkSW5cIjtcbmNvbnN0IE5JQ0tOQU1FID0gXCJuaWNrTmFtZVwiO1xuXG5jb25zdCBuaWNrTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKE5JQ0tOQU1FKTtcblxuY29uc3QgbG9naW4gPSAobmlja05hbWUpID0+IHtcbiAgd2luZG93LnNvY2tldCA9IGlvLmNvbm5lY3QoXCIvXCIpO1xuICB3aW5kb3cuc29ja2V0LmVtaXQoXCJzZXROaWNrbmFtZVwiLCB7IG5pY2tOYW1lOiBuaWNrTmFtZSB9KTtcbiAgaW5pdFNvY2tldCgpO1xufTtcblxuY29uc3QgaGFuZGxlTG9naW5Gb3JtU3VibWl0ID0gKGUpID0+IHtcbiAgY29uc3QgbmV3Tmlja05hbWUgPSBsb2dpbklucHV0LnZhbHVlO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShOSUNLTkFNRSwgYCR7bmV3Tmlja05hbWV9YCk7XG4gIGxvZ2luSW5wdXQudmFsdWUgPSBcIlwiO1xuICBsb2dpbihuZXdOaWNrTmFtZSk7XG59O1xuXG5sb2dpbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVMb2dpbkZvcm1TdWJtaXQpO1xuXG5pZiAobmlja05hbWUgPT0gbnVsbCkge1xuICBib2R5LmNsYXNzTmFtZSA9IExPR0dFRF9PVVQ7XG59IGVsc2Uge1xuICBib2R5LmNsYXNzTmFtZSA9IExPR0dFRF9JTjtcbiAgbG9naW4obmlja05hbWUpO1xufVxuIl19
},{"./socket":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUserDisconenct = exports.handleNewUser = void 0;
var notifications = document.getElementById("jsNotifications");

var handleNewUser = function handleNewUser(_ref) {
  var nickName = _ref.nickName;
  sendAlert("".concat(nickName, " has Joined"), "rgb(0, 122, 255)");
};

exports.handleNewUser = handleNewUser;

var handleUserDisconenct = function handleUserDisconenct(_ref2) {
  var nickName = _ref2.nickName;
  sendAlert("".concat(nickName, " has Left"), "rgb(255, 149, 0)");
};

exports.handleUserDisconenct = handleUserDisconenct;

var sendAlert = function sendAlert(text, color) {
  var notification = document.createElement("div");
  var span = document.createElement("span");
  span.innerText = text;
  notification.appendChild(span);
  notification.style.backgroundColor = color;
  notifications.appendChild(notification);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbnMuanMiXSwibmFtZXMiOlsibm90aWZpY2F0aW9ucyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJoYW5kbGVOZXdVc2VyIiwibmlja05hbWUiLCJzZW5kQWxlcnQiLCJoYW5kbGVVc2VyRGlzY29uZW5jdCIsInRleHQiLCJjb2xvciIsIm5vdGlmaWNhdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJzcGFuIiwiaW5uZXJUZXh0IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsYUFBYSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsaUJBQXhCLENBQXRCOztBQUVPLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsT0FBa0I7QUFBQSxNQUFmQyxRQUFlLFFBQWZBLFFBQWU7QUFDN0NDLEVBQUFBLFNBQVMsV0FBSUQsUUFBSixrQkFBMkIsa0JBQTNCLENBQVQ7QUFDRCxDQUZNOzs7O0FBSUEsSUFBTUUsb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUF1QixRQUFrQjtBQUFBLE1BQWZGLFFBQWUsU0FBZkEsUUFBZTtBQUNwREMsRUFBQUEsU0FBUyxXQUFJRCxRQUFKLGdCQUF5QixrQkFBekIsQ0FBVDtBQUNELENBRk07Ozs7QUFJUCxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDRSxJQUFELEVBQU9DLEtBQVAsRUFBaUI7QUFDakMsTUFBTUMsWUFBWSxHQUFHUixRQUFRLENBQUNTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBckI7QUFDQSxNQUFNQyxJQUFJLEdBQUdWLFFBQVEsQ0FBQ1MsYUFBVCxDQUF1QixNQUF2QixDQUFiO0FBQ0FDLEVBQUFBLElBQUksQ0FBQ0MsU0FBTCxHQUFpQkwsSUFBakI7QUFDQUUsRUFBQUEsWUFBWSxDQUFDSSxXQUFiLENBQXlCRixJQUF6QjtBQUNBRixFQUFBQSxZQUFZLENBQUNLLEtBQWIsQ0FBbUJDLGVBQW5CLEdBQXFDUCxLQUFyQztBQUNBUixFQUFBQSxhQUFhLENBQUNhLFdBQWQsQ0FBMEJKLFlBQTFCO0FBQ0QsQ0FQRCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vdGlmaWNhdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzTm90aWZpY2F0aW9uc1wiKTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZU5ld1VzZXIgPSAoeyBuaWNrTmFtZSB9KSA9PiB7XG4gIHNlbmRBbGVydChgJHtuaWNrTmFtZX0gaGFzIEpvaW5lZGAsIFwicmdiKDAsIDEyMiwgMjU1KVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVVc2VyRGlzY29uZW5jdCA9ICh7IG5pY2tOYW1lIH0pID0+IHtcbiAgc2VuZEFsZXJ0KGAke25pY2tOYW1lfSBoYXMgTGVmdGAsIFwicmdiKDI1NSwgMTQ5LCAwKVwiKTtcbn07XG5cbmNvbnN0IHNlbmRBbGVydCA9ICh0ZXh0LCBjb2xvcikgPT4ge1xuICBjb25zdCBub3RpZmljYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHNwYW4uaW5uZXJUZXh0ID0gdGV4dDtcbiAgbm90aWZpY2F0aW9uLmFwcGVuZENoaWxkKHNwYW4pO1xuICBub3RpZmljYXRpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gIG5vdGlmaWNhdGlvbnMuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uKTtcbn07XG4iXX0=
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSocket = exports.getSocket = void 0;

var _notifications = require("./notifications");

var _chat = require("./chat.js");

var _canvas = require("./canvas.js");

var _update = require("./update");

var getSocket = function getSocket() {
  return window.socket;
};

exports.getSocket = getSocket;

var initSocket = function initSocket() {
  var socket = getSocket();
  socket.on("newUser", _notifications.handleNewUser);
  socket.on("userDisconnect", _notifications.handleUserDisconenct);
  socket.on("newMessage", _chat.handleNewMessage);
  socket.on("mouseMove", _canvas.handleMouseMove);
  socket.on("mouseDown", _canvas.handleMouseDown);
  socket.on("fillPaintBtnClick", _canvas.handleFillPaintBtnClick);
  socket.on("resetBtnClick", _canvas.handleResetBtnClickForSocket);
  socket.on("update", _update.handleUpdate);
};

exports.initSocket = initSocket;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2tldC5qcyJdLCJuYW1lcyI6WyJnZXRTb2NrZXQiLCJ3aW5kb3ciLCJzb2NrZXQiLCJpbml0U29ja2V0Iiwib24iLCJoYW5kbGVOZXdVc2VyIiwiaGFuZGxlVXNlckRpc2NvbmVuY3QiLCJoYW5kbGVOZXdNZXNzYWdlIiwiaGFuZGxlTW91c2VNb3ZlIiwiaGFuZGxlTW91c2VEb3duIiwiaGFuZGxlRmlsbFBhaW50QnRuQ2xpY2siLCJoYW5kbGVSZXNldEJ0bkNsaWNrRm9yU29ja2V0IiwiaGFuZGxlVXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBT0E7O0FBQ08sSUFBTUEsU0FBUyxHQUFHLFNBQVpBLFNBQVk7QUFBQSxTQUFNQyxNQUFNLENBQUNDLE1BQWI7QUFBQSxDQUFsQjs7OztBQUVBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQU07QUFDOUIsTUFBTUQsTUFBTSxHQUFHRixTQUFTLEVBQXhCO0FBQ0FFLEVBQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVLFNBQVYsRUFBcUJDLDRCQUFyQjtBQUNBSCxFQUFBQSxNQUFNLENBQUNFLEVBQVAsQ0FBVSxnQkFBVixFQUE0QkUsbUNBQTVCO0FBQ0FKLEVBQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVLFlBQVYsRUFBd0JHLHNCQUF4QjtBQUNBTCxFQUFBQSxNQUFNLENBQUNFLEVBQVAsQ0FBVSxXQUFWLEVBQXVCSSx1QkFBdkI7QUFDQU4sRUFBQUEsTUFBTSxDQUFDRSxFQUFQLENBQVUsV0FBVixFQUF1QkssdUJBQXZCO0FBQ0FQLEVBQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVLG1CQUFWLEVBQStCTSwrQkFBL0I7QUFDQVIsRUFBQUEsTUFBTSxDQUFDRSxFQUFQLENBQVUsZUFBVixFQUEyQk8sb0NBQTNCO0FBQ0FULEVBQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVLFFBQVYsRUFBb0JRLG9CQUFwQjtBQUNELENBVk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVOZXdVc2VyLCBoYW5kbGVVc2VyRGlzY29uZW5jdCB9IGZyb20gXCIuL25vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IGhhbmRsZU5ld01lc3NhZ2UgfSBmcm9tIFwiLi9jaGF0LmpzXCI7XG5pbXBvcnQge1xuICBoYW5kbGVNb3VzZU1vdmUsXG4gIGhhbmRsZU1vdXNlRG93bixcbiAgaGFuZGxlRmlsbFBhaW50QnRuQ2xpY2ssXG4gIGhhbmRsZVJlc2V0QnRuQ2xpY2tGb3JTb2NrZXQsXG59IGZyb20gXCIuL2NhbnZhcy5qc1wiO1xuXG5pbXBvcnQgeyBoYW5kbGVVcGRhdGUgfSBmcm9tIFwiLi91cGRhdGVcIjtcbmV4cG9ydCBjb25zdCBnZXRTb2NrZXQgPSAoKSA9PiB3aW5kb3cuc29ja2V0O1xuXG5leHBvcnQgY29uc3QgaW5pdFNvY2tldCA9ICgpID0+IHtcbiAgY29uc3Qgc29ja2V0ID0gZ2V0U29ja2V0KCk7XG4gIHNvY2tldC5vbihcIm5ld1VzZXJcIiwgaGFuZGxlTmV3VXNlcik7XG4gIHNvY2tldC5vbihcInVzZXJEaXNjb25uZWN0XCIsIGhhbmRsZVVzZXJEaXNjb25lbmN0KTtcbiAgc29ja2V0Lm9uKFwibmV3TWVzc2FnZVwiLCBoYW5kbGVOZXdNZXNzYWdlKTtcbiAgc29ja2V0Lm9uKFwibW91c2VNb3ZlXCIsIGhhbmRsZU1vdXNlTW92ZSk7XG4gIHNvY2tldC5vbihcIm1vdXNlRG93blwiLCBoYW5kbGVNb3VzZURvd24pO1xuICBzb2NrZXQub24oXCJmaWxsUGFpbnRCdG5DbGlja1wiLCBoYW5kbGVGaWxsUGFpbnRCdG5DbGljayk7XG4gIHNvY2tldC5vbihcInJlc2V0QnRuQ2xpY2tcIiwgaGFuZGxlUmVzZXRCdG5DbGlja0ZvclNvY2tldCk7XG4gIHNvY2tldC5vbihcInVwZGF0ZVwiLCBoYW5kbGVVcGRhdGUpO1xufTtcbiJdfQ==
},{"./canvas.js":1,"./chat.js":2,"./notifications":5,"./update":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUpdate = void 0;
var board = document.getElementById("jsBoard");

var handleUpdate = function handleUpdate(_ref) {
  var sockets = _ref.sockets;
  board.innerHTML = "";
  sockets.forEach(function (socket) {
    var boardElement = document.createElement("div");
    boardElement.innerText = "".concat(socket.nickName, ":").concat(socket.points);
    board.appendChild(boardElement);
  });
};

exports.handleUpdate = handleUpdate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJib2FyZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJoYW5kbGVVcGRhdGUiLCJzb2NrZXRzIiwiaW5uZXJIVE1MIiwiZm9yRWFjaCIsInNvY2tldCIsImJvYXJkRWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJuaWNrTmFtZSIsInBvaW50cyIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixDQUFkOztBQUVPLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLE9BQWlCO0FBQUEsTUFBZEMsT0FBYyxRQUFkQSxPQUFjO0FBQzNDSixFQUFBQSxLQUFLLENBQUNLLFNBQU4sR0FBa0IsRUFBbEI7QUFDQUQsRUFBQUEsT0FBTyxDQUFDRSxPQUFSLENBQWdCLFVBQUNDLE1BQUQsRUFBWTtBQUMxQixRQUFJQyxZQUFZLEdBQUdQLFFBQVEsQ0FBQ1EsYUFBVCxDQUF1QixLQUF2QixDQUFuQjtBQUNBRCxJQUFBQSxZQUFZLENBQUNFLFNBQWIsYUFBNEJILE1BQU0sQ0FBQ0ksUUFBbkMsY0FBK0NKLE1BQU0sQ0FBQ0ssTUFBdEQ7QUFDQVosSUFBQUEsS0FBSyxDQUFDYSxXQUFOLENBQWtCTCxZQUFsQjtBQUNELEdBSkQ7QUFLRCxDQVBNIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzQm9hcmRcIik7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVVcGRhdGUgPSAoeyBzb2NrZXRzIH0pID0+IHtcbiAgYm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgc29ja2V0cy5mb3JFYWNoKChzb2NrZXQpID0+IHtcbiAgICBsZXQgYm9hcmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib2FyZEVsZW1lbnQuaW5uZXJUZXh0ID0gYCR7c29ja2V0Lm5pY2tOYW1lfToke3NvY2tldC5wb2ludHN9YDtcbiAgICBib2FyZC5hcHBlbmRDaGlsZChib2FyZEVsZW1lbnQpO1xuICB9KTtcbn07XG4iXX0=
},{}]},{},[3])