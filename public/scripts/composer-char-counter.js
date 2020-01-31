
$(document).ready(function() {
  let max = 140;

  $("#tweet-area").keyup(function() {
    let length = $(this).val().length;
    let remaining = max - length;
    $("#counter").text(remaining);

    if (remaining < 0) {
      document.getElementById('counter').style.color = "#ED6A5A";
      document.getElementById('tweet-area').style.color = "#ED6A5A";
    } else {
      document.getElementById('counter').style.color = "#545149";
      document.getElementById('tweet-area').style.color = "black";
    }
  });
});
