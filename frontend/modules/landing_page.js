import config from "../conf/index.js";

async function init() {
   
  //console.log("From init()")
  //console.log(config.backendEndpoint+"/cities");
  //Fetches list of all cities along with their images and description
  //console.log(fetchCities());
  try {
    let cities = await fetchCities();
    //Updates the DOM with the cities
    //console.log(cities);
  

    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
    }
  catch (error) {
    return null;
  }
  
}

  //Implementation of fetch call
  async function fetchCities() {
    // TODO: MODULE_CITIES
    // 1. Fetch cities using the Backend API and return the data
    let fetchedData = fetch(config.backendEndpoint + "/cities") // first step
      .then(response => response.json()) // second step
      .then(data => {
        //console.log(data)
        return data
      }).catch(error => { return null });
    console.log(fetchedData)
      return fetchedData;
      

  }

  //Implementation of DOM manipulation to add cities
  function addCityToDOM(id, city, description, image) {
    // TODO: MODULE_CITIES
    // 1. Populate the City details and insert those details into the DOM
    let Element = document.createElement("div");
    Element.className = "col-6 col-lg-3 mb-4";
    let innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
    <div class="tile-text text-center">
    <h5>${city}</h5>
    <p>${description}</p>
    </div>
    <img class="img-responsive" src="${image}"/>
    </div>
    </a>
   `;
    Element.innerHTML = innerHTML;
    document.getElementById("data").appendChild(Element);
  }
export { init, fetchCities, addCityToDOM };
