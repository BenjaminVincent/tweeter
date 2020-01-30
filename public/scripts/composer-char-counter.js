

$(document).ready(function() {

  let max = 140;
  let tweetable = true;
  $("#tweet-area").keyup(function() {
    let length = $(this).val().length;
    let remaining = max - length;
    $("#counter").text(remaining);
    if (remaining < 0) {
      tweetable = false;
      document.getElementById('counter').style.color = "#d14343";
      document.getElementById('tweet-area').style.color = "#d14343";
    } else {
      tweetable = true;
      document.getElementById('counter').style.color = "#545149";
      document.getElementById('tweet-area').style.color = "black";
    }
  });


});
