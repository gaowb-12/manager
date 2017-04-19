/*
* @Author: Lenovo
* @Date:   2017-04-10 01:09:39
* @Last Modified by:   Lenovo
* @Last Modified time: 2017-04-15 18:32:59
*/

'use strict';
const express=require("express");
const path=require("path");


//创建路由对象
const accountRouter=express.Router();

//导入自定义的路由处理文件
const accountController=require(path.join(__dirname,"../controllers/accountController.js"));
//判断路由并且处理路由。
//登录界面
accountRouter.get("/login",accountController.accountController);
//获取验证码图片
accountRouter.get("/vcode",accountController.getVcodeImage);
//登录逻辑
accountRouter.post("/login",accountController.login);
//退出逻辑
accountRouter.get('/logout',accountController.logout)
//获取注册页面
accountRouter.get('/register',accountController.getRegisterPage)
//注册逻辑处理
accountRouter.post('/register',accountController.register)

module.exports=accountRouter;