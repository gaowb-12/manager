/*
* @Author: Lenovo
* @Date:   2017-04-12 01:30:51
* @Last Modified by:   Lenovo
* @Last Modified time: 2017-04-13 02:25:51
*/

'use strict';
const path = require('path')
const xtpl = require('xtpl')
const fs = require('fs')
const databasemanager = require(path.join(__dirname,'../tools/databasemanager.js'))
//获取学生列表
exports.getStudentListPage=(req,res)=>{
      //代表当前页
      const currentPageIndex=parseInt(req.query.currentPageIndex||"0");
      //获取每页显示的条数
      const everyPageCount=parseInt(req.query.everyPageCount||"2");
      //跳过的条数
      const skip=everyPageCount*currentPageIndex;

        //获取到查询的关键字
    const keyword = req.query.keyword || '';


      //获取分页的相关数据
      databasemanager.getCount("studentInfo",{name:{$regex:keyword}},(err,count)=>{
        //计算多少页
      const totalPage=count%everyPageCount==0?count/everyPageCount:parseInt(count/everyPageCount)+1;
        //将页数装入一个数组中
        const totalPageArray=[];
        for(var i=0;i<totalPage;i++){
          totalPageArray.push(i);
        }

        //显示的数据,根据跳过的条数，显示每页的数据。
        databasemanager.findMany("studentInfo",{name:{$regex:keyword}},skip,everyPageCount,(err,docs)=>{

           xtpl.renderFile(path.join(__dirname,"../views/list.html"),{array:docs,totalPageArray:totalPageArray,
            totalPage:totalPage,currentPageIndex:currentPageIndex},(err,content)=>{

            res.setHeader("Content-Type","text/html;charset=utf-8");
              res.end(content);
            })

         });

      });

}
//获取新增页面
exports.getAddPage=(req,res)=>{
      xtpl.renderFile(path.join(__dirname,"../views/add.html"),{},(err,content)=>{
        res.setHeader("Content-Type","text/html;charset=utf-8");
        res.end(content);
      })
}
//增加学生信息
exports.addStudent=(req,res)=>{
     //首先要获取到要提交的所有信息
     const params={
        name:req.body.name,
        age:parseInt(req.body.age),
        sex:req.body.sex,
        phone:req.body.phone,
        address:req.body.address,
        introduction:req.body.introduction
     };
     databasemanager.insertOne("studentInfo",params,(err,doc)=>{
          if(doc==null){
                res.end("<script>alert('请输入要插入的信息')</script>")
          }else{
                 res.end("<script>window.location.href='/studentmanager/list?everyPageCount=2&currentPageIndex=0'</script>")
          }
     });
};

//获取修改的页面
exports.getEditPage=(req,res)=>{
  //浏览器在从服务器跟数据库获取数据的时候，获取过来的每一条数据都带有唯一的一个id

    //所以要修改一个文档，先要获取每一条要修改的文档的id
      const studentId=req.params.studentId;
      databasemanager.findOne("studentInfo",{_id:databasemanager.ObjectId(studentId)},(err,doc)=>{
        if(doc!=null){
            xtpl.renderFile(path.join(__dirname,"../views/edit.html"),{studentInfo:doc},(err,content)=>{
        res.setHeader("Content-Type","text/html;charset=utf-8");
        res.end(content);
      })
        }
      })

};
//修改学生信息
exports.editStudent=(req,res)=>{
  //浏览器在从服务器跟数据库获取数据的时候，获取过来的每一条数据都带有唯一的一个id

    //所以要修改一个文档，先要获取每一条要修改的文档的id
      const studentId=req.params.studentId;
      //获取修改之后的所有信息
      const params={
        name:req.body.name,
        age:parseInt(req.body.age),
        sex:req.body.sex,
        phone:req.body.phone,
        address:req.body.address,
        introduction:req.body.introduction
     };
      databasemanager.updateOne("studentInfo",{_id:databasemanager.ObjectId(studentId)},params,(err,doc)=>{
       if(doc!=null){
         res.setHeader("Content-Type","text/html;charset=utf-8");
        res.end("<script>window.location.href='/studentmanager/list?currentPageIndex=0&everyPageCount=2'</script>");
       }


      })

};

//删除学生信息
exports.deleteStudent=(req,res)=>{
  //浏览器在从服务器跟数据库获取数据的时候，获取过来的每一条数据都带有唯一的一个id

    //所以要修改一个文档，先要获取每一条要修改的文档的id
      const studentId=req.params.studentId;
        const result = {status:1,message:"删除成功"}
      databasemanager.deleteOne("studentInfo",{_id:databasemanager.ObjectId(studentId)},(err,doc)=>{
       if(doc==null){
         result.status=0;
         result.message="删除失败";
       }
        res.json(result)

      })

};