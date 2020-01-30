/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Returns article

 const createTweetElement = (tweetData) => {
  const $tweet = $('<article>');

  // Grab from tweetData
  const name = tweetData.user.name;
  const input = tweetData.content.text;
  const avatar = tweetData.user.avatars;
  const handle = tweetData.user.handle;
  const dateCreated = tweetData.created_at;

  const $header = $('<header>', {'class': 'tweet-header'});
  const $footer = $('<footer>', {'class': 'tweet-footer'});
  const $text =$('<span>', {'class': 'tweet-text'});

  $header.append(`
    <div class="user-info">
      <img class="tweet-img" src="${avatar}"/>
      <span class="tweet-name">${name}</span>
    </div>
    <span class="tweet-handle">${handle}</span>
  `);

  $footer.append("Footer Left");
  $footer.append(`
  <span class="tweet-icon">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </span>`);


  $text.text(input);
  $tweet.append($header, $text, $footer);
  console.log("TWEET:", $tweet);
 return $tweet;
  
 };

 const renderTweets = (tweets) => {
  $('#tweet-container').empty();
  for (const tweet of tweets) {
    let render = createTweetElement(tweet);
    $('#tweet-container').prepend(render);
  }
  
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

  const loadTweets = () => {
    $.ajax({ 
      url: '/tweets',
      method: 'GET',
      success: (tweets) => {
        renderTweets(tweets);
      }
    })
  };

  const sliderHeader = () => {
    $('.new-tweet').hide();
    $(document).ready(() => {
        $('.fa-angle-double-down').click(() => {
          $('.new-tweet').slideToggle();
        })
    });
  };

  const reportErrorMessage = (message) => {
    $('.tweet-error').slideDown();
    $('.tweet-error').empty();
    
    const $errorBox = $('.tweet-error');
    // const $wrapErrorBox = $('<div>', {'class': 'wrap-error-box'})
    $errorBox.append(`
    <div class='wrap-error-box'>
      <i class="fas fa-exclamation-triangle"></i>
      ${message}
      <i class="fas fa-exclamation-triangle"></i>
    <div>
    `);
  };

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
