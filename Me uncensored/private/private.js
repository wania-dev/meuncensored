const buttons = document.querySelectorAll('button');

buttons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default button behavior

    // Add your desired functionality here
    // This code will be executed when a button is clicked
  });
});

function clearInput(event, button) {
    event.preventDefault(); // Prevent the default button behavior

    // Find the parent element of the button
    const parent = button.parentElement;
  
    // Find the input field within the parent element
    const inputField = parent.querySelector('input');
  
    // Clear the input field's value
    inputField.value = '';
}

function clearArticle(event){
    event.preventDefault(); // Prevent the default button behavior
    document.querySelector('.article-body').value = "";
}

function toggleCheck(item) {
    item.classList.toggle('checked');
}

// category selection
function updateInputValue(selectElement) {
    const selectedOption = selectElement.value;
    const inputElement = selectElement.previousElementSibling;
  
    inputElement.value = selectedOption;
}

function addKeywords(event) {
    event.preventDefault(); // Prevent the default button behavior
  
    const keyword = prompt("Enter a keyword:");

    if (keyword) {
        // Check if the keyword is more than one word
        const isMultipleWords = keyword.trim().split(" ").length > 1;
    
        if (isMultipleWords) {
          alert("Please enter a single word keyword.");
          return; // Stop the function execution
        }

    if (keyword) {
      // Create a span element
      const keywordSpan = document.createElement("span");
      keywordSpan.classList.add("keyword");
      
      // Create a text node with the keyword
      keywordSpan.innerHTML = `${keyword}<span class="cross" onclick="cancelSpan(this)">✕</span>`
     
      // Append the keyword span to the keywords container
      const keywordsContainer = document.querySelector(".keywords-display");
      keywordsContainer.appendChild(keywordSpan);
    }
}
}  

function cancelSpan(span){
    const parent = span.parentElement;

    parent.remove();
}

function saveDataToLocalStorage() {
    // Collect data
    let titleHeading = document.querySelector('.heading-title-input').value;
    let category = document.querySelector('.category-input').value;
    let date = document.querySelector('.date-input').value;
    let fileName = document.querySelector('.filename').value;
    let introduction = document.querySelector('.introduction').value;
    let articleContent = document.querySelector('.article-body').value;
    let imageFilepath = document.querySelector('.image-filepath').value;
    let imageAltTxt = document.querySelector('.image-alt-txt').value;
    let metaDescription = document.querySelector('.meta-description').value;
    let keywords = document.querySelector('.keywords-display').innerHTML;
  
    // Save data to localStorage
    localStorage.setItem('titleHeading', titleHeading);
    localStorage.setItem('category', category);
    localStorage.setItem('date', date);
    localStorage.setItem('fileName', fileName);
    localStorage.setItem('introduction', introduction);
    localStorage.setItem('articleContent', articleContent);
    localStorage.setItem('imageFilepath', imageFilepath);
    localStorage.setItem('imageAltTxt', imageAltTxt);
    localStorage.setItem('metaDescription', metaDescription);
    localStorage.setItem('keywords', keywords);
}
// Set interval to automatically save data every minute (60000 milliseconds)
setInterval(saveDataToLocalStorage, 60000);

// on load it retreives the data
window.onload = function() {
    // Retrieve data from localStorage
    let titleHeading = localStorage.getItem('titleHeading');
    let category = localStorage.getItem('category')
    let date = localStorage.getItem('date');
    let fileName = localStorage.getItem('fileName');
    let introduction = localStorage.getItem('introduction');
    let articleContent = localStorage.getItem('articleContent');
    let imageFilepath = localStorage.getItem('imageFilepath');
    let imageAltTxt = localStorage.getItem('imageAltTxt');
    let metaDescription = localStorage.getItem('metaDescription');
    let keywords = localStorage.getItem('keywords');
  
    // Populate form inputs with retrieved data
    document.querySelector('.heading-title-input').value = titleHeading;
    document.querySelector('.category-input').value = category; // Modified line
    document.querySelector('.date-input').value = date;
    document.querySelector('.filename').value = fileName;
    document.querySelector('.introduction').value = introduction;
    document.querySelector('.article-body').value = articleContent;
    document.querySelector('.image-filepath').value = imageFilepath;
    document.querySelector('.image-alt-txt').value = imageAltTxt;
    document.querySelector('.meta-description').value = metaDescription;
    document.querySelector('.keywords-display').innerHTML = keywords;
};  

