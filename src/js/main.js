'use strict';

// CONSTANTS //

/* Botón de BUSCAR */
const searchButton = document.querySelector('.js_search');
/* INPUT donde la usuaria escribe */
const searchInput = document.querySelector('.js_searchInput');
/* UL de la lista principal */
const listCocktails = document.querySelector('.js_listCocktails');
/* UL de la lista de favoritos */
const favCocktails = document.querySelector('.js_favCocktails');

// VARIABLES //

/* Para la lista de cócteles */
let cocktailData = [];
/* Para la lista de favoritos */
let favData = [];
/* Para identificar la clase de CSS */
let classFav = '';

// FUNCTIONS //

// MANDAR LOS CÓCTELES A LA PARTE DE FAVORITOS //

function clickFav(event) {
  /* Identifico a qué cóctel se está dando click */
  const idDrinkSelected = event.currentTarget.id;
  /* Busca el elemento en el listado */
  const favFound = cocktailData.find((fav) => {
    return fav.idDrink === idDrinkSelected;
  });
  /* Busca la posición del elemento en el listado */
  const favFoundIndex = favData.findIndex((fav) => {
    return fav.idDrink === idDrinkSelected;
  });
  /* Condicional para añadir a favoritos */
  /* Si no encuentra el cóctel en favoritos me lo añade */
  if (favFoundIndex === -1) {
    favData.push(favFound);
  }
  /* Si lo encuentra, me lo elimina */
  else {
    favData.splice(favFoundIndex, 1);
  }
  /* Añado las funciones de las UL para que les aplique esta función */
  paintCocktails();
  paintFavorites();
}

// PINTAR LOS CÓCTELES CLICKADOS COMO FAVORITOS EN HTML */

function paintFavorites() {
  /* Creo una variable vacía para rellenarla con los datos de la lista */
  let html = '';
  /* Recorro la lista para poder identificar cada elemento que añado en HTML */
  for (const fav of favData) {
    /* Busco la posición del elemento en el listado */
    const favFoundIndex = favData.findIndex((fav) => {
      return fav.idDrink === fav.idDrink;
    });
    /* Condicional para la clase */
    /* Si el cóctel está en favoritos añade la clase */
    if (favFoundIndex !== -1) {
      classFav = 'favorites';
    }
    /* Si no está en favoritos la quita */
    else {
      classFav = '';
    }
    /* Añado la classFav para que me la vincule según la condicional */
    html += `<li class="js_favLi ${classFav}" id=${fav.idDrink}>`;
    html += `<h3>${fav.strDrink}</h3>`;

    /* Condicional para la imagen */
    /* Imagen de relleno por si falla alguna */
    if (fav.strDrinkThumb === null) {
      html += `<img src="https://img.freepik.com/vector-gratis/coctel-dibujo-mano-rodaja-limon-romero_218179-270.jpg?w=100" width="100"/>`;
    }
    /* Imagen predefinida según la API */
    else {
      html += `<img src="${fav.strDrinkThumb}" width="100"/>`;
    }
    html += `</li>`;
  }
  /* Pinto el resultado en la UL seleccionada */
  favCocktails.innerHTML = html;
  /* Lo añado para que vincule el evento click */
  selectCocktails();
}

// IDENTIFICAR CADA LI //

function selectCocktails () {
  /* Selecciono todos los LI */
  const favLi = document.querySelectorAll('.js_favLi');
  /* Recorro la lista y añado el evento click a cada LI */
  for (const itemLi of favLi) {
    itemLi.addEventListener('click', clickFav);
  }
}

// PINTAR LOS CÓCTELES BUSCADOS POR LA USUARIA EN EL HTML */

function paintCocktails() {
  /* Creo una variable vacía para rellenarla con los datos de la lista */
  let html = '';
  /* Recorro la lista para poder identificar cada elemento que añado en HTML */
  for (const drink of cocktailData) {
    /* Busco la posición del elemento en el listado */
    const favFoundIndex = favData.findIndex((fav) => {
      return fav.idDrink === drink.idDrink;
    });
    /* Condicional para la clase */
    /* Si el cóctel está en favoritos añade la clase */
    if (favFoundIndex !== -1) {
      classFav = 'favorites';
    }
    /* Si no está en favoritos la quita */
    else {
      classFav = '';
    }
    /* Añado la classFav para que me la vincule según la condicional */
    html += `<li class="js_favLi ${classFav}" id=${drink.idDrink}>`;
    html += `<h3>${drink.strDrink}</h3>`;

    /* Condicional para la imagen */
    /* Imagen de relleno por si falla alguna */
    if (drink.strDrinkThumb === null) {
      html += `<img src="https://img.freepik.com/vector-gratis/coctel-dibujo-mano-rodaja-limon-romero_218179-270.jpg?w=100" width="100"/>`;
    }
    /* Imagen predefinida según la API */
    else {
      html += `<img src="${drink.strDrinkThumb}" width="100"/>`;
    }
    html += `</li>`;
  }
  /* Pinto el resultado en la UL seleccionada */
  listCocktails.innerHTML = html;
  /* Lo añado para que vincule el evento click */
  selectCocktails();
}

// COJO LOS DATOS DEL SERVIDOR PARA PODER UTILIZARLOS //

function getApi() {
  /* Cojo el valor del input que rellena la usuaria */
  const searchValue = searchInput.value;
  /* Fetch */
  fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      /* Añado la lista vacía y la vinculo a los datos de bebidas de la API */
      cocktailData = data.drinks;
      /* Añado la función de pintar los cócteles para que aparezcan en el HTML */
      paintCocktails();
    });
}

// ¿CARGAR AL INICIAR LA PÁGINA? //

/*getApi();*/

// FUNCIÓN MANEJADORA DEL BOTÓN //

function handleClickSearch(event) {
  event.preventDefault();
  /* Añado la función del FETCH para vincular la API al evento del BOTÓN */
  getApi();
}

// EVENTS //

/* Evento del BOTÓN de BUSCAR */
searchButton.addEventListener('click', handleClickSearch);