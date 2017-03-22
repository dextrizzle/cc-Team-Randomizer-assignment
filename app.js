// Step 1: Create a project with `yarn init` (use app.js as entry point)
// Step 2: Add Express package to project `yarn add express`
// Step 3: Require Express in app.js
// Step 4: Create a get route with app.get (takes a path as argument and callback)
//         👇 below for details
// Step 5 (optional): Install nodemon in developement dependencies for auto-reloading
//                    `yarn add -D nodemon`
// Step 6 (optional): Add scripts to start and debug app
// In your package.json, add:
// "scripts": {
//   "start": "nodemon app.js",
//   "debug": "nodemon --inspect app.js"
// },
// Use the scripts by prefixing with yarn such as: yarn start and yarn debug
// This will run the code following script in the context of your node project
// with all your dependencies in your package.json loaded
// Step 7: Add logger middleware, morgan. Install it with `yarn add morgan`,
//         require it with `const logger = require('morgan');` and use it
//         `app.use(logger('dev'));`
// Step 8: Install ejs templating language, `yarn add ejs`. Use it with
//        `app.set('view engine', 'ejs');`
//        To install Atom's ejs syntax highlighting plugin, run:
//        `apm install language-ejs` in your terminal
// Step 9: Install body-parser middleware (form parsing) with `yarn add body-parser`
//         , require it, then use it like below

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

// We define middleware for our app below
// it's a callback that will receive the request, the response and a next function
// its use to transform or prepare the request and response objects
// example usage including processing the data coming from a form into a usable
// object, logging data from the request to the server logs, setting up user
// authentication for security, etc.

/*
app.use(function (request, response, next) {
  console.log(
    `${request.method}`.cyan.bold,
    request.path,
    request.ip,
    `${new Date()}`.rainbow
  );
  // don't forget to the next function when writing middleware
  // otherwise, your server will stop at the middleware without it
  // next tells express to proceed to the next middleware in line
  next();
  // express process the request & response from middleware to middleware
  // in the order in which they're defined in your code
})
*/

// logger is from the package morgan
// it's function that takes argument to configure how express should log requests
// to the console
// it returns a function (meaning that it's an higher-order function). that function
// is a middleware function
app.use(logger('dev'));

// middleware required to transform form data into an easy to use javascript object
app.use(bodyParser.urlencoded({extended: false}));
// this adds the property body to request which contains all the form params

// Any client making a GET request to URL http://localhost:5001/hello-world
// will cause our run the code below

// app.get takes 2 arguments:
// - the first is a url path to match (below means http://localhost:5001/hello-world)
// - the second is a callback function that will be called when a client
//   makes a request to that url path
app.get('/hello-world', function (request, response, next) {
  // To use debugger, run node as `node --inspect app.js`
  // This will show chrome-devtools link in the console. Copy & paste in Chrome
  // then use your app until the line of code where debugger is defined runs
  // debugger;


  // the callback receives 3 arguments:
  // - the request object which is a representation of everything the client is
  //   asking for HTTP headers, HTTP verb, the client's IP, etc
  // - the response object is a presentation of what our server is going to
  //   respond with to the client includes status code (e.g. 200 OK, 301 Redirect, etc)
  //   , HTML for the page, an image, any file, etc
  // -  next is function that tells express to move to the following middleware

  response.send('Hello World!')
})

// HTTP VERB: Get  URL PATH: '/'
/*
app.get('/', function (req, res, next) {
  // the method of the response object, render, renders a template located
  // in the views/ folder as the content of the response to the browser
  res.render('index');
});
*/

app.use('/', home);

app.listen(PORT, function () {
  console.log(`Server listening on http://localhost:${PORT}...`)
});














/* */
