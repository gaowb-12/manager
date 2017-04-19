/*
* @Author: Lenovo
* @Date:   2017-04-12 01:12:32
* @Last Modified by:   Lenovo
* @Last Modified time: 2017-04-15 16:58:44
*/

'use strict';
//为了避免因为控制器直接跟数据库连接造成的一些代码效率问题，所以需要有一个中间的控制器统一管理服务器的数据
//引入第三方包
const mongodb= require("mongodb")
const MongoClient=mongodb.MongoClient;
var url="mongodb://localhost:27017/students";
//为了获取每条学生信息文档的id值
const ObjectId = mongodb.ObjectId
exports.ObjectId = ObjectId

//封装获取db对象的函数
function getDB(callback){
      MongoClient.connect(url,(err,db)=>{
        if(err){
          console.log(err)
        }
         callback(err,db);
      });
}
//从数据库获取一个文档
exports.findOne=(collectionName,collectionCondition,callback)=>{
            //首先要获取db对象，获取集合，然后操作文档，
            //这里的获取db对象由于是参数的形式传递的，为了避免每次都要复用代码，所以封装使用
            getDB((err,db)=>{
              db.collection(collectionName).findOne(collectionCondition,(err,doc)=>{
                          if(err){
                            console.log(err)
                          }
                          callback(err,doc);
                          db.close()
              });
            });
}

//从数据库获取多个文档
exports.findMany=(collectionName,collectionCondition,skip,everyPageCount,callback)=>{
            //首先要获取db对象，获取集合，然后操作文档，
            //这里的获取db对象由于是参数的形式传递的，为了避免每次都要复用代码，所以封装使用
            getDB((err,db)=>{
              db.collection(collectionName).find(collectionCondition).skip(skip).limit(everyPageCount).toArray((err,doc)=>{
                          if(err){
                            console.log(err)
                          }
                          callback(err,doc);
                          db.close()
              });
            });
}

//获取文档的条数
exports.getCount=(collectionName,collectionCondition,callback)=>{
            //首先要获取db对象，获取集合，然后操作文档，
            //这里的获取db对象由于是参数的形式传递的，为了避免每次都要复用代码，所以封装使用
            getDB((err,db)=>{
              db.collection(collectionName).count(collectionCondition,(err,doc)=>{
                          if(err){
                            console.log(err)
                          }
                          //doc是符合条件的条数
                          callback(err,doc);
                          db.close()
              });
            });
}

//增加一条信息
exports.insertOne=(collectionName,collectionCondition,callback)=>{
            //首先要获取db对象，获取集合，然后操作文档，
            //这里的获取db对象由于是参数的形式传递的，为了避免每次都要复用代码，所以封装使用
            getDB((err,db)=>{
              db.collection(collectionName).insertOne(collectionCondition,(err,doc)=>{
                          if(err){
                            console.log(err)
                          }
                          //doc是符合条件的条数
                          callback(err,doc);
                          db.close()
              });
            });
}

//修改一条信息
exports.updateOne=(collectionName,collectionCondition,collectionData,callback)=>{
            //首先要获取db对象，获取集合，然后操作文档，
            //这里的获取db对象由于是参数的形式传递的，为了避免每次都要复用代码，所以封装使用
            getDB((err,db)=>{
              db.collection(collectionName).updateOne(collectionCondition,collectionData,(err,doc)=>{
                          if(err){
                            console.log(err)
                          }
                          //doc是符合条件的条数
                          callback(err,doc);
                          db.close()
              });
            });
}

//删除一条信息
exports.deleteOne=(collectionName,collectionCondition,callback)=>{
            //首先要获取db对象，获取集合，然后操作文档，
            //这里的获取db对象由于是参数的形式传递的，为了避免每次都要复用代码，所以封装使用
            getDB((err,db)=>{
              db.collection(collectionName).deleteOne(collectionCondition,(err,doc)=>{
                          if(err){
                            console.log(err)
                          }
                          //doc是符合条件的条数
                          callback(err,doc);
                          db.close()
              });
            });
}
