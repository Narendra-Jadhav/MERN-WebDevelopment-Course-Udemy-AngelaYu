// document.querySelector(".w").addEventListener("click", handleClick);
// Note: If we write handleClick() -> its not working
// We are passing the function as input, and not calling the function

// function handleClick() {
//   alert("I got clicked");
// }

//*** Detecting Button(Mouse Click) Press
var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {

  // we can also write Anonymous function, i.e function with no name there.
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    // What to do when click detected

    var buttonInnerHTML = this.innerHTML;
    // this is the keyword used for the object.
    // the object that made the event listener; this points to that

    // So, we are taking the innerHTML of that, as it will give the key that button has, eg. w, s, etc.

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);
  });

}

//*** Detecting Keyboard Press

document.addEventListener("keypress", function(event) { //function(event) is Callback function

  // event is what that triggered the funtion

  // this event parameter gives the information of what happened i.e we pressed key ->
  // parameters of a key on pressing that key
  // we can write any word in place of event

  // then we are using key attribute/property of that pressing key
  // it has the key as string eg. "w"
  // so we can use that as the parameter for makeSound function
  makeSound(event.key);

  buttonAnimation(event.key);
})

/*
***IMP***

Higher Order Function: Function which can take other function as parameter

Callback Function: Function which is as a parameter to a Higher Order Function.
 It waits for the Higher order function to do its task

function anotherAddEventListener(typeOfEvent, callback) {
  // Detect event code

  var eventThatHappened = {
    eventType: "keypress",
    key: "p",
    durationOfKeypress: 2
  }

  if (eventThatHappened.eventType === typeOfEvent) {
    callback(eventThatHappened);
  }
}

### This above function is behind the scenes
### We use it as done below

anotherAddEventListener("keypress", function(event) {
  console.log(event);
})
*/

//*** Function to Make Sound
function makeSound(key) {

  // Switch case is useful when many conditional statements are there
  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      // Audio is the object made with new and play() is the method
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "l":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    default: console.log(buttonInnerHTML);
    // for default console logging buttonInnerHTML which called it
  }
}

function buttonAnimation(currentKey) {

  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");
  // adding class pressed to button

  setTimeout(function() {
    activeButton.classList.remove("pressed");
  },100);

  // using the setTimeout method we can specify what should after some interval of time
  // first parameter is what should happen. We have given that the pressed class should get removed
  // second parameter is the time interval. It is in milliseconds. So, 100 means 0.1 second.

}

/*
*** Event Listener ***

They respond to some event
function -> addEventListener()

It has parameters -> (type, listener)

1. type of event eg. click

2. listener -> what to do on that event
JavaScript Function can be written there
*/

/*
We can pass a function inside a function

function add(num1, num2){
  return num1 + num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function calculator(num1, num2, operator) {
  return operator(num1, num2);
}

-> calculator(3,4,multiply);
*/

/*
Higher Order Functions -> These are functions which can take other functions as input

Callback Function: Function which is as a parameter to a Higher Order Function.
 It waits for the Higher order function to do its task
*/

/*
**** Debugging in Chrome Developer Tools ****

in the concole write->
debugger;
Shift + Enter

write which function/part of code we want to debugg
eg. calculator(3,4,multiply);
*/


/*
******************************** IMP **********************************

*** JavaScript Objects ***
eg. bellBoy1

var bellBoy1 = {
  name: "Timmy",
  age: 19,
  hasWorkPermit = true,
  languages: ["french", "english"]
  moveSuitcase: function() {
    alert("May I take your suitcase?");
    pickUpSuitcase();
    move();
  }
}

while calling it -> bellBoy1.name

calling method -> bellBoy1.moveSuitcase();

### we used Dot operator (notation)

---------------------------------------------------
*** Constructor Function ***

### the name of such function should be Capitalised, i.e start with capital letter and not follow camel casing

function BellBoy(name, age, hasWorkPermit, languages) {
  this.name = name; //-> this object has name = name
  this.age(property) = age(the value from parameter given);
  this.hasWorkPermit = hasWorkPermit;
  this.languages = languages;
  this.moveSuitcase = function() {    -> Methods
    alert("May I take your suitcase?");
    pickUpSuitcase();
    move();
  }
}

Note: in the function parameter for the function inside it is not there

### for calling the method ->
var bellBoy1 = new BellBoy("Timmy", 19, true, ["french", "english"]);
firstly initialising the object

bellBoy1.moveSuitcase();


*** Initialise Object ***

var bellBoy1 = new BellBoy("Timmy", 19, true, ["french", "english"]);
bellBoy1 object has been created using 'new' kwyword;
from the Constructor function BellBoy and given the parameters as given in the function

then in the function the 'this' keyword works for this object

******************************** IMP **********************************
*/
