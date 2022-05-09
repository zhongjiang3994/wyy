let temporarilyUrl = new Array()
let temporarilyLrc = new Array()
let temporarilyImg = new Array()
let temporarilyName = new Array()
addLoadEvent(() => {
    const search = q(".search-input")
    const searchBox = q(".search-box")
    let focusFlag = 0
    let allSongsResult = ql(".songResult")
    let allSingerResult = ql(".singerResult")
    let allAlbumResult = ql(".albumResult")
    let searchResultWrapper = q(".searchResultWrapper")
    search.onfocus = function () {
        searchResultWrapper.style.display = "block"
        search.style.width = "100px"
        search.style.marginLeft = "10px"
        focusFlag = 1
        let timer = null
        document.onkeydown = function () {
            let time = Date.now()
            let searchKeywords = search.value
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                for(let i=0;i<4;i++){
                    allSongsResult[i].innerHTML=""
                }
                for(let i=0;i<2;i++){
                    allSingerResult[i].innerHTML=""
                    allAlbumResult[i].innerHTML=""
                }
                ajax({
                    type: "get",
                    url: "https://autumnfish.cn/search/suggest",
                    data: {
                        timestamp: time,
                        keywords: searchKeywords,
                    },
                    success: function (data, xhr) {
                        let allPlays = parent.allPlays
                        console.log(allPlays)
                        console.log(JSON.parse(data).result)
                        for (let i = 0; i < JSON.parse(data).result.songs.length; i++) {
                            allSongsResult[i].innerHTML=""
                            allSongsResult[i].innerHTML = JSON.parse(data).result.songs[i].name
                            temporarilyName[i]=JSON.parse(data).result.songs[i].name
                            ajax({
                                type: "get",
                                url: "https://autumnfish.cn/song/url",
                                data: {
                                    timestamp: time,
                                    id: JSON.parse(data).result.songs[i].id
                                },
                                success: function (data, xhr) {
                                    console.log(JSON.parse(data))
                                    temporarilyUrl[i] = JSON.parse(data).data[0].url
                                },
                                error: function (data, xhr) {
                                    console.log(JSON.parse(data))
                                }
                            })
                            ajax({
                                type: "get",
                                url: "https://autumnfish.cn/album",
                                data: {
                                    timestamp: time,
                                    id: JSON.parse(data).result.songs[i].album.id
                                },
                                success: function (data, xhr) {
                                    console.log(JSON.parse(data))
                                    temporarilyImg[i]=JSON.parse(data).album.picUrl
                                },
                                error: function (data, xhr) {
                                    console.log(JSON.parse(data))
                                }
                            })
                            ajax({
                                type: "get",
                                url: "https://autumnfish.cn/lyric",
                                data: {
                                    timestamp: time,
                                    id: JSON.parse(data).result.songs[i].id
                                },
                                success: function (data, xhr) {
                                    console.log(JSON.parse(data))
                                    temporarilyLrc[i] = JSON.parse(data).lrc.lyric
                                },
                                error: function (data, xhr) {
                                    console.log(JSON.parse(data))
                                }
                            })
                            allSongsResult[i].onclick=function(){
                                var flag=temporarilyLrc[i]
                                for(let o=0;o<allPlays.length;o++){
                                    if(allPlays[o].lrc==flag){
                                        allPlays.splice(o,1)
                                    }
                                }
                                allPlays[allPlays.length]={
                                    url:temporarilyUrl[i],
                                    lrc:temporarilyLrc[i],
                                    img:temporarilyImg[i],
                                    name:temporarilyName[i]
                                }
                                if(parent.openFlag2==1){
                                    parent.closeHistory()
                                    parent.history()
                                }
                                parent.window.$("audio").src=temporarilyUrl[i]
                                parent.window.$("music-cover").src=temporarilyImg[i]
                                parent.window.q("h4").innerHTML=temporarilyName[i]
                                parent.musicPlay(temporarilyLrc[i])
                                setTimeout(()=>{
                                    parent.judge()
                                },500)
                                console.log(allPlays)
                            }
                        }
                        for (let i = 0; i < JSON.parse(data).result.artists.length; i++) {
                            allSingerResult[i].innerHTML = JSON.parse(data).result.artists[i].name
                        }
                        for (let i = 0; i < JSON.parse(data).result.albums.length; i++) {
                            allAlbumResult[i].innerHTML = JSON.parse(data).result.albums[i].name
                        }
                        q(".search-btn").href = "https://music.163.com/#/search/m/?s=" + searchKeywords + "&type=1"
                    },
                    error: function (data, xhr) {
                        console.log(JSON.parse(data))
                    }
                })
            }, 1000)
        }
    }
    search.onblur = function () {
        search.style.width = "0px"
        search.style.marginLeft = "0px"
        search.value = ""
        focusFlag = 0
        document.onkeydown = null
        setTimeout(() => {
            q(".search-btn").href = "javascript:;"
            searchResultWrapper.style.display = "none"
            for (let i = 0; i < 4; i++) {
                allSongsResult[i].innerHTML = ""
            }
            for (let i = 0; i < 2; i++) {
                allSingerResult[i].innerHTML = ""
                allAlbumResult[i].innerHTML = ""
            }
        }, 200)
    }
    searchBox.onmouseenter = function () {
        search.style.width = "100px"
        search.style.marginLeft = "10px"
    }
    searchBox.onmouseleave = function () {
        if (focusFlag == 0) {
            search.style.width = "0px"
            search.style.marginLeft = "0px"
        }
    }
})