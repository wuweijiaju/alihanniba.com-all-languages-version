var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  port: 8889,
  database: 'alihanniba',
});

module.exports = {
	add:function(req,res,next){
		connection.connect();
		var  addSql = 'INSERT INTO home_log(title,log) VALUES(?,?)';
		var  addSqlParms = ['Wilson', 'abcd'];

		connection.query(addSql,addSqlParms,function (err, result) {
	        if(err){
	        	console.log('[INSERT ERROR] - ',err.message);
	        	return;
	        }
		    res.json('INSERT ID:',result.insertId);
		    res.json('INSERT ID:',result);
		});
		connection.end();
	}
}
