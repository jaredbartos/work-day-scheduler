// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // Change class of time blocks relative to current time of day to set color
  var colorTimeBlocks = function() {
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
  
  // Display confirmation message that appointment was saved in local storage
  var displayConfirmation = function() {
    var messageTimer = 4
    var messageInterval = setInterval(function() {
      if (messageTimer > 0) {
        $("#addedMessageContainer").attr("style", "display: block")
        messageTimer -= 0.1;
      } else {
        clearInterval(messageInterval);
        $("#addedMessageContainer").attr("style", "display: none");
      }
    }, 100)
  }
  
  // Populate time blocks with saved data in local storage 
  $("div.time-block").each(function() {
      var hourKey = $(this).attr("id");

      if (localStorage.getItem(hourKey) !== null) {
        $(this).children("textarea").val(localStorage.getItem(hourKey))
      }
    })
  
  // Show current date
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  colorTimeBlocks();

  // Add event listener to save buttons, which save textarea values to local storage
  $("button.saveBtn").click(function() {
    var hourID = $(this).parent().attr("id");
    var textAreaValue = $(this).prev().val();
    localStorage.setItem(hourID, textAreaValue);
    displayConfirmation();
  })
});