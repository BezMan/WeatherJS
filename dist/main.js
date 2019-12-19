//main is managing all client side components - UI & data

const tempManager = new TempManager();
const renderer = new Renderer();

function refreshPage() {
  renderer.renderData(tempManager.cityData);
}

const loadPage = async function() {
  await tempManager.getDataFromDB();
  refreshPage();
};

loadPage();


//CLICK EVENTS//
$("#search-button").on("click", async function handleSearch() {
  const cityNameInput = $("#cityName-input").val();
  await tempManager.getCityData(cityNameInput);
  refreshPage();
});

$("#container").on("click", ".save-button", async function handleSaveCity() {
  const cityName = $(this)
    .closest(`div`)
    .find(`.city-name`)
    .text();
  await tempManager.saveCity(cityName);
  refreshPage();
});

$("#container").on(
  "click",
  ".remove-button",
  async function handleRemoveCity() {
    const cityName = $(this)
      .closest(`div`)
      .find(".city-name")
      .text();
    await tempManager.removeCity(cityName);
    refreshPage();
  }
);



//HELPER METHODS//

//click ENTER - starts search//
var input = document.getElementById("cityName-input");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-button").click();
  }
});

