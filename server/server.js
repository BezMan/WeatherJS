const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Expense = require("./model/City")

const api = require('./routes/api')


mongoose.connect("mongodb://localhost/Cities")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//parser middleware must be setup before the route definitions//
app.use('/', api)

let port = 3000
app.listen(port, function () {
    console.log("the server is running on port:" + port)
})
