const express =require('express');
const Router = express();
const utils = require('utility');
const model = require("./module");
const User = model.getModel('user');

const _filter = {"pwd":0,_v:0};

Router.get("/list",(req,res)=>{
    // User.remove({},(e,d)=>{});//清楚所有
    User.find({},(err,doc)=>{
        return res.json(doc);
    })
});
Router.post('/update',(req,res)=>{
    const userid = req.cookies.userid;
    if(!userid){
        return json.dumps({code:1});
    }
    const body = req.body;
    User.findByIdAndUpdate(userid,body,(err,doc)=>{
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data});
    })
})
Router.post("/login",(req,res)=>{
    const {user,pwd} = req.body;
    User.findOne({user,pwd:MD5(pwd)},_filter,(err,doc)=>{
       if(!doc){
           return res.json({code:1,msg:"用户名或者密码错误"})
       } else {
           res.cookie("userid",doc._id);
           return res.json({code:0,data:doc})
       }
    });
});
Router.post('/register',(req,res)=>{
    const {user,pwd,type} = req.body;

    User.findOne({user},(err,doc)=>{
        if(doc){
            return res.json({code:1,msg:"用户名已存在"});
        }else{
            const userModel = new User({user,type,pwd:MD5(pwd)});

            userModel.save((e,d)=>{
                if(e){
                    return res.json({code:1,msg:"服务器内部错误"});
                }else{
                    const {user,_id,type} = d;
                    res.cookie('userid',_id);
                    return res.json({code:0,data:{user,_id,type}});
                }
            });

        }
    })
});

Router.get('/info',(req,res)=>{
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1})
    }

    User.findOne({_id:userid},_filter,(err,doc)=>{
        if(err){
            return res.json({code:1,msg:"后端出错了"})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })

});

// 强行增加密码强度
function MD5(pwd) {
    let salt = "three_countries_@#!dacaww";
    // 两层加密
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router;