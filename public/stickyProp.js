let minSticky = document.querySelector(".minimize-sticky");
let closeSticky = document.querySelector(".close-sticky");
let createSticky = document.querySelector(".sticky");
let pen=document.querySelector(".pen");
let eraser=document.querySelector(".eraser");
createSticky.addEventListener("click", (e) => {
    let cont = document.createElement('div');
    cont.setAttribute("class", "sticky-cont");
    cont.innerHTML = `
        <div class="sticky-head">
            <div class="minimize-sticky"></div>
            <div class="close-sticky"></div>
        </div>
        <div class="sticky-write">
        <textarea spellcheck="false" class="sticky-write" ></textarea>
        </div>
    `;
    //draggable feature
    document.body.appendChild(cont);
    let green=cont.querySelector(".minimize-sticky");
    let toHide=cont.querySelector(".sticky-write");
    minFunction(green,toHide);
    let red=cont.querySelector(".close-sticky");
    removeFunction(red,cont);
    cont.onmousedown = function(event){
        drag(cont,event);
    }
    cont.ondragstart = function () {
        return false;
    };
})
function drag(cont,event){

    let shiftX = event.clientX - cont.getBoundingClientRect().left;
    let shiftY = event.clientY - cont.getBoundingClientRect().top;

    cont.style.position = 'absolute';
    cont.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the cont at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        cont.style.left = pageX - shiftX + 'px';
        cont.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the cont on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the cont, remove unneeded handlers
    cont.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        cont.onmouseup = null;
    };
    
}
function minFunction(green,toHide){
    green.addEventListener("click",(e)=>{
        if(getComputedStyle(toHide).display==="block"){
            toHide.style.display="none";
        }else{
            toHide.style.display="block";
        }
    })
}
function removeFunction(red,cont){
    red.addEventListener("click",()=>{
        if(getComputedStyle(cont).display==="block"){
            cont.remove();
        }
    })
}