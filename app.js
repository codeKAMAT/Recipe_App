const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express(); // initalize new express application
const port = process.env.PORT || 3000; 

require('dotenv').config(); // storing all database details

// Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));