const container = document.querySelector(".grid");
const slider = document.querySelector("#sliderID");
const sliderContainerDimensions=640;

//color picker
const colorPicker=document.querySelector("#colorPicker");
//event listener watching for color change in color picker
colorPicker.addEventListener("input", updateColor, false);
let penColor=colorPicker.value;
let rainbowClicked=false;
let eraserClicked=false;

//initial grid
for(let i=0;i<slider.value*slider.value;i++){
    let div = document.createElement("div");
    div.classList.add("grid-child");
    container.appendChild(div);
    div.addEventListener('mouseover', changeColor);
}

//clean
const clean=document.querySelector("#clean");
clean.addEventListener('click', clearGrid, false);

//eraser
const eraser = document.querySelector("#eraser");
eraser.addEventListener('click', changeColorToWhite, false);

//rainbow
const rainbow = document.querySelector("#rainbow");
rainbow.addEventListener('click', e => {
    if(rainbowClicked==false){
        e.target.setAttribute('style','background:red');
        rainbowClicked=true;
    }
    else{
        rainbowClicked=false;
        e.target.removeAttribute('style');
    }
}, false);

//change size of grid
slider.oninput = function() {
    container.textContent="";
    let childDimensions = sliderContainerDimensions/slider.value;
    for(let i=0;i<slider.value*slider.value;i++){
        let div = document.createElement("div");
        div.classList.add("grid-child");
        div.style.width = `${childDimensions}px`;
        div.style.height = `${childDimensions}px`;
        container.appendChild(div);

        div.addEventListener('mouseover', changeColor);
    }
}

//check if left mouse button is clicked
let mouseDown = false
document.body.onmousedown = function() { mouseDown = true } 
document.body.onmouseup = function() { mouseDown = false }

//update color to fill
function updateColor(e){
    penColor=e.target.value;
}

function changeColor(e) {
    if (!mouseDown && e.type!="click") return;

    //change to rainbow color
    if(rainbowClicked==true){
        e.target.style.background=`#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    else{ //or stay same
        e.target.style.background=penColor;
    }
}

//clear grid event
function clearGrid(e){
    let gridDivs = document.querySelectorAll(".grid-child");
    
    gridDivs.forEach(div => {
        div.style.background="#FFFFFF";
    });
}

//eraser event
function changeColorToWhite(e){
    if(eraserClicked==false){
        eraserClicked=true;
        penColor="#FFFFFF";
    }
    else{
        penColor=colorPicker.value;
    }
}