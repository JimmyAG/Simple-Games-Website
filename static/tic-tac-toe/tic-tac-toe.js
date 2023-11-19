//another way to do it using grid. 
//but I like the freedom that comes with building everything from scratch!

//buttons
const undo = document.getElementById("undo");
const newGame = document.getElementById("new-game");


class ticTacToe  {
    //constructor function
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.moves = new Set();
        this.currentPlayer = "x";
        this.gameWon = false;
        this.map = {}
    }

    //Creates inner borders
    addBorder(row, column, cell) {
        if (row == 0 || row == 1) {
            cell.style.borderBottom = "solid black";
        }
        if (column == 0 || column == 1) {
            cell.style.borderRight = "solid black";
        } 
    }
        
    //This changes the current player from x to o and vice versa
    changePlayer() {
        if (this.currentPlayer == "x") {
            this.currentPlayer = "o";

        } else if (this.currentPlayer == "o"){
            this.currentPlayer = "x";
        }
    }


    //Handles the clicking of cells
    click(cell) {
        cell.style.opacity = "100%";
        this.moves.add(cell.id);

        if (cell.style.background){
            //Do nothing!!;
        } else {
            if (this.currentPlayer === "o") {
                cell.style.background = "url(static/tic-tac-toe/o.png) no-repeat";
                cell.style.backgroundSize = "70%";
                cell.style.backgroundPosition = "center";
                cell.style.backgroundopacity = "100%";
                this.changePlayer();

            } else if (this.currentPlayer === "x") {
                cell.style.background = "url(static/tic-tac-toe/x.png) no-repeat";
                cell.style.backgroundSize = "70%";
                cell.style.backgroundPosition = "center";
                cell.style.opacity = "100%";
                this.changePlayer();
            }
        }
    }

    //Creates the whole board of Tic Tac Toe and adds the event listeners and other important attributes
    create() {
        const grid = document.getElementById("grid");

        for (let row = 0; row < this.rows; row++) {
            const newRow = document.createElement("div");
            newRow.className = `row${row}`;
            newRow.style.display = "flex";
            grid.appendChild(newRow);
            
            for (let column = 0; column < this.columns; column++) {
                const cell = document.createElement("div");
                cell.style.width = "90px";
                cell.style.height = "90px";
                cell.id = `${row}, ${column}`;

                cell.addEventListener("mouseover", () => {this.hover(cell)});
                cell.addEventListener("mouseleave", () => {this.leave(cell)});
                cell.addEventListener("click", () => {this.click(cell)});
                this.addBorder(row, column, cell);
                newRow.appendChild(cell);
            }
        }  
    }

    //This function adds a class which has :hover {} properties that creates the effect of hovering to let user know what will be placed in the cell
    hover(cell) {        
        if (this.currentPlayer == "x") {
            cell.className = "cell";
            

        } else if (this.currentPlayer == "o"){
            cell.className = "cell2";
        }
    }

    //This function removes the class that was added on hovering by the hover function
    leave(cell) {
        if (this.currentPlayer == "x") {
            cell.classList.toggle("cell");

        } else if (this.currentPlayer == "o"){
            cell.classList.toggle("cell2");
        }
    }

    //undo last move by searching for last element of the set
    undoMove() {
        function getLastValue(set){
            let value = "";
            for(value of set);

            return value;
        }

        if (this.moves.size > 0) {
            let last = getLastValue(this.moves);
            let element = document.getElementById(last);
            element.style.background = "";
            element.style.opacity = "";
            this.moves.delete(last);
            this.changePlayer();
        } 
    }
}


const game = new ticTacToe(3, 3);
game.create();

let grid = document.getElementById("grid");


undo.addEventListener("click", call = () => {game.undoMove()});
newGame.addEventListener("click", call = () => {grid.innerHTML="", game.create()});

