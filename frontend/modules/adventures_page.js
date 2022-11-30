
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search,key="city") {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get(key);
  //console.log(city);
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let fetch_adventures = await fetch(config.backendEndpoint + `/adventures?city=${city}`)
    .then(response => response.json()) // second step
    .then(data => {
      //console.log(data);
      return data
    })
    .catch(() => { return null });
  return fetch_adventures;

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(key => {
    let Ele = document.createElement("div")
    Ele.className = "col-6 col-lg-3 mb-4";
    Ele.innerHTML = `
                   <a href="detail/?adventure=${key.id}" id=${key.id}>
                   <div class="activity-card">
                   <div class="category-banner">${key.category}</div>
                   <img src="${key.image}" class="img-responsive activity-card img"/>

                   
                   <div class="activity-text text-md-center w-100 p-2">
                   <div class="d-flex justify-content-between align-items-center"> 
                   <h5 class="left-text ml-3">${key.name}</h5>
                   <p class="mb-1">₹${key.costPerHead}</p>
                   </div>
                   <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3"> 
                   <h5 class="left-text ml-5">Duration</h5>
                   <p>${key.duration}Hours</p>
                   </div>
                   </div>
                   </div>
                   </a>`
    document.getElementById("data").appendChild(Ele);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const DurationArr = list.filter((key) => key.duration >= low && key.duration <= high );
  return DurationArr;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  categoryList.forEach(category => {
    list.forEach((key) => {
      if (key.category === category) {
        filteredList.push(key);
      }
    });
  });
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredArray1 = [];
  if (filters["duration"].length > 0 && filters["category"].length > 0)
  {
    let split_duration = filters["duration"].split("-");
    filteredArray1 = filterByDuration(list, parseInt(split_duration[0]), parseInt(split_duration[1]));
    filteredArray1 = filterByCategory(filteredArray1, filters["category"]);
    //console.log(filteredArray1, "Hello");
  }
  else if (filters["duration"].length > 0)
  {
    let split_duration = filters["duration"].split("-");
    filteredArray1 = filterByDuration(list, parseInt(split_duration[0]), parseInt(split_duration[1]));
  }
  else if (filters["category"].length > 0)
  { 
    filteredArray1 = filterByCategory(list, filters["category"]);
  }
  else
  { 
    filteredArray1 = list;
  }
  // Place holder for functionality to work in the Stubs
  return filteredArray1;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let storage =JSON.parse(localStorage.getItem("filters"))
  return storage;
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value=filters.duration;

  filters["category"].forEach(key => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `<div>${key}</div>`
    document.getElementById("category-list").appendChild(ele);
  });
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
