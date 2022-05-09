const musicContainer = $("music-container")
const playBtn = $("play")
const audio = $("audio")
var allPlays=new Array()
function playSong() {
    // 元素添加类名
    musicContainer.classList.add("play")
    playBtn.querySelector('i.fa').classList.remove('fa-play')
    playBtn.querySelector('i.fa').classList.add('fa-pause')
    audio.play()
}
// 停止播放
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.add('fa-play');
    playBtn.querySelector('i.fa').classList.remove('fa-pause');
    audio.pause();
}
function judge() {
    if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }
}
function next() {
    let i = 0;
    for (i = 0; i < allPlays.length; i++) {
        if (audio.src == allPlays[i].url) {
            i++;
            break;
        }
    }
    if (i >= allPlays.length) {
        i = 0;
    }
    audio.src = allPlays[i].url
    $("music-cover").src = allPlays[i].img
    q("h4").innerHTML = allPlays[i].name
    musicPlay(allPlays[i].lrc)
    setTimeout(() => {
        judge()
    }, 500)
    var temporarilyPlay = allPlays[0]
    for (let i = 0; i < allPlays.length - 1; i++) {
        allPlays[i] = allPlays[i + 1]
    }
    allPlays[allPlays.length - 1] = temporarilyPlay
    if (openFlag2 == 1) {
        closeHistory()
        history()
    }
}
function pre() {
    let i = 0;
    for (i = 0; i < allPlays.length; i++) {
        if (audio.src == allPlays[i].url) {
            i--;
            break;
        }
    }
    if (i == -1) {
        i = allPlays.length - 1;
    }
    audio.src = allPlays[i].url
    $("music-cover").src = allPlays[i].img
    q("h4").innerHTML = allPlays[i].name
    musicPlay(allPlays[i].lrc)
    setTimeout(() => {
        judge()
    }, 500)
    var temporarilyPlay = allPlays[allPlays.length - 1]
    for (let i = allPlays.length - 1; i > 0; i--) {
        allPlays[i] = allPlays[i - 1]
    }
    allPlays[0] = temporarilyPlay
    if (openFlag2 == 1) {
        closeHistory()
        history()
    }
}
function closeHistory() {
    let tli = ql(".tli")
    for (let i = tli.length - 1; i >= 0; i--) {
        tli[i].remove()
    }
}
function history() {
    q(".history").style.display = "block"
    for (let i = 0; i < allPlays.length; i++) {
        let li = ct("li")
        li.style.cursor = "pointer"
        li.innerHTML = allPlays[i].name
        li.onclick = function () {
            audio.src = allPlays[i].url
            $("music-cover").src = allPlays[i].img
            q("h4").innerHTML = allPlays[i].name
            musicPlay(allPlays[i].lrc)
            setTimeout(() => {
                judge()
            }, 500)
            var temporarilyPlay = allPlays[i]
            for (let o = i; o < allPlays.length - 1; o++) {
                allPlays[o] = allPlays[o + 1]
            }
            allPlays[allPlays.length - 1] = temporarilyPlay
            closeHistory()
            history()
        }
        li.oncontextmenu = function (e) {
            e.preventDefault();
            let i = 0;
            for (i = 0; i < allPlays.length; i++) {
                if (allPlays[i].name == li.innerHTML) {
                    break;
                }
            }
            if (i == allPlays.length - 1 && allPlays.length > 1) {
                next()
                allPlays.splice(0, 1)
            } if (i == allPlays.length - 1 && allPlays.length == 1) {
                allPlays.splice(0, 1)
                pauseSong()
                audio.src = "./music/初弦__ - 「沃伦姆德的薄暮」小镇.mp3"
                $("music-cover").src = "./img/阿梓.jpg"
                q("h4").innerHTML = "沃伦姆德的薄暮"
                $('music').innerHTML = ""
            } else {
                allPlays.splice(i, 1)
            }
            closeHistory()
            history()
        }
        li.classList.add("tli")
        q(".history").appendChild(li)
    }
}
function slowSpeed(){
    audio.playbackRate=0.5
}
function speed(){
    audio.playbackRate=1
}
function middleSpeed(){
    audio.playbackRate=1.5
}
function mostSpeed(){
    audio.playbackRate=2
}
function backSpeed(){
    audio.playbackRate=-1
}
function addVoice(){
    audio.volume+=0.1
}
function decreaseVoice(){
    audio.volume-=0.1
}
var openFlag2 = 0
audio.onended = next
addLoadEvent(() => {
    q(".back-top-wrapper").oncontextmenu = function (e) {
        e.preventDefault();
        if (openFlag2 == 0) {
            q(".history").style.display = "block"
            for (let i = 0; i < allPlays.length; i++) {
                let li = ct("li")
                li.style.cursor = "pointer"
                li.innerHTML = allPlays[i].name
                li.onclick = function () {
                    audio.src = allPlays[i].url
                    $("music-cover").src = allPlays[i].img
                    q("h4").innerHTML = allPlays[i].name
                    musicPlay(allPlays[i].lrc)
                    setTimeout(() => {
                        judge()
                    }, 500)
                    var temporarilyPlay = allPlays[i]
                    for (let o = i; o < allPlays.length - 1; o++) {
                        allPlays[o] = allPlays[o + 1]
                    }
                    allPlays[allPlays.length - 1] = temporarilyPlay
                    closeHistory()
                    history()
                }
                li.oncontextmenu = function (e) {
                    e.preventDefault();
                    let i = 0;
                    for (i = 0; i < allPlays.length; i++) {
                        if (allPlays[i].name == li.innerHTML) {
                            break;
                        }
                    }
                    if (i == allPlays.length - 1 && allPlays.length > 1) {
                        next()
                        allPlays.splice(0, 1)
                    } if (i == allPlays.length - 1 && allPlays.length == 1) {
                        allPlays.splice(0, 1)
                        pauseSong()
                        audio.src = "./music/初弦__ - 「沃伦姆德的薄暮」小镇.mp3"
                        $("music-cover").src = "./img/阿梓.jpg"
                        q("h4").innerHTML = "沃伦姆德的薄暮"
                        $('music').innerHTML = ""
                    } else {
                        allPlays.splice(i, 1)
                    }
                    closeHistory()
                    history()
                }
                li.classList.add("tli")
                q(".history").appendChild(li)
            }
            openFlag2 = 1;
        } else {
            openFlag2 = 0;
            let tli = ql(".tli")
            for (let i = tli.length - 1; i >= 0; i--) {
                tli[i].remove()
            }
            q(".history").style.display = "none"
        }
    }
    $("next").onclick = next
    $("prev").onclick = pre
    // 播放歌曲
    playBtn.onclick = judge
    musicContainer.onmouseenter = function () {
        musicContainer.style.left = "0px"
    }
    musicContainer.onmouseleave = function () {
        musicContainer.style.left = "-350px"
    }
    var lockFlag = 0;
    var lrcFlag = 0;
    var openFlag = 0;
    musicContainer.oncontextmenu = function (e) {
        e.preventDefault();
        musicContainer.onmouseleave = null
        // 执行代码
        if (!openFlag) {
            openFlag = 1
            let body = q("body")
            let div = ct("div")
            let div1 = ct("div")
            let div2 = ct("div")
            ac(div1, "rightClickDiv")
            ac(div2, "rightClickDiv")
            ac(div, "rightClick")
            if (lockFlag == 0) {
                div1.innerHTML = "点击锁定"
                div1.onclick = function () {
                    musicContainer.onmouseleave = null
                    lockFlag = 1
                    openFlag = 0
                    body.removeChild(q(".rightClick"))
                }
            } else {
                div1.innerHTML = "点击解锁"
                div1.onclick = function () {
                    musicContainer.onmouseleave = function () {
                        musicContainer.style.left = "-350px"
                    }
                    lockFlag = 0
                    openFlag = 0
                    body.removeChild(q(".rightClick"))
                }
            }
            if (lrcFlag == 0) {
                div2.innerHTML = "显示歌词"
                div2.onclick = function () {
                    if (!lockFlag) {
                        musicContainer.onmouseleave = function () {
                            musicContainer.style.left = "-350px"
                        }
                    }
                    lrcFlag = 1
                    openFlag = 0
                    var lrc = $("music")
                    lrc.style.display = "block"
                    body.removeChild(q(".rightClick"))
                }
            } else {
                div2.innerHTML = "隐藏歌词"
                div2.onclick = function () {
                    if (!lockFlag) {
                        musicContainer.onmouseleave = function () {
                            musicContainer.style.left = "-350px"
                        }
                    }
                    lrcFlag = 0
                    openFlag = 0
                    var lrc = $("music")
                    lrc.style.display = "none"
                    body.removeChild(q(".rightClick"))
                }
            }
            div.appendChild(div1)
            div.appendChild(div2)
            div.style.top = "80%"
            div.style.left = e.clientX + document.documentElement.scrollLeft + "px"
            body.appendChild(div)
        }
    }
    // 获取progress对象
    var progress = $("progress");
    var wrapper = $("wrapper")
    // 获取progress_bar对象
    // 为进度条右侧圆点绑定鼠标按下事件
    var progress_bar = $("progress-bar");
    var updateProgress = setInterval(function () {
        progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`
        progress_bar.style.left = `${(audio.currentTime / audio.duration) * 100}%`
    }, 1000)
    wrapper.onclick = function (e) {
        progress.style.width = e.offsetX + "px";
        progress_bar.style.left = e.offsetX + "px"
        console.log(e.offsetX)
        audio.currentTime = (parseInt(progress.style.width) / 300) * (audio.duration)
        audio.play()
    }
    progress_bar.onmousedown = function (event) {
        let time1 = Date.now()
        console.log(time1)
        event = event || window.event;
        //获取圆点偏移量
        var progressLeft = event.clientX - this.offsetLeft;
        clearInterval(updateProgress)
        // 为右侧圆点绑定拖动事件
        document.onmousemove = function (event) {
            event = event || window.event;
            // 获取鼠标坐标
            var progressX = event.clientX - progressLeft;
            if (progressX <= 0) {
                // 暂停拖动（如果拖动条超出范围，则停止拖动）
                progressX = 0;
            }
            else if (progressX >= 300) {
                progressX = 300;
            }
            console.log(progressX);
            progress_bar.style.left = progressX + "px";
            // 显示进度条
            progress.style.width = progressX + "px";
        };

        // 为右侧圆点绑定鼠标抬起事件
        document.onmouseup = function (event) {
            let time2 = Date.now()
            if (time2 - time1 >= 100) {
                wrapper.onclick = null
            }
            event = event || window.event;
            // 取消鼠标移动事件
            document.onmousemove = null;
            // 取消鼠标抬起事件
            document.onmouseup = null;
            audio.currentTime = (parseInt(progress.style.width) / 300) * (audio.duration)
            audio.play()
            setTimeout(() => {
                wrapper.onclick = function (e) {
                    progress.style.width = e.offsetX + "px";
                    progress_bar.style.left = e.offsetX + "px"
                    console.log(e.offsetX)
                    audio.currentTime = (parseInt(progress.style.width) / 300) * (audio.duration)
                    audio.play()
                }
            }, 10)
            console.log(audio.currentTime)
            updateProgress = setInterval(function () {
                progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`
                progress_bar.style.left = `${(audio.currentTime / audio.duration) * 100}%`
            }, 1000)
        };
        //取消浏览器对拖拽内容进行搜索的默认行为
        return false;
    };

})
