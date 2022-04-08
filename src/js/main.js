'use strict';

// CONSTANTS //

let cocktailData = [];

const searchButton = document.querySelector('.js_search');
const searchInput = document.querySelector('.js_searchInput');
const listCocktails = document.querySelector('.js_listCocktails');

// FUNCTIONS //

/* PAINT COCKTAILS */
function paintCocktails() {
  let html = '';
  for (const drink of cocktailData) {
    html += `<li>`;
    html += `<h3>${drink.strDrink}</h3>`;
    html += `<img src="${drink.strDrinkThumb}" width="100"/>`;
    html += `</li>`;
  }
  listCocktails.innerHTML = html;
}

/* HANDLE CLICK SEARCH + FETCH */
function handleClickSearch(event) {
  event.preventDefault();
  const searchValue = searchInput.value;
  /* Fetch */
  fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      cocktailData = data.drinks;
      paintCocktails();
    });
}

// EVENTS //

searchButton.addEventListener('click', handleClickSearch);