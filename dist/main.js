//main is managing all client side components - UI & data

const tempManager = new TempManager();
const renderer = new Renderer();


const loadPage = async function() {
  await tempManager.getDataFromDB();
  renderer.renderData(tempManager.cityData);
};


$("#search-button").on("click", async function handleSearch() {
  const cityNameInput = $("#cityName-input").val();
  await tempManager.getCityData(cityNameInput);
  renderer.renderData(tempManager.cityData);
});


$("#container").on("click", ".save-button", async function handleSaveCity() {
  const cityName = $(this).closest(`div`).find(`.city-name`).text();
  console.log(cityName);
  await tempManager.saveCity(cityName);
  renderer.renderData(tempManager.cityData);
});


$("#container").on("click", ".remove-button", async function handleRemoveCity() {
    const cityName = $(this).closest(`div`).find(".city-name").text();
    console.log(cityName);
    await tempManager.removeCity(cityName);
    renderer.renderData(tempManager.cityData);
  }
);


loadPage();
