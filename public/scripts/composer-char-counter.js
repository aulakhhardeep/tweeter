//DOM loaded
$(document).ready(function() {
  $("textarea").on("input", function() {

    //getting length of textarea input
    let inputLength = $(this).val().length;

    //referencing to the counter element
    let counter = $(this).closest('.new-tweet').find('.counter');

    let charactersLeft = 140 - inputLength;

    // Update the counter on the page
    counter.text(charactersLeft);
  
    // Toggle the CSS class based on character limit
    counter.toggleClass('exceeded', charactersLeft < 0);
  });
});