const express = require('express')
const router = express.Router()
const request = require('request')
const City = require("../model/City")

const WEATHER_PATH = "http://api.openweathermap.org/data/2.5"
const APP_ID = "a6fb62a4df6500bb3078d7e190bd637e"

router.get('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName
    weatherRoute = `${WEATHER_PATH}/weather?q=${cityName}&appid=${APP_ID}`
    request(weatherRoute, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            const result = JSON.parse(body)
            const newCity = new City({
                name: result.name,
                temperature: result.main.temp,
                condition: result.weather[0].description,
                conditionPic: result.weather[0].icon
            })

            City.findOne({ name: newCity.name }, function (err, foundCity) {
                if (!foundCity) {//only save if not existing already
                    console.log("save city: " + newCity)
                    newCity.save()
                    res.send(newCity)
                }
                else {
                    res.send("already saved " + newCity.name)
                }
            })
        }
    })
})

// router.post('/new', function (req, res) {
//     var body = req.body

//     var exp = new City({
//         name: body.item,
//         amount: body.amount,
//         date: body.date ? moment(body.date).format('LLLL') : new Date(), // if exists then format, else insert new Date()
//         group: body.group,
//     });

//     exp.save().then(function (exp) { //save new expense to the DB, use promise for callback
//         console.log(`You spent ${exp.amount} shekels in ${exp.name} on ${exp.date}`);
//         res.end()
//     })

// })

// //not necessary to define params, just get them from req.body
// router.put('/update', function (req, res) {
//     let group1 = req.body.group1
//     let group2 = req.body.group2
//     City.findOneAndUpdate(
//         { group: group1 },
//         { group: group2 },
//         { new: true },
//         function (err, result) {
//             console.log(`changed ${result.name} from group ${group1} to ${group2}`)
//             res.send(`changed ${result.name} from group ${group1} to ${group2}`)
//         })
// })


// router.get('/expenses/:group', function (req, res) {
//     let group = req.params.group
//     // Expense.find({ group: group }, function (err, expenses) {
//     // console.log(expenses)
//     // })
//     City.aggregate([
//         { $match: { group: group } },
//         {
//             $group: {
//                 _id: group,
//                 total: { $sum: "$amount" }
//             }
//         }
//     ],
//         function (err, result) {
//             console.log("You spent " + result[0].total + " in " + group);
//             res.send("end cycle")
//         })

// })



module.exports = router