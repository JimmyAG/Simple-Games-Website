const beginner = document.getElementById("beginner");
const intermediate = document.getElementById("intermediate");
const expert = document.getElementById("expert");


let score = 0;
let gameWon = false;

class board {
    //constructor function
    constructor(rows, columns, mines) {
        this.rows = rows;
        this.columns = columns;
        this.minesCount = mines;
        this.numbers = {};
        this.mines = new Set();
        this.visited = new Set();
        this.flaggedCells = new Set();
        this.emptyCells = new Set();
        this.blown = false;
        this.clickable = true;
        this.tilesToUncover = (this.rows * this.columns)-this.minesCount;
    
    }

    // This checks if the cell is on the grid and if it has a mine it returns 1 if so
    checkTile(row, column) {
        if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
            return 0;
        }
        if (this.mines.has(`${row},${column}`)) {
            return 1;
        }
        return 0;
    }


    //This counts the mines
    countMines() {
        let count = 0;
        for (let row = 0; row < this.rows; row++){
            for (let column = 0; column < this.columns; column++){
                count += this.checkTile(row - 1, column -1); 
                count += this.checkTile(row - 1, column);
                count += this.checkTile(row - 1, column +1);

                count += this.checkTile(row, column -1);
                count += this.checkTile(row, column +1);

                count += this.checkTile(row + 1, column -1);
                count += this.checkTile(row + 1, column);
                count += this.checkTile(row + 1, column +1);

                if (count > 0) {
                    this.numbers[`${row},${column}`] = count;
                    count = 0;
                }
            }
        }
    }

    //This adds a paragraph contining the count of the mines in the cells around it
    addNumbers(row, column) {
        let cell = document.getElementById(`${row},${column}`);
        cell.style.backgroundColor = "white";
        const number = document.createElement("p");
        number.className = `n${this.numbers[`${row},${column}`]}`;
        number.innerText = `${this.numbers[`${row},${column}`]}`;
        cell.appendChild(number);
    }


    //This function checks and uncovers all the cells around the clicked cell if empty
    checkFurther(row, column) {
        let cell = document.getElementById(`${row},${column}`);

        if (row < 0 || row >= this.rows || column < 0 || column >= this.columns || this.visited.has(`${row},${column}`) || this.flaggedCells.has(`${row},${column}`)) {
            return 0;

        } else if (this.numbers[`${row},${column}`] != undefined && this.mines.has(cell.id) == false) {
            this.tilesToUncover -= 1;
            this.visited.add(`${row},${column}`);
            this.addNumbers(row, column);
            cell.style.backgroundColor = "white";

        } else {
            this.tilesToUncover -= 1;
            this.emptyCells.add(`${row},${column}`);
            this.visited.add(`${row},${column}`);

            cell.style.backgroundColor = "white";

            this.checkFurther(row-1, column-1);
            this.checkFurther(row-1, column);
            this.checkFurther(row-1, column+1);

            this.checkFurther(row, column-1);
            this.checkFurther(row, column+1);

            this.checkFurther(row+1, column-1);
            this.checkFurther(row+1, column);
            this.checkFurther(row+1, column+1);
        }
    }


    //This function uncovers the cells #fixed
    uncoverAll() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                this.checkFurther(parseInt(row), parseInt(column));
            }
        }
    }

    //This function stores the scores in the local storage
    submitScore(score) {
        try{
            let user = document.getElementById("user");
            let username = user.innerText;
            if (gameWon) {
                localStorage.setItem(`${username}`, score);
                alert("Your score was saved!! you can find all your stats in the stats tab");
            }
        } catch {
            if (gameWon) {
                if (localStorage["guest"] == null) {
                    localStorage.setItem(`guest`, score);
                    alert("Your score was saved!! you can find all your stats in the stats tab");   
                } else {
                    localStorage.setItem(`guest`, score);
                    alert("Your score was saved!! you can find all your stats in the stats tab");   
                }
            }
        } 
    }

    //Check if the game has ended
    checkWin() {
        if (this.tilesToUncover == 1) {
            gameWon = true;
            alert("Congratulations, you won!, you can save your score and you will be able to view it in the stats");
            this.submitScore(score);
            this.clickable = false;
        } 
    }



    //sets and removes flags on right click
    flagged(cellId) {
        if (this.clickable) {
            let cell = document.getElementById(cellId);
            if (this.flaggedCells.has(cellId) == false && this.emptyCells.has(cellId) != true && cell.hasChildNodes() == false) {
                    this.flaggedCells.add(cellId);
                    cell.style.background = "url(/static/minesweeper/flag.png) no-repeat";
                    cell.style.backgroundSize = "80%";
                    cell.style.backgroundPosition = "center";
    
            } else if(this.flaggedCells.has(cellId) == true && this.emptyCells.has(cellId) == false && cell.hasChildNodes() == false){
                    this.flaggedCells.delete(cellId);
                    cell.style.background = "none";
            }
        }
    }

    //This function sets mines and it always avoids setting a mine on the first click
    //So it doesn't matter where you click or how many time, you will nver get a mine on the first click
    setMines(cell) {
        let start = cell.id;
        start = [parseInt(start.split(",")[0]), parseInt(start.split(",")[1])];

        while (this.mines.size < this.minesCount){
            let x = Math.floor(Math.random() * this.rows);
            let y = Math.floor(Math.random() * this.columns);

            if (x != start[0] && y != start[1]){
                this.mines.add(`${x},${y}`);
            }
        }
    }

    //Does the clicking // uncovering and part of it checks if the cell was a mine
    click(cell) {
        if (this.clickable == true){
            let cellId = cell.id;
            let mines = Array.from(this.mines);
            this.checkWin();
            this.setMines(cell);
            

            if (this.flaggedCells.has(cellId) != true) {
                let row = parseInt(cell.id.split(",")[0]);
                let column = parseInt(cell.id.split(",")[1]);

                this.countMines();
                this.checkFurther(parseInt(row), parseInt(column));

                if (this.mines.has(cellId)) {
                    let firstBomb = document.getElementById(cellId);
                    this.blown = true;
                    this.uncoverAll();

                    alert("Oh no, you lost!. you can try again!");
                    while (mines.length > 0) {
                        let bomb = document.getElementById(`${mines[mines.length-1]}`);
                        bomb.style.background = "url(/static/minesweeper/mine.png) no-repeat";
                        bomb.style.backgroundSize = "80%";
                        bomb.style.backgroundPosition = "center";
                        mines.pop();
                    }

                    firstBomb.style.background = "url(/static/minesweeper/mine-blown.png) no-repeat";
                    firstBomb.style.backgroundSize = "80%";
                    firstBomb.style.backgroundColor = "red";
                    firstBomb.style.backgroundPosition = "center";
                    
                    this.clickable = false;
                }
            }
        }
    }


    // creates a board based on the inputs from the construction function (rows, columns, mines)
    create() {
        const grid = document.getElementById("grid");
        grid.style.border = "solid 10px grey";

        for (let row = 0; row < this.rows; row++){
            const newRow = document.createElement("div");
            newRow.style.display = "flex";
            grid.appendChild(newRow);

            for (let column = 0; column < this.columns; column++) {
                const cell = document.createElement("div");
                cell.style.width = "25px";
                cell.style.height = "25px";
                cell.id = `${row},${column}`;
                cell.className = "cell";

                cell.addEventListener("click", () => {this.setMines(cell); this.click(cell)});
                cell.addEventListener("contextmenu", (e) => {this.flagged(cell.id); e.preventDefault();})

                newRow.appendChild(cell);
            }
        }
    }
}

//The different sizes of the game

beginner.addEventListener("click", call = () => {
    let grid = document.getElementById("grid");
    grid.innerHTML = '';
    let newBoard = new board(7, 7, 5);
    newBoard.create();
    score = (7*7) - 5;
})

intermediate.addEventListener("click", call = () => {
    let grid = document.getElementById("grid");
    grid.innerHTML = '';
    let newBoard = new board(10, 10, 30);
    score = (10*10) - 30;
    newBoard.create();
})

expert.addEventListener("click", () => {
    let grid = document.getElementById("grid");
    grid.innerHTML = '';
    let newBoard = new board(10, 15, 40);
    score = (10*5) - 40;
    newBoard.create();

})
