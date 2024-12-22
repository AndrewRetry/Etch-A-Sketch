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

// event delegation for coloring squares
paletteArea.addEventListener("mouseover", (event) => {
    if (isDrawing && event.target.classList.contains("squares")) {
        event.target.style.backgroundColor = colorPicked;
    }
});

// changes background color of squares, trigerred w/ event handler
let colorInput = document.querySelector("#colorPicker");
let colorPicked = "black"
colorInput.addEventListener("change", () => {
    colorPicked = colorInput.value;
});

function setBackgroundColor() {
    this.style.backgroundColor = colorPicked
};


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