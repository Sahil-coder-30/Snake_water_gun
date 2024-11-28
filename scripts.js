console.log("Script is loaded");

// Choices array
const choices = ["Snake", "Water", "Gun"];
let playerScore = 0;
let computerScore = 0;
const historyList = document.getElementById("history");

// Select elements
const resultDiv = document.getElementById("result");
const playAgainBtn = document.getElementById("play-again");
const buttons = document.querySelectorAll(".choice");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const resetGameBtn = document.getElementById("reset-game");
const toggleThemeBtn = document.getElementById("toggle-theme");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const tieSound = document.getElementById("tie-sound");

console.log("DOM elements loaded successfully");

// Play game function
function playGame(playerChoice) {
    console.log("Player choice:", playerChoice);

    const computerChoice = Math.floor(Math.random() * 3);
    console.log("Computer choice:", computerChoice);

    const playerText = `You chose: ${choices[playerChoice]}`;
    const computerText = `Computer chose: ${choices[computerChoice]}`;
    console.log(playerText, computerText);

    let resultText;
    if (playerChoice === computerChoice) {
        resultText = "It's a tie!";
        tieSound.play();
    } else if (
        (playerChoice === 0 && computerChoice === 1) ||
        (playerChoice === 1 && computerChoice === 2) ||
        (playerChoice === 2 && computerChoice === 0)
    ) {
        resultText = "You win!";
        winSound.play();
        playerScore++;
    } else {
        resultText = "Computer wins!";
        loseSound.play();
        computerScore++;
    }

    // Update the scoreboard
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;

    // Add result to history
    const historyItem = document.createElement("li");
    historyItem.textContent = `${playerText}, ${computerText} → ${resultText}`;
    historyList.prepend(historyItem);

    // Update result text
    resultDiv.innerHTML = `${playerText}<br>${computerText}<br>${resultText}`;

    // Show play again button
    playAgainBtn.style.display = "block";
}

// Add event listeners to buttons
buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        playGame(index);
    });
});

// Play again button functionality
playAgainBtn.addEventListener("click", () => {
    resultDiv.innerHTML = "";
    playAgainBtn.style.display = "none";
});

// Reset game functionality
resetGameBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    historyList.innerHTML = "";
    resultDiv.innerHTML = "Game reset. Let's play again!";
});

// Toggle theme functionality
toggleThemeBtn.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.body.dataset.theme = newTheme;
    toggleThemeBtn.textContent = newTheme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
});
