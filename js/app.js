document.addEventListener("DOMContentLoaded", () => {
  //Variables
  const board = document.getElementById("board");
  const statusDisplay = document.getElementById("status");
  const restart = document.getElementById("restart");
  let gameState = Array(9).fill(null);
  let currentPlayer = "X";
  let vsAI = true;
  let aiLevel = "hard";

  //Crear el tablero de forma dinámica
  function initBoard() {
    board.innerHTML = "";
    gameState.forEach((_, index) => {
      const cell = document.createElement("div");
      cell.dataset.index = index;
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
    });
    statusDisplay.textContent = `Turno del Jugador: ${currentPlayer}`;
  }

  //Click en celda

  function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (gameState[index] || checkWinner()) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("taken");

    if (checkWinner()) {
      statusDisplay.textContent = `${currentPlayer} gano la partida!`;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Turno del jugador : ${currentPlayer}`;

    if (vsAI && currentPlayer === "O" && !checkWinner()) {
      setTimeout(aiTurn, 500);
    }
  }

  //Restart
  restart.addEventListener("click", () => {
    gameState = Array(9).fill(null);
    currentPlayer = "X";
    initBoard();
  });

  //Chequear ganador
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) =>
      pattern.every((index) => gameState[index] === currentPlayer)
    );
  }

  function aiTurn() {
    let move;
    if (aiLevel === "easy") {
      move = getRandomMove();
    } else if (aiLevel === "hard") {
      move = getBestMove();
    }

    if (move !== null) {
      gameState[move] = currentPlayer;
      const cell = board.querySelector(`[data-index= '${move}']`);
      cell.textContent = currentPlayer;
      cell.classList.add("taken");

      if (checkWinner()) {
        statusDisplay.textContent = `${currentPlayer} gano la partida!`;
        return;
      }

      currentPlayer = "X";
      statusDisplay.textContent = `Turno del jugador : ${currentPlayer}`;
    }
  }

  function getRandomMove() {
    const availableMoves = gameState
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);
    return availableMoves.length > 0
      ? availableMoves[Math.floor(Math.random() * availableMoves.length)]
      : null;
  }

  function getBestMove() {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === null) {
        gameState[i] = currentPlayer;
        let score = minimax(gameState, 0, false);
        gameState[i] = null;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  function minimax(board, depth, isMaximizing) {
    const winner = checkWinnerForMinimax();
    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (board.every((cell) => cell !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          let score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "X";
          let score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function checkWinnerForMinimax() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  }

  function getBestMove() {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === null) {
        gameState[i] = currentPlayer;
        let score = minimax(gameState, 0, false);
        gameState[i] = null;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  function minimax(board, depth, isMaximizing) {
    const winner = checkWinnerForMinimax();
    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (board.every((cell) => cell !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          let score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "X";
          let score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function checkWinnerForMinimax() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  }

  //Init
  initBoard();
});
