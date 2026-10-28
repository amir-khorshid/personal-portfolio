
const gameButton = document.getElementById("game-button");
const gameModal = document.getElementById("game-modal");
const closeGame = document.getElementById("close-game");
const resetGame = document.getElementById("reset-game");
const gameMessage = document.getElementById("game-message");
const codeProgress = document.getElementById("code-progress");

const konamiCode = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
];

let codePosition = 0;
let gameUnlocked = false;

function updateProgress() {
    codeProgress.textContent = konamiCode
        .map((_, index) => index < codePosition ? "●" : "○")
        .join(" ");
}

function resetCode() {
    codePosition = 0;
    gameUnlocked = false;
    gameMessage.textContent = "Enter the classic cheat code.";
    updateProgress();
}

function enterGameKey(key) {
    if (gameUnlocked) return;

    if (key === konamiCode[codePosition]) {
        codePosition++;
        gameMessage.textContent = "CODE ACCEPTED...";
    } else {
        codePosition = key === konamiCode[0] ? 1 : 0;
        gameMessage.textContent = "WRONG INPUT — TRY AGAIN";
    }

    updateProgress();

    if (codePosition === konamiCode.length) {
        gameUnlocked = true;
        gameMessage.textContent = "🎮 SECRET PAGE UNLOCKED!";
        codeProgress.textContent = "ACCESS GRANTED";

        setTimeout(() => {
			window.location.href = "hobbies.html";
		}, 1200);
    }
}

// Open modal
gameButton.addEventListener("click", () => {
    resetCode();
    gameModal.hidden = false;
});

// Close modal
closeGame.addEventListener("click", () => {
    gameModal.hidden = true;
});

// Reset
resetGame.addEventListener("click", resetCode);

// On-screen controls
document.querySelectorAll("[data-key]").forEach(button => {
    button.addEventListener("click", () => {
        enterGameKey(button.dataset.key);
    });
});

// Keyboard support
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !gameModal.hidden) {
        gameModal.hidden = true;
        return;
    }

    if (gameModal.hidden) return;

    const key = event.key.length === 1
        ? event.key.toLowerCase()
        : event.key;

    if (konamiCode.includes(key)) {
        event.preventDefault();
        enterGameKey(key);
    }
});

// Click outside the panel to close
gameModal.addEventListener("click", event => {
    if (event.target === gameModal) {
        gameModal.hidden = true;
    }
});
