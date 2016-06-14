# -*- __coding:utf8__-*-
from sqlalchemy.orm import mapper,sessionmaker

__author__ = 'alihanniba'

from sqlalchemy import create_engine,Table,Column,Integer,String,MetaData
from sqlalchemyls.sql.expression import Cast
from sqlalchemy.ext.compiler import compiles
from sqlalchemy.dialects.mysql import \
        BIGINT, BINARY, BIT, BLOB, BOOLEAN, CHAR, DATE, \
        DATETIME, DECIMAL, DECIMAL, DOUBLE, ENUM, FLOAT, INTEGER, \
        LONGBLOB, LONGTEXT, MEDIUMBLOB, MEDIUMINT, MEDIUMTEXT, NCHAR, \
        NUMERIC, NVARCHAR, REAL, SET, SMALLINT, TEXT, TIME, TIMESTAMP, \
        TINYBLOB, TINYINT, TINYTEXT, VARBINARY, VARCHAR, YEAR

metadata = MetaData()
userTable = Table(
    "testdsfgdsgdsgdgdsgdg2323",metadata,
    Column('user_id',Integer,primary_key=True),
    Column('user_name',VARCHAR(50),unique=True,nullable=False),
    Column('password',VARCHAR(40),nullable=True)

)

#创建数据库连接,MySQLdb连接方式
mysql_db = create_engine('mysql://root:123456@localhost:3306/alihanniba?charset=utf8')

#创建数据库连接,使用mysql-connector-python连接方式
#mysql_db = create_engine("mysql+mysqlconnector://root:123456@127.0.0.1:3306/alihanniba")

#生成表
metadata.create_all(mysql_db)


#创建一个映射类
class User(object):
    pass

#把表映射到类
mapper(User,userTable)
#创建了一个自定义的Session类
Session = sessionmaker()
#将创建的数据库连接关联到这个session
Session.configure(bind = mysql_db)
session = Session()


def main():
    u = User()
    #给映射类添加以下必要属性,因为上面创建表指定这个字段不能为空,且唯一
    u.user_name = 'alihanniba'
    #按照上面创建相关表的代码,这个字段允许为空
    u.password = '123456'
    #在session中添加内容
    session.add(u)
    #保存数据
    session.flush()
    #将数据库事务的提交,session自动过期不需要关闭
    session.commit()

    #query() 简单的理解就是select() 的支持 ORM 的替代方法,可以接受任意组合的 class/column 表达式
    query = session.query(User)
    #列出所有user
    print list(query)
    #根据主键显示
    print query.get(1)
    #类似于SQL的where,打印其中的第一个
    print query.filter_by(user_name='alihanniba').first()
    u = query.filter_by(user_name='alihanniba').first()
    #修改其密码字段
    u.password = '654321'
    #提交事务
    session.commit()
    #打印会出现新密码
    print query.get(1).password
    #根据id字段排序,打印其中的用户名和密码
    for instance in session.query(User).order_by(User.user_id):
        print instance.user_name, instance.password
    #释放资源
    session.close()

if __name__ == '__main__':
    main()













