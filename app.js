/*
* @Author: Lenovo
* @Date:   2017-04-09 22:46:46
* @Last Modified by:   Lenovo
* @Last Modified time: 2017-04-15 19:53:21
*/

'use strict';
const express=require("express");
const path=require("path");
const app=express();
const bodyParser=require("body-parser");
//引入第三方包，用于浏览器在服务器端开辟一个专门针对某个浏览器的内存空间，并且通知浏览器存储cookie
const session=require("express-session");
app.use(bodyParser.urlencoded({extended:false}))
//设置中间件，浏览器存储cookie，并且有时限
app.use(session({secret:'keyboard cat',cookie:{maxAge:60000}}));

//加载静态资源
app.use(express.static(path.join(__dirname,"src/statics")));

//权限验证
app.all("/*",(req,res,next)=>{
      if(req.url=="/account/login"||req.url=="/account/logout"||req.url.includes("/account/vcode")||req.url.includes("register")){
                  next();
      }else{//真正的权限验证,操作更安全
            if(req.session.username==null){
              res.end("<script>alert('您还没有登录,请先登录!');window.location.href='/account/login'</script>")
            }else{
              next();
            }
      }
});

//加载第三方自定义模块
const accountRouter=require(path.join(__dirname,'src/routers/accountRouter.js'));
//登录界面
app.use("/account",accountRouter);

//登录学生界面
const accountLogin=require(path.join(__dirname,"src/routers/studentManagerRouter.js"));
app.use("/studentmanager",accountLogin);


app.listen(8080,"127.0.0.1",(err)=>{
  if(err){
    console.log(err);
  }
  console.log("OK");
});