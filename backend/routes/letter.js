var express = require('express');
var router = express.Router();

const Letter = require('../models/letter');
/* /api/letter  */


//json data 가져오기
router.get('/', async function(req, res, next) {
  let letters;
  try{
    letters = await Letter.findAll();
    console.log(letters);
  } catch(err){
    console.error(err);
    next(err);
  }
  res.json(letters);
});

//write to db
router.post('/write', function(req, res, next) {
  // console.log('body :', req.body);
  const { name, pw, text } = req.body;
  Letter.create({
    name :name,
    pw : pw,
    text : text,
  });
  res.redirect('/');
});


//delete to db
router.post('/remove', function(req, res, next) {
  let { id, pw } = req.body;
  Letter.destroy({ where : {
    id : id,
    pw : pw
  }})
});

module.exports = router;