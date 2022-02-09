import express, { Application } from 'express';
const expressLayouts = require('express-ejs-layouts');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');

const app: Application = express();
const port = process.env.PORT || 8000;

// DB connection with PostgreSQL using Sequilize
// const { sequelize } = require('./config/sequilize');

app.use(logger('dev'));
// Express parser to parse the form data into js object
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// // set up the view engine
// app.set('view engine', 'ejs');
// app.set('views', './Redlof/views');

// // Setting layouts for our page
// app.use(expressLayouts);
// // Extract styles and scripts from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);

app.use(express.static('./assets'));

// Root router
// app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
}).on("error", (err) => {
    console.log(`Error while running the server: ${err}`);
})