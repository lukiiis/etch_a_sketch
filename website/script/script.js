const container = document.querySelector(".grid");

for(let i=0;i<16*16;i++){
    let div = document.createElement("div");
    div.classList.add("grid-child");
    container.appendChild(div);
}

let mouseDown = false
document.body.onmousedown = function() {
    mouseDown = true
} 
document.body.onmouseup = function() {
    mouseDown = false
} 

const sketchDivs = document.querySelectorAll(".grid-child");

sketchDivs.forEach(div => {
    div.addEventListener('mouseover', changeColor);
})

function changeColor(e) {
    if (!mouseDown) return;

    e.target.setAttribute('style','background:red');
}