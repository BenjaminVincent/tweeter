/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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

  $footer.append(formatTime(dateCreated));
  $footer.append(`
  <span class="tweet-icon">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </span>`);


  $text.text(input);
  $tweet.append($header, $text, $footer);

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
          if ($('.new-tweet').is(':visible')){
            $('#tweet-area').focus();
          }
        })
    });
  };

  const reportErrorMessage = (message) => {
    $('.tweet-error').slideDown();
    $('.tweet-error').empty();
    
    const $errorBox = $('.tweet-error');
    $errorBox.append(`
      <div class='wrap-error-box'>
        <i class="fas fa-exclamation-triangle"></i>
        ${message}
        <i class="fas fa-exclamation-triangle"></i>
      <div>
    `);
  };

  const formatTime = (dateCreated) => {
    const timeSinceCreation = Date.now() - dateCreated;
    const minutes = Math.floor(timeSinceCreation / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (minutes <= 1) return `Just now`;
    else if (minutes < 60) return `${minutes} minutes ago`;
    else if (hours < 24) return `${hours} hours ago`;
    else if (days < 14) return `${days} days ago`;
    else if (weeks < 8) return `${weeks} weeks ago`;
    else if (months < 24) return `${months} months ago`;
    else return `${years} years ago`;

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
