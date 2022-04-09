'use strict';

// CONSTANTS //

const searchButton = document.querySelector('.js_search');
const searchInput = document.querySelector('.js_searchInput');
const listCocktails = document.querySelector('.js_listCocktails');
const favCocktails = document.querySelector('.js_favCocktails');

// VARIABLES //

let cocktailData = [];
let favData = [];
let classFav = '';

// FUNCTIONS //

/* Mando los cócteles a la parte de favoritos y les añado una clase diferencial */
/* ¡¡¡ NO FUNCIONA !!! */
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
  } else if (favFoundIndex !== -1) {
    classFav = 'favorites';
  }
  else {
    favData.splice(favFoundIndex, 1);
    classFav = '';
  }
  paintFavorites();
}

/* Pinto los cócteles que se clickan como favoritos en el HTML */
function paintFavorites() {
  let html = '';

  for (const fav of favData) {
    html += `<li class="js_favLi ${classFav}" id=${fav.idDrink}>`;
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
  selectCocktails();
}

/* Escucho el evento click sobre cada cóctel clickado */
function selectCocktails () {
  const favLi = document.querySelectorAll('.js_favLi');
  for (const itemLi of favLi) {
    itemLi.addEventListener('click', clickFav);
  }
}

/* Pinto los cócteles según la búsqueda del input en el HTML */
function paintCocktails() {
  let html = '';

  for (const drink of cocktailData) {
    html += `<li class="js_favLi ${classFav}" id=${drink.idDrink}>`;
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
}

/* Cojo los datos del servidor para poder utilizarlos */
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

/* Si utilizo la función fuera se cargan todos los cócteles al inicio de la página */
/*getApi();*/

/* Escucho el evento click sobre el botón de BUSCAR */
function handleClickSearch(event) {
  event.preventDefault();
  getApi();
}

// EVENTS //

searchButton.addEventListener('click', handleClickSearch);