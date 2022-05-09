function musicPlay(currentLrc) {
    let musicArea = ct("div");
    let musicUl = ct("ul");
    let b = 30;
    let ele = $("music");
    ele.innerHTML=""
    ele.appendChild(musicArea).appendChild(musicUl);
    musicStyle();
    let lrc = currentLrc
    function musicStyle() {
        musicArea.style.width = "100%";
        musicArea.style.height = "100%";
        musicArea.style.overflow = "hidden"
        musicUl.style.width = "100%"
        musicUl.style.padding = "0";
        musicUl.style.transition = "0.3"
    }
    function split(){
        let split_1 = lrc.split("\n");
        let length = split_1.length;
        for (let i = 0; i < length; i++) {
            let lrcArr = split_1[i];
            split_1[i] = change(lrcArr);
            function change(str) {
                let lrc = str.split("]");
                let timer = lrc[0].replace("[", "");
                let str_music = lrc[1];
                let time_split = timer.split(":");
                let s = +time_split[1];
                let min = +time_split[0];
                return {
                    time: min * 60 + s,
                    lrc: str_music
                }

            }
        }
        return split_1
    }
    let lrcArr = split();
    createLi();
    function createLi() {
        let len = lrcArr.length;
        for (let i = 0; i < len; i++) {
            let lrc_li = lrcArr[i];
            let li = ct("li");
            li.innerText = lrc_li.lrc;
            li.style.height = b + "px"
            li.style.textAlign = "center"
            li.style.width = "100%"
            li.style.padding = "0";
            li.style.transition = "0.3"
            musicUl.appendChild(li);
        }
    }
    function setCurrentLi() {
        let time = audio.currentTime;
        for (i = 0; i < lrcArr.length; i++) {
            let play = lrcArr[i];
            if (time - play.time <= 0) {
                return i;
            }
        } return -1;
    }
    function current() {
        let li = setCurrentLi();
        let liHeight = b;
        let top = liHeight * li - liHeight;
        if (top < 0) {
            top = 0;
        }
        musicUl.style.marginTop = -top + "px";
        let playLi = musicUl.querySelector(".lrcPlay")
        if (playLi) {
            playLi.className = "";
        }
        if (li >= 0) {
            musicUl.children[li - 1].className = "lrcPlay"
        }
    }
    audio.ontimeupdate = current;
}