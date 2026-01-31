const categories = ['learning', 'education', 'success', 'persistence', 'dreams'];

const fallbackQuotes = [
    {
        text: "Education is the most powerful weapon which you can use to change the world.",
        author: "Nelson Mandela",
        category: "education"
    },
    {
        text: "The expert in anything was once a beginner.",
        author: "Helen Hayes",
        category: "learning"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "persistence"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "dreams"
    },
    {
        text: "Your education is a dress rehearsal for a life that is yours to lead.",
        author: "Nora Ephron",
        category: "education"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "success"
    },
    {
        text: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
        author: "Abigail Adams",
        category: "learning"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
        category: "persistence"
    },
    {
        text: "Intelligence plus character—that is the goal of true education.",
        author: "Martin Luther King Jr.",
        category: "education"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        category: "success"
    }
];

let count = 0;

async function getRandomQuote() {
    try {
        const response = await fetch('https://type.fit/api/quotes');
        const data = await response.json();
        displayQuote(data.content, data.author, data.tags[0] || 'general');
        updateCount();
    } catch (error) {
        showFallbackQuote();
    }
}
/*fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });*/

async function getCategoryQuote() {
    const randomIndex = Math.floor(Math.random() * categories.length);
    const category = categories[randomIndex];

    try {
        const response = await fetch(`https://api.quotable.io/random?tags=${category}`);
        const data = await response.json();
        displayQuote(data.content, data.author, category);
        updateCount();
    } catch (error) {
        const filtered = fallbackQuotes.filter(q => q.category === category);
        const quote = filtered.length
            ?  filtered[Math.floor(Math.random() * filtered.length)]
            : fallbackQuotes[0];
        displayQuote(quote.text, quote.author, quote.category);
        updateCount();
    }
}

function displayQuote(text, author, category) {
    document.getElementById('quote').textContent = `"${text}"`;
    document.getElementById('author').textContent = `— ${author}`;
    const categoryEl = document.getElementById('category');
    categoryEl.textContent = category;
    categoryEl.style.display = 'inline-block';
}

function updateCount() {
    count++;
    document.getElementById('count').textContent = count;
}

function showFallbackQuote() {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    const quote = fallbackQuotes[randomIndex];
    displayQuote(quote.text, quote.author, quote.category);
    updateCount();
}

window.onload = () => getRandomQuote();