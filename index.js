const todoList = document.getElementById("super-hero-main");
const addTaskForm = document.getElementById("super-hero-search");
const newTaskInput = document.getElementById("hero-search");
const addTaskBtn = document.getElementById("hero-search-btn");

const newTaskText = newTaskInput.value.trim();
theUrl = `https://gateway.marvel.com:443/v1/public/characters?apikey=6ad77fac798bfe0a9c8599316689f1e6&hash=37a360b04ff2f9c78bd5eefe585dcdea&ts=1711821478916&limit=10`;

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
          <div class="card mb-3" style="jumbotron-fluid">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src=${image}.jpg class="card-img" alt="place holder for ${hero} image">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${hero}</h5>
        <p class="card-text">${description}</p>
        <a href="#" class="btn btn-primary">Go Somewhere</a>
      </div>
    </div>
  </div>
</div>
         
      `;
      container.append(templateString);
    }
    // Handle the data here
  });

addTaskBtn
  .addEventListener("click", function () {
    const newTaskText = newTaskInput.value.trim();
    theUrl = `https://gateway.marvel.com:443/v1/public/characters?apikey=6ad77fac798bfe0a9c8599316689f1e6&hash=37a360b04ff2f9c78bd5eefe585dcdea&ts=1711821478916&limit=10`;

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
          <div class="card mb-3" style="jumbotron-fluid">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src=${image}.jpg class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${hero}</h5>
        <p class="card-text">${description}</p>
        <a href="#" class="btn btn-primary">Go Somewhere</a>
      </div>
    </div>
  </div>
</div>
         
      `;
          container.append(templateString);
        }
        // Handle the data here
      });
  })
  .catch((error) => {
    console.log("Error=> " + error);
    // Handle any errors
  });
