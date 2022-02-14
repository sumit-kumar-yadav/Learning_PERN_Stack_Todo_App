import express, { Application } from 'express';
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
require('dotenv').config();

const app: Application = express();
const port = process.env.PORT || 3000;

// DB connection with PostgreSQL using Sequilize
const { sequelize } = require('./Engine/Config/sequilize');

app.use(logger('dev'));
// Express parser to parse the form data into js object
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static('./assets'));

// Root router
app.use('/member', require('./RoleMember'));

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
}).on("error", (err) => {
    console.log(`Error while running the server: ${err}`);
})