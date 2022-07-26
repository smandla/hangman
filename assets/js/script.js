var keyboardSectionEl = $("#keyboard_section");
const keyboardArr = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];
var words = ["javascript", "pet", "dinosaur", "toddler", "antacid"];
var answer;
let lettersGuessed = 0;
var guessedWord = "";
var guessWordSection = document.getElementById("guess_word_section");
var wrongGuessSection = document.getElementById("wrong_guess_section");
var wordEl = $("#word_section");
init();
var inArr = [];
var wrongArr = [];
let letterCount = 0;
const canvas = document.getElementById("hangman");
const context = canvas.getContext("2d");
const draws = [
  "head",
  // "rightEye",
  // "leftEye",
  "body",
  "rightHarm",
  "leftHarm",
  "rightLeg",
  "leftLeg",
  "rightFoot",
  "leftFoot",
];

var step = 0;
context.strokeStyle = "#444";
context.lineWidth = 10;
context.beginPath();
context.moveTo(175, 225);
context.lineTo(5, 225);
context.moveTo(40, 225);
context.lineTo(40, 5);
context.lineTo(100, 5);
context.lineTo(100, 25);
context.stroke();

function init() {
  generateKeyboard();
  generateWord();
}

function generateWord() {
  answer = words[Math.floor(Math.random() * words.length)];
  console.log(answer);

  for (i = 0; i < answer.length; i++) {
    var letterDiv = document.createElement("div");
    letterDiv.innerHTML = "_";
    letterDiv.setAttribute("tabindex", i);
    letterDiv.setAttribute("id", i);
    letterDiv.setAttribute("class", "letter");
    guessWordSection.appendChild(letterDiv);
  }
}
function wrongGuess(letter) {
  console.log(letter);
  wrongArr.push(letter);
  var wrongLetter = document.createElement("div");
  wrongLetter.innerText = letter;
  wrongGuessSection.appendChild(wrongLetter);
  $(`#${letter.toUpperCase()}`)[0].disabled = true;
  drawMan();
}
function drawMan() {
  Draw(draws[step++]);

  if (undefined === draws[step]) {
    gameOver();
  }
}
function gameOver() {
  $("#gameOverModal").modal();
  $("#reset_button").on("click", function (e) {
    e.preventDefault();
    $("#gameOverModal").modal("hide");

    resetGame();
  });
}
function resetGame() {
  $("#myModal").modal("hide");
  guessWordSection.innerHTML = "";

  clearCanvas();
  context.strokeStyle = "#444";
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(175, 225);
  context.lineTo(5, 225);
  context.moveTo(40, 225);
  context.lineTo(40, 5);
  context.lineTo(100, 5);
  context.lineTo(100, 25);
  context.stroke();
  step = 0;
  inArr = [];
  wrongArr = [];
  guessedWord = "";
  letterCount = 0;
  wrongGuessSection.innerHTML = "";
  // answer = words[Math.floor(Math.random() * words.length)];
  // console.log(answer);
  generateWord();
}

function guessWord(letter) {
  console.log(inArr, wrongArr);
  if (inArr.includes(letter)) {
    letterCount -= 1;
  }
  if (!answer.includes(letter)) {
    if (!wrongArr.includes(letter)) {
      wrongGuess(letter);
    }
  }
  if (answer.includes(letter)) {
    if (!inArr.includes(letter)) {
      inArr.push(letter);
    }
  }
  for (let i = 0; i < guessWordSection.children.length; i++) {
    if (letter === answer[i]) {
      guessWordSection.children[i].innerHTML = letter;
      letterCount += 1;
    }
  }
  console.log(letterCount, answer.length);
  if (letterCount === answer.length) {
    for (let j = 0; j < guessWordSection.children.length; j++) {
      guessedWord += guessWordSection.children[j].innerHTML;
    }
    console.log(guessedWord);
    if (guessedWord === answer) {
      gameWon();
    }
  }
}
function generateKeyboard() {
  for (let i = 0; i < keyboardArr.length; i++) {
    var rowEl = $("<div>").addClass("row");
    rowEl.appendTo(keyboardSectionEl);
    var colEl = $("<div>").addClass("col");
    colEl.appendTo(rowEl);
    for (let j = 0; j < keyboardArr[i].length; j++) {
      var buttonEl = $("<button>")
        .attr("id", keyboardArr[i][j])
        .text(keyboardArr[i][j])
        .on("click", function (e) {
          e.preventDefault();
          // console.log(e.target.innerHTML.toLowerCase());
          if (e.target.innerHTML.length === 1) {
            let letter = e.target.innerHTML.toLowerCase();
            guessWord(letter);
          }
        });
      buttonEl.appendTo(colEl);
    }
  }
}

document.addEventListener("keypress", (e) => {
  var letter = e.code[e.code.length - 1].toLowerCase();
  if (e.code.length === 4) {
    guessWord(letter);
  }
});

function gameWon() {
  $("#myModal").modal();
  $("#restart_button").on("click", function (e) {
    e.preventDefault();
    resetGame();
  });
}

// function addLetter(letter) {
//   if (lettersGuessed !== answer.length) {
//     $(`#letter_${lettersGuessed}`).text(letter);
//     guessedWord += letter;
//     lettersGuessed++;
//   }
// }

clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

Draw = (part) => {
  switch (part) {
    case "gallows":
      break;

    case "head":
      context.lineWidth = 5;
      context.beginPath();
      context.arc(100, 50, 25, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      break;
    // case "rightEye":
    //   context.beginPath();
    //   context.arc(90, 40, 1, 0, Math.PI * 2, true);
    //   context.closePath();
    //   context.stroke();
    //   break;
    // case "leftEye":
    //   context.beginPath();
    //   context.arc(110, 40, 1, 0, Math.PI * 2, true);
    //   context.closePath();
    //   context.stroke();
    //   break;
    case "body":
      context.beginPath();
      context.moveTo(100, 75);
      context.lineTo(100, 140);
      context.stroke();
      break;

    case "rightHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(70, 120);
      context.stroke();
      break;

    case "leftHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(130, 120);
      context.stroke();
      break;

    case "rightLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(80, 190);
      context.stroke();
      break;

    case "rightFoot":
      context.beginPath();
      context.moveTo(82, 190);
      context.lineTo(70, 185);
      context.stroke();
      break;

    case "leftLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(125, 190);
      context.stroke();
      break;

    case "leftFoot":
      context.beginPath();
      context.moveTo(122, 190);
      context.lineTo(135, 185);
      context.stroke();
      break;
  }
};
