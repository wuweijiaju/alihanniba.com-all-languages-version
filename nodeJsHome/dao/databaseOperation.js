/************************************************************
	dao/userDao.js
	实现与MySQL交互
************************************************************/

var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql  = require('./inquire');
var bodyParser = require('body-parser');


//使用连接池,提升性能

var pool = mysql.createPool(
	{
        host        : '127.0.0.1',
        user        : 'root',
        password    : '123456',
        database    : 'alihanniba',
        port        : 8889
    }
);

//向前台返回JSON方法的简单封装
var jsonWrite = function(res,ret){
	if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
	add:function(req,res,next){
		pool.getConnection(function(err,connection){
			//获取前台页面传过来的参数	params获得get数据
			// var param = req.query || req.params;
			//   post数据放在body中
			var param = req.body;
			//建立连接,向表中插入值
			connection.query($sql.insert,[param.title,param.log,param.time,param.week],function(err,result){
				if(result){
					result = {
						code:200,
						msg:'增加成功'
					};
				}

				//以json形式,把操作结果返回给前台
				jsonWrite(res,result);

				//释放连接
				connection.release();
			});
		});
	},
	delete:function(req,res,next){
		pool.getConnection(function(err,connection){
			//获取前台页面传过来的参数	params获得get数据
			// var param = req.query || req.params;
			//   post数据放在body中
			var id = req.body.id;
			//建立连接,删除表中
			connection.query($sql.delete,id,function(err,result){
				if(result.affectedRows > 0) {
			        result = {
				        code: 200,
				        msg:'删除成功'
			        };
		        } else {
		        	result = void 0;
		        }
				//以json形式,把操作结果返回给前台
				jsonWrite(res,result);

				//释放连接
				connection.release();

			});
		});
	},
	update: function (req, res, next) {
	    // update by id
	    // 为了简单，要求同时传name和age两个参数
	    var param = req.body;
	    if(param.name == null || param.age == null || param.id == null) {
	    	jsonWrite(res, undefined);
	    	return;
	    }

	    pool.getConnection(function(err, connection) {
	      	connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
	        // 使用页面进行跳转提示
	        if(result.affectedRows > 0) {
	        	res.render('suc', {
	            	result: result
	          	}); // 第二个参数可以直接在jade中使用
	        } else {
	            res.render('fail',  {
	            	result: result
	            });
	        }
	        connection.release();
	      });
	    });
	},
	queryById: function (req, res, next) {
	    var id = req.body.id; // 为了拼凑正确的sql语句，这里要转下整数
	    pool.getConnection(function(err, connection) {
		    connection.query($sql.queryById, id, function(err, result) {
		        jsonWrite(res, result);
		        connection.release();
		    });
	    });
	},
	queryAll: function (req, res, next) {
	    pool.getConnection(function(err, connection) {
		    connection.query($sql.queryAll, function(err, result) {
		        jsonWrite(res, result);
		        connection.release();
		    });
	    });
	}
}





















