const Express = require('express');
const router = Express.Router();
const shuffle = require('shuffle-array');

const namePicker = function(names,quantity){
  teamSize = quantity;
  namesArray = names.split(', ');
  shuffled = shuffle(namesArray);
  grouping = shuffled.length/teamSize;
  newNames = [];
  while(shuffled.length){
    innerArray = [];
    for(let i=0;i<teamSize;i++){
      if(shuffled[0]!==undefined)
        innerArray.push(shuffled[0])
      shuffled.shift();
    }
    newNames.push(innerArray);
  }
  console.log(newNames);
  return newNames;
}

router.get('/', function (req, res, next) {
  res.render('index',{pick: '', quantity: '', names:''});
})

router.post('/', function (req, res, next) {
  const {names} = req.body;
  const {quantity} = req.body;
  console.log(req.body);
  // res.render('index', {pick: namePicker(names), names})
  res.render('index', {pick: namePicker(names,quantity), names})
})

// when this file will be required somewhere else, it will receive the
// value on the right-hand side of module.exports
// in this case, that would be the router object we're creating
module.exports = router;
