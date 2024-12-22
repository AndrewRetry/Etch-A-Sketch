let squaresPerSide = 16; //default value
let squareQuantitySlider = document.querySelector("#squareQuantity");
squareQuantitySlider.addEventListener("change", ()=> {
    squaresPerSide = squareQuantitySlider.value;
    createSquares();
});

const PALETTESIZE = 800;
const paletteArea = document.querySelector('#palette');
paletteArea.style.width = `${PALETTESIZE}px`;
paletteArea.style.height = `${PALETTESIZE}px`;

// check whether drawing mode or not
let isDrawing = false;

paletteArea.addEventListener("mousedown", (event) => {
    isDrawing = true;
});

document.addEventListener("mouseup", () => {
    isDrawing = false;
});

// assign square to another background color
function colorSquare(target) {
    if (target.classList.contains("squares")) {
        target.style.backgroundColor = colorPicked
    }
}
// event delegation for coloring squares
paletteArea.addEventListener("mouseover", (event) => {
    if (isDrawing && event.target.classList.contains("squares")) {
        colorSquare(event.target)
    }
});

// changes selected color according to colorPicker, trigerred w/ event handler
let colorInput = document.querySelector("#colorPicker");
let colorPicked = "black"
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
    const squares = document.querySelectorAll(".squares") // [square-1, square-2, ...square-n]
    squares.forEach(square => {
        square.style.backgroundColor = "white"
    });
}

// event handler for resetBtn -> MAKE SURE RUN ONLY AFTER INITIAL SQUARES ARE CREATED
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", resetPalette);

// event handler for eraserBtn
const eraserBtn = document.querySelector("#eraserBtn")
eraserBtn.addEventListener("click", () =>{
    colorPicked = "#ffffff"
    colorInput.value = colorPicked
});

//event handler for randomizeBtn
const randomColorBtn = document.querySelector("#randomBtn")
const colorDisplayRandom = document.querySelector(".bubble")
const randomizeDigits = (min, max) => (min + Math.floor(Math.random() * (max - min + 1)));
//initialize random rgb values
randomColorBtn.addEventListener("click", ()=>{
    function randomizeRGB() {
        colorR = randomizeDigits(0,255)
        colorG = randomizeDigits(0,255)
        colorB = randomizeDigits(0,255)
        valRGB = `rgb(${colorR}, ${colorG}, ${colorB})`
        return valRGB
    }
    paletteArea.addEventListener("mouseover", (event) => {
        if (isDrawing && event.target.classList.contains("squares")) {
            colorPicked = randomizeRGB()
            colorSquare(event.target)
            colorDisplayRandom.style.backgroundColor = colorPicked
        }
    });
});

