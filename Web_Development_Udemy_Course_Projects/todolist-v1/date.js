/*
Module Exports

We can make our own modules and export them to the files we want
Here we have made the Date module which will return Today's Date
*/

// module.exports.getDate = getDate;
// This makes our own module and we can require it in the project we want. Just we have to give the whole path of the file
/*
module.exports states what we have to export.
So, we are exporting the function
But we have not included () after the function, because we don't want to call the function now.
We only pass the function and let the user to call it when he wants
*/

// NOTE: module.exports is a JavaScript Object
// So, we can use it to include as many functions as we want using the dot(.) operator

// we can neglect the word 'module' and simply write 'exports.'
exports.getDate = function() {
  // it is now an anonymous function

  const today = new Date();
  // Date objects help us to work with dates
  // new Date() creates a new date object with current date and time
  // var currentDay = today.getDay();
  // var day = "";

  /*
  if (currentDay === 6 || currentDay === 0) {
    // getDay() method returns the day of the week (0 to 6) of a date
    // 0 -> Sunday, 1 -> Monday ... , 6 -> Saturday

    // So, here we are getting the day number of today
    day = "Weekend";

  } else {
    day = "Weekday";
  }
  */
  /*
  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;

    case 1:
      day = "Monday";
      break;

    case 2:
      day = "Tuesday";
      break;

    case 3:
      day = "Wednesday";
      break;

    case 4:
      day = "Thursday";
      break;

    case 5:
      day = "Friday";
      break;

    case 6:
      day = "Saturday";
      break;

    default: console.log("Error! currentDay is equal to: " + currentDay);

  }
  */
  // Instead of this long switch statement, we can use JavaScript Code

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  // these options will specify that we want the day and month to be long, i.e full name

  return today.toLocaleDateString("en-US", options);
  // the toLocaleDateString() method returns the full date in String format. We have passes en-US to get it in English
}

// So we can use date.getDay() or date.getDate() in our file. So, the object has two functions
exports.getDay = function() {
  const today = new Date();

  const options = {
    weekday: "long",
  };

  return today.toLocaleDateString("en-US", options);
}
