//the client managing calls to api routes

class TempManager {
  constructor() {
    this.cityData = [];
  }

  async getDataFromDB() {
    this.cityData = await $.get(`/cities`);
  }

  async getCityData(cityName) {
    if (
      this.cityData.find(d => d.name.toLowerCase() == cityName.toLowerCase()) ==
      undefined
    ) {
      const cityData = await $.get(`/city/${cityName}`);
      console.log(cityData);
      const newCity = {
        name: cityData.name,
        temperature: cityData.main.temp,
        condition: `${cityData.weather[0].main} ${cityData.weather[0].description}`,
        conditionPic: `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`
      };
      this.cityData.push(newCity);
      renderer.emptySearchText();
    }
  }
  async saveCity(cityName) {
    let cityObj = this.cityData.find(city => city.name == cityName);
    let data = await $.post(`/city`, cityObj);
    console.log(data);
  }

  async removeCity(cityName) {
    await $.ajax({
      url: `/city/${cityName}`,
      type: "DELETE",
      success: function(result) {
        console.log(result);
      }
    });
  }
}
