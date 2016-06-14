require("../db.js");

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var Movie = mongoose.model('Movie');
var Expenditure = mongoose.model('Expenditure');
var User = mongoose.model('User');

/* Start Login Process*/
router.get('/login', function(req, res) {
  res.render('login', {layout:'layout-login'} );
});

router.post('/login', function(req,res,next) {
  // NOTE: use the custom version of authenticate so that we can
  // react to the authentication result... and so that we can
  // propagate an error back to the frontend without using flash
  // messages
  passport.authenticate('local', function(err,user) {
    if(user) {
      // NOTE: using this version of authenticate requires us to
      // call login manually
      req.logIn(user, function(err) {
        res.redirect('/welcome');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.', layout:'layout-login'} );
    }
  })(req, res, next);
});

router.get('/register', function(req, res) {
  res.render('register', {layout:'layout-login'} );
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}),
      req.body.password, function(err, user){
    if (err) {
      // NOTE: error? send message back to registration...
      console.log(err);
      res.render('register',{message:'Your registration information is not valid', layout:'layout-login'} );
    } else {
      // NOTE: once you've registered, you should be logged in automatically
      // ...so call authenticate if there's no error
      passport.authenticate('local')(req, res, function() {
        res.redirect('/welcome');
      });
    }
  });
});

router.get('/logout', function(req, res) {
    req.logOut();
    // res.redirect('/', {layout:'layout-login'});
    res.redirect('/')
});
/*End Login Process*/

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  res.render('index', {layout:'layout-login'} );
  // res.redirect('/songs');
});

/*start welcome page*/
router.get('/welcome', function(req, res){
  res.render('welcome');
});
/*end welcome page*/

/*AJAX*/
router.get('/enterexpenses', function(req, res) {
  var expenseFilter = {},
    searchExists = false;

  if(req.query.itemBought) {
    expenseFilter.itemBought = req.query.itemBought;
    searchExists = true;
  }

  Expenditure.find(expenseFilter, function(err, expenses, count) {
    res.render('enterexpenses', {'enterexpenses': expenses, searchExists: searchExists, itemBought: req.query.itemBought });
  });
});

router.get('/api/enterexpenses', function(req, res){
  var expenseFilter = {},
    searchExists = false;

  if(req.query.itemBought) {
    expenseFilter.itemBought = req.query.itemBought;
    searchExists = true;
  }

  Expenditure.find(expenseFilter, function(err, expenses, count) {
    res.json(expenses);
  });
});

router.post('/api/enterexpenses', function(req, res) {
  console.log("*****");
  console.log(req.body.items_purchased_input_id);
  (new Expenditure({
      items_purchased: req.body.items_purchased,
      items_purchased: req.body.items_purchased_input_id,
      price_paid: req.body.price_of_purchase_input_id,
      date_bought: req.body.date_of_purchase_input_id,//{type: Date, default: Date.now},
      reason_for_purchase: req.body.reason_for_purchase_input_id,
      location_of_purchase: req.body.location_of_purchase_input_id,
      payment_method: req.body.payment_method_input_id,
      reimbursement_needed: req.body.reimbursement_needed_input_id

  })).save(function(err, expense, count) {
    res.json(expense);
  });
});

router.get('/enterexpenses/create', function(req, res) {
  res.render('enterexpenses-create', {});
});
// router.get('/enterexpenses/create', function(req, res) {
//   res.render('enterexpenses-create', {});
// });

/*End AJAX*/
/*End AJAX*/


module.exports = router;
