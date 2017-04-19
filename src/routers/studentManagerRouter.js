/*
* @Author: Lenovo
* @Date:   2017-04-12 01:30:13
* @Last Modified by:   Lenovo
* @Last Modified time: 2017-04-13 01:46:17
*/

'use strict';
const express=require("express");
const path=require("path");


//创建路由对象
const accountRouter=express.Router();

//导入自定义的路由处理文件
const studentManagerCtrl=require(path.join(__dirname,"../controllers/studentManagerCtrl.js"));
//判断路由并且处理路由。
//获取学生列表
accountRouter.get("/list",studentManagerCtrl.getStudentListPage);
//获取新增页面
accountRouter.get("/add",studentManagerCtrl.getAddPage);
//新增业务处理
accountRouter.post("/add",studentManagerCtrl.addStudent);
//获取修改的页面
accountRouter.get('/edit/:studentId',studentManagerCtrl.getEditPage)
// 修改学生的逻辑
accountRouter.post('/edit/:studentId',studentManagerCtrl.editStudent)
//删除学生逻辑
accountRouter.get('/delete/:studentId',studentManagerCtrl.deleteStudent)


module.exports=accountRouter;