$(document).ready(function() {
  $('#btn').click((event) => {

    event.preventDefault();

    // grab the tweet container
    const $article = $('.tweet-container');
    // grab input
    const input = $('#tweet-area').val();

    // create new article
    const $art = $('<article>');

    // header and footer should be inside the article
    const $header = $('<header>', {'class': 'tweet-header'});
    const $footer = $('<footer>', {'class': 'tweet-footer'});
    const $text =$('<span>', {'class': 'tweet-text'});

    // add header content
    // $header.append('<img class="tweet-img" src="/images/profile-hex.png"/>');
    // $header.append('<span class="tweet-name">Bejamin Vincent</span>');
    // $header.append('<span class="tweet-handler">@Ben</span>');
    $header.append(`
      <div class="user-info">
        <img class="tweet-img" src="/images/profile-hex.png"/>
        <span class="tweet-name">Bejamin Vincent</span>
      </div>
      <span class="tweet-handler">@Ben</span>
    `);

    // add footer content
    $footer.append("Footer Left");
    $footer.append('<span class="tweet-icon">1 2 3</span>');
    // $footer.append('<i class="fas fa-retweet"></i>');

    // place input in article
    $text.text(input);
    $art.append($header);
    $art.append($text);
    $art.append($footer);

    $article.prepend($art);


    $('#tweet-area').val('').focus();
  }); 
});