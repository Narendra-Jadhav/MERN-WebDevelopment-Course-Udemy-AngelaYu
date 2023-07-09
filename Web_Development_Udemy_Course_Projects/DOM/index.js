
// alert("Hello, World!!!")

document.querySelector("h1").innerHTML = "Good Bye";
// it changes the text of h1, to the given text

/*
Note: The script tag is written just before the closing body tag.
It is because if the script is written before anything on screen, and it contains
code to change h1, h2, etc, then error will be shown.

Also, as the javascript can take more time to load. So, firstly the content will get loaded;
and then the javascript
*/


// ****************************************************************

/*
1.
document.getElementsByTagName("li");
-> returns the array of elements having li

document.getElementsByTagName("li")[2].style.color = "blue";
-> to change specific item. as it is a array, so using square bracket to get the specific item

2.
document.getElementsByClassName("btn"); -> returns array

document.getElementsByClassName("btn")[0].style.color = "red";


3.
document.getElementById("title").innerHTML = "Hello World, Good Bye!";
-> returns only one element as there can be only one ID, with that name on the html page

4.
documnet.querySelector("h1");
document.querySelector("#title");

-> both will give h1. One by tag name and other by id.
-> in query selector we can select any type of element tag, class, id.

***********
* We can also combine selectors in query selector. This helps in selecting more specific.
documnet.querySelector("li a");
or
document.querySelector("#list a");
-> selects anchor tag in li

***********
Note: when we specify some element and there are more than one of that type, then the first element
in order of occurence gets selected

eg.
document.querySelector("#list .item"); -> first list item gets selected

**********
To select all the items of that kind

document.querySelectorAll("#list .item");
-> it gives the array of all those items
-> we can use sqaure bracket to select specific item

**********

5. Note: In CSS style properties like font-size have hyphen in between.
But JavaScript follows Camel Casing. So, font-size is written as fontSize.

eg.
document.querySelector(".btn").style.backgroundColor = "yellow";
-> for backgroundColor of button

*/

/*

#### Styles MAnipulation ####

* eg. we have to change button's visibility

.invisible {
  visibility: hidden;
}
* Writing the style in CSS

* Now when to apply that style, writing that in JavaScript

#
document.querySelector("button").classList; -> gives the list of classes associated with button

#
document.querySelector("button").classList.add("invisible");
-> adds the invisible class to button; and hence then the button becomes invisible

#
document.querySelector("button").classList.remove("invisible");
-> removes the invisible class from button; and hence button becomes visible

#
document.querySelector("button").classList.toggle("invisible");
-> toggle means if the class is applied remove it; and if not applied add it

*/

/*
##### Text Manipulation #####

#
document.querySelector("h1").innerHTML = "<em>Bye Bye</em>";

#
document.querySelector("h1").textContent;

Note: with innerHTML we get all the html; ie text and tags in that.
But with textContent we get only the text.

So, with innerHTML we can change the html along with the text.
eg. we change text and made it italic also.

*/

/*

#### HTML Attributes MAnipulation ####

* Attributes are those inside a tag, other than the tag name

#
document.querySelector("a").attributes;
-> gives the dictionary of attributes of 'a' tag
-> dictionary has name and value of the attributes in it

#
document.querySelector("a").getAttribute("href");
-> gives what value is there in the href attribute

#
document.querySelector("a").setAttribute("href", "https://www.bing.com");
-> sets the value of the attribute
-> takes two parameters -> name of the attribute and the value we want to set

*/
