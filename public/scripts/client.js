/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Steve",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@Wewe-Thompson"
    },
    "content": {
      "text": "Hey I'm steve"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@BowlCutDude999" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
    <span class="tweet-handler">${handle}</span>
  `);

  $footer.append("Footer Left");
  $footer.append('<span class="tweet-icon">1 2 3</span>');


  $text.text(input);
  $tweet.append($header, $text, $footer);
  // $tweet.append($text);
  // $tweet.append($footer);

 return $tweet;
  
 };

 const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    let render = createTweetElement(tweet);
    $('#tweet-container').append(render);
  }
}


 const $tweet1 = createTweetElement(tweetData);

$(document).ready(() => {
  // const BASE_URL = 'http://localhost:8080';
  // renderTweets(data);
  const $form = $('#tweet-container-form');

  
  $form.submit((event) => {
    event.preventDefault();
    $.ajax({
      url: '/tweets', 
      method: 'POST',
      data: $form.serialize(),
      success: (post) => {
        console.log(post);
        // renderTweets(post);
        $('#tweet-area').val('').focus();
      },
      error: (error) => {
        console.log(error);
      }
    })
  });
})

