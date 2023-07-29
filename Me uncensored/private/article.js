const buttons = document.querySelectorAll('button');
const links = document.querySelectorAll('a');

buttons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default button behavior
  });
});

function recommended() {
  // Get the category from the element with class "category-display"
  const category = document.querySelector('.category-display').textContent.trim();

  // Filter the posts array based on the category
  const filteredPosts = Posts.filter((post) => post.category === category);

  // Get the first three posts from the filtered array
  const recommendedPosts = filteredPosts.slice(0, 3);

  let recommendedHTML = ''; // Initialize an empty string to store the HTML markup

  // Iterate over the recommended posts
  recommendedPosts.forEach((post) => {
    // Generate the HTML markup for each post
    let postHTML = `
      <a href="${post.filePath}" target="_blank">
        <div class="blog-card">
          <img src="${post.coverImage}" alt="Cover Image">
          <div class="content">
            <h2>${post.heading}</h2>
            <p>${post.description}</p>
          </div>
        </div>
      </a>
    `;

    recommendedHTML += postHTML; // Append the post HTML to the recommendedHTML string
  });

  let recommendedContainer = document.querySelector('.recommended');
  recommendedContainer.innerHTML = recommendedHTML; // Set the generated HTML as the content of the .recommended element
}

recommended();

// social media sharing
function shareOnFacebook() {
  let articleURL = window.location.href; // Get the current article URL
  let facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleURL)}`;
  window.open(facebookURL, '_blank');
}

function shareOnTwitter() {
  let articleURL = window.location.href; // Get the current article URL
  let encodedTitle = encodeURIComponent('Your article title'); // Replace with your article title
  let twitterURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleURL)}&text=${encodedTitle}`;
  window.open(twitterURL, '_blank');
}

function shareOnLinkedIn() {
  let articleURL = window.location.href; // Get the current article URL
  let encodedTitle = encodeURIComponent('Your article title'); // Replace with your article title
  let encodedDescription = encodeURIComponent('Your article description'); // Replace with your article description
  let linkedInURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleURL)}&title=${encodedTitle}&summary=${encodedDescription}`;
  window.open(linkedInURL, '_blank');
}

function shareOnInstagram() {
  let articleURL = window.location.href; // Get the current article URL
  let encodedTitle = encodeURIComponent('Your article title'); // Replace with your article title
  let encodedDescription = encodeURIComponent('Your article description'); // Replace with your article description
  let encodedImageURL = encodeURIComponent('Your article image URL'); // Replace with your article image URL
  let instagramURL = `https://www.instagram.com/create/details/?source_url=${encodeURIComponent(articleURL)}&title=${encodedTitle}&caption=${encodedDescription}&url=${encodedImageURL}`;
  window.open(instagramURL, '_blank');
}