// construct page
function createHTMLpage(){
    saveDataToLocalStorage()

    // collect saved data from localstorage
    let titleHeading = localStorage.getItem('titleHeading');
    let category = localStorage.getItem('category')
    let date = localStorage.getItem('date');
    let introduction = localStorage.getItem('introduction');
    let articleContent = localStorage.getItem('articleContent');
    let imageFilepath = localStorage.getItem('imageFilepath');
    let imageAltTxt = localStorage.getItem('imageAltTxt');
    let metaDescription = localStorage.getItem('metaDescription');
    let keywords = document.querySelectorAll('.keyword')

    // Create an empty array to store the extracted keywords
    let keywordsList = [];

    // Loop through the elements with the class "keyword" and extract the keyword text from each span element
    keywords.forEach(keywordElement => {
        let keywordText = keywordElement.textContent;

        // Remove the "close" icon (✕) from the keyword text
        keywordText = keywordText.replace(/✕/g, "").trim();

        // Add the cleaned keyword to the list
        if (keywordText !== "") {
            keywordsList.push(keywordText);
        }
    });

    // Join the keywords into a single string with commas separating them
    let keywordString = keywordsList.join(", ");

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${titleHeading}</title>
        <meta name="description" content="${metaDescription}">
        <meta name="keywords" content="${keywordString}">
        <link rel="shortcut icon" href="/multimedia/MU.ico" type="image/x-icon">
        <link rel="stylesheet" href="/private/article.css">
        <link rel="stylesheet" href="/global/fontFamily.css">
        <link rel="stylesheet" href="/global/navBar, footer, scrollbar.css">
        <script src="/private/article.js" defer></script>
        <script src="/global/objects.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
    <div class="wrapper">
        <nav>
            <a href="/index.html" target="_blank" rel="noopener noreferrer">me uncensored</a>
        </nav>
        <p class="category-display">${category}</p>
        <h1 class="heading">${titleHeading}</h1>
        <header class="introduction">${introduction}</header>
        <p class="date">${date}</p>
        <img class="coverImage" src="${imageFilepath}" alt="${imageAltTxt}">

        <div class="social-media">
            <a href="#" class="fa fa-facebook"></a>
            <a href="#" class="fa fa-twitter"></a>
            <a href="#" class="fa fa-linkedin"></a>
            <a href="#" class="fa fa-instagram"></a>
        </div>

        <article class="article">
            ${articleContent}
        </article>
    
    <div style="font-size: 15px; font-family: pathway extreme; margin: 10px; font-weight: 900;">More from <span style="text-transform: capitalize;">${category.toLocaleLowerCase()}</span></div>
    <div class="recommended">
        <!-- three previous objects come here. -->
    </div>
</div>

        <footer>
            <p>Developed by <a href="wwwd.vercel.app" target="_blank" rel="noopener noreferrer">Wania</a>. All rights reserved.</p>
            <p>© 2023 me uncensored LLC</p>
        </footer>
</body>
</html>
  `;
  return htmlContent
}
function test(){
    var page = window.open("width=100vw,height=100vh,scrollbars=1,resizable=1")

    let htmlContent = createHTMLpage()

    page.document.open()
    page.document.write(htmlContent)
    page.document.close()
}

function DownloadPage(){
    createAndDisplayObject()
    let fileName = localStorage.getItem('fileName');

    const htmlContent = createHTMLpage();

    // Create a Blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Programmatically trigger a click event on the link element
    link.click();

    // Clean up the URL object after the download
    URL.revokeObjectURL(link.href);
}

// object creation
function createAndDisplayObject() {
    // Retrieve data from localStorage
    let titleHeading = localStorage.getItem('titleHeading');
    let fileName = localStorage.getItem('fileName');
    let category = localStorage.getItem('category');
    let date = localStorage.getItem('date');
    let introduction = localStorage.getItem('introduction');
    let imageFilepath = localStorage.getItem('imageFilepath');
  
    // Display the object in the container
  let container = document.querySelector('.object');
  container.innerHTML = `
        {<br>
            heading: "${titleHeading}", <br>
            description: "${introduction}",<br>
            date: "${date}",<br>
            coverImage: "${imageFilepath}",<br>
            filePath: "${fileName}.htm",<br>
            category: "${category}",<br>
        }
  `
}
function clearLocalStorage(){
    localStorage.clear()
}
