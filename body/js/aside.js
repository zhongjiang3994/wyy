addLoadEvent(() => {
    let time = Date.now()
    let hotSingerImg=ql(".hotSingerImg")
    let hotSingerName=ql("#hotSingerName")
    let hotAnchorImg=ql(".hotAnchorImg")
    let hotAnchorName=ql("#hotAnchorName")
    ajax({
        type: "get",
        url: "https://autumnfish.cn/top/artists",
        data: {
            timestamp: time,
            limit: 5
        },
        success: function (data, xhr) {
            for(let i=0;i<5;i++){
                hotSingerImg[i].src=JSON.parse(data).artists[i].picUrl
                hotSingerName[i].innerHTML=JSON.parse(data).artists[i].name
            }
        },
        error: function (data, xhr) {
            console.log(JSON.parse(data))
        }
    })
    ajax({
        type: "get",
        url: "https://autumnfish.cn/dj/toplist/popular",
        data: {
            timestamp: time,
            limit: 5
        },
        success: function (data, xhr) {
            for(let i=0;i<5;i++){
                hotAnchorImg[i].src=JSON.parse(data).data.list[i].avatarUrl
                hotAnchorName[i].innerHTML=JSON.parse(data).data.list[i].nickName
            }
        },
        error: function (data, xhr) {
            console.log(JSON.parse(data))
        }
    })
})