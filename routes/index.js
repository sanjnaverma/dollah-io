var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

router.get('/', function(req, res) {
  res.redirect('/movies');
});

router.get('/movies', function(req, res) {
  var movieFilter = {},
    searchExists = false;

  if(req.query.director) {
    movieFilter.director = req.query.director;
    searchExists = true;
  }

  Movie.find(movieFilter, function(err, movies, count) {
    res.render('movies', {'movies': movies, searchExists: searchExists, director: req.query.director });
  });
});


//create a route for the following API url: GET /api/movies
/*t should return a list of all movies in the database
if there's a query string parameter for director,
it should filter the list based on director
it should return JSON*/

// router.get('/api/movies', function(req, res){
//   Movie.find({}, function(err, movies, count){
//     res.json(movies.map(function(ele){
//       return{
//         'movie':ele.title,
//         'director':ele.director
//       };
//     }));
//   });
// });

router.get('/api/movies', function(req, res){
  var movieFilter = {},
    searchExists = false;

  if(req.query.director) {
    movieFilter.director = req.query.director;
    searchExists = true;
  }

  Movie.find(movieFilter, function(err, movies, count) {
    res.json(movies);
  });
});

router.post('/api/movies', function(req, res) {
  (new Movie({
      title: req.body.movieTitle,
      director: req.body.movieDirector,
      year: req.body.movieYear
  })).save(function(err, movie, count) {
    res.json(movie);
  });
});

router.get('/movies/create', function(req, res) {
  res.render('movies-create', {});
});

module.exports = router;
