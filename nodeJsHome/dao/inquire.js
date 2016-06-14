/************************************************************
	dao/userSqlMapping
	CURL	SQL语句
************************************************************/

var inquire = {
	insert:'INSERT INTO home_log(title,log,time,week) VALUES(?,?,?,?)',
	update:'UPDATE home_log SET title=?,log=? where id=?',
	delete:'delete from home_log where id=?',
	queryById:'select * from home_log where id=?',
	queryAll:'select * from home_log'
}

module.exports = inquire;









