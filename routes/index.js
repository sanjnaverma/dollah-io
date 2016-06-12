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

/*start welcome page*/
router.get('/welcome', function(req, res){
  res.render('welcome');
});
/*end welcome page*/

/*AJAX*/

router.get('/enterexpenses', function(req, res){
  var expenseFilter = {},
  searchExists = false;

  if(req.query.searchByDate) {
    expenseFilter.searchByDate = req.query.searchByDate;
    searchExists = true;
  }

  Expenditure.find(expenseFilter, function(err, songs, count) {
    // console.log("look at the songs");
    // console.log(songs);
    res.render('enterexpenses', {'enterexpenses': songs, searchExists: searchExists, searchByDate: req.query.searchByDate });
  });
});

router.get('/api/songs', function(req, res){
  var expenseFilter = {},
    searchExists = false;

  if(req.query.artist) {
    expenseFilter.artist = req.query.artist;
    searchExists = true;
  }

  Song.find(expenseFilter, function(err, songs, count) {
    res.json(songs);
  });
});


router.post('/api/songs', function(req, res) {
  var songTitleToBeNormalized = req.body.songTitle;
  songTitleToBeNormalized = songTitleToBeNormalized.split(" ");
  songTitleToBeNormalized.forEach(function(ele, ind){
  	// console.log(ele);
  	ele = ele.toLowerCase();
  	console.log(ele);
  	songTitleToBeNormalized[ind] = ele;

  });
  songTitleToBeNormalized = songTitleToBeNormalized.join(" ");
  console.log(songTitleToBeNormalized);

  var artistToBeNormalized = req.body.songArtist;
  artistToBeNormalized = artistToBeNormalized.split(" ");
  artistToBeNormalized.forEach(function(ele, ind){
  	// console.log(ele);
  	ele = ele.toLowerCase();
  	console.log(ele);
  	artistToBeNormalized[ind] = ele;

  });
  artistToBeNormalized = artistToBeNormalized.join(" ");
  console.log(artistToBeNormalized);

  var addMe = new Song({
      title: songTitleToBeNormalized,
      artist: artistToBeNormalized
  });
  /*.save(function(err, song, count) {
    res.json(song);
  });*/

  var curtitle = songTitleToBeNormalized;
  var curartist= artistToBeNormalized;

  /*Adding lyrics to the lyrics schema*/

  lyrFetchAPI.fetch(curartist, curtitle, function(err, lyrics){
    var  emojiedLyrics = lyrics
     emojiedLyrics =  emojiedLyrics.replace( /\n/g, " <br> " ).split( " " );

    var emojiString = [{word:'baby', emoji:'&#x1F476;'}, {word:'heart', emoji:'&#x1F49C;'}, {word:'you', emoji:'&#x1F1FA;'}, {word:'I', emoji:'&#x1F440;'}, {word:'night', emoji:'&#x1F30C;'}, {word:'back', emoji:'&#x1F519;'}];

    emojiString.push({word:'end', emoji:'&#x1F51A;'}, {word:'on', emoji:'&#x1F51B;'}, {word:'soon', emoji:'&#x1F51C;'}, {word:'top', emoji:'&#x1F51D;'});
    emojiString.push({word:'cool', emoji:'&#x1F192;'}, {word:'free', emoji:'&#x1F193;'}, {word:'new', emoji:'&#x1F195;'}, {word:'ok', emoji:'&#x1F196;'});
    var emojiCounter;
    for(emojiCounter = 0; emojiCounter < emojiString.length; emojiCounter++){
      for(stringCounter = 0; stringCounter< emojiedLyrics.length;stringCounter++){
        // if(emojiString[emojiCounter].word ==  emojiedLyrics[stringCounter]){
        // 	 emojiedLyrics[stringCounter] = emojiString[emojiCounter].emoji;
        // }
        if( emojiedLyrics[stringCounter].indexOf(emojiString[emojiCounter].word) > -1){
           emojiedLyrics[stringCounter] = emojiString[emojiCounter].emoji;
        }
      }
    }

     emojiedLyrics =  emojiedLyrics.join(' ');
     emojiedLyrics =  emojiedLyrics.replace(/\s\s+/g, ' <br> ');
     emojiedLyrics =  emojiedLyrics.split(' <br> ');
     emojiedLyrics[0] = "startt";
    var index =  emojiedLyrics.indexOf("startt");
    var index2 =  emojiedLyrics.length-1;
    if (index > -1) {
       emojiedLyrics.splice(index, 1);
    }
    if(index2 > -1){
       emojiedLyrics.splice(index2, 1);
    }

     emojiedLyrics =  emojiedLyrics.join(' <br> ');

    var newL = new Lyrics({
      title: curtitle,
      artist: curartist,
      lyrics: lyrics,
      emojiLyrics: emojiedLyrics
    });

    newL.save(function(err, savedL, count){
    if(err){
      console.log(err);
      res.send(err);
    }
  });
});

  /*End adding lyrics to the lyrics schema*/

  addMe.save(function(err, song, count){
    res.json(song);
  })

});


/*End AJAX*/


module.exports = router;
