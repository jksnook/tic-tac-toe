const makePlayer = (playerName, marker) => {
  return {playerName, marker};
}

const player1 = makePlayer('Player 1', 'X');
const player2 = makePlayer('Player 2', 'O');
const myBoard = document.querySelector('div.board');
const infoPanel = document.querySelector('div.game-info');

const Gameboard = ((player1, player2, boardElement, infoElement) => {
  const _board = [[null, null, null], [null, null, null], [null, null, null]];
  const _drawBoard = function() {};
  const players = [player1, player2];
  let _currentTurn = 1;
  const winner = function() {
    for (let column = 0; column < 3; column++) {
      if ( _board[column][0] && _board[column][0] == _board[column][1] && _board[column][1] == _board[column][2]) {
        return players[_board[column][0] - 1]
      }
    }

    for (let row = 0; row < 3; row++) {
      if ( _board[0][row] && _board[0][row] == _board[1][row] && _board[1][row] == _board[2][row]) {
        return players[_board[0][row] - 1]
      }
    }

    if (_board[0][0] && _board[0][0] === _board[1][1] && _board[1][1] === _board[2][2]) {
      return players[_board[0][0] - 1];
    }

    if (_board[0][2] && _board[0][2] === _board[1][1] && _board[1][1] === _board[2][0]) {
      return players[_board[0][2] - 1];
    }

    for (let column = 0; column < 3; column++) {
      for (let row = 0; row < 3; row++) {
        if (!_board[column][row]) {
          return false;
        }
      }
    }
    return 'Draw';
  };
  // function to initialize board with all event listeners;
  const startGame = function() {
    _currentTurn = 1;
    infoElement.textContent = `Game in progress: ${players[_currentTurn - 1].playerName}'s turn`;
    for (let column = 0; column < 3; column++) {
      for (let row = 0; row < 3; row++) {
        _board[column][row] = null;
        boardElement.children[column].children[row].textContent = '';
        boardElement.children[column].children[row].addEventListener('click', () => {play(column, row)});
      }
    }
  }
  // function to play turn;
  const play = function(column, row) {
    if (!winner() && !_board[column][row]) {
      _board[column][row] = _currentTurn;
      boardElement.children[column].children[row].textContent = players[_currentTurn - 1].marker;
      _currentTurn = (_currentTurn % 2) + 1
      infoElement.textContent = `Game in progress: ${players[_currentTurn - 1].playerName}'s turn`
    }
    if (winner()) {
      if (winner() === 'Draw') {
        infoElement.textContent = `Game Over. Draw.`
      } else {
        infoElement.textContent = `Game Over. ${winner().playerName} wins`;
      }
    }
    console.log(_board)
  };
  return {players, winner, startGame};
})(player1, player2, myBoard, infoPanel);

const playButton = document.querySelector('button.play');
playButton.addEventListener('click', () => {Gameboard.startGame()});
