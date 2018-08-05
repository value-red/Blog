var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017';
var dbName = 'item';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login',function (req,res,next) {
    res.render('login',{title:'登陆页面'})
});
//登陆提交
router.post('/dologin',function (req,res,next) {
    let userName = req.body.userName;
    let psw = req.body.psw;
    console.log(req.body);
    __connectDB((err,db,client)=>{
      if(err){
          console.log(err);
          return
      }
      let collection = db.collection('user')
        collection.find({userName:userName,psw:psw}).toArray(function (err,arr) {
              if(err){
                  console.log(err);
                  res.json({type:-2,msg:'登陆失败'})
              }
              if(arr.length <= 0){
                res.json({type:1,msg:'用户名或密码错误',userName:userName});
                  return
              }
              else{
                let obj = {};
                  obj.userName = arr[0].userName;
                  obj.psw = arr[0].psw;
                  req.session.user = obj;
                  res.json({type:1,msg:'登陆成功'})
              }
        })
    })

});
//退出登陆
router.get('/loginout',function (req,res,next) {
    req.session.user ='';
    res.redirect('/')
});
//注册验证
router.get('/doregister',function (req,res,next) {
    let userName = req.query.value;
    console.log(userName);
    __connectDB((err,db,client)=>{
      if(err){
          console.log(err);
          return
      }
      let collection = db.collection('user');
        collection.find({userName:userName}).toArray((err,arr)=>{
            console.log(arr);
            if(err){
              console.log(err);
              client.close();
              return
          }
          if(arr.length ==0){
              res.json({type:1,data:{msg:'可以注册'}});
          }
         else{
           res.json({type:-1,data:{num:0}});
              client.close();
              return
        }
        })
    })
});
//注册提交
router.post('/doregister',function (req,res,next) {
    let userName = req.body.rusername;
    let psw = req.body.rpsw;
    // let headPic = req.body.headPic
    __connectDB((err,db,client)=>{
        if(err){
            console.log(err);
            return
        }
        let collection = db.collection('user')
        collection.insertMany([{userName:userName,psw:psw}],function (err,result,client) {
            if(err){
                console.log(err);
                client.close();
                res.send('注册失败')
                return
            }

        })
        res.redirect('/login')
    })
})
module.exports = router;
//TODO:连接数据库函数 __connectDB
function __connectDB(callback) {
    mongoClient.connect(dbUrl,function (err,client) {
        if(err){
            console.log(err);
            callback('连接失败',null,client);
            return
        }
        var db = client.db(dbName);
        callback(null,db,client)
    })
}