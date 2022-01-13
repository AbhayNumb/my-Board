let penColor = "black";
let red = document.querySelector(".red");
let blue = document.querySelector(".blue");
let black = document.querySelector(".black");

red.addEventListener("click", () => {
  penColor = "red";
})
blue.addEventListener("click", () => {
  penColor = "blue";
})
black.addEventListener("click", () => {
  penColor = "black";
})
let lineWidth = 6;
let eraserWidth = document.querySelector(".eraser-width");
let penWidth = document.querySelector(".pen-width");
penWidth.addEventListener("change", () => {
  lineWidth = penWidth.value;
})
// When true, moving the mouse draws on the canvas
let isDrawing = false;
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let tool = canvas.getContext('2d');
tool.fillStyle = "white";
tool.fillRect(0, 0, canvas.width, canvas.height);
let undoRedo = [];
let idx = 1;
undoRedo[0]=canvas.toDataURL();
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  let data = {
    x: e.clientX,
    y: e.clientY
  }
  // beginPath(data);
  socket.emit("beginPath",data);
});


canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    let data = {
      x: e.clientX,
      y: e.clientY,
      color: penColor,
      width: lineWidth
    }
    socket.emit("drawStroke",data);
    // drawStroke(data);
  }
});


canvas.addEventListener('mouseup', e => {
  isDrawing = false;
  let url = canvas.toDataURL();
  undoRedo.push(url);
  idx = undoRedo.length - 1;
});

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
  tool.strokeStyle = strokeObj.color;
  tool.lineWidth = strokeObj.width;
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.stroke();
}

eraser.addEventListener("click", () => {
  penColor = "white";
})
eraserWidth.addEventListener("change", () => {
  console.log(eraserWidth.value);
  lineWidth = eraserWidth.value;
})
pen.addEventListener("click", () => {
  penColor = "black";
  lineWidth = 6;
})
socket.on("beginPath",(data)=>{
  beginPath(data);
})
socket.on("drawStroke",(data)=>{
  drawStroke(data);
})