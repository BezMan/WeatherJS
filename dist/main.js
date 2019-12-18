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

loadPage();
