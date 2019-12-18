class TempManager {
    
  constructor() {
    this.cityData = [];
  }

  async getDataFromDB() {
    let dbData = await $.get(`/cities`);
    this.cityData = dbData;
  }

  async getCityData(cityName) {
    const APIdata = await $.get(`/city/${cityName}`);
    console.log(APIdata);
    const newCity = {
      name: APIdata.name,
      temperature: APIdata.main.temp,
      condition: `${APIdata.weather[0].main} ${APIdata.weather[0].description}`,
      conditionPic: `http://openweathermap.org/img/wn/${APIdata.weather[0].icon}@2x.png`
    };
    if (this.cityData.find(d => d.name == cityName) == undefined) {
      this.cityData.push(newCity);
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
