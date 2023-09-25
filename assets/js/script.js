// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  function colorTimeBlocks() {
    var timeBlocks = $("div.time-block");
    var timeBlocksPast = timeBlocks.filter(function() {
      return Number($(this).attr("id").substring(5)) < dayjs().hour();
    });
    var timeBlocksPresent = timeBlocks.filter(function() {
      return Number($(this).attr("id").substring(5)) === dayjs().hour();
    })
    var timeBlocksFuture = timeBlocks.filter(function() {
      return Number($(this).attr("id").substring(5)) > dayjs().hour();
    })
    
    timeBlocksPast.addClass("past").removeClass("present").removeClass("future");
    timeBlocksPresent.addClass("present").removeClass("past").removeClass("future");
    timeBlocksFuture.addClass("future").removeClass("present").removeClass("past");
  }

  colorTimeBlocks();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
});
