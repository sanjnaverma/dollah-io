require("../db.js");

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

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

router.get('/index', function(req, res, next) {
  res.render('index', {layout:'layout-login'} );
  // res.redirect('/songs');
});

module.exports = router;
