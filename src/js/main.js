'use strict';

// PRINCIPAL VARIABLE //

let cocktailData = [];

// CONSTANTS //

const searchButton = document.querySelector('.js_search');

// FUNCTIONS //

function handleClickSearch(event) {
  event.preventDefault();
  /* Fetch */
  fetch ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response) => response.json())
    .then((data) => {
      cocktailData = data.drinks;
    });
}

// EVENTS //

searchButton.addEventListener('click', handleClickSearch);