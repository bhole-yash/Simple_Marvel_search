const addTaskForm = document.getElementById("super-hero-search");
const heroSearch = document.getElementById("hero-search");
const heroSearchButton = document.getElementById("hero-search-btn");
const container = document.getElementById("results");
const homepage = document.getElementById("Marvels-logo");

// Function to add a hero to favorites
function addToFavorites(heroId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(heroId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Function to remove a hero from favorites
function removeFromFavorites(heroId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((fav_id) => fav_id !== heroId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Function to check if a hero is in favorites
function isFavorite(heroId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.includes(heroId);
}

// Function to update favorite button UI
function updateFavoriteButton(heroId) {
  const favoriteButton = document.getElementById(`favorite-button-${heroId}`);
  if (isFavorite(heroId)) {
    favoriteButton.innerText = "Unlike";
    favoriteButton.classList.remove("btn-outline-danger");
    favoriteButton.classList.add("btn-danger");
  } else {
    favoriteButton.innerText = "Like";
    favoriteButton.classList.remove("btn-dark");
    favoriteButton.classList.add("btn-outline-dark");
  }
}

// Handle homepage click
homepage.addEventListener("click", function () {
  window.location.assign("./index.html");
});

// Handle search input keydown
heroSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const heroSearchInst = heroSearch.value.trim();
    emptyResults();
    if (heroSearchInst == "") {
      const templateString = `
      <div class="alert alert-secondary" role="alert">
        Oops! Try putting something in :(
      </div>`;
      container.insertAdjacentHTML("beforeend", templateString);
    }
    const searchString = theUrl + "&nameStartsWith=" + heroSearchInst;
    fetchAndDisplayResults(searchString);
    heroSearch.value = "";
  }
});

// Handle search button click
heroSearchButton.addEventListener("click", function () {
  const heroSearchInst = heroSearch.value.trim();
  emptyResults();
  if (heroSearchInst == "") {
    const templateString = `
    <div class="alert alert-secondary" role="alert">
      Oops! Try putting something in :(
    </div>`;
    container.insertAdjacentHTML("beforeend", templateString);
  }

  const searchString = theUrl + "&nameStartsWith=" + heroSearchInst;
  if (searchString == "") {
    location.reload();
  }
  fetchAndDisplayResults(searchString);
  heroSearch.value = "";
});

// Function to fetch and display search results
function fetchAndDisplayResults(searchString) {
  fetch(searchString)
    .then((response) => response.json())
    .then((data) => {
      const heroes = data.data.results;
      console.log(heroes);
      if (heroes.length) {
        heroes.forEach((hero) => {
          const templateString = `
            <div class="card mb-3" style="jumbotron-fluid" id="hero-${
              hero.name
            }">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src="${
                    hero.thumbnail.path
                  }.jpg" class="card-img" alt="placeholder for ${
            hero.name
          } image">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                  <div class="d-flex">
  <div class="p-2"><h5 class="card-title">${hero.name}</h5></div>
  <div class="ml-auto p-2"><button id="favorite-button-${
    hero.id
  }" class="btn btn-outline-danger bookmark" style="border-width: thick;width:min-content;">${
            isFavorite(hero.id) ? "Unlike" : "Like"
          }</button></div>
</div>
                    
                    
                    <p class="card-text">${hero.description}</p>
                    <div class="card">
                      <span class="label"><b>Available comics : </b>${
                        hero.comics.available
                      }</span>
                      <span class="label"><b>Upcoming Events : </b>${
                        hero.events.available
                      }</span>
                      <span class="label"><b>Available series : </b>${
                        hero.series.available
                      }</span>
                      <span class="label"><b>Available stories : </b>${
                        hero.stories.available
                      }</span>
                    </div>
                    
                      <a href="${
                        hero.urls[1].url
                      }" target="_blank" class="btn btn-primary">Hero Comics</a>
                      <a href="${
                        hero.urls[0].url
                      }" target="_blank" class="btn btn-success">Hero Detail</a>
                      
                  </div>
                </div>
              </div>
            </div>`;
          container.insertAdjacentHTML("beforeend", templateString);

          // Add event listener to favorite button
          const favoriteButton = document.getElementById(
            `favorite-button-${hero.id}`
          );
          favoriteButton.addEventListener("click", function () {
            if (isFavorite(hero.id)) {
              removeFromFavorites(hero.id);
            } else {
              addToFavorites(hero.id);
            }
            updateFavoriteButton(hero.id);
          });
        });
      } else {
        const templateString = `
          <div class="alert alert-secondary" role="alert">
            Oops! This hero does not exist.
          </div>`;
        container.insertAdjacentHTML("beforeend", templateString);
      }
    });
}

// Empty existing results
function emptyResults() {
  container.innerHTML = "";
}
var theUrl = `https://gateway.marvel.com:443/v1/public/characters?apikey=6ad77fac798bfe0a9c8599316689f1e6&hash=37a360b04ff2f9c78bd5eefe585dcdea&ts=1711821478916&limit=50`;
// Initial fetch and display results
fetchAndDisplayResults(theUrl);
