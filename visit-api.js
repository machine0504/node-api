var express = require('express');
var path = require('path');
var app = new express();
var bodyParser = require('body-parser');
var axios = require('axios')

app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
app.use(express.static(path.join(__dirname, 'public')));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/buddy";

/*首页*/

//首页数据渲染
app.get('/index/swiper', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    //连接mongo数据库 插入数据
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        let dbase = db.db('buddy')
        dbase.collection('indexswiper').find({}).toArray((err, result) => {
            if (err) throw err
            res.send(result)
        })
    })
})
//首页点击切换图片
app.get('/index/img', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    //连接mongo数据库 插入数据
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        let dbase = db.db('buddy')
        dbase.collection('indeximg').find({}).toArray((err, result) => {
            if (err) throw err
            res.send(result)
        })
    })
})
//发布攻略
app.post('/publish/getUserInfo', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
    console.log(req.body)
    let data = {
        "type": "success",
        "data": req.body
    }
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        let dbase = db.db('buddy')
        dbase.collection('user').insertOne(data, (err, res2) => {
            if (err) throw err;
            let data0 = [
                { "type": 'success' }
            ]
            res.send(data0)
        })
    })
})
//查询攻略
app.get('/strategy/select', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    //连接mongo数据库 插入数据
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        let dbase = db.db('buddy')
        if (req.query.type === '全部') {
            dbase.collection('user').find({}).toArray((err, result) => {
                if (err) throw err
                res.send(result)
            })
        }else{
            dbase.collection('user').find({"data.type": req.query.type}).toArray((err, result) => {
                if (err) throw err
                res.send(result)
            })
        }
    })
})
//图片上传地址
var fm = require('formidable');
var fs = require('fs');
app.post('/uploadimg', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
    var form = new fm.IncomingForm();
    form.uploadDir = path.join(__dirname, 'public/uploads');
    // uploadDir设置文件的上传的路径
    form.parse(req);
    let date = new Date().getTime()
    form.on('file', function (field, file) {
        if (file.type && file.type === 'image/png') {
            fs.renameSync(file.path, path.join(form.uploadDir, '/' + date + '.png'))
            let data = {
                type: 'success',
                code: date,
                img: 'http://192.168.0.8:5200/uploads/' + date + '.png'
            }
            setTimeout(() => {
                res.send(data)
            }, 100);
        }
        else {
            fs.renameSync(file.path, path.join(form.uploadDir, '/' + date + '.jpg'))
            let data = {
                type: 'success',
                code: date,
                img: 'http://192.168.0.8:5200/uploads/' + date + '.jpg'
            }
            setTimeout(() => {
                res.send(data)
            }, 100);
        }
    })
})
//删除文件
app.post('/deletfile', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
    var filename = `D:/BaiduNetdiskDownload/tools/react.js/index/public/uploads/${req.body.code}${req.body.type}`
    fs.stat(filename,err=>{
        if(err){
            throw err
            return false
        }
        fs.unlink(filename, err => {
            if (err) {
                throw err
            }
            console.log('文件:' + filename + '删除成功！');
            res.send([
                { "type": 'success' }
            ])
        })
    })
})
var server = app.listen(5200, '192.168.0.8', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})