var keyboardSectionEl = $("#keyboard_section");
const keyboardArr = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M", "Enter"],
];
var words = ["javascript", "pet", "dinosaur", "toddler", "antacid"];
var answer = words[Math.floor(Math.random() * words.length)];
function init() {
  generateKeyboard();
  generateWord();
}
var wordEl = $("#word");
function generateWord() {
  /**
     *   <span class="letter">_</span>
            <span class="letter">_</span>
            <span class="letter">_</span>
            <span class="letter">_</span>
            <span class="letter">_</span>
            <span class="letter">_</span>
            <span class="letter">_</span>
     */
  for (let i = 0; i < answer.length; i++) {
    var letterEl = $("<span>").addClass("letter").text("_");
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
        .on("click", (e) => {
          e.preventDefault();
          console.log(e.target.innerHTML);
        });
      buttonEl.appendTo(colEl);
    }
  }
}
init();
document.addEventListener("keypress", (e) => {
  console.log(e.code);
});
