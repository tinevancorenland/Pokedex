const searchPokemon = document.getElementById("searchPokemon");
const back = document.getElementById("back");
const next = document.getElementById("next");
var testAPI;

searchPokemon.addEventListener("click", function() {
  let input = document.querySelector(".pokemon-search").value;
  getData(input);
});

async function getData(pokemonId) {
  let api = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  let response = await axios.get(api);
  displayPokemon(response);
}

back.addEventListener("click", async function() {
  var currentInput = --document.querySelector(".pokemon-search").value;
  getData(currentInput);
});

next.addEventListener("click", async function() {
  var currentInput = ++document.querySelector(".pokemon-search").value;
  getData(currentInput);
});

function displayPokemon(response) {
  // declare html elements
  let cardTitle = document.querySelector(".card-title");
  let cardId = document.querySelector(".card-id");
  let cardMoves = document.querySelector(".card-moves");

  // get information out of api
  let pokeName = response.data.name;
  let pokeId = response.data.id;

  let i;
  let pokeMoves = "";
  for (i = 0; i < 4; i++) {
    pokeMoves += i + 1 + ". " + response.data.moves[i].move.name + "<br>";
  }

  // append api info to DOM
  cardTitle.innerHTML = pokeName;
  cardId.innerHTML = "Pokedex No.   " + pokeId;
  cardMoves.innerHTML = `<br> ${pokeMoves}`;

  displayPokeImage(response);
}

function displayPokeImage(response) {
  if (document.querySelector(".pokemon-picture")) {
    removeSearchedImage();
    createSearchedImage(response);
  } else {
    createSearchedImage(response);
  }
}

function removeSearchedImage() {
  let cardPic = document.querySelector(".card-picture");
  let pokePicClass = document.querySelector(".pokemon-picture");
  cardPic.removeChild(pokePicClass);
}

function createSearchedImage(response) {
  let cardPic = document.querySelector(".card-picture");
  let createPokePic = document.createElement("img");
  let pokePicURL = response.data.sprites.front_default;
  createPokePic.src = pokePicURL;
  createPokePic.className = "pokemon-picture";
  cardPic.appendChild(createPokePic);
}
