'use strict';

// CONSTANTS //

/* Botón de BUSCAR */
const searchButton = document.querySelector('.js_search');
/* INPUT donde la usuaria escribe */
const searchInput = document.querySelector('.js_searchInput');
/* INPUT para resetear la búsqueda */
const searchReset = document.querySelector('.js_searchReset');
/* UL de la lista principal */
const listCocktails = document.querySelector('.js_listCocktails');
/* UL de la lista de favoritos */
const favCocktails = document.querySelector('.js_favCocktails');
/* Texto de la lista de cócteles */
const textHidden = document.querySelector('.js_textHidden');
/* Botón para borrar favoritos */
const buttonFav = document.querySelector('.js_buttonFav');

const buttonLog = document.querySelector('.js_buttonLog');

// VARIABLES //

/* Para la lista de cócteles */
let cocktailData = [];
/* Para la lista de favoritos */
let favData = [];
/* Para identificar la clase de CSS */
let classFav = '';
/* Eliminar la clase por defecto */
let classNormal = '';

// FUNCTIONS //

// TASK 2: SEARCH //
/* Lines 123 (paintCocktails) + 257 (getApi) */
// TASK 3: FAVORITES //
/* Lines 44 (ClickFav) + 70 (paintFavorites) + 112 (selectCocktails) */
// TASK 4: LOCALSTORAGE //
/* Lines 232 (addLocal) + 241 (showLocal) */
// TASK BONUS 1: RESET //
/* Lines 166 (resetSearch) + 174 (clickResetFav) + 199 (resetFav) + 209 (resetClickFav) + 225 (hiddenText) */

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
  } else {
    favData.splice(favFound, 1);
  }
  /* Añado las funciones de las UL para que les aplique esta función */
  paintCocktails();
  paintFavorites();
  addLocal();
}

// PINTAR LOS CÓCTELES CLICKADOS COMO FAVORITOS EN HTML //

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
    html += `<button class="js_buttonX ${fav.idDrink}">X</button>`;
    html += `<h3 class="textFav">${fav.strDrink}</h3>`;

    /* Condicional para la imagen */
    /* Imagen de relleno por si falla alguna */
    if (fav.strDrinkThumb === null) {
      html += `<img class="listsMain__img" src="https://img.freepik.com/vector-gratis/coctel-dibujo-mano-rodaja-limon-romero_218179-270.jpg?w=100" />`;
    }
    /* Imagen predefinida según la API */
    else {
      html += `<img class="listsMain__img" src="${fav.strDrinkThumb}" width="100"/>`;
    }
    html += `<h4>${fav.strIngredient1}</h4>`;
    html += `<h4>${fav.strIngredient2}</h4>`;
    html += `<${fav.strIngredient3}</h4>`;
    if (fav.strIngredient4 !== null) {
      html += `<h4>${fav.strIngredient4}</h4>`;
    }
    html += `</li>`;
  }
  /* Pinto el resultado en la UL seleccionada */
  favCocktails.innerHTML = html;
  /* Añado el evento click */
  resetFav();
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

// PINTAR LOS CÓCTELES BUSCADOS POR LA USUARIA EN EL HTML //

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
      classNormal = '';
    }
    /* Si no está en favoritos la quita */
    else {
      classFav = '';
      classNormal = 'listsMain__list';
    }
    /* Añado la classFav para que me la vincule según la condicional */
    html += `<li class="${classNormal} js_favLi ${classFav}" id=${drink.idDrink}>`;
    html += `<h3>${drink.strDrink}</h3>`;

    /* Condicional para la imagen */
    /* Imagen de relleno por si falla alguna */
    if (drink.strDrinkThumb === null) {
      html += `<img class="listsMain__img" src="https://img.freepik.com/vector-gratis/coctel-dibujo-mano-rodaja-limon-romero_218179-270.jpg?w=100"/>`;
    }
    /* Imagen predefinida según la API */
    else {
      html += `<img class="listsMain__img" src="${drink.strDrinkThumb}" width="100"/>`;
    }
    html += `<h4>${drink.strIngredient1}</h4>`;
    html += `<h4>${drink.strIngredient2}</h4>`;
    html += `<h4>${drink.strIngredient3}</h4>`;
    if (drink.strIngredient4 !== null) {
      html += `<h4>${drink.strIngredient4}</h4>`;
    }
    html += `</li>`;
  }
  /* Pinto el resultado en la UL seleccionada */
  listCocktails.innerHTML = html;
  /* Lo añado para que vincule el evento click */
  selectCocktails();
}

