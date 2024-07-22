//gettng var from ejs
const searchForm = document.getElementById('faq-search');
const searchInput = document.getElementById('faq-field-search');
const searchResults = document.getElementById('search-results');

//event listener for submit button
searchForm.addEventListener('submit', function(event) {
    //prevention of defult submission 
    event.preventDefault();
    // retrive the user input and trim whitspaces
    const query = searchInput.value.trim();

    // fetch request for the server 
    fetch(`/search?q=${encodeURIComponent(query)}`)
        //response in JSON format
        .then(response => response.json()) 
        //passing JSON to the website
        .then(data => {
            renderSearchResults(data);
        })
        // handle error
        .catch(error => {
            console.error('Error is:', error);
        });
});

function renderSearchResults(results) {
    //clear input field
    searchResults.innerHTML = '';

    // if input not found
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results.</p>';
        return;
    }
    
    // response from database in list
    const ul = document.createElement('ul');
    results.forEach(result => {
        const li = document.createElement('li');
        li.innerHTML = `<strong style="color: chartreuse;">${result.question}</strong><br><strong style="color: chartreuse;">Answer:</strong> <span class="answer">${result.answer}</span>`;
        ul.appendChild(li);
    });
    searchResults.appendChild(ul);

    // CSS for the anwser
    const answerElements = document.querySelectorAll('.answer');
    answerElements.forEach(element => {
        element.classList.add('answer-style'); 
    });
}
