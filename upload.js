//node图片切换头像功能
var express=require('express');
var fs=require('fs');
var path=require('path');
var fm=require('formidable');
var app=new express();
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname,'public/upload.html'))
    // 第四步:创建main.html文件
})
app.post('/ajaxUpload',(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    var form=new fm.IncomingForm();
    form.uploadDir=path.join(__dirname,'public/uploads');
    // uploadDir设置文件的上传的路径
    form.parse(req);
    form.on('file',function(field,file){
        fs.renameSync(file.path,path.join(form.uploadDir,'/icon.png'))
    })
    form.on('end',function(){
        console.log('upload success')
    })
    setTimeout(() => {
        res.send('http://127.0.0.1:5000/uploads/icon.png')
    }, 500);
    //res.send('./uploads/icon.png')
  
})
var server=app.listen(5000,function () {
    var host=server.address().address;
    var port=server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})