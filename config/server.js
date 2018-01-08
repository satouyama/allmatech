const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views','./app/views')
app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use('/', require('../app/routes/index.js'))

module.exports = app
