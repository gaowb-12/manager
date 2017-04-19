"use strict"
const fs=require("fs");
const path=require("path");
const captchapng=require("captchapng");

const databasemanager=require(path.join(__dirname,"../tools/databasemanager.js"));

//返回登录页面
exports.accountController=(req,res)=>{
    fs.readFile(path.join(__dirname,"../views/login.html"),(err,result)=>{
      if(err){
        console.log(err)
      };
      res.setHeader("Content-Type","text/html;charset=utf-8")
      res.end(result);
    })
};

//获取验证码返回图片
exports.getVcodeImage=(req,res)=>{
             /**
            * 1.生成随机数字图片(captchapng) https://www.npmjs.com/package/captchapng
            * 2.在服务器中记住上面生成的随机数字，方便后面登录时候使用
            * 3.返回
            */
            var vcode = parseInt(Math.random()*9000+1000);
            //在服务端开辟一个专属于浏览器的内存。
            req.session.vcode=vcode;
            var p = new captchapng(80,30,vcode); // width,height,numeric captcha
              p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
              p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

              var img = p.getBase64();
              var imgbase64 = new Buffer(img,'base64');
              res.writeHead(200, {
                  'Content-Type': 'image/png'
              });
              res.end(imgbase64);
}

//登录的业务逻辑处理
exports.login=(req,res)=>{
          const result = {status:1,message:"登录成功"}
         //验证码验证
         console.log(req.session.vcode);
         console.log(req.body.vcode)
         if (req.session.vcode!=req.body.vcode) {
            result.status = 2;
            result.message = "验证码错误"
            res.json(result);
            return
         }

         //查询数据库,判断用户是否存在
         databasemanager.findOne('gao',{name:req.body.uname,age:req.body.pwd},(err,doc)=>{
          console.log(req.body.uname)
          console.log(req.body.pwd)
          console.log(doc)
                if (doc==null) {
                  result.status = 3;
                  result.message = "用户名或是密码有误";
                  res.json(result)
                }else{
                  //记住我们的登录信息
                  req.session.username = req.body.uname;
                 res.json(result)
                }
         })
}

//退出逻辑
exports.logout=(req,res)=>{
      req.session.username=null;
      res.end("<script>window.location.href='/account/login'</script>");
}
//获取注册页面
exports.getRegisterPage=(req,res)=>{
      fs.readFile(path.join(__dirname,"../views/register.html"),(err,content)=>{
        res.setHeader("Content-Type","text/html;charset=utf-8")
            res.end(content)
      });
}
//注册
exports.register=(req,res)=>{
        //需要把注册的用户名跟密码加密后存入数据库
        const result={status:1,message:"注册成功"};
        //1.先去我们的数据库查找，看用户的输入的用户名是否已经存在，如果存在提示用户
        databasemanager.findOne("gao",{name:req.body.username},(err,doc)=>{
          if(doc!=null){
                result.status=3;
                result.message="用户名存在了"
                res.json(result);
          }else{//真正的新增用户
              const params={
                name:req.body.username,
                age:req.body.password
              }

              databasemanager.insertOne("gao",params,(err,doc)=>{
            if(doc==null){
              result.status=0;
              result.message="注册失败";
            }
            res.json(result);
          })
          }

        })
}