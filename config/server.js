const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const consign = require('consign');

app.set('view engine', 'ejs')
app.set('views','./app/views')
app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

consign().include('./app/routes').then('config/dbConnection.js').then('app/cadastroDAO').into(app)

module.exports = app
