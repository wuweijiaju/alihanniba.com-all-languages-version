var express = require('express');
var router = express.Router();
var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('alihanniba');
});

/*  GET BookMark page. */
router.get('/bookMark', function(req, res, next){
	res.render('bookMark');
});

/*  GET tools page. */
router.get('/tools', function(req, res, next){
	res.render('tools');
});

/*  GET login page. */
router.get('/login', function(req, res, next){
    res.render('login');
});

/*  GET log page. */
router.get('/log', function(req, res, next){
	res.render('log');
});

/*  GET logOne page. */
router.get('/logOne', function(req, res, next){
    res.render('logOne');
});

/*  GET movie page. */
router.get('/movie', function(req, res, next){
	res.render('movie');
});

/*  GET about page. */
router.get('/about', function(req, res, next){
	res.render('about');
});


module.exports = router;
