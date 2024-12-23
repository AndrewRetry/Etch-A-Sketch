let squareQuantitySlider = document.querySelector("#slider");
let sliderValueString = document.querySelector("#sliderValue");
let squaresPerSide = squareQuantitySlider.value; //default value

sliderValueString.textContent = `Resolution : ${squaresPerSide} x ${squaresPerSide}`

squareQuantitySlider.addEventListener("change", ()=> {
    squaresPerSide = squareQuantitySlider.value;
    // slider display value
    sliderValueString.textContent = `Resolution : ${squaresPerSide} x ${squaresPerSide}`;
    createSquares();
});

const PALETTESIZE = 800;
const paletteArea = document.querySelector('#palette');
paletteArea.style.width = `${PALETTESIZE}px`;
paletteArea.style.height = `${PALETTESIZE}px`;

// check whether drawing mode or not
let isDrawing = false;
let isDrawingIndicator = document.querySelector("#isDrawingIndicator")
isDrawingIndicator.innerHTML = "Press the <strong>R</strong> key to draw!"
document.addEventListener("keyup", (event) => {
    if (event.key === "R" || event.key === "r") {
        if (!isDrawing) {
            isDrawing = true; 
            isDrawingIndicator.innerHTML = "You can draw now!";
        } else {
            isDrawing = false;
            isDrawingIndicator.innerHTML = "Press the <strong>R</strong> key to draw!";
        };
    };
});

// assign square to another background color
function colorSquare(target) {
    if (target.classList.contains("squares")) {
        target.style.backgroundColor = colorPicked
    };
};

// event delegation for coloring squares
paletteArea.addEventListener("mouseover", (event) => {
    if (isDrawing && event.target.classList.contains("squares")) {
        colorSquare(event.target);
    };
});

// changes selected color according to colorPicker, trigerred w/ event handler
let colorInput = document.querySelector("#colorPicker");
let colorPicked = "black";
colorInput.addEventListener("change", () => {
    colorPicked = colorInput.value;
});

// Substract 2 to ensure no overflow
function createSquares() {
    paletteArea.innerHTML = "";

    for (let i = 0; i < (squaresPerSide ** 2); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.style.width = `${Math.floor(PALETTESIZE / squaresPerSide) -2}px`;
        gridSquare.style.height = `${Math.floor(PALETTESIZE / squaresPerSide) -2}px`;
        gridSquare.classList.add("squares");
        paletteArea.appendChild(gridSquare);
    };
};
createSquares();

// erases whole palette
function resetPalette() {
    const squares = document.querySelectorAll(".squares"); // [square-1, square-2, ...square-n]
    squares.forEach(square => {
        square.style.backgroundColor = "white";
    });
}

// event handler for resetBtn -> MAKE SURE RUN ONLY AFTER INITIAL SQUARES ARE CREATED
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", resetPalette);

let actionText = document.querySelector(".randomColorContainer p")
// event handler for eraserBtn
const eraserBtn = document.querySelector("#eraserBtn")
eraserBtn.addEventListener("click", () =>{
    actionText.textContent = "Erasing...";
    colorPicked = "#ffffff";
    colorInput.value = colorPicked;
});

//event handler for randomizeBtn
const randomColorBtn = document.querySelector("#randomBtn");
const colorDisplayRandom = document.querySelector(".bubble");
const randomizeDigits = (min, max) => (min + Math.floor(Math.random() * (max - min + 1)));

//initialize random rgb values
let isRandomized = false;
const buttonContainer = document.querySelector(".flex-container");

randomColorBtn.addEventListener("click", (event)=>{
    if (isRandomized === false) {
        isRandomized = true;
        actionText.textContent = "Random Colors";
        randomColorBtn.style.backgroundColor = "#0056b3";
        eraserBtn.style.backgroundColor = containerColor;
    } else {
        isRandomized = false;
        actionText.textContent = "";
        randomColorBtn.style.backgroundColor = "gray";
    };

    function randomizeRGB() {
        colorR = randomizeDigits(0,255);
        colorG = randomizeDigits(0,255);
        colorB = randomizeDigits(0,255);
        valRGB = `rgb(${colorR}, ${colorG}, ${colorB})`;
        return valRGB;
    }
    paletteArea.addEventListener("mouseover", (event) => {
        if (isDrawing && isRandomized && event.target.classList.contains("squares")) {
            colorPicked = randomizeRGB();
            colorSquare(event.target);
            colorDisplayRandom.style.backgroundColor = colorPicked;
        };
    });
});
