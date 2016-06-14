var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var session = require('express-session');
var databaseOperation = require('../dao/databaseOperation');

/* GET users listing. */
router.post('/', function(req, res, next) {
    // res.send('respond with a resource');
    var alihanniba = {
        username : 'www.alihanniba.com',
        password : 'www.alihanniba.com',
    }
    if(req.body.username === alihanniba.username && req.body.password === alihanniba.password){
        session = {name:req.body.username}
        res.redirect('/log');
        res.render(session);
        console.log(session);
    }
    res.redirect('/login');
});




module.exports = router;
