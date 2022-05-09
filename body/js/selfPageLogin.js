let userCookie = ""
let userId = ""
function setCookie(cookName, cookieVal, expires) {
    let d = new Date();
    d.setDate(d.getDate() + expires)
    document.cookie = cookName + "=" + cookieVal + ";path=/;expires=" + d.toUTCString();
}
function msTimeChange(ms) {

    min = Math.floor((ms / 1000 / 60) << 0),
        sec = Math.floor((ms / 1000) % 60);
    if (min < 10 && sec < 10) {
        return "0" + min + ":" + sec + "0"
    } else if (min < 10 && sec > 10) {
        return "0" + min + ":" + sec
    } else if (min > 10 && sec < 10) {
        return min + ":" + sec + "0"
    } else {
        return min + ":" + sec
    }

}
function formatDate(value) {
    var date = new Date(value);
    var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate();
    if (m < 10) { m = '0' + m; }
    if (d < 10) { d = '0' + d; }
    var t = y + '-' + m + '-' + d;
    return t;
}

console.log(document.cookie)
addLoadEvent(() => {
    const avatar = $("avatar");
    const shadow = q(".shadow")
    const hidden_menu = document.getElementById("hidden-menu");
    const close = document.getElementById("close");
    close.onclick = function () {
        hidden_menu.style.right = "-200px"
        shadow.style.display = "none"
    }
    let login = function () {
        let phone1 = $("phone").value
        let password1 = $("password").value
        let time = Date.now()
        ajax({
            type: "get",
            url: "http://localhost:3000/login/cellphone",
            data: {
                timestamp: time,
                phone: phone1,
                password: password1
            },
            success: function (data, xhr) {
                avatar.onclick = function () {
                    hidden_menu.style.right = "0px"
                    shadow.style.display = "block"
                }
                console.log(JSON.parse(data))
                $("login").style.display = "none"
                $("userAvatar").style.display = "block"
                $("userAvatar").src = JSON.parse(xhr.response).profile.avatarUrl
                $("userPic").src = JSON.parse(xhr.response).profile.avatarUrl
                q(".userName").innerHTML = JSON.parse(xhr.response).profile.nickname
                userCookie = JSON.parse(xhr.response).cookie.toString()
                userId = JSON.parse(xhr.response).account.id
                setCookie("user", phone1, 7)
                setCookie("password", password1, 7)
                ajax({
                    type: "get",
                    url: "https://autumnfish.cn/user/level",
                    data: {
                        timestamp: time,
                        cookie: userCookie
                    },
                    success: function (data, xhr) {
                        console.log(JSON.parse(data))
                        q(".level").innerHTML = "Lv." + JSON.parse(data).data.level
                    },
                    error: function (data, xhr) {
                        console.log(JSON.parse(data))
                    }
                })
                ajax({
                    type: "get",
                    url: "https://autumnfish.cn/user/follows",
                    data: {
                        timestamp: time,
                        cookie: userCookie,
                        uid: userId
                    },
                    success: function (data, xhr) {
                        q(".attentions").innerHTML = JSON.parse(data).follow.length + " 关注"
                    },
                    error: function (data, xhr) {
                        console.log(JSON.parse(data))
                    }
                })
                ajax({
                    type: "get",
                    url: "https://autumnfish.cn/user/followeds",
                    data: {
                        timestamp: time,
                        cookie: userCookie,
                        uid: userId
                    },
                    success: function (data, xhr) {
                        q(".followeds").innerHTML = JSON.parse(data).followeds.length + " 粉丝"
                    },
                    error: function (data, xhr) {
                        console.log(JSON.parse(data))
                    }
                })
                ajax({
                    type: "get",
                    url: "https://autumnfish.cn/user/playlist",
                    data: {
                        timestamp: time,
                        cookie: userCookie,
                        uid: userId
                    },
                    success: function (data, xhr) {
                        let listsWrapper = q(".lists-wrapper")
                        for (let i = 0; i < JSON.parse(data).playlist.length; i++) {
                            var li = ct("li")
                            var img = ct("img")
                            var span = ct("span")
                            img.src = JSON.parse(data).playlist[i].coverImgUrl
                            span.innerHTML = JSON.parse(data).playlist[i].name
                            li.appendChild(img)
                            li.appendChild(span)
                            listsWrapper.appendChild(li)
                        }
                    },
                    error: function (data, xhr) {
                        console.log(JSON.parse(data))
                    }
                })
                ajax({
                    type: "get",
                    url: "https://autumnfish.cn/user/dj",
                    data: {
                        timestamp: time,
                        cookie: userCookie,
                        uid: userId
                    },
                    success: function (data, xhr) {
                        let radioWrapper = q(".radio-wrapper")
                        for (let i = 0; i < JSON.parse(data).programs.length; i++) {
                            var li = ct("li")
                            var img = ct("img")
                            var span = ct("span")
                            img.src = JSON.parse(data).programs[i].coverUrl
                            span.innerHTML = JSON.parse(data).programs[i].name
                            li.appendChild(img)
                            li.appendChild(span)
                            radioWrapper.appendChild(li)
                        }
                    },
                    error: function (data, xhr) {
                        console.log(JSON.parse(data))
                    }
                })
                ajax({
                    type: "get",
                    url: "https://autumnfish.cn/likelist",
                    data: {
                        timestamp: time,
                        cookie: userCookie,
                        uid: userId
                    },
                    success: function (data, xhr) {
                        var songsWrapper = q(".songs-wrapper")
                        for (let i = 0; i < JSON.parse(data).ids.length; i++) {
                            ajax({
                                type: "get",
                                url: "https://autumnfish.cn/song/detail",
                                data: {
                                    timestamp: time,
                                    ids: JSON.parse(data).ids[i]
                                },
                                success: function (data, xhr) {
                                    console.log(JSON.parse(data))
                                    var li = ct("li")
                                    var longer = ct("div")
                                    var singer = ct("div")
                                    li.innerHTML = JSON.parse(data).songs[0].name
                                    singer.innerHTML = JSON.parse(data).songs[0].ar[0].name
                                    longer.innerHTML = msTimeChange(JSON.parse(data).songs[0].dt)
                                    longer.classList.add("longer")
                                    singer.classList.add("like-song-singer")
                                    li.appendChild(longer)
                                    li.appendChild(singer)
                                    songsWrapper.appendChild(li)
                                },
                                error: function (data, xhr) {
                                    console.log(JSON.parse(data))
                                }
                            })
                        }
                    },
                    error: function (data, xhr) {
                        console.log(JSON.parse(data))
                    }
                })
                ajax({
                    type: "get",
                    url: "https://autumnfish.cn/user/detail",
                    data: {
                        timestamp: time,
                        cookie: userCookie,
                        uid: userId
                    },
                    success: function (data, xhr) {
                        console.log(JSON.parse(data))
                        if (JSON.parse(data).profile.gender == 0) {
                            q(".gender").innerHTML = "性别:保密"
                        } else if (JSON.parse(data).profile.gender == 1) {
                            q(".gender").innerHTML = "性别:男"
                        } else {
                            q(".gender").innerHTML = "性别:女"
                        }
                        q(".birthday").innerHTML = "生日:" + formatDate(JSON.parse(data).profile.birthday)
                        q(".nickname").innerHTML = "昵称:" + JSON.parse(data).profile.nickname
                        q(".signature").innerHTML = "签名:" + JSON.parse(data).profile.signature
                    },
                    error: function (data, xhr) {
                        console.log(JSON.parse(data))
                    }
                })
            },
            error: function (data, xhr) {
                console.log(JSON.parse(data))
                alert("登陆失败,请重试")
            }
        })
        setTimeout(() => {
            $("login2").style.display = "none"
            q(".shadow").style.display = "none"
        }, 100)
    }
    avatar.onclick = function () {
        shadow.style.display = "block"
        $("login2").style.display = "block"
    }
    shadow.onclick = function () {
        $("login2").style.display = "none"
        shadow.style.display = "none"
    }
    const submit = $("submit")
    submit.onclick = login
    if (document.cookie !== null) {
        let halfCookie = document.cookie.split("; ")
        for (let i = 0; i < 2; i++) {
            if (halfCookie[i].split("=")[0] == "user") {
                $("phone").value = halfCookie[i].split("=")[1]
            } else {
                $("password").value = halfCookie[i].split("=")[1]
            }
        }
        // login()
    }
    console.log($("phone").value)
    console.log($("password").value)
    const exitLogin = q(".exitLogin")
    exitLogin.onclick = function () {
        // setCookie("user",1,0)
        // setCookie("password",111,0)
        q(".userName").innerHTML = ""
        q(".followeds").innerHTML ="粉丝"
        q(".attentions").innerHTML ="关注"
        q(".level").innerHTML = "Lv."
        q(".user-lists-inner").style.display = "none"
        q(".user-radio-inner").style.display = "none"
        q(".change-information-inner").style.display = "none"
        q(".user-like-inner").style.display = "block"
        q(".user-like-inner").innerHTML = `<div class="inner-head">我喜欢的</div>
        <ul class="songs-wrapper"></ul>`
        $("userPic").src = "../img/阿梓.jpg"
        hidden_menu.style.right = "-200px"
        $("login").style.display = "block"
        $("userAvatar").style.display = "none"
        shadow.style.display = "none"
        avatar.onclick = function () {
            shadow.style.display = "block"
            $("login2").style.display = "block"
        }
        $("aside-user").style.display = "none"
    }
    var allGender = ql(".gender")
    allGender[0].onclick = function () {
        allGender[0].classList.add("choice")
        allGender[1].classList.remove("choice")
        allGender[2].classList.remove("choice")
    }
    allGender[1].onclick = function () {
        allGender[1].classList.add("choice")
        allGender[0].classList.remove("choice")
        allGender[2].classList.remove("choice")
    }
    allGender[2].onclick = function () {
        allGender[2].classList.add("choice")
        allGender[1].classList.remove("choice")
        allGender[0].classList.remove("choice")
    }
    q(".change-submit").onclick = function () {
        let time = Date.now()
        var date = new Date($("birthday").value)
        date = date.getTime()

        ajax({
            type: "get",
            url: "https://autumnfish.cn/user/update",
            data: {
                timestamp: time,
                cookie: userCookie,
                gender: q(".choice").value,
                birthday: date,
                nickname: $("nickname").value,
                signature: $("signature").value
            },
            success: function (data, xhr) {
                console.log(JSON.parse(data))
                alert("修改成功,刷新后可见")
                q(".change-information-wrapper").style.display = "none"
                q(".information-wrapper").style.display = "block"
            },
            error: function (data, xhr) {
                console.log(JSON.parse(data))
            }
        })
    }
}
)
