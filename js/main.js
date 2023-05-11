/*----- constants -----*/
const boardSizes = {
    // first element is rows, second is columns, third is mineCount
    e: [9, 9, 10],
    m: [16, 16, 40],
    h: [16, 30, 99]
}
const colors = {
    1: 'black',
    2: 'blue',
    3: 'green',
    4: 'orange',
    5: 'red',
    6: 'purple',
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
let gameStatus;

  /*----- cached elements  -----*/
const boardEl = document.getElementById('board')


  /*----- event listeners -----*/
document.querySelector('header').addEventListener('click', handleDifficulty);
document.getElementById('reset').addEventListener('click', function(){
    removeBoardEls();
    init();
});
boardEl.addEventListener('click', handleFirstClick, {once: true});
boardEl.addEventListener('click', handleTileClick);
boardEl.addEventListener('contextmenu', handleFlag);
// boardEl.addEventListener("mouseover", function() {
//     document.addEventListener("keydown", handleFlag) 
      
//   });

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
    renderTiles();
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
            newCellEl.setAttribute('id', `${rowIdx} , ${colIdx}`);
            boardEl.append(newCellEl);
                
        }) 
    })      
  }

  function renderControls() {

  }

  function renderMessages() {

  }

  function renderTiles() {
    board.forEach(function(rowArr, rowIdx) {
        rowArr.forEach(function(col, colIdx) {
            let cellEl = document.getElementById(`${rowIdx} , ${colIdx}`);
            if (col.isRevealed) {
                cellEl.style.backgroundColor = 'rgb(179, 179, 179)'
                cellEl.style.boxShadow = 'none'
                if(col.hasMine) {
                cellEl.innerHTML = `<img id="${rowIdx} , ${colIdx}" src="https://dannytan.github.io/images/minesweeper_bomb.png">`
                return
                } else {
                cellEl.innerHTML = ''
                }
                if (col.minesTouching) {
                    cellEl.style.color = `${colors[col.minesTouching]}`
                cellEl.innerHTML = col.minesTouching
                } else {
                    cellEl.innerHTML = ''
                }
            } else {
                cellEl.innerHTML = ''
            }
            if(col.isFlagged) cellEl.innerHTML = `<img class="flag" id="${rowIdx} , ${colIdx}" src="http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/25d5208fbd9c655.png">`
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
    clearMines();
    let count = 0;
    while(count < boardSizes[boardSize][2]) {
        board.forEach(function(rowArr) {
            rowArr.forEach(function(col) {
                let rndNum = Math.floor(Math.random() * 100)
                if(count >= boardSizes[boardSize][2]) return
                if (col.hasMine) {return}
                else if (rndNum === 1) {
                    col.hasMine = true
                    count++
                } else {
                return
                }  

            });
        });
    }
    // console.log(count)
  }

  function clearMines() {
    board.forEach(function(rowArr) {
        rowArr.forEach(function(col) {
            col.hasMine = false
        })
    })        
  }
  function clearCount() {
    board.forEach(function(rowArr) {
        rowArr.forEach(function(col) {
            col.minesTouching = 0
        })
    })        
  }
  
  function countAdjMines() {
    clearCount();
    board.forEach(function(rowArr,rowIdx){
        rowArr.forEach(function(col, colIdx){
            let count = 0;
            count += countAdjSquares(rowIdx + 1, colIdx + 1)
            count += countAdjSquares(rowIdx - 1, colIdx - 1)
            count += countAdjSquares(rowIdx + 1, colIdx - 1)
            count += countAdjSquares(rowIdx - 1, colIdx + 1)
            count += countAdjSquares(rowIdx + 1, colIdx)
            count += countAdjSquares(rowIdx -1, colIdx)
            count += countAdjSquares(rowIdx, colIdx + 1)
            count += countAdjSquares(rowIdx, colIdx -1)
            col.minesTouching = count
            //console.log(col)
        })
    })
  }

  function countAdjSquares(rowIdx, colIdx) {
    
    if(rowIdx < 0 || rowIdx > board.length - 1 || colIdx < 0 || colIdx > board[0].length - 1) return 0;
    if (board[rowIdx][colIdx].hasMine) return 1;
    return 0;
  }

  function revealTile(rowIdx, colIdx) {
    console.log(rowIdx, colIdx)
    let cell = board[rowIdx][colIdx]
    console.log(cell, rowIdx, colIdx)
    if (cell.isRevealed) { console.log('revealed'); return}
    if (cell.hasMine) { console.log('mine');  return}
    cell.isRevealed = true;
    if(cell.minesTouching === 0) {
        if(rowIdx + 1 <= board.length - 1) {
            revealTile(rowIdx + 1, colIdx)
        }
        if(rowIdx - 1 >= 0) {
            revealTile(rowIdx - 1, colIdx)
        }
        if(rowIdx + 1 <= board.length - 1 && colIdx + 1 <= board[0].length - 1) {
            revealTile(rowIdx + 1, colIdx + 1)
        }
        if(rowIdx + 1 <= board.length - 1 && colIdx - 1 >= 0) {
            revealTile(rowIdx + 1, colIdx - 1)
        }
        if(rowIdx - 1 >= 0 && colIdx + 1 <= board[0].length - 1) {
            revealTile(rowIdx - 1, colIdx +1)
        }
        if(rowIdx - 1 >= 0 && colIdx - 1 >= 0) {
            revealTile(rowIdx - 1, colIdx -1)
        }
        if(colIdx + 1 <= board[0].length - 1) {
            revealTile(rowIdx, colIdx + 1)
        }
        if(colIdx - 1 >= 0) {
            revealTile(rowIdx, colIdx - 1)
        }
    } else if(cell.minesTouching) {
        cell.isRevealed = true
        console.log('touching')
    }
    
  }
  

  /*----- handle click functions  -----*/

  function handleFirstClick(evt) {
      let split = evt.target.getAttribute('id').split(' ')
      split.splice(1, 1)
      let rowIdx = parseInt(split[0])
      let colIdx = parseInt(split[1])
      placeMines();
      countAdjMines();
      let count = 0;
      while(board[rowIdx][colIdx].hasMine || board[rowIdx][colIdx].minesTouching) {
          placeMines();
        countAdjMines();
        count++;
       // console.log(count)
    }
    render();
}

function handleTileClick(evt) {
    let split = evt.target.getAttribute('id').split(' ');
    split.splice(1, 1);
    let rowIdx = parseInt(split[0]);
    let colIdx = parseInt(split[1]);
    let cell = board[rowIdx][colIdx];
    if(cell.hasMine) {
        gameStatus = 'l'
        board.forEach(function(rowArr) {
            rowArr.forEach(function(col) {
                col.isRevealed = true;
            });
        });
        render();
    } else if(cell.minesTouching) {
        cell.isRevealed = true;
    } else {
        revealTile(rowIdx, colIdx)
    }
    render();
}

function handleFlag(evt) {
    evt.preventDefault();
    let split = evt.target.getAttribute('id').split(' ');
    split.splice(1, 1);
    let rowIdx = parseInt(split[0]);
    let colIdx = parseInt(split[1]);
    let cell = board[rowIdx][colIdx];
    if(cell.isFlagged) {
        cell.isFlagged = false;
    } else {
    cell.isFlagged = true
    }
    render();
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

