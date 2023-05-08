/*----- constants -----*/
const boardSizes = {
    // first element is rows, second is columns, third is mineCount
    e: [9, 9, 10],
    m: [16, 16, 40],
    h: [16, 30, 99]
}
class mainCell {
    constructor(position, isRevealed, isFlagged, hasMine, minesTouching) {
        this.position = position
        this.isRevealed = isRevealed;
        this.isFlagged = isFlagged;
        this.hasMine = hasMine;
        this.minesTouching = minesTouching;
    }
}


/*----- state variables -----*/

const cell = new mainCell(null, false, false, false, 0)
let board = [];
let boardSize;
let mineCount;

  /*----- cached elements  -----*/
const boardEl = document.getElementById('board')

  /*----- event listeners -----*/
document.querySelector('header').addEventListener('click', handleDifficulty)

  /*----- functions -----*/
  init();

  function init() {
    // board = [
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    //     [cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell, cell,],
    // ]
    boardSize = 'm';
    render();
  }
  
  function render() {
    renderBoard();
    renderControls();
    renderMessages();
    renderMines();
  }

  function renderBoard() {
    renderBoardSize();
    boardEl.style.gridTemplateRows = `repeat(${boardSizes[boardSize][0]}, 5vmin)`;
    boardEl.style.gridTemplateColumns = `repeat(${boardSizes[boardSize][1]}, 5vmin)`;
    let boardTotal = (boardSizes[boardSize][0]) * (boardSizes[boardSize][1]);
    board.forEach(function(rowArr, rowIdx) {
        rowArr.forEach(function(col, colIdx) {
            const newCellEl = document.createElement('div');
            newCellEl.setAttribute('id', `${rowIdx}${colIdx}`);
            newCellEl.innerHTML = '<img src="https://dannytan.github.io/images/minesweeper_bomb.png">'
            boardEl.append(newCellEl);
        })
    })
    // for (let i = 0; i < boardTotal; i++) {
    //    const newCellEl = document.createElement('div');
    //    newCellEl.setAttribute('id', ``)
    //    boardEl.append(newCellEl);
    // }
  }

  function renderControls() {

  }

  function renderMessages() {

  }

  function renderMines() {
    // if (cell.hasMine = false) 
  }

  function renderBoardSize() {
    board.length = 0;
    for (let i = 0; i < boardSizes[boardSize][0]; i++) {''
        board.push([])
    }
    board.forEach(function(rowArr, rowIdx) {
       for (let i = 0; i < boardSizes[boardSize][1]; i++) {
        let newCell = new mainCell([rowIdx, i], false, false, false, 0);
        rowArr.push(newCell)
        }
    })
  }
     
  

  function handleDifficulty(evt) {
    //guards
    if (evt.target.tagName !== 'BUTTON') return;
    //------------------------------------------
    boardSize = evt.target.getAttribute('id');
    // removes all divs in boardEl
    while (boardEl.firstChild) {
        boardEl.removeChild(boardEl.firstChild)
    }
    //------------------------------------------
    render();
  }