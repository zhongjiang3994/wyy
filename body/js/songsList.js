addLoadEvent(() => {
    let time = Date.now()
    ajax({
        type: "get",
        url: "https://autumnfish.cn/personalized",
        data: {
            timestamp: time,
            limit: 40
        },
        success: function (data, xhr) {
            let listCover1 = ql("#listCover1")
            let listName1 = ql("#listName1")
            for (let i = 0; i < 40; i++) {
                listCover1[i].src = JSON.parse(data).result[i].picUrl
                listCover1[i].onclick=function(){
                    window.location.href="https://music.163.com/#/playlist?id="+JSON.parse(data).result[i].id;
                }
                listName1[i].innerHTML=JSON.parse(data).result[i].name
                listName1[i].href="https://music.163.com/#/playlist?id="+JSON.parse(data).result[i].id
            }
        },
        error: function (data, xhr) {
            console.log(JSON.parse(data))
        }
    })
    ajax({
        type: "get",
        url: "https://autumnfish.cn/dj/hot",
        data: {
            timestamp: time,
            limit:8
        },
        success: function (data, xhr) {
            let listCover2=ql("#listCover2")
            let listName2=ql("#listName2")
            for(let i=0;i<8;i++){
                listCover2[i].src=JSON.parse(data).djRadios[i].picUrl
                listCover2[i].onclick=function(){
                    window.location.href="https://music.163.com/#/djradio?id="+JSON.parse(data).djRadios[i].id;
                }
                listName2[i].innerHTML=JSON.parse(data).djRadios[i].name
                listName2[i].href="https://music.163.com/#/djradio?id="+JSON.parse(data).djRadios[i].id
            }
        },
        error:function(data,xhr){
            console.log(JSON.parse(data))
        }
    })
    ajax({
        type: "get",
        url: "https://autumnfish.cn/album/list",
        data: {
            timestamp: time,
            limit: 8
        },
        success: function (data, xhr) {
            let listCover3=ql("#listCover3")
            let listName3=ql("#listName3")
            for(let i=0;i<8;i++){
                listCover3[i].src=JSON.parse(data).products[i].coverUrl
                listCover3[i].onclick=function(){
                    window.location.href="https://music.163.com/#/album?id="+JSON.parse(data).products[i].albumId;
                }
                listName3[i].innerHTML=JSON.parse(data).products[i].albumName
                listName3[i].href="https://music.163.com/#/album?id="+JSON.parse(data).products[i].albumId
            }
        },
        error:function(data,xhr){
            console.log(JSON.parse(data))
        }
    })
})