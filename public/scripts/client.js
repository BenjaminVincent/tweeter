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

// Returns article
 const createTweetElement = (tweetData) => {
  const $article = $('<article>');

  // Grab from tweetData
  const name = tweetData.user.name;
  const input = tweetData.content.text;
  const avatar = tweetData.user.avatars;
  const handle = tweetData.user.handle;
  const dateCreated = tweetData.created_at;

  console.log("NAME:", name);
  console.log("INPUT:", input);
  console.log("AVATAR:", avatar);
  console.log("HANDLE:", handle);
  console.log("DATE CREATED:", dateCreated);

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
  $article.append($header);
  $article.append($text);
  $article.append($footer);

 return $article;
  
 };


 const $tweet1 = createTweetElement(tweetData);
 const $tweet2 = createTweetElement(tweetData);
 const $tweet3 = createTweetElement(tweetData);

$(document).ready(function() {
  $('#tweet-container').append($tweet1);
  $('#tweet-container').append($tweet2);
  $('#tweet-container').append($tweet3);
})

