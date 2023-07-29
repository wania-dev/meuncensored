let blogContainer = document.querySelector('.blogContainer');
let mainBlog = document.querySelector('.mainBlog');
let categoryClicked

function displayPosts(startIndex, category) {
    // Clear existing content in the blogContainer and mainBlog
    blogContainer.innerHTML = '';
    mainBlog.innerHTML = '';
    categoryClicked = category
  
    // Filter the posts based on the category
    let filteredPosts = (category === 'all') ? Posts : Posts.filter(post => post.category === category);
     // Remove the active class from all buttons
  const buttons = document.querySelectorAll('.button-category button');
  buttons.forEach(button => button.classList.remove('active'));

  // Add the active class to the selected button
  const selectedButton = document.querySelector('.button-category');
  switch (category) {
    case 'all':
      selectedButton.querySelector('.all').classList.add('active');
      break;
    case 'LITERATURE':
      selectedButton.querySelector('.lit').classList.add('active');
      break;
    case 'CULTURE & HERITAGE':
      selectedButton.querySelector('.ch').classList.add('active');
      break;
    case 'TECHNOLOGY & INNOVATION':
      selectedButton.querySelector('.tech').classList.add('active');
      break;
    case 'POLITICS & CURRENT EVENTS':
      selectedButton.querySelector('.polC').classList.add('active');
      break;
    default:
      break;
  }
    // Loop through the filtered posts starting from the specified index
    for (let i = startIndex; i < filteredPosts.length; i++) {
      const post = filteredPosts[i];
  
      // Create a post element
      const postElement = document.createElement('a');
      postElement.classList.add('post');
      postElement.href = `../article/${post.filePath}`;
      postElement.style.color = 'black';
      postElement.target = '_blank'
  
      const postContent = document.createElement('div');
      postContent.classList = 'post-content';
  
      // Create elements for heading, description, cover image, etc.
      const headingElement = document.createElement('h2');
      headingElement.textContent = post.heading;
      postContent.appendChild(headingElement);
  
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = post.description;
      postContent.appendChild(descriptionElement);
  
      const coverImageElement = document.createElement('img');
      coverImageElement.src = post.coverImage;
      coverImageElement.classList = 'post-image';
  
      // Append the elements to the post element
      postElement.appendChild(coverImageElement);
      postElement.appendChild(postContent);
  
      // Append the post element to the blogContainer or mainBlog
      if (i === startIndex && getComputedStyle(mainBlog).display === 'block' && mainBlog.innerHTML === '') {
        // Display the first object in mainBlog if it's empty
        const mainBlogPostElement = document.createElement('a');
        mainBlogPostElement.classList.add('main-blog-post');
        mainBlogPostElement.href = `../article/${post.filePath}`;
        mainBlogPostElement.style.color = 'black';
        mainBlogPostElement.target = '_blank'
  
        const mainBlogImageElement = document.createElement('img');
        mainBlogImageElement.src = post.coverImage;
        mainBlogImageElement.classList = 'main-blog-image';
  
        const mainBlogContentElement = document.createElement('div');
        mainBlogContentElement.classList = 'main-blog-content';
  
        const mainBlogHeadingElement = document.createElement('h2');
        mainBlogHeadingElement.textContent = post.heading;
        mainBlogContentElement.appendChild(mainBlogHeadingElement);
  
        const mainBlogDescriptionElement = document.createElement('p');
        mainBlogDescriptionElement.textContent = post.description;
        mainBlogContentElement.appendChild(mainBlogDescriptionElement);
  
        const mainBlogDateElement = document.createElement('p');
        mainBlogDateElement.textContent = post.date;
        mainBlogContentElement.appendChild(mainBlogDateElement);
  
        mainBlogPostElement.appendChild(mainBlogImageElement);
        mainBlogPostElement.appendChild(mainBlogContentElement);
        mainBlog.appendChild(mainBlogPostElement);

        // Apply animation to the main blog post
      animateOnScroll(mainBlogPostElement);
      } else{
        // Display other posts in blogContainer
        blogContainer.appendChild(postElement);
        // Apply animation to the blog card
      animateOnScroll(postElement);
      }
    }
}
  // Call the displayPosts function with the desired startIndex and category
displayPosts(0, 'all');
  
// search btn clicked
let searchInput = document.querySelector('#searchInput')
let SearchCancelIcon = document.querySelector('.search')
// Declare variables to store original cards and search value
let originalCards = [];
let searchValue = '';

function searchClicked() {
    // Hide the main blog container
    mainBlog.style.display = 'none';
    displayPosts(0, categoryClicked)

  searchInput.style.display = 'inline';
  SearchCancelIcon.innerHTML = 'close';
  SearchCancelIcon.onclick = cancelClicked;

  // Add event listener to search input field
  searchInput.addEventListener('input', searchCards);

  // Add event listener to track focus on search input field
  searchInput.addEventListener('focus', recordOriginalCards);
}
function cancelClicked() {
    // Show the main blog container
    mainBlog.style.display = 'block';

  // Clear input field
  searchInput.value = '';

  searchInput.style.display = 'none';
  SearchCancelIcon.innerHTML = 'search';
  SearchCancelIcon.onclick = searchClicked;
  displayPosts(0, categoryClicked)
}

// Record the original cards when search input field is focused
function recordOriginalCards() {
  const blogContainer = document.querySelector('.blogContainer');
  originalCards = Array.from(blogContainer.querySelectorAll('.post'));
}

// Search cards and display on type
function searchCards() {
  const blogContainer = document.querySelector('.blogContainer');
  const searchValue = searchInput.value.trim().toLowerCase();

  // Clear existing content in the blogContainer
  blogContainer.innerHTML = '';

  if (searchValue === '') {
    // Display original cards if search value is empty
    displayOriginalCards();
  } else {
    // Filter and display matching cards based on search value
    const matchingCards = originalCards.filter((card) => {
      const heading = card.querySelector('h2').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      return heading.includes(searchValue) || description.includes(searchValue);
    });

    matchingCards.forEach((card) => {
      blogContainer.appendChild(card);
    });
  }
}
// Helper function to display original cards in blogContainer
function displayOriginalCards() {
  const blogContainer = document.querySelector('.blogContainer');
  originalCards.forEach((card) => {
    blogContainer.appendChild(card);
  });
}
// Helper function to apply animation on scroll
function animateOnScroll(element) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.add('animate');
          observer.unobserve(element);
        }
      });
    });
  
    observer.observe(element);
}