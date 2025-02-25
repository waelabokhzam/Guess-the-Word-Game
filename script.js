document.title = " Guess The Word Game";
document.querySelector("h1").innerText = "Guess the Word Game";

let numberOfTries = 6;
let currentTry = 1;
let numberOfLetters = 6;

let wordToGuess = "";
let word = ["create", "update", "delete", "branch"];
wordToGuess = word[Math.floor(Math.random() * word.length)];
let hint = 2;
document.querySelector("h4").innerHTML = `for to help you by MS. Wael : the correct answer is : <span> ${wordToGuess} </span>`;
console.log(wordToGuess);
const generatorInput = () => {
  let inputContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    let div = document.createElement("div");
    div.classList.add(`try-${i}`);
    div.innerHTML = `<span>try ${i}</span>`;
    for (let j = 1; j <= numberOfLetters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.setAttribute("maxlength", 1);
      input.id = `guess-${i}-letter-${j}`;
      if (i !== 1) {
        input.classList.add("disabled");
      }
      div.append(input);
    }
    inputContainer.appendChild(div);
  }
  inputContainer.children[0].children[1].focus();
  let disable = document.querySelectorAll(".disabled");
  disable.forEach(item => {
    item.disabled = true;
  });

  let inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", (eo) => {
      eo.target.value = eo.target.value.toUpperCase();
      let nextInput = inputs[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    })
    input.addEventListener("keydown", (eo) => {
      let currentInput = Array.from(inputs).indexOf(eo.target);
      if (eo.key === "ArrowRight") {
        let nextInput = inputs[currentInput + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
      if (eo.key === "ArrowLeft") {

        let prevInput = currentInput - 1;

        if (prevInput >= 0) {
          inputs[prevInput].focus();
        }
      }
      if(eo.key ==="Backspace"){
        if(currentInput > 0){
          inputs[currentInput].value = "";
          inputs[currentInput - 1].value="";
          inputs[currentInput - 1].focus();
          currentInput--;
        }
      }
    })
  })
}

let check = document.querySelector(".check");
let message = document.querySelector(".message");
check.addEventListener("click", (eo) => {
  let status = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    let letter = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    let currLetter = letter.value.toLowerCase();
    let actualyLetter = wordToGuess[i - 1].toLowerCase();
    if (currLetter === actualyLetter) {
      letter.classList.add("yes-in-place");
    }
    else if (wordToGuess.includes(currLetter) && currLetter !== "") {
      letter.classList.add("not-in-place");
      status = false;
    }
    else {
      letter.classList.add("no");
      status = false;
    }
  }
  if (status) {
    message.innerHtml = `you win with hint ${hint} <br> the word is ${wordToGuess}`;
    message.style.color = "blue";
    let alltry = document.querySelectorAll(".inputs > div");
    alltry.forEach(item => {
      item.classList.add("disabled");
      console.log(item.children[1]);
      // item.children[1].disabled = true;
    });
    check.disabled = true;
    check.classList.add("disabled-check");
    buttonHint.disabled = true;
    buttonHint.style.color = "white";
    buttonHint.style.backgroundColor = "gray";
    buttonHint.style.cursor = "no-drop";
  }
  else {
    document.querySelector(`.try-${currentTry}`).classList.add("disabled");
    const currenttryInput = document.querySelectorAll(`.try-${currentTry} input`);
    currenttryInput.forEach((item) => {
      item.disabled = true;
      item.classList.add("disabled");
    });

    currentTry++;
    if (currentTry <= numberOfTries) {
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled");
      const newInput = document.querySelectorAll(`.try-${currentTry} input`);
      newInput.forEach((item) => {
        item.classList.remove("disabled")
        item.disabled = false;
      });
      let focueInput = Array.from(newInput);
      focueInput[0].focus();
    }
    else {
      message.innerText = "you lose";
      message.style.color = "orangered";
      check.style.cursor = "no-drop";
      check.disabled = true;
      check.style.backgroundColor = "gray";
      check.style.color = "white";
      buttonHint.disabled = true;
      buttonHint.style.color = "white";
      buttonHint.style.backgroundColor = "gray";
      buttonHint.style.cursor = "no-drop";
    }
  }
});
const buttonHint = document.querySelector(".hint");
buttonHint.children[0].innerText = `${hint}  `;
buttonHint.addEventListener("click", (eo) => {
  if (hint > 0) {
    hint--;
    buttonHint.children[0].innerText = `${hint}  `;
    if (hint == 0) {
      buttonHint.style.cursor = "no-drop";
      buttonHint.style.backgroundColor = "gray";
      buttonHint.style.color = "white";
    }
    const availableInput = document.querySelectorAll("input:not([disabled])");
    const filterInput = Array.from(availableInput).filter((item) => item.value === "");
    console.log(filterInput);
    if (filterInput.length > 0) {
      let randomIndex = [Math.floor(Math.random() * filterInput.length)];
      let randomInput = filterInput[randomIndex];
      console.log(randomInput.id);
      // let inputId = randomInput.id;
      const enableInput = Array.from(availableInput).indexOf(randomInput);
      // console.log(enableInput);
      let letterHint = wordToGuess[enableInput].toUpperCase();
      // console.log(letterHint);
      randomInput.value = letterHint;
    }
  }
  else {
    buttonHint.style.cursor = "no-drop";
    buttonHint.style.backgroundColor = "gray";
    buttonHint.style.color = "white";
  }
})
generatorInput();
