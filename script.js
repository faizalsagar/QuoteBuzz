const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const copyQuoteButton = document.getElementById('copy-quote');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const body = document.body;

// Check if the user has a preferred mode saved
const userPreferredMode = localStorage.getItem('preferredMode');

if (userPreferredMode === 'dark') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
});

function enableDarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('preferredMode', 'dark');
    // Update the button icon to the moon (Font Awesome class)
    modeIcon.innerHTML = '<i class="fas fa-moon"></i>';
}

function enableLightMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('preferredMode', 'light');
    // Update the button icon to the sun (Font Awesome class)
    modeIcon.innerHTML = '<i class="fas fa-sun"></i>';
}


let cachedQuotes = []; // Array to store cached quotes

async function fetchRandomQuote() {
    try {
        // Check if there are cached quotes
        if (cachedQuotes.length > 0) {
            // Serve a quote from the cache
            const randomIndex = Math.floor(Math.random() * cachedQuotes.length);
            const cachedQuote = cachedQuotes.splice(randomIndex, 1)[0];
            quoteElement.textContent = cachedQuote;
        } else {
            // Fetch a new quote from the API
            const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        const quote = data.content;
        const author = data.author;

        quoteElement.textContent = `"${quote}"`; // Quote text
        authorElement.textContent = ` ${author}`; // Author's name

            // Store the new quote in the cache
            cachedQuotes.push(quote);
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

// Function to copy the quote and author to the clipboard
function copyQuote() {
    const textToCopy = `${quoteElement.textContent} ${authorElement.textContent}`;
    
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = textToCopy;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);

    alert('Quote copied to clipboard!');
}

newQuoteButton.addEventListener('click', fetchRandomQuote);
copyQuoteButton.addEventListener('click', copyQuote);

// Initial load
fetchRandomQuote();

// Get references to the elements
const shareButton = document.getElementById('share-options');
const shareMenu = document.getElementById('share-menu');
const facebookShare = document.getElementById('facebook-share');
const twitterShare = document.getElementById('twitter-share');
const redditShare = document.getElementById('reddit-share');

// Toggle the visibility of the share menu
shareButton.addEventListener('click', () => {
    shareMenu.style.display = (shareMenu.style.display === 'block') ? 'none' : 'block';
});

// Add click event listeners for each sharing option
facebookShare.addEventListener('click', () => {
    // Implement Facebook sharing functionality
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + quote.innerHTML + "---- by " + author.innerHTML, '_blank');
});

twitterShare.addEventListener('click', () => {
    // Implement Twitter sharing functionality
    window.open('https://twitter.com/intent/tweet?TEXT=' + quote.innerHTML + "---- by " + author.innerHTML, '_blank');
});

redditShare.addEventListener('click', () => {
    // Implement Reddit sharing functionality
    window.open('https://www.reddit.com/submit?url=' + quote.innerHTML + "---- by " + author.innerHTML, '_blank');
});

// Close the share menu when clicking outside of it
document.addEventListener('click', (event) => {
    if (event.target !== shareButton && event.target !== shareMenu) {
        shareMenu.style.display = 'none';
    }
});

//dark mode

