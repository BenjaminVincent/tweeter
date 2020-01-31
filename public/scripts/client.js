/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  $(document).ready(() => {

    const $form = $('#tweet-container-form');
    const $text = $('#tweet-area');
    $('.tweet-error').hide();
    sliderHeader();
    loadTweets();
    
    $form.submit((event) => {
      event.preventDefault();
      if ($text.val().length > 140) {
        return reportErrorMessage("The tweet must be under the character count!");
      } else if ($text.val() === '') {
        return reportErrorMessage('Comon, saay sumpin!');
      }
      $('.tweet-error').slideUp();
        $.ajax({
          url: '/tweets', 
          method: 'POST',
          data: $form.serialize(),
          success: () => {
            loadTweets();
            $('#counter').text(140);
            $('#tweet-area').val('').focus();
          },
          error: (error) => {
            console.log(error);
          }
        })
        return false;
      });
})
