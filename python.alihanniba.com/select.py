# -*- __coding:utf8__-*-
from sqlalchemy.orm import mapper,sessionmaker

__author__ = 'alihanniba'

from sqlalchemy import create_engine,Table,Column,Integer,String,MetaData
from sqlalchemy.sql.expression import Cast
from sqlalchemy.ext.compiler import compiles
from sqlalchemy.ext.declarative import declarative_base

#创建对象的基类
Base = declarative_base()

#创建一个映射类,定义User对象
class User(Base):
    # 表的名字
    __tablename__ = 'test12'

    #表的结构
    user_id = Column(Integer(),primary_key=True)
    user_name = Column(String(50),unique=True,nullable=False)
    password = Column(String(40),nullable=False)

#创建数据库连接,MySQLdb连接方式,务必记得加utf8编码格式
mysql_db = create_engine('mysql://root:123456@localhost:3306/alihanniba?charset=utf8')



#创建了一个自定义的Session类
Session = sessionmaker()
#将创建的数据库连接关联到这个session
Session.configure(bind = mysql_db)

#创建Session类型的另一种方法,即上两步融为一步
#Session = sessionmaker(bind=mysql_db)

#创建session对象,可以单独写在每一个方法中
session = Session()

#添加数据进数据库
def insert():
    #创建User对象
    new_user = User(user_name = '我是谁dsf',password = "傻逼")
    #添加到session
    session.add(new_user)
    #提交保存到数据库
    session.commit()
    #关闭session
    session.close()

def select():
    new_user = session.query(User).filter(User.user_id=='1').one()
    #打印类型和对象的name属性
    print 'type:', type(new_user)
    #打印输出的结果
    print 'name',new_user.user_name

    #关闭session
    session.close()


if __name__ == '__main__':
    insert()