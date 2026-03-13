const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=649";
const container = document.getElementById("list");

async function loadPokemon() {
  const res = await fetch(API_URL);
  const data = await res.json();

  data.results.forEach((pokemon) => {
    let id = pokemon.url.split("/").filter(Boolean).pop();

    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemon.name = pokemon.name.split("-")[0];

    const artwork = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const cardImg = document.createElement("img");
    cardImg.src = artwork;
    card.appendChild(cardImg);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("pokemon-card-info");
    card.appendChild(cardInfo);

    const cardNumber = document.createElement("p");
    cardNumber.classList.add("pokemon-card-number");
    id = id.padStart(3, "0");
    cardNumber.innerHTML = id;
    cardInfo.appendChild(cardNumber);

    const cardName = document.createElement("h3");
    cardName.classList.add("pokemon-card-name");
    cardName.innerHTML = pokemon.name;
    cardInfo.appendChild(cardName);
    cardName.addEventListener("click", function () {
      pokemonPage(id, pokemon.name);
    });

    container.appendChild(card);
  });
}

loadPokemon();

const searchInput = document.getElementById("search-bar");

searchInput.addEventListener("input", () => {
  //let card = document.getElementsByClassName("pokemon-card");
  let names = document.getElementsByClassName("pokemon-card-name");
  const value = searchInput.value.toLowerCase().trim();

  for (let i = 0; i < 649; i++) {
    names[i].parentElement.parentElement.style.display = "block";
  }

  for (let i = 0; i < 649; i++) {
    let name = names[i].textContent;
    if (!name.toLowerCase().startsWith(value)) {
      names[i].parentElement.parentElement.style.display = "none";
    }
  }
});

function pokemonPage(num, name) {
  window.alert("apertura pagina di " + name + ", numero: " + num);
  document.getElementById("search-bar").value = "";
  let names = document.getElementsByClassName("pokemon-card-name");
  for (let i = 0; i < 649; i++) {
    names[i].parentElement.parentElement.style.display = "block";
  }
}

function navbarSelect(num) {
  if (num == 0) {
    document.getElementById("home-item").className = "fi fi-sr-home";
    document.getElementById("marker-item").className = "fi fi-rr-marker";
  } else {
    document.getElementById("home-item").className = "fi fi-rr-home";
    document.getElementById("marker-item").className = "fi fi-sr-marker";
  }
}
