let hamBtn = document.querySelector(".ham-button");
let cont = document.querySelector(".cont");
let penTools = document.querySelector(".pen-tools");
let eraserTools = document.querySelector(".eraser-tools");
let download = document.querySelector(".download");
let upload = document.querySelector(".upload");
let penProp = false;
let eraserProp = false;
let undo=document.querySelector(".undo");
let redo=document.querySelector(".redo");
hamBtn.addEventListener("click", () => {
    if (hamBtn.children[0].classList.contains("fa-bars")) {
        hamBtn.children[0].classList.remove("fa-bars");
        hamBtn.children[0].classList.add("fa-times");
        if (getComputedStyle(penTools).display === "flex") {
            penTools.style.display = "none";
            penProp = false;
        }
        if (getComputedStyle(eraserTools).display === "flex") {
            eraserTools.style.display = "none";
            eraserProp = false;
        }
        cont.style.display = "none";
    } else {
        hamBtn.children[0].classList.remove("fa-times");
        hamBtn.children[0].classList.add("fa-bars");
        cont.style.display = "flex";
    }
})
pen.addEventListener("click", () => {
    penProp = !penProp;
    if (penProp) {
        penTools.style.display = "flex";
    } else {
        penTools.style.display = "none";
    }
})
eraser.addEventListener("click", () => {
    eraserProp = !eraserProp;
    if (eraserProp) {
        eraserTools.style.display = "flex";
    } else {
        eraserTools.style.display = "none";
    }
})
download.addEventListener("click", () => {
    console.log("Hi");
    let url = canvas.toDataURL();
    let a = document.createElement('a');
    a.href = url;
    a.download = "image.jpg";
    a.click();
})
upload.addEventListener("click", () => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let cont = document.createElement('div');
        cont.setAttribute("class", "sticky-cont");
        cont.innerHTML = `
        <div class="sticky-head">
            <div class="minimize-sticky"></div>
            <div class="close-sticky"></div>
        </div>
        <div class="sticky-write">
            <img src="${url}" class="img"/>
        </div>
    `;

        document.body.appendChild(cont);
        let green = cont.querySelector(".minimize-sticky");
        let toHide = cont.querySelector(".sticky-write");
        minFunction(green, toHide);
        let red = cont.querySelector(".close-sticky");
        removeFunction(red, cont);
        cont.onmousedown = function (event) {
            drag(cont, event);
        }
        cont.ondragstart = function () {
            return false;
        };
    })
})
undo.addEventListener("click",()=>{
    if(idx>0){
        idx--;
    }
    let data={
        idx:idx,
        undoRedo
    }
    socket.emit("undoredoDisplay",data);
    // undoredoDisplay(data);
})
redo.addEventListener("click",()=>{
    if(idx<undoRedo.length-1){
        idx++;
    }
    let data={
        idx:idx,
        undoRedo
    }
    socket.emit("undoredoDisplay",data);
    // undoredoDisplay(data);

})
function undoredoDisplay(trackObj){
    idx=trackObj.idx;
    undoRedo=trackObj.undoRedo;
    let url=undoRedo[idx];
    let img=new Image();
    img.src=url;
    img.onload=(e)=>{
        console.log(idx);
        tool.drawImage(img,0,0,canvas.width,canvas.height); 
    }
}
socket.on("undoredoDisplay",(data)=>{
    undoredoDisplay(data);
})