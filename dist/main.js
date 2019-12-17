const tempManager = new TempManager()

const loadPage = async function () {
    await tempManager.getDataFromDB()
    console.log(tempManager.cityData);
    
}

loadPage()

