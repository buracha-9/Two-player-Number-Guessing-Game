let player1Number = '';
let player2Number = '';
let currentPlayer = 1;

const player1Input = document.getElementById('player1Input');
const player2Input = document.getElementById('player2Input');
const setPlayer1 = document.getElementById('setPlayer1');
const setPlayer2 = document.getElementById('setPlayer2');
const gameDiv = document.getElementById('game');
const currentPlayerMessage = document.getElementById('currentPlayerMessage');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');

const player1History = document.getElementById('player1History');
const player2History = document.getElementById('player2History');

function isValidNumber(num) {
    return /^\d{4}$/.test(num) && new Set(num).size === 4 && !num.includes('0');
}

function calculateGuessResult(secretNumber, guess) {
    let numberMatch = 0;
    let orderMatch = 0;

    for (let i = 0; i < guess.length; i++) {
        if (secretNumber.includes(guess[i])) {
            numberMatch++;
        }
        if (secretNumber[i] === guess[i]) {
            orderMatch++;
        }
    }

    return { numberMatch, orderMatch };
}

setPlayer1.addEventListener('click', () => {
    const inputValue = player1Input.value.trim();
    
    if (isValidNumber(inputValue)) {
        player1Number = inputValue;
        player1Input.disabled = true;
        setPlayer1.disabled = true;

        alert("Player 1 number set! Now Player 2 can set their number.");
    } else {
        alert("Please enter a valid 4-digit number (no repeated digits, no zeros).");
    }
});

setPlayer2.addEventListener('click', () => {
    const inputValue = player2Input.value.trim();
    
    if (isValidNumber(inputValue)) {
        player2Number = inputValue;
        player2Input.disabled = true;
        setPlayer2.disabled = true;

        startGame();
    } else {
        alert("Please enter a valid 4-digit number (no repeated digits, no zeros).");
    }
});

function startGame() {
    gameDiv.style.display = 'block';
    currentPlayerMessage.textContent = "Player " + currentPlayer + ", it's your turn to guess!";
}

guessButton.addEventListener('click', () => {
    const guessValue = guessInput.value.trim();

    if (!isValidNumber(guessValue)) {
        alert("Please enter a valid 4-digit number (no repeated digits, no zeros).");
        return;
    }

    let guessResult;
    if (currentPlayer === 1) {
        guessResult = calculateGuessResult(player2Number, guessValue);
        const row = player2History.insertRow();
        row.insertCell(0).textContent = guessValue;
        row.insertCell(1).textContent = guessResult.numberMatch;
        row.insertCell(2).textContent = guessResult.orderMatch;
    } else {
        guessResult = calculateGuessResult(player1Number, guessValue);
        const row = player1History.insertRow();
        row.insertCell(0).textContent = guessValue;
        row.insertCell(1).textContent = guessResult.numberMatch;
        row.insertCell(2).textContent = guessResult.orderMatch;
    }

    if (guessResult.orderMatch === 4) {
        alert(`Congratulations Player ${currentPlayer}! You've guessed the correct number!`);
        guessButton.disabled = true;
        resetButton.style.display = 'block';
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch players
        currentPlayerMessage.textContent = "Player " + currentPlayer + ", it's your turn to guess!";
    }

    guessInput.value = '';
});

resetButton.addEventListener('click', () => {
    player1Number = '';
    player2Number = '';
    currentPlayer = 1;

    player1Input.value = '';
    player2Input.value = '';

    player1Input.disabled = false;
    setPlayer1.disabled = false;

    player2Input.disabled = false;
    setPlayer2.disabled = false;

    gameDiv.style.display = 'none';
    player1History.innerHTML = '';
    player2History.innerHTML = '';
    resetButton.style.display = 'none';
});
