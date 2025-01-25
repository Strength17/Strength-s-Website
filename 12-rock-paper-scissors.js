let score =JSON.parse(localStorage.getItem('score'))
      || {
        wins: 0,
        losses: 0,
        ties: 0
      };
      updateScoreElement ();
     /* if (!score) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        }
      }*/
      
     
      let  isAutoPlaying = false;
      let intervalId;

      
      let gameContentElement = document.querySelector('#game-content');
      let resetButtonElement = document.querySelector('.js-reset-score-button');
      let playButtonElement = document.querySelector('.js-auto-play-button');
      let rsBlock = document.querySelector('#rs-block');

let welcomeMessageBox = document.querySelector('#js-welcome-message-box');
let welcomeMessage = document.querySelector('#js-welcome-message div');
let welcomeMessageContainer = document.querySelector('#js-welcome-message');
let buttonsContainer = document.querySelector('#div');
let playButton = document.querySelector('#js-play-button');
let frame = document.querySelector('.frame');
displayWelcome();

function displayWelcome() {
    welcomeMessage.innerHTML = '<div id="welcome">WELCOME TO THE</div><br> <span>ROCK PAPER SCISSORS GAME</span>';
    playButton.innerHTML = 'Play';
    playButton.addEventListener('click', () => {
    welcomeMessageBox.style = `display: none;`;
    frame.style = `display: grid;`;
 });
}

      function displayReset() {
        rsBlock.style = `display: flex;`;
      }
      function removeDisplayReset() {
        rsBlock.style = `display: none;`;
      }
      resetButtonElement.addEventListener('click', () => displayReset());
      playButtonElement.addEventListener('click', () => {autoPlay()});
      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'a') {
          autoPlay()
      } else if (event.key === 'Backspace') {
        displayReset()
      }
    });
      function autoPlay() {
        if (!isAutoPlaying) {
         intervalId = setInterval(() =>  {
            const playerMove = pickComputerMove();
            playGame(playerMove);
            removeButtonEL();
           playButtonElement.innerHTML = 'Stop Playing'
           playButtonElement.classList.add('r-s-b-m');
          }, 1000);
          isAutoPlaying = true;
        } else {
          clearInterval(intervalId);
         playButtonElement.innerHTML = 'Auto Play'
         playButtonElement.classList.remove('r-s-b-m');
          isAutoPlaying = false;
        }
       }

function addButtonEL() {
  document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  })
  document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  })
  document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  })
} 
addButtonEL()

function removeButtonEL() {
  document.querySelector('.js-rock-button')
  .removeEventListener('click', () => {
    playGame('rock');
  })
  document.querySelector('.js-paper-button')
  .removeEventListener('click', () => {
    playGame('paper');
  })
  document.querySelector('.js-scissors-button')
  .removeEventListener('click', () => {
    playGame('scissors');
  })
} 

        document.body.addEventListener('keydown', (event) => {
          if(event.key === 'r') {
            playGame('rock');
          } else if (event.key === 'p') {
            playGame('paper');
          } else if(event.key === 's') {
            playGame('scissors');
          }
        });
       
      function playGame (playerMove) {
          const computerMove = pickComputerMove ();
         let result = '';
         
          if (playerMove === 'scissors') {
            if (computerMove === 'rock') {
            result = 'You loose!'
          } else if (computerMove === 'paper') {
            result = 'You Win!'
          } else if (computerMove === 'scissors') {
            result = `It's a Tie!`
          }

          } else if (playerMove === 'paper') {
            if (computerMove === 'rock') {
         result = 'You Win!'  
        } else if (computerMove === 'paper') {
         result = `It's a Tie!`
        } else if (computerMove === 'scissors') {
         result = 'You loose!'
        }

          } else if (playerMove === 'rock') {
            if (computerMove === 'rock') {
              result = `It's a Tie!`
            } else if (computerMove === 'paper') {
              result = 'You loose!'
            } else if (computerMove === 'scissors') {
              result = 'You Win!'
            }
          }

          if (result === 'You Win!') {
            score.wins += 1;
          } else if (result === 'You loose!') {
            score.losses += 1;
          } else if (result === `It's a Tie!`) {
            score.ties += 1;
          }
          document.querySelector('.js-result')
                .innerHTML = result;
        document.querySelector('.js-moves')
             .innerHTML =  `You
            <img src="${playerMove}-emoji.png"
            class="move-icon">
            <img src="${computerMove}-emoji.png"
            class="move-icon">
            Computer`;

            updateScoreElement ();
        
        }

        function updateScoreElement () {
            localStorage.setItem('score', JSON.stringify(score));
            document.querySelector('.js-score')
            .innerHTML = `<div><span>Wins: ${score.wins}</span> <span>Losses: ${score.losses}</span>  <span>Ties: ${score.ties}</span></div>`;

        }
        

        function pickComputerMove (){
          const randomNumber =  Math.random();
          let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1/3 ) {
          computerMove = 'rock';
        } else if (randomNumber >= 1/3 && randomNumber < 2/3 ) {
          computerMove = 'paper';
        } else if (randomNumber >= 2/3 && randomNumber < 1 ) {
          computerMove = 'scissors';
        }
        return computerMove;
      }
    
      let yes = document.querySelector('.js-yes-button');
      let no = document.querySelector('.js-no-button');
      yes.addEventListener('click', () => {
        score.wins = 0,
        score.losses = 0,
        score.ties = 0
        localStorage.removeItem('score');
        updateScoreElement();
        removeDisplayReset()
      });
      no.addEventListener('click', () => {
        removeDisplayReset()
      });
      
      