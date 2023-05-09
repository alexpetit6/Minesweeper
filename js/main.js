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
let board;
let boardSize;
let mineCount;

  /*----- cached elements  -----*/
const boardEl = document.getElementById('board')


  /*----- event listeners -----*/
document.querySelector('header').addEventListener('click', handleDifficulty)
document.getElementById('reset').addEventListener('click', function(){
    removeBoardEls();
    init();
})
  /*----- functions -----*/
  init();

  function init() {
    
    document.getElementById('e').style.visibility = 'visible';
    document.getElementById('m').style.visibility = 'visible';
    document.getElementById('h').style.visibility = 'visible';   
    board = [];
    boardSize = 'm';
    renderBoard();
    render();
  }
  
  function render() {
    renderMines();
    renderControls();
    renderMessages();
  }

  function renderBoard() {
      removeBoardEls();
      renderBoardSize();
    boardEl.style.gridTemplateRows = `repeat(${boardSizes[boardSize][0]}, 5vmin)`;
    boardEl.style.gridTemplateColumns = `repeat(${boardSizes[boardSize][1]}, 5vmin)`;
    board.forEach(function(rowArr, rowIdx) {
        rowArr.forEach(function(col, colIdx) {
            const newCellEl = document.createElement('div');
            newCellEl.setAttribute('id', `${rowIdx},${colIdx}`);
            newCellEl.innerHTML = '<img src="https://dannytan.github.io/images/minesweeper_bomb.png">'
            boardEl.append(newCellEl);
                
        }) 
    })
       
        
  }
    
  

  function renderControls() {

  }

  function renderMessages() {

  }

  function renderMines() {
     
    //-------------------------------
    board.forEach(function(rowArr) {
        rowArr.forEach(function(col) {
            let cellEl = document.getElementById(`${col.position[0]},${col.position[1]}`);
            cellEl.firstChild.style.visibility = col.hasMine ? 'visible' : 'hidden'
        })
    })
    }

  function renderBoardSize() {
    board.length = 0;
    for (let i = 0; i < boardSizes[boardSize][0]; i++) {
        board.push([]);
    }
    board.forEach(function(rowArr, rowIdx) {
       for (let i = 0; i < boardSizes[boardSize][1]; i++) {
        let newCell = new mainCell([rowIdx, i], false, false, false, 0);
        rowArr.push(newCell);
        }
    })
  }
     
  function removeBoardEls() {
    const boardEls = document.querySelectorAll('#board > div')
    for (i = 0; i < boardEls.length; i++) {
        boardEls[i].remove();
    }
  }

  function placeMines() {
    let count = 0;
    while(count < boardSizes[boardSize][2] - 1) {
        board.forEach(function(rowArr) {
            rowArr.forEach(function(col) {
                let rndNum = Math.floor(Math.random() * 100)
                if (col.hasMine) return
                else if (rndNum === 1) {
                    col.hasMine = true
                    count++
                } else {
                return
                }  
            });
        });
    }
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
    renderBoard();
    render();
    
    document.getElementById('e').style.visibility = 'hidden';
    document.getElementById('m').style.visibility = 'hidden';
    document.getElementById('h').style.visibility = 'hidden';
  }