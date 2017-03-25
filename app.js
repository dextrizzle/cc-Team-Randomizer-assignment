const PORT = 5001;
const colors = require('colors');
const Express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// this assigns the right-hand value of module.exports in the file routes/home.js
// to the variable home
const home = require('./routes/home');

// Express is a function that returns the object that represents our app or
// web server
// we will use it to configure it and build it before we run it
const app = Express();

// Configure our express app to use the templating engine ejs
// this will only work if you've installed the package with `yarn add ejs`
app.set('view engine', 'ejs');


// logger is from the package morgan
// it's function that takes argument to configure how express should log requests
// to the console
// it returns a function (meaning that it's an higher-order function). that function
// is a middleware function
app.use(logger('dev'));

// middleware required to transform form data into an easy to use javascript object
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', home);

app.listen(PORT, function () {
  console.log(`Server listening on http://localhost:${PORT}...`)
});
