
if (window.performance.navigation.type === 1) {
  rollDice();
}
/*
window.performance.navigation.type ->
will be 0 if you are coming through a URL.
will be 1 if you are refreshing,
will be 2 if you are coming using the forwards/backwards buttons in your web browser.
*/

function rollDice() {
  // Selecting Random Number from 1 to 6

  var randomNumber1 = Math.floor(Math.random() * 6) + 1;
  /*
  we can test this by pasting this line ->
  Math.floor(Math.random() * 6) + 1;
  in the console
  */
  var randomNumber2 = Math.floor(Math.random() * 6) + 1;


  // Using those Random numbers to choose Images of dice randomly

  document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");

  document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");


  // Changing the heading according to who wins or Draw

  var heading = document.querySelector("h1");

  if (randomNumber1 > randomNumber2) {
    heading.innerHTML = "🚩 Player 1 Wins!";
  }
  else if (randomNumber1 < randomNumber2) {
    heading.innerHTML = "Player 2 Wins! 🚩";
  }
  else {
    heading.innerHTML = "Draw!";
  }
}
