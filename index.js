const addTaskForm = document.getElementById("super-hero-search");
const heroSearch = document.getElementById("hero-search");
const heroSearchButton = document.getElementById("hero-search-btn");
const container = document.getElementById("results");
const homepage = document.getElementById("Marvels-logo");

var theUrl = `https://gateway.marvel.com:443/v1/public/characters?apikey=6ad77fac798bfe0a9c8599316689f1e6&hash=37a360b04ff2f9c78bd5eefe585dcdea&ts=1711821478916&limit=50`;


const favoriteHeroIds = [];

function addToFavorites(heroId) {
  if (!favoriteHeroIds.includes(heroId)) {
    favoriteHeroIds.push(heroId);
    // Update the favorites list UI (code below)
  }
}
const favoriteButtons = document.querySelectorAll('.favorite-btn');

favoriteButtons.forEach(button => {
  button.addEventListener('click', function() {
    const heroId = parseInt(this.dataset.heroId);
    addToFavorites(heroId);
  });
});


function displayFavourites() {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = ''; // Clear previous content
  if (favoriteHeroIds.length === 0) {
    favoritesList.innerHTML = '<p>No favorites yet!</p>';
    return;
  }
  favoriteHeroIds.forEach(async (heroId) => {
    const url = `https://gateway.marvel.com:443/v1/public/characters/${heroId}?apikey=6ad77fac798bfe0a9c8599316689f1e6&hash=37a360b04ff2f9c78bd5eefe585dcdea&ts=1711821478916`;
    const response = await fetch(url);
    const data = await response.json();
    const heroData = data.data.results[0];
    const favoriteTemplateString = `
    <div class="card mb-3" style="jumbotron-fluid" id="Heros">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${heroData.thumbnail.path}.jpg" class="card-img" alt="place holder">
        </div>
      </div>
    </div>
          `
          favoritesList.append(favoriteTemplateString);
          ;

  }



  )}



fetch(theUrl)
  .then((response) => response.json())
  .then((data) => {
    op = data.data.results;
    console.log(op);

    for (var i = 0; i < op.length; i++) {
      const hero = op[i].name;
      const description = op[i].description;
      const image = op[i].thumbnail.path;

      const container = $("#results");
      const templateString = `
      <div class="card mb-3" style="jumbotron-fluid" id="Heros">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${image}.jpg" class="card-img" alt="place holder for ${hero} image">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${hero}</h5>
            <p class="card-text">${description}</p>
            <div class="card">
              <span class="label"><b>Available comics : </b>${op[i].comics.available}</span>
              <span class="label"><b>Upcoming Events : </b>${op[i].events.available}</span>
              <span class="label"><b>Available series : </b>${op[i].series.available}</span>
              <span class="label"><b>Available stories : </b>${op[i].stories.available}</span>
            </div>
            <div class="Button-grp">
              <a href="${op[i].urls[1].url}" target="_blank" class="btn btn-primary">Hero Comics</a>
              <a href="${op[i].urls[0].url}" target="_blank" class="btn btn-success">Hero Detail</a>
              <button class="btn btn-warning favorite-btn" data-hero-id="${op[i].id}">Favorite</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
      `;
      container.append(templateString);
    }
    // Handle the data here
  });

homepage.addEventListener("click", function () {
  location.reload();
})

// Add an event listener for the Enter key
heroSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    // Get the hero name from the input field
    const heroSearchInst = heroSearch.value;

    // Rest of your existing code (fetching data, handling results, etc.)
    console.log(typeof (heroSearchInst), 0);
    emptyResults();
    console.log(heroSearchInst, 1);
    var searchString = theUrl + "&nameStartsWith=" + heroSearchInst;
    console.log(searchString)

    fetch(searchString)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        op = data.data.results;
        console.log(op);

        if (op.length) {
          for (var i = 0; i < op.length; i++) {
            const hero = op[i].name;
            const description = op[i].description;
            const image = op[i].thumbnail.path;

            const container = $("#results");
            const templateString = `
            <div class="card mb-3" style="jumbotron-fluid" id="Heros">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${image}.jpg" class="card-img" alt="place holder for ${hero} image">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${hero}</h5>
                  <p class="card-text">${description}</p>
                  <div class="card">
                    <span class="label"><b>Available comics : </b>${op[i].comics.available}</span>
                    <span class="label"><b>Upcoming Events : </b>${op[i].events.available}</span>
                    <span class="label"><b>Available series : </b>${op[i].series.available}</span>
                    <span class="label"><b>Available stories : </b>${op[i].stories.available}</span>
                  </div>
                  <div class="Button-grp">
                    <a href="${op[i].urls[1].url}" target="_blank" class="btn btn-primary">Hero Comics</a>
                    <a href="${op[i].urls[0].url}" target="_blank" class="btn btn-success">Hero Detail</a>
                    <button class="btn btn-warning favorite-btn" data-hero-id="${op[i].id}">Favorite</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        `;
            container.append(templateString);
          }
          // Handle the data here
        }

        else {
          const container = $("#results");
          const templateString = `
  <div class="alert alert-secondary" role="alert" id="Heros">
  OOPs! , this Hero does not exists
</div>
         
      `;
          container.append(templateString);
        }
      });


    // Clear the input field after processing
    heroSearch.value = "";
  }
});


heroSearchButton.addEventListener("click", function () {
  var heroSearchInst = heroSearch.value
  console.log(typeof (heroSearchInst), 0);
  emptyResults();
  console.log(heroSearchInst, 1);
  var searchString = theUrl + "&nameStartsWith=" + heroSearchInst;
  console.log(searchString)

  fetch(searchString)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      op = data.data.results;
      console.log(op);

      if (op.length) {
        for (var i = 0; i < op.length; i++) {
          const hero = op[i].name;
          const description = op[i].description;
          const image = op[i].thumbnail.path;

          const container = $("#results");
          const templateString = `
          <div class="card mb-3" style="jumbotron-fluid" id="Heros">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${image}.jpg" class="card-img" alt="place holder for ${hero} image">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${hero}</h5>
          <p class="card-text">${description}</p>
          <div class="card">
            <span class="label"><b>Available comics : </b>${op[i].comics.available}</span>
            <span class="label"><b>Upcoming Events : </b>${op[i].events.available}</span>
            <span class="label"><b>Available series : </b>${op[i].series.available}</span>
            <span class="label"><b>Available stories : </b>${op[i].stories.available}</span>
          </div>
          <div class="Button-grp">
            <a href="${op[i].urls[1].url}" target="_blank" class="btn btn-primary">Hero Comics</a>
            <a href="${op[i].urls[0].url}" target="_blank" class="btn btn-success">Hero Detail</a>
            <button class="btn btn-warning favorite-btn" data-hero-id="${op[i].id}">Favorite</button>
          </div>
        </div>
      </div>
    </div>
  </div>

      `;
          container.append(templateString);
        }
        // Handle the data here
      }

      else {
        const container = $("#results");
        const templateString = `
  <div class="alert alert-secondary" role="alert" id="Heros">
  OOPs! , this Hero does not exists
</div>
         
      `;
        container.append(templateString);
      }
      // Clear the input field after processing
      heroSearch.value = "";
    });

});



function emptyResults() {
  try {
    const element = document.getElementById("Heros");
    do {
      const element = document.getElementById("Heros");
      // console.log(element);
      element.remove();
    } while (element);
  }
  catch (err) {
    console.log(err)
  }

}

// heroSearchButton.addEventListener("click", function () {
//   var heroSearchInst = heroSearch.value.trim;
//   console.log(heroSearchInst);
// });
