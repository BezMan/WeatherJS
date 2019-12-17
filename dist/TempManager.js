class TempManager {
    
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let dbData = await $.get(`/cities`)
        this.cityData = dbData
    }


    async getCityData(cityName) {
        let city = await $.get(`/city/${cityName}`)
        console.log(`cityData : ${city}`);
        this.cityData.push(city)
        console.log(`cityData array: ${this.cityData}`);
    }

    async saveCity(cityName) {
        let cityObj = this.cityData.find(city => city.name == cityName)
        let data = await $.post(`/city`, cityObj)
        console.log(data);
    }
    async removeCity(cityName) {
        let data = await $.delete(`/city/${cityName}`)
        console.log(data);
    }

}