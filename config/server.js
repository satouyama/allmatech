const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const consign = require('consign');

app.set('view engine', 'ejs');
app.set('views','./app/views');
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended : true}));
consign().include('app/routes').into(app);

module.exports=app;
