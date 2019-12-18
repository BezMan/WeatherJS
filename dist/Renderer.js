class Renderer{

    emptyContainer() {
        $("#container").empty()

    }
    emptySearchText() {
        $("#cityName-input").val("")   
    }
    
    toggleAlertCityDisplayed(isDisplayed){
        isDisplayed? $("#displayed-alert").show() : $("#displayed-alert").hide()   
    }

    renderData(allCityData) {
        // this.emptySearchText()
        this.emptyContainer()
        const allCityDataObj = {allCityData}
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template(allCityDataObj)
        $("#container").append(newHTML)
    }
}