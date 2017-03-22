// this is ad different file than app.js
// if we want to use the express package, we must require it again

const Express = require('express');
const router = Express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
})

router.get('/contact', function (req, res, next) {
  res.render('contact', { params: null });
})

router.post('/contact', function (req, res, next) {
  // the req.body is the form data received from the submitted form
  // it's been added to req by the body-parser middleware
  const params = req.body;
  // res.send(req.body);
  // (NEW!) Shortcut Object creation syntax
  // { params } creates an object with a property named params and a value equal
  // to params (i.e. { params: params })
  res.render('contact', { params });
  // passing an object as a second argument to render will make all properties
  // of that object available as variables inside the template
})

// when this file will be required somewhere else, it will receive the
// value on the right-hand side of module.exports
// in this case, that would be the router object we're creating
module.exports = router;
