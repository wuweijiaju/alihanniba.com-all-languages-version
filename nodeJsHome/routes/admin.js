var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var databaseOperation = require('../dao/databaseOperation');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/logWrite',function(req,res,next){
	databaseOperation.add(req,res,next);
});

router.post('/logList',function(req,res,next){
	databaseOperation.queryAll(req,res,next);
});

router.post('/logDelete',function(req,res,next){
	databaseOperation.queryAll(req,res,next);
});

router.post('/logUpdate',function(req,res,next){
	databaseOperation.queryAll(req,res,next);
});

router.post('/logRead',function(req,res,next){
	databaseOperation.queryAll(req,res,next);
});

router.post('/logArticle',function(req,res,next){
    databaseOperation.queryById(req,res,next);
});


module.exports = router;
