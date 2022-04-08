'use strict';

// CONSTANTS //

const searchButton = document.querySelector('.js_search');
const searchInput = document.querySelector('.js_searchInput');
const listCocktails = document.querySelector('.js_listCocktails');

let cocktailData = [];

// FUNCTIONS //

/* J */
function selectCocktails () {
  const favLi = document.querySelectorAll('.js_favLi');
  for (const itemLi of favLi) {
    itemLi.addEventListener('click', handleClickFav);
  }
}

/* PAINT COCKTAILS + LI CLICK EVENT */
function paintCocktails() {
  let html = '';
  for (const drink of cocktailData) {
    html += `<li class="js_favLi" id=${drink.idDrink}>`;
    html += `<h3>${drink.strDrink}</h3>`;
    html += `<img src="${drink.strDrinkThumb}" width="100"/>`;
    html += `</li>`;
  }
  listCocktails.innerHTML = html;
  selectCocktails();
}

/* FILL IMAGE */
function fillImage() {
  for (const drink of cocktailData) {
    if (drink.strDrinkThumb === null) {
      drink.strDrinkThumb = `https://img.freepik.com/vector-gratis/coctel-dibujo-mano-rodaja-limon-romero_218179-270.jpg?w=100`;
    } else {
      drink.strDrinkThumb;
    }
  }
}

/* GET API + FETCH */
function getApi() {
  const searchValue = searchInput.value;
  /* Fetch */
  fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      cocktailData = data.drinks;
      paintCocktails();
      fillImage();
    });
}

/* FAV HANDLER FUNCTION */
function handleClickFav(event) {
  event.currentTarget.id;
}

/* SEARCH HANDLER FUNCTION */
function handleClickSearch(event) {
  event.preventDefault();
  getApi();
}

// EVENTS //

searchButton.addEventListener('click', handleClickSearch);