import { getSocket } from "./socket";

const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fillandPaintBtn = document.getElementById("jsFillBtn");
const saveBtn = document.getElementById("jsSaveBtn");
const body = document.getElementById("body");
const resetBtn = document.getElementById("jsResetBtn");

const DEFAULT_COLOR = "black";
const CANVAS_SIZE = 550;

const ctx = canvas.getContext("2d");

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};
const lineTo = (x, y) => {
  ctx.lineTo(x, y);
  ctx.stroke();
};
const moveTo = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

function onMouseMove(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  if (painting) {
    getSocket().emit("mouseMoved", {
      x: x,
      y: y,
      color: ctx.strokeStyle,
      brushSize: ctx.lineWidth,
    });
    lineTo(x, y);
  } else {
  }
}
function onMouseDown(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  getSocket().emit("mouseDowned", { x: x, y: y, color: ctx.fillStyle });
  startPainting();
  moveTo(x, y);
}

function onMouseUp(event) {
  stopPainting();
}

ctx.fillRect(30, 50, 20, 100);

function changeColor(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = `${color}`;
  ctx.fillStyle = `${color}`;
}

function handleRangeValue(e) {
  const value = e.target.value;
  ctx.lineWidth = value;
}

function resetClick() {
  Array.from(colors).forEach((color) => {
    color.classList.remove("clicked");
  });
}

function addClickedMotion(e) {
  resetClick();
  e.target.classList.add("clicked");
}

const fillorPaintFunction = (color) => {
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
  getSocket().emit("fillPaintBtnClicked", { color: ctx.fillStyle });
  fillorPaintFunction();
}

function handleCanvasClick(color) {
  const currentFillColor = ctx.fillStyle;
  console.log(`${currentFillColor} and ${color}`);
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
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "Your Painting";
  document.body.appendChild(link);
  link.click();
}

function handleResetBtnClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
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

Array.from(colors).forEach((color) => {
  const COLOR = color;
  COLOR.addEventListener("click", changeColor),
    COLOR.addEventListener("click", addClickedMotion);
});

export const handleMouseMove = ({ x, y, color, brushSize }) => {
  const currentColor = ctx.strokeStyle;
  ctx.strokeStyle = color;
  ctx.lineWidth = brushSize;
  lineTo(x, y);
  ctx.strokeStyle = currentColor;
};

export const handleMouseDown = ({ x, y, color }) => {
  moveTo(x, y);
  handleCanvasClick(color);
};

export const handleFillPaintBtnClick = ({ color }) => {
  fillorPaintFunction(color);
};
