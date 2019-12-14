/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

//document.querySelector('#current-' + activePlayer).textContent = dice;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.querySelector('.btn-roll').addEventListener('click', function () {
    //1. Random number
    var diceDOM =  document.querySelector('.dice');
    var dice = Math.floor(Math.random() * 6) + 1;
        diceDOM.style.display = 'block';
    
    //2. Display the score
        diceDOM.src = './assets/images/dice-' + dice + '.png';
        
    //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else {
            //next player
            nextPlayer()
        }
    })

document.querySelector('.btn-hold').addEventListener('click', function() {
    var player = document.querySelector('#score-' + activePlayer);

    //Add CURRent score to GLobal score
    scores[activePlayer] += roundScore;
   
    //Update the UI

    player.textContent = scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= 10) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.btn-hold').disabled = true;
        document.querySelector('.btn-roll').disabled = true;  
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    } else {
        nextPlayer();
    }
    console.log(scores[activePlayer])
    

});

function nextPlayer() {
  
    //if active player equals 0  then active player should be 1 else active player should be 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';
}
