var keyboardSectionEl = $("#keyboard_section");
const keyboardArr = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Backspace", "Z", "X", "C", "V", "B", "N", "M", "Enter"],
];
var words = ["javascript", "pet", "dinosaur", "toddler", "antacid"];
var answer = words[Math.floor(Math.random() * words.length)];
let lettersGuessed = 0;
var guessedWord = "";
function init() {
  generateKeyboard();
  generateWord();
}
var wordEl = $("#word");
function generateWord() {
  for (let i = 0; i < answer.length; i++) {
    var letterEl = $("<span>")
      .addClass("letter")
      .text("_")
      .attr("id", `letter_${i}`);
    letterEl.appendTo(wordEl);
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
          console.log(e.target.innerHTML.toLowerCase());
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
            console.log(lettersGuessed);
            removeLetter();
          }
        });
      buttonEl.appendTo(colEl);
    }
  }
}
init();

document.addEventListener("keydown", (e) => {
  // console.log(e.key);
  if (e.code.length === 4) {
    // console.log(e.code[e.code.length - 1]);
    addLetter(e.key);
  }
  if (e.key === "Enter") {
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
  if (e.key === "Backspace") {
    console.log(lettersGuessed);
    removeLetter();
  }
});
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
  console.log("you won!");
  wordEl.html("d");
  resetGame();
}
function resetGame() {
  generateWord();
}
function incompleteWord() {
  alert("Finish typing the word");
}
function addLetter(letter) {
  if (lettersGuessed !== answer.length) {
    $(`#letter_${lettersGuessed}`).text(letter);
    guessedWord += letter;
    lettersGuessed++;
    console.log(lettersGuessed);
    console.log("added", guessedWord);
  }
}
