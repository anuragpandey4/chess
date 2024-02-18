const gameboard = document.getElementById("gameboard");
const playerDisplay = document.getElementById("player");
const infoDisplay = document.getElementById("info-display");
const width = 8;
let playerChance = "white";
playerDisplay.textContent = playerChance;

const startPieces = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
];

function createBoard() {
  startPieces.forEach((piece, i) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = piece;

    square.firstChild?.setAttribute("draggable", true);

    square.setAttribute("square-id", i);
    const row = Math.floor((63 - i) / 8) + 1;
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "off-white" : "boxwood");
    } else {
      square.classList.add(i % 2 === 0 ? "boxwood" : "off-white");
    }

    if (i <= 15) {
      square.firstChild.firstChild.classList.add("black");
    } else if (i >= 48) {
      square.firstChild.firstChild.classList.add("white");
    }

    gameboard.append(square);
  });
}

createBoard();

const allSquares = document.querySelectorAll("#gameboard .square");

allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPositionId;
let draggedElement;

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute("square-id");
  draggedElement = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.stopPropagation();

  const correctChance =
    draggedElement.firstChild.classList.contains(playerChance);
  const taken = e.target.classList.contains("piece");
  const valid = checkIfValid(e.target);

  const opponentChance = playerChance === "white" ? "black" : "white";

  const takenByOpponent =
    e.target.firstChild?.classList.contains(opponentChance);

  if (correctChance) {
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement);
      e.target.remove();
      changePlayer();
      return;
    }
    if (taken) {
      infoDisplay.textContent = "you cannot go here!";
      setTimeout(() => (infoDisplay.textContent = ""), 2000);
      return;
    }
    if (valid) {
      e.target.append(draggedElement);
      changePlayer();
      return;
    }
  }

  //   console.log(e.target, correctChance, opponentChance);
}

function changePlayer() {
  if (playerChance === "white") {
    playerChance = "black";
    playerDisplay.textContent = playerChance;
  } else {
    playerChance = "white";
    playerDisplay.textContent = playerChance;
  }
}

function reverseIds() {
  const allSquares = document.getElementById(".squares");
  allSquares.forEach((square, i) => {
    square.setAttribute("square-id", width * width - 1 - i);
  });
}

function revertIds() {
  const allSquares = document.getElementById(".squares");
  allSquares.forEach((square, i) => {
    square.setAttribute("square-id", i);
  });
}

function checkIfValid(target) {
  const targetId =
    Number(target.getAttribute("square-id")) ||
    Number(target.parentNode.getAttribute("square-id"));
  const startId = Number(startPositionId);
  const piece = draggedElement.id;
  console.log("targetId", targetId);
  console.log("startId", startId);
  console.log("piece", piece);

  switch (piece) {
    case "pawn":
      const starterRow = [48, 49, 50, 51, 52, 53, 54, 55];
      if (
        (starterRow.includes(startId) && startId - width * 2 === targetId) ||
        startId - width === targetId ||
        startId - width + 1 === targetId
      ) {
        return true;
      }
  }
}
