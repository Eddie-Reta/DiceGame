/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,
  roundScore,
  activePlayer,
  gamePlaying,
  diceRoll,
  setScore,
  winningNumber,
  lastRoll;

gamePlaying = true;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Random number

    var dice1 = document.getElementById("dice1");
    var dice2 = document.getElementById("dice2");
    var randomDiceNumber1 = Math.floor(Math.random() * 6) + 1;
    var randomDiceNumber2 = Math.floor(Math.random() * 6) + 1;
    //Math.floor(Math.random() * 6) + 1;
    var totalRoll = randomDiceNumber1 + randomDiceNumber2;

    dice1.style.display = "block";
    dice2.style.display = "block";

    lastRoll = totalRoll;

    //2. Display the score
    dice1.src = "./assets/images/dice-" + randomDiceNumber1 + ".png";

    dice2.src = "./assets/images/dice-" + randomDiceNumber2 + ".png";

    //3. Update the round score IF the rolled number was NOT a 1
    if (lastRoll === 6 && roundScore === 6) {

      messageAlert(
        "You have rolled two 6's in row!! Next Payer's turn!!",
        2500
      );
      removeScore();
      nextPlayer();
      lastRoll = 0;
   
    } else if (randomDiceNumber1 !== 1 && randomDiceNumber2 !== 1) {
      //add score
      roundScore += totalRoll;
      diceRoll = roundScore;
     
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
        lastRoll = 0;
      //player looses entire score if he rolls two 6's resulting in next player's turn
    } else {
      //next player
      messageAlert("You have rolled a 1; Next player's turn.", 2500);
      removeScore();
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    var player = document.querySelector("#score-" + activePlayer);

    //Add CURRent score to GLobal score
    scores[activePlayer] += roundScore;

    //Update the UI

    player.textContent = scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= winningNumber && scores[activePlayer] !== 0) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.getElementById("dice1").style.display = "none";
      document.getElementById("dice2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function messageAlert(message, time) {
  var box = document.getElementById("alert");
  box.style.display = "block";
  box.innerHTML = message;
  box.style.position = "fixed";
  box.style.right = "35%";
  box.style.background = "white";
  box.style.height = "150px";
  box.style.width = "250px";
  box.style.zIndex = "1";
  box.style.fontSize = "25px";
  box.style.paddingTop = "15px";
  setTimeout(function() {
    box.style.display = "none";
  }, time);
}

function nextPlayer() {
  //if active player equals 0  then active player should be 1 else active player should be 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  var dices = document.querySelectorAll(".dice");

  for (var i = 0; i < dices.length; i++) {
    dices[i].style.display = "none";
  }
}

document.querySelector(".btn-new").addEventListener("click", init);

function removeScore() {
  var player = document.querySelector("#score-" + activePlayer);

  scores[activePlayer] = 0;

  player.textContent = scores[activePlayer];
}

document.getElementById("ok").addEventListener("click", function() {
  var inputBox = document.getElementById("newScore");
  var newScore = document.getElementById("newScore").value;
  var enterNumber = document.getElementById("enterNumber");
  var okButton = document.getElementById("ok");
  var addedWinningScore = document.getElementById("addedWinningScore");

  document.querySelector(".btn-roll").disabled = false;
  document.querySelector(".btn-hold").disabled = false;

  addedWinningScore.innerHTML =
    "<strong>Winning Score : " + newScore + "</strong>";
  enterNumber.style.display = "none";
  okButton.disabled = true;

  winningNumber = newScore;
  newScore
    ? (inputBox.style.display = "none")
    : (inputBox.style.display = "block");

  if (winningNumber < 20 || winningNumber === 0 || winningNumber === "") {
    init();
  }
});

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  winningNumber = 0;
  gamePlaying = true;
  var dices = document.querySelectorAll(".dice");

  for (var i = 0; i < dices.length; i++) {
    dices[i].style.display = "none";
  }

  document.getElementById("alert").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.getElementById("newScore").style.display = "block";
  document.getElementById("newScore").value = "";
  document.getElementById("enterNumber").style.display = "block";
  document.getElementById("ok").disabled = false;
  document.getElementById("addedWinningScore").innerHTML = " ";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".btn-roll").disabled = true;
  document.querySelector(".btn-hold").disabled = true;
}
