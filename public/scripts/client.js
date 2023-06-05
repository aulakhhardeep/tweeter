$(document).ready(function() {

  //hide error message initially
  $('.error-message').hide();
  function createTweetElement(tweet) {
    const $tweet = $(`
    <article class="tweet tweet-box">
      <div class="user">
        <img class="avatar" src="${tweet.user.avatars}">
        <h2 class="name">${tweet.user.name}</h2>
        <span class="handle">${tweet.user.handle}</span>
      </div>
      <div class="content">
        <p class="text">${$("<div>").text(tweet.content.text).html()}</p>
      </div>
      <footer class="footer">
        <span class="timestamp">${timeago.format(tweet.created_at)}</span>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `);
    return $tweet;
  }

  function renderTweets(tweets) {
    // Empty the "".create-tweet" container
    $('.create-tweet').empty();
  
    // Iterate over the tweets array in reverse order
    for (let i = tweets.length - 1; i >= 0; i--) {
      // Create a tweet element using createTweetElement function
      const $tweet = createTweetElement(tweets[i]);
  
      // Append the tweet element to "create-tweet" container
      $('.create-tweet').append($tweet);
    }
  }
  
  

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(xhr, status, error) {
        console.log("Error loading tweets:", error);
      }
    });
  }

  $(".tweet-form").submit(function(event) {
    event.preventDefault(); // Prevent the default form submission


    //Hide the error message element before validation
    $('.error-message').slideUp();
    const formData = $(this).serialize(); // Serialize the form data
    const tweetText = $(this).find("#tweet-text").val(); // Get the tweet text

    // Perform validation checks
    if (!tweetText) {
      $('.error-text').text("Tweet content is required."); // Display an error message
      $('.error-message').slideDown();
      return; // Stop the execution
    }

    if (tweetText.length > 140) {
      $('.error-text').text("Tweet content is too long."); // Display an error message
      $('.error-message').slideDown();
      return; // Stop the execution
    }

    // If validation passes, send the form data to the server
    $.ajax({
      url: "/tweets",
      type: "POST",
      data: formData,
      success: function(response) {
        console.log("Form data sent to the server:", formData);

        // Fetch the updated list of tweets
        $.ajax({
          url: "/tweets",
          method: "GET",
          dataType: "json",
          success: function(tweets) {
            renderTweets(tweets); // Re-render the tweets on the page
          },
          error: function(xhr, status, error) {
            console.log("Error loading tweets:", error);
          }
        });
      }
    });
  });

  loadTweets(); // Load tweets on page load
});
