var keyboardSectionEl = $("#keyboard_section");
const keyboardArr = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];
var words = ["javascript", "pet", "dinosaur", "toddler", "antacid"];
var answer = words[Math.floor(Math.random() * words.length)];
let lettersGuessed = 0;
var guessedWord = "";
var guessWordSection = document.getElementById("guess_word_section");

function init() {
  generateKeyboard();
  // generateWord();
}
var wordEl = $("#word_section");
// function generateWord() {
//   for (let i = 0; i < answer.length; i++) {
//     var letterEl = $("<div>")
//       .addClass("letter")
//       .text("_")
//       .attr("id", `letter_${i}`);
//     letterEl.appendTo(wordEl);
//   }
// }
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
            // console.log(e.code[e.code.length - 1]);
            addLetter(e.target.innerHTML.toLowerCase());
          }
          if (e.target.innerHTML === "Enter") {
            // console.log("user entered");
            if (lettersGuessed !== answer.length) {
              incompleteWord();
            } else {
              if (guessedWord === answer) {
                gameWon();
              } else {
                guessAgain();
              }
            }
          }
          if (e.target.innerHTML === "Backspace") {
            // console.log(lettersGuessed);
            removeLetter();
          }
        });
      buttonEl.appendTo(colEl);
    }
  }
}
init();
function checkLetter(letter) {
  // console.log(letter, answer[lettersGuessed]);
  if (letter === answer[lettersGuessed]) {
  }
}
for (i = 0; i < answer.length; i++) {
  letterDiv = document.createElement("div");
  letterDiv.innerHTML = "_";
  letterDiv.setAttribute("tabindex", i);
  letterDiv.setAttribute("id", i);
  letterDiv.setAttribute("class", "letter");

  guessWordSection.appendChild(letterDiv);
}
let letterCount = 0;
document.addEventListener("keypress", (e) => {
  var letter = e.code[e.code.length - 1].toLowerCase();
  // console.log(guessWordSection.children.length);
  // console.log(e.code);
  if (e.code.length === 4) {
    if (!answer.includes(letter)) {
      console.log("else");

      // console.log("wrong letter");
      // console.log($(`#${letter.toUpperCase()}`));
      $(`#${letter.toUpperCase()}`)[0].disabled = true;
      Draw(draws[step++]);
      if (undefined === draws[step]) this.disabled = true;
      // console.log($(`#${letter.toUpperCase()}`)[0].disabled);
      // break;d
    }
    for (let i = 0; i < guessWordSection.children.length; i++) {
      if (letter === answer[i]) {
        // guessWordSection.children[i].style.color = "#442342";
        guessWordSection.children[i].innerHTML = letter;
        // console.log("letterCount", letterCount);
        letterCount += 1;
        console.log("here");
      }
    }
    console.log(letterCount, answer.length);
    if (letterCount === answer.length) {
      for (let j = 0; j < guessWordSection.children.length; j++) {
        console.log("ion");
        console.log(guessWordSection.children[j].innerHTML);
        guessedWord += guessWordSection.children[j].innerHTML;
      }
      console.log(letterCount, answer.length);
      console.log(guessedWord, answer);
      if (guessedWord === answer) {
        gameWon();
      } else {
        guessAgain();
      }
    }
  }
});

// document.addEventListener("keydown", (e) => {
//   // console.log(e.key);
//   if (e.code.length === 4) {
//     // console.log(e.code[e.code.length - 1]);
//     checkLetter(e.key);
//     addLetter(e.key);
//     console.log(wordEl.children.length);
//     /**
//      *  for (let i = 0; i < guessWordSection.children.length; i++) {
//       if (letter === answer[i]) {
//         guessWordSection.children[i].style.color = "#442342";
//         guessWordSection.children[i].innerHTML = letter;
//         console.log("letterCount", letterCount);
//         letterCount += 1;
//       }
//     }
//      */
//   }
//   if (e.key === "Enter") {
//     // console.log("user entered");
//     if (lettersGuessed !== answer.length) {
//       incompleteWord();
//     } else {
//       if (guessedWord === answer) {
//         gameWon();
//       } else {
//         guessAgain();
//       }
//     }
//   }
//   if (e.key === "Backspace") {
//     console.log(lettersGuessed);
//     removeLetter();
//   }
// });
function removeLetter() {
  lettersGuessed--;
  if (lettersGuessed < 0) {
    lettersGuessed = 0;
  }
  // console.log(guessedWord);
  console.log("removed", guessedWord.slice(0, -1));
  guessedWord = guessedWord.slice(0, -1);
  $(`#letter_${lettersGuessed}`).text("_");
}
function guessAgain() {
  console.log("guess again");
}
function gameWon() {
  $("#myModal").modal();
  $("#restart_button").on("click", function (e) {
    e.preventDefault();

    resetGame();
  });
}
function resetGame() {
  wordEl.html("");
  generateWord();
  $("#myModal").modal("hide");
}
function incompleteWord() {
  alert("Finish typing the word");
}
function addLetter(letter) {
  if (lettersGuessed !== answer.length) {
    $(`#letter_${lettersGuessed}`).text(letter);
    guessedWord += letter;
    lettersGuessed++;
    // console.log(lettersGuessed);
    // console.log("added", guessedWord);
  }
}
const canvas = document.getElementById("hangman");
const context = canvas.getContext("2d");

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

const next = document.getElementById("next");
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
next.addEventListener("click", function () {
  Draw(draws[step++]);
  if (undefined === draws[step]) this.disabled = true;
});

document.getElementById("reset").addEventListener("click", function () {
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
  next.disabled = false;
});