// RESET DEL BUSCADOR //

function resetSearch() {
  searchInput.value = '';
  listCocktails.innerHTML = '';
  textHidden.classList.remove('hidden');
}

// RESET DE FAVORITOS INDIVIDUAL //

function clickResetFav(event) {
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
  /* Condicional para quitar de favoritos */
  /* Si lo encuentra en favoritos me lo quita */
  if (favFoundIndex !== -1) {
    favData.splice(favFound);
  }

  /* Añado las funciones de las UL para que les aplique esta función */
  paintCocktails();
  paintFavorites();
  addLocal();
}

/* No funciona como quiero, me quita todos individualmente pero prioriza el primero */

function resetFav () {
  /* Selecciono todos los BUTTON */
  const resetX = document.querySelectorAll('.js_buttonX');
  /* Recorro la lista y añado el evento click a cada BUTTON */
  for (const itemX of resetX) {
    itemX.addEventListener('click', clickResetFav);
  }
}

/* A través del botón para borrar todos */
function resetClickFav() {
  favCocktails.innerHTML = '';
  if (favData.length >= 1) {
    localStorage.removeItem('favData'); /* Remuevo del LS lo guardado con el botón de borrar favoritos */
  }
  const li = document.querySelectorAll('.js_favLi'); /* Recorro la lista de los LI para remove/add clases */
  if (li.length > 0) {
    for (let i = 0; i < li.length; i++) { /* Uso de FOR clásico */
      li[i].classList.remove('favorites');
      li[i].classList.add('listsMain__list');
    }
  }
}

// TEXTO DE PINTAR LOS CÓCTELES //

function hiddenText() {
  textHidden.classList.add('hidden');
  listCocktails.classList.remove('hidden');
}

// ALMACENAMIENTO DE FAVORITOS EN LOCALSTORAGE //

function addLocal() {
  /* Transformo a string el array de favoritos */
  const addFav = JSON.stringify(favData);
  /* Lo añado al LS */
  localStorage.setItem('favData', addFav);
}

// MOSTRAR FAVORITOS AL RECARGAR LA PÁGINA //

function showLocal() {
  const showFav = localStorage.getItem('favData');
  /* Condicional */
  /* Si no hay datos en LocalStorage no se hace nada */
  if (showFav !== null) {
    /* Si hay datos en LocalStorage */
    /* Lo parseo a array y lo meto en la variable */
    const arrayFav = JSON.parse(showFav);
    favData = arrayFav;
    /* Pinto de nuevo */
    paintFavorites();
  }
}

// DATOS DEL SERVIDOR //

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

// HANDLER FUNCTIONS //

/* Botón de BUSCAR */
function handleClickSearch(event) {
  event.preventDefault();
  /* Añado la función del FETCH para vincular la API al evento del BOTÓN */
  getApi();
  /* Añado la función para ocultar el texto con el evento */
  hiddenText();
}

/* Botón de RESET */
function handleClickReset(event) {
  event.preventDefault();
  /* Vinculo la función al evento */
  resetSearch();
}

/* Botón de FAVORITOS */
function handleResetFav(event) {
  event.preventDefault();
  /* Vinculo la función al evento */
  resetClickFav();
}

function handleClickLog() {
  const favLog = favData.length;
  console.log(`Tienes ${favLog} favoritos`);
}

// EVENTS //

/* Evento del BOTÓN de BUSCAR */
searchButton.addEventListener('click', handleClickSearch);

/* Evento del BOTÓN de RESET */
searchReset.addEventListener('click', handleClickReset);

/* Evento del BOTÓN de FAVORITOS */
buttonFav.addEventListener('click', handleResetFav);

buttonLog.addEventListener('click', handleClickLog);

// AL ARRANCAR LA PÁGINA //

/* Mostrar lo guardado en local */
showLocal();