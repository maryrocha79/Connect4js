/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board.length = HEIGHT;
  board = board.fill(undefined).map(val => Array.from({ length: WIDTH }));
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "board" variable from the item in HTML w/ID of "board"
  let board = $('#board');
  // TODO: add comment for this code
  // Loops to create the top row of the table and appended to the table.
  const top = $("<tr class='column-top'></tr>").on('click', handleClick);
  for (let x = 0; x < WIDTH; x++) {
    top.append($(`<td id='${x}'>`));
  }
  board.append(top);

  // TODO: add comment for this code
  // Loops to create each row of the game and assing and id='y-x' to each
  for (let y = 0; y < HEIGHT; y++) {
    const row = $('<tr />');
    for (let x = 0; x < WIDTH; x++) {
      row.append($(`<td id='${y}-${x}'>`));
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (var y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
  // return 0;
}

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  // let piece = $('<div>');
  // piece.addClass(`piece p${currPlayer}`);
  // $(`#${y}-${x}`).append(piece);

  var piece = $(`<div class="piece p${currPlayer}"></div>`);
  $(`#${y}-${x}`).append(piece);

  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board

  placeInTable(y, x);

  board[y][x] = currPlayer;

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board[0].every(val => val !== undefined)) {
    return endGame('Tie!');
  }

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // switch players
  // currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);

  currPlayer = currPlayer === 1 ? 2 : 1;
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
