let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

document.querySelector('#winLo').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

document.querySelector('#rc').addEventListener('click', () => {
    playGame('rock');
});
document.querySelector('#pp').addEventListener('click', () => {
    playGame('paper');
});
document.querySelector('#sc').addEventListener('click', () => {
    playGame('scissors');
});

function reset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    document.querySelector('.madechoice').innerHTML = "";
    document.querySelector('#winLo').innerHTML = 'Wins: 0, Losses: 0, Ties: 0';
}

document.querySelector('#reset').addEventListener('click', () => {
    reset();
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    }
    else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

function pickedPlayerMove(playerMove, computerMove) {
    let result = '';
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        } else {
            result = 'Tie.';
        }

    } else {
        if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        } else {
            result = 'Tie.';
        }
    }
    return { playerMove, result };
}

function playGame(PlayerMove) {
    const computerMove = pickComputerMove();
    const player = pickedPlayerMove(PlayerMove, computerMove)
    const playerMove = player.playerMove;
    let result = player.result;

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.madechoice').innerHTML = ` You  <img src="/images/${playerMove}-emoji.png" alt=" ${playerMove}">  ||  <img src="/images/${computerMove}-emoji.png" alt=" ${computerMove}"> Computer <br><br>`;

    document.querySelector('#winLo').innerHTML = `  ${result} <br> <br>Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}