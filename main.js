let squareRows = 16;
let squareCols = 16;
const PALETTESIZE = 800;

const paletteArea = document.querySelector('#palette');
paletteArea.style.width = `${PALETTESIZE}px`;
paletteArea.style.height = `${PALETTESIZE}px`;
console.log(squareCols)
// Substract 2 to ensure no overflow
function createSquares() {
    
    for (let i = 0; i < (squareCols * squareRows); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.style.width = `${(PALETTESIZE / squareCols) - 2}px`;
        gridSquare.style.height = `${(PALETTESIZE / squareRows) - 2}px`;
        gridSquare.classList.add("square");
        paletteArea.appendChild(gridSquare);
    }
}

createSquares()