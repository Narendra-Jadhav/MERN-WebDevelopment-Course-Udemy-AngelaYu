
/*
*** jQuery ***

JavaScript Library to help us write less code

eg.
documnet.querySelector("h1");
This can be written using jQuery as ->

jQuery("h1") or $("h1")

*/

// jQuery("h1").css("color", "red");

// or

// $("h1").css("color", "red");
// we are changing the css of the document and the color property of css

/*
Note: If we include the jQuery script tag in the head, then we have to write the code as ->

$(document).ready(function() {
  $("h1").css("color", "red");
});

-> it means that, when the document is ready then apply the jQuery

-> but we can avoid writing this by including the script tag just before the closing body tag and javascript script tag

*/

/*
***** Selecting Elements with jQuery *****

document.querySelector("h1");
$("h1");

document.querySelectorAll("button");
$("button");

$ is same for selecting one h1 and also all the buttons

*/

/*
***** Manipulating Styles with jQuery *****

## when there is one parameter in css, then we are GETTING value of it, and we can console log or use that

## when there are two parameters in css, then we are SETTING the value of first one
*/
// console.log($("h1").css("font-size"));

// $("h1").css("font-size", "10rem");

/*
***** Adding Class *****

-> we do so, so that we can write styles in CSS and add that class here when we want
*/

$("h1").addClass("big-title margin-50");

// $("h1").removeClass("big-title"); -> to remove the class

// We can add multiple classes, by including in same quotation marks with space in between

// $("h1").hasClass("margin-50"); -> it returns true/false according to whether that class is present in it or not


/*
***** Manipulating Text with jQuery *****

## with 'text' method we can change only the text of the element

## with 'html' method we can change text along with the html code inside that element
*/

$("h2").text("Good Bye, World!");

$("button").html("<em>Don't Click Me</em>");


/*
***** MAnipulating Attributes with jQuery

## with 'attr' method we can GET and SET Attributes.

## With only one atrribute we can get the value in that attribute, and with second parameter we can SET that value

## NOTE: class="" -> class is also a attribute and we can GET and SET its value with 'attr' method
*/

$("a").attr("href", "https://www.yahoo.com");


/*
***** Adding Event Listeners with jQuery *****

## we are adding 'click' event listener, and on clicking on h1, its color will change
*/

$("h1").click(function() {
  $("h1").css("color", "purple");
});

/*
In JavaScript we had to use a for loop for selecting all the buttons,
but in jQuery, it by default selects all the buttons with $("button")
*/

/*
$("button").click(function() {
  $("h1").css("color", "blue");
});
*/

$("input").keypress(function(event) {
  $("p").text(event.key);  // we can also console log it
});

$(document).keypress(function(event) { // when we press on the whole document/website
  $("h1").text(event.key);
});

/*
## we can use 'on' method to mention any event.
## it has two parameters -> first event, and second what to do on that (function)
*/

$("h1").on("mouseover", function() { // mouseover -> when mouse goes over that element
  $("h1").css("color", "orange");
});


/*
***** Adding and Removing Elements with jQuery *****

## while the website is running, we can edit the html code
*/

$("h1").before("<button>New1</button>");  // before -> to put before that element's tag

$("h1").after("<button>New2</button>"); // after -> to put after that element's tag

$("h1").prepend("<button>New3</button>"); // prepend -> to put inside that element's tag;
 // but Before the Text/content(incuding other tags, if any)

$("h1").append("<button>New4</button>"); // append -> to put inside that element's tag;
 // but After the Text/content(incuding other tags, if any)

$("h3").remove(); // to Remove some element


/*
***** Website Animations with jQuery *****
*/

/*
$("button").click(function() {
  $("h1").hide(); // it will hide the h1
});

$("button").click(function() {
  $("h1").show(); // it will again show the h1
});


$("button").click(function() {
  $("h1").toggle();  // it will toggle, i.e when h1 is hidden it will show it on click and vice versa
});


$("button").click(function() {
  $("h1").fadeToggle(); // it is not sudden like hide/show and is gentle
});
//there are also 'fadeOut' and 'fadeIn' in it similar to hide/show


$("button").click(function() {
  $("h1").slideToggle();  // it will make element slide up and down
});
// it also has 'slideUp' and 'slideDown'
// * Useful for Dropdown Menu *

$("button").click(function() {
  $("h1").animate({opacity: 0.5});
});

/* IMP *
Note: 'animate' method is for Custom Animation, where we can put CSS code inside it.
Note: But in animate, the value of the property should be 'NUMERIC'. It can't be String
eg. we cannot put (color: "red") as animation in it
eg. margin: "20%" is valid as 20% is of some number
*/

$("button").click(function() {
  $("h1").slideUp().slideDown().animate({opacity: 0.5});
});

/*
NOTE: We can give a SERIES of Animations by making thier chain one after the other with DOT in between.
They will happen in the order as mentioned
*/
