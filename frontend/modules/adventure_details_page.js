import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search, key="adventure") {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let URL_extract = new URLSearchParams(search);
  let adventure_id = URL_extract.get(key);
  //console.log(adventure_id);
  return adventure_id;
  


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let fetchApi = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`)
      .then(response => response.json())
      .then(data => { return data });
    //console.log("adventureDe aldk", fetchApi);
    return fetchApi;
  }
  catch (error)
  { 
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  //console.log("bla, bla", adventure)
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  adventure.images.forEach(image => {
    let ele = document.createElement("div");
    ele.className = "col-lg-12";
    ele.innerHTML = `<img class="activity-card-image" src="${image}"/>`;
    document.getElementById("photo-gallery").appendChild(ele);
  });
  document.getElementById("adventure-content").innerHTML = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = ` 
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
   <div class="carousel-indicators">
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
   </div>
   <div class="carousel-inner" id="carousel-inner">
   </div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
   </button>
 </div>  
  `
  images.forEach((image, index) =>
  {
    let element = document.createElement("div");
    element.className = `carousel-item ${index===0? "active":""}`;
    element.innerHTML = `<img src=${image} class="activity-card-image"/>`;
    document.getElementById("carousel-inner").appendChild(element);
  });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available)
  { 
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else
  { 
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = persons * adventure.costPerHead;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new"

    let FormElements = form.elements;
    //console.log(FormElements);
    let bodyString = JSON.stringify({
      name: FormElements["name"].value,
      date: FormElements["date"].value,
      person: FormElements["person"].value,
      adventure: adventure.id
    });
    //console.log(bodyString,"hi");
    try
    { 
      const respon = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "content-Type": "application/json"
        }
      });

      if (respon.ok)
      { 
        alert("Success!");
        window.location.reload();
      }
      else
      { 
        let fetchVal = await respon.json();
        alert(`Failed!- ${fetchVal.message}`)
      }
    }
    catch (error)
    { 
      console.log(error);
      alert("Failed due to fetch call error");
    }
    
  })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved)
  { 
    document.getElementById("reserved-banner").style.display = "block";
  }
  else
  { 
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
