// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  $("button.saveBtn").click(function() {
    var hourID = $(this).parent().attr("id");
    var textAreaValue = $(this).prev().val();
    localStorage.setItem(hourID, textAreaValue);
  })

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
