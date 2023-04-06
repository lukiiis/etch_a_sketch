const container = document.querySelector(".grid");
const slider = document.querySelector("#sliderID");
const sliderContainerDimensions=640;

//color picker
const colorPicker=document.querySelector("#colorPicker");
//event listener watching for color change in color picker
colorPicker.addEventListener("input", updateColor, false);
let penColor=colorPicker.value;
//indicates if the corresponding buttons were pressed
let rainbowClicked=false;
let eraserClicked=false;

//initial grid
function initiateGrid(sliderValue){
    for(let i=0;i<Math.pow(sliderValue,2);i++){
        let div = document.createElement("div");
        div.classList.add("grid-child");
        container.appendChild(div);
        div.addEventListener('mouseover', changeColor);
    }
}

initiateGrid(slider.value);

//clean
const clean=document.querySelector("#clean");
clean.addEventListener('click', clearGrid, false);

//eraser
const eraser = document.querySelector("#eraser");
eraser.addEventListener('click', changeColorToWhite, false);

//rainbow
const rainbow = document.querySelector("#rainbow");
rainbow.addEventListener('click', changeColorToRainbow, false);

//change size of grid
slider.oninput = function() {
    //deletes previous childs
    container.textContent="";
    //child containers dimensions
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

//main event handler 
function changeColor(e) {
    if (!mouseDown && e.type!="click") return;

    //change to rainbow color
    if(rainbowClicked==true){
        e.target.style.background=`#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    //change to eraser
    else if(eraserClicked==true){
        e.target.style.background="#FFFFFF";
    }
    //or stay same
    else{
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
        e.target.setAttribute('style','background:red');
    }
    else{
        eraserClicked=false;
        e.target.removeAttribute('style');
    }
}

function changeColorToRainbow(e){
    if(rainbowClicked==false){
        rainbowClicked=true;
        e.target.setAttribute('style','background:red');
    }
    else{
        rainbowClicked=false;
        e.target.removeAttribute('style');
    }
}