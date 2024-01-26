//////global variables //////
const playerChoice = document.querySelector(".playerChoice");
const computerChoice = document.querySelector(".computerChoice");
let playerCount = document.querySelector("#playerCount");
let textResult = document.querySelector("#textResult");
let computerCount = document.querySelector("#computerCount");
const gameBtns = document.querySelectorAll(".gameBtns");
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissor");

const popUpDiv = document.querySelector(".popUpDiv");
const mainGameContainer = document.querySelector(".mainGameContainer");
const playerAvatar = document.querySelector("#playerAvatar");
const playerNewImg = document.createElement("img");
const playerName = document.querySelector(".playerName");
const computerAvatar = document.querySelector("#computerAvatar");
const computerName = document.querySelector(".computerName");

const winnerDivPopUp = document.querySelector(".winnerDivPopUp");
const winnerAvatar = document.querySelector(".winnerAvatar");
const winnerName = document.querySelector(".winnerName");

////for my img src ///
let selectedPlayerAvatarSrc = "";

// for my random computer avatar /////
const myAvatars = [
  { src: "./rimuru.jpg", name: "Rimuru" },
  { src: "./ranga.jpg", name: "Ranga" },
  { src: "./gobta.jpg", name: "Gobta" },
  { src: "./benimaru.jpg", name: "Benimaru" },
  { src: "./soei.jpg", name: "Soei" },
];

let pCount = 0;
let cCount = 0;

//// to generate a random choice for computer ///
const compChoice = () => {
  const randomChoice = Math.floor(Math.random() * 3) + 1;

  if (randomChoice == 1) {
    return "Rock";
  } else if (randomChoice == 2) {
    return "Paper";
  } else {
    return "Scissor";
  }
};

////// setting the respected value for the buttons /////
rock.addEventListener("click", () => {
  gamePlay(rock.textContent);
});

paper.addEventListener("click", () => {
  gamePlay(paper.textContent);
});

scissor.addEventListener("click", () => {
  gamePlay(scissor.textContent);
});

//// displaying the player and computer choice //////
const gamePlay = (userChoice) => {
  ////// determining the winner ////

  playerChoice.textContent = userChoice;
  computerChoice.textContent = compChoice();

  let user = playerChoice.textContent;
  let compu = computerChoice.textContent;

  if (user == compu) {
    textResult.textContent = `It's a DRAW!`;
  } else if (
    (user == "Rock" && compu == "Scissor") ||
    (user == "Paper" && compu == "Rock") ||
    (user == "Scissor" && compu == "Paper")
  ) {
    textResult.textContent = `Player WIN`;
    counter("player");
    // computerChoice.style.textDecoration = "line-through #f32a23";
  } else {
    textResult.textContent = `Computer WIN`;
    counter("computer");
    // playerChoice.style.textDecoration = "line-through #f32a23";
  }

  counter();
};

//////////////for my player and computer avatar display ////////////////

const avatars = document.querySelectorAll(".avatar");
// Generate a random index to select an avatar from the array
const compRandomAvatar = Math.floor(Math.random() * myAvatars.length);

// Get the selected avatar data
const selectedAvatar = myAvatars[compRandomAvatar];

// Set the computer avatar image
const computerNewImg = document.createElement("img");

avatars.forEach((avatar) => {
  avatar.addEventListener("click", () => {
    const imgSrc = avatar.querySelector("img").src;
    const name = avatar.querySelector(".avatarName h3").textContent;

    popUpDiv.style.display = "none";
    mainGameContainer.style.display = "block";

    ////to get the avatar image ////
    playerNewImg.src = imgSrc;
    selectedPlayerAvatarSrc = imgSrc;
    playerAvatar.appendChild(playerNewImg);
    ////to get the avatar name ////
    playerName.textContent = name;

    ///////computer randomly selecting avatar /////

    const computerRandomGenerate = () => {
      computerAvatar.innerHTML = "";

      computerNewImg.src = selectedAvatar.src;
      computerAvatar.appendChild(computerNewImg);

      // Set the computer avatar name
      computerName.textContent = selectedAvatar.name;
    };

    computerRandomGenerate();
  });
});

/////// player and computer counts ////
const counter = (winner) => {
  if (winner === "player") {
    playerCount.textContent = ++pCount;
  } else if (winner === "computer") {
    computerCount.textContent = ++cCount;
  }

  if (pCount === 10 || cCount === 10) {
    winnerDivPopUp.style.display = "block";
    mainGameContainer.style.display = "none";

    /// para makuha ang src ng img para sa winner///
    const winnerNewImg = document.createElement("img");
    if (winner === "player") {
      winnerNewImg.src = selectedPlayerAvatarSrc;
      winnerAvatar.appendChild(winnerNewImg);
      winnerName.textContent = playerName.textContent;
    } else {
      winnerNewImg.src = selectedAvatar.src;
      winnerAvatar.appendChild(winnerNewImg);
      winnerName.textContent = computerName.textContent.toLocaleUpperCase();
    }

    //// para makuha and name ng winner ///
    ///para sa confetti at sound effects ////
    winnerSound.play();
    confetti({
      particleCount: 300,
      spread: 90,
      origin: { y: 0.6 },
    });
    console.log(winnerAvatar);
    resetGame();
  }
};

const resetGame = () => {
  pCount = 0;
  cCount = 0;
  playerCount.textContent = 0;
  computerCount.textContent = 0;
};

const resetGameBtn = document.querySelector(".resetGameBtn");

resetGameBtn.addEventListener("click", () => {
  winnerDivPopUp.style.display = "none";
  mainGameContainer.style.display = "none";
  popUpDiv.style.display = "block";
  textResult.textContent = "Let's Play Again";
  winnerAvatar.innerHTML = ""; ////para i-reset winnerAvatar div na walang image ////
  resetGame();
});
