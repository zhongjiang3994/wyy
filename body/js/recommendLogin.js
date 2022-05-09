let userCookie = ""
function setCookie(cookName, cookieVal, expires) {
    let d = new Date();
    d.setDate(d.getDate() + expires)
    document.cookie = cookName + "=" + cookieVal + ";path=/;expires=" + d.toUTCString();
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
                $("userId").innerHTML = JSON.parse(xhr.response).profile.nickname
                $("aside-user").style.display = "block"
                $("aside-singers").style.display = "block"
                userCookie = JSON.parse(xhr.response).cookie.toString()
                console.log(userCookie)
                setCookie("user", phone1, 7)
                setCookie("password", password1, 7)
                ajax({
                    type: "get",
                    url: "https://autumnfish.cn/artist/sublist",
                    data: {
                        timestamp: time,
                        cookie: userCookie
                    },
                    success: function (data, xhr) {
                        console.log(JSON.parse(data))
                        let attentionSingerImg = ql(".attentionSingerImg")
                        let attentionSingerName = ql("#attentionSingerName")
                        for (let i = 0; i < 5; i++) {
                            attentionSingerImg[i].src = JSON.parse(data).data[i].picUrl
                            attentionSingerName[i].innerHTML = JSON.parse(data).data[i].name
                        }
                    },
                    error: function (data, xhr) {
                        console.log(JSON.parse(data))
                    }
                })
                ajax({
                    type: "get",
                    url: "https://autumnfish.cn/user/level",
                    data: {
                        timestamp: time,
                        cookie: userCookie
                    },
                    success: function (data, xhr) {
                        console.log(JSON.parse(data))
                        q(".level").innerHTML = "LV." + JSON.parse(data).data.level
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
        hidden_menu.style.right = "-200px"
        $("login").style.display = "block"
        $("userAvatar").style.display = "none"
        shadow.style.display = "none"
        avatar.onclick = function () {
            shadow.style.display = "block"
            $("login2").style.display = "block"
        }
        $("aside-user").style.display="none"
    }
    var selfPageBtn=q(".selfPage")
    selfPageBtn.onclick=function(){
        if(document.cookie==null){
            alert("请先登录")
        }else{
            window.location.href="./selfPage.html"
        }
    }
}
)

