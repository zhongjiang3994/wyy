const { response } = require('express');
const { request } = require('express');
const express = require('express');

const app = express();

app.get('/server',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*')
    response.send('HELLO AJAX-2');
});

app.all('/json-server',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*')
   
    response.setHeader('Access-Control-Allow-Headers','*')
    const data={
        name:'atGuiGu'
    }
    let str=JSON.stringify(data)
    response.send(str);
});

app.get('/delay',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*')
    setTimeout(()=>{
        response.send("延时响应")
    },3000)
});

app.listen(8000,()=>{
    console.log("服务已经启动,8000端口监听中");
})