/*----- constants -----*/
const boardSizes = {
    e: [9, 9],
    m: [16, 16],
    h: [16, 30]
}
class mainCell {
    constructor(isRevealed, isFlagged, hasMine, minesTouching) {
        this.isRevealed = isRevealed;
        this.isFlagged = isFlagged;
        this.hasMine = hasMine;
        this.minesTouching = minesTouching;
    }
}
/*----- state variables -----*/

const cell = new mainCell(false, false, false, 0)
let board = []
let boardSize;

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
  }

  function renderControls() {

  }

  function renderMessages() {

  }

  function renderMines() {

  }

  function renderBoardSize() {
    board.length = 0;
    for (let i = 0; i < boardSizes[boardSize][0]; i++) {
        board.push([])
    }
    board.forEach(function(arr) {
       for (let i = 0; i < boardSizes[boardSize][1]; i++) {
        arr.push(cell)
        }
    })
  }
     
  

  function handleDifficulty(evt) {
    //guards
    if (evt.target.tagName !== 'BUTTON') return;
    //------------------------------------------
    boardSize = evt.target.getAttribute('id');
    render();
  }