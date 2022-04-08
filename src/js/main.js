'use strict';

// CONSTANTS //

const searchButton = document.querySelector('.js_search');
const searchInput = document.querySelector('.js_searchInput');
const listCocktails = document.querySelector('.js_listCocktails');
const favCocktails = document.querySelector('.js_favCocktails');

let cocktailData = [];
let favData = [];

// FUNCTIONS //

/* SELECT FAVORITES */
function clickFav(event) {
  const idDrinkSelected = event.currentTarget.id;
  const favFound = cocktailData.find((fav) => {
    return fav.idDrink === idDrinkSelected;
  });
  const favFoundIndex = favData.findIndex((fav) => {
    return fav.idDrink === idDrinkSelected;
  });

  if (favFoundIndex === -1) {
    favData.push(favFound);
  } else {
    favData.splice(favFoundIndex, 1);
  }
  paintFavorites();
}

/* PAINT FAVORITES */
function paintFavorites() {
  let html = '';
  for (const fav of favData) {
    html += `<li class="js_favLi" id=${fav.idDrink}">`;
    html += `<h3>${fav.strDrink}</h3>`;
    /* Fill image */
    if (fav.strDrinkThumb === null) {
      html += `<img src="https://img.freepik.com/vector-gratis/coctel-dibujo-mano-rodaja-limon-romero_218179-270.jpg?w=100" width="100"/>`;
    } else {
      html += `<img src="${fav.strDrinkThumb}" width="100"/>`;
    }
    html += `</li>`;
  }
  favCocktails.innerHTML = html;
}

/* SELECT COCKTAILS + CLICK EVENT */
function selectCocktails () {
  const favLi = document.querySelectorAll('.js_favLi');
  for (const itemLi of favLi) {
    itemLi.addEventListener('click', clickFav);
  }
}

/* PAINT COCKTAILS + FILL IMAGE */
function paintCocktails() {
  let html = '';
  for (const drink of cocktailData) {
    html += `<li class="js_favLi" id=${drink.idDrink}>`;
    html += `<h3>${drink.strDrink}</h3>`;
    /* Fill image */
    if (drink.strDrinkThumb === null) {
      html += `<img src="https://img.freepik.com/vector-gratis/coctel-dibujo-mano-rodaja-limon-romero_218179-270.jpg?w=100" width="100"/>`;
    } else {
      html += `<img src="${drink.strDrinkThumb}" width="100"/>`;
    }
    html += `</li>`;
  }
  listCocktails.innerHTML = html;
  selectCocktails();
  // paintFavorites();
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
    });
}

/* CARGAR TODOS AL INICIO DE LA PÁGINA */
/*getApi();*/

/* SEARCH HANDLER FUNCTION */
function handleClickSearch(event) {
  event.preventDefault();
  getApi();
}

// EVENTS //

searchButton.addEventListener('click', handleClickSearch);