function ajax(options){
    var xhr =new XMLHttpRequest()
    var params=""
    for(var attr in options.data){
        params+=attr+"="+options.data[attr]+"&"
    }
    params=params.substr(0,params.length-1)

    if(options.type==="get"){
        options.url=options.url+"?"+params
    }
    console.log(options.url)
    xhr.open(options.type,options.url)
    if(options.type==="post"){
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.send(params)
    }else{
        xhr.send()
    }
    xhr.onload=function(){
        if(xhr.status===200){
            options.success(xhr.responseText,xhr)
        }else{
            options.error(xhr.responseText,xhr)
        }
    }
}