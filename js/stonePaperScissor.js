
let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const compChoicePara = document.querySelector("#comp-choice");
const resetBtn = document.querySelector("#reset-btn");

// Generate Computer Choice
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];

    const randIdx = Math.floor(Math.random() * 3);

    return options[randIdx];
};

// Message Animation
const animateMessage = () => {
    msg.classList.remove("animate");
    void msg.offsetWidth;
    msg.classList.add("animate");
};

// Score Animation
const animateScore = (element) => {
    element.classList.remove("score-animate");
    void element.offsetWidth;
    element.classList.add("score-animate");
};

// Draw Game
const drawGame = () => {
    msg.innerText = "Game was Draw! Play Again.";
    msg.style.backgroundColor = "#081b31";

    animateMessage();
};

// Show Winner
const showWinner = (userWin, userChoice, compChoice) => {

    if (userWin) {
        userScore++;

        userScorePara.innerText = userScore;

        msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;

        msg.style.backgroundColor = "green";

        animateScore(userScorePara);
    }
    else {
        compScore++;

        compScorePara.innerText = compScore;

        msg.innerText = `Computer Wins! ${compChoice} beats ${userChoice}`;

        msg.style.backgroundColor = "red";

        animateScore(compScorePara);
    }

    animateMessage();
};

// Play Game
const playGame = (userChoice) => {

    // Generate Computer Choice
    const compChoice = genCompChoice();

    // Show Computer Choice
    compChoicePara.innerText = `Computer selected: ${compChoice}`;

    // Remove previous selection
    choices.forEach((choice) => {
        choice.classList.remove("selected");
    });

    // Highlight selected choice
    document.getElementById(userChoice).classList.add("selected");

    // Draw Condition
    if (userChoice === compChoice) {
        drawGame();
    }

    else {
        let userWin = true;

        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        }

        else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        }

        else {
            userWin = compChoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, compChoice);
    }
};

// Click Event
choices.forEach((choice) => {

    choice.addEventListener("click", () => {

        const userChoice = choice.getAttribute("id");

        playGame(userChoice);

    });

});

// Reset Game
resetBtn.addEventListener("click", () => {

    userScore = 0;
    compScore = 0;

    userScorePara.innerText = 0;
    compScorePara.innerText = 0;

    msg.innerText = "Play Your Move";
    msg.style.backgroundColor = "#081b31";

    compChoicePara.innerText = "Computer selected: -";

    choices.forEach((choice) => {
        choice.classList.remove("selected");
    });

    animateMessage();
});


