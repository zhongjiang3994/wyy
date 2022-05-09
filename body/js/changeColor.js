addLoadEvent(()=>{
    var black_red = $("black-red");
    let body = q("body")
    black_red.onclick = function () {
        body.style.backgroundImage = "linear-gradient(to top,red,black)";
        console.log(parent.window.$("frame_content"))
    }
    black_red.oncontextmenu = function (e) {
        e.preventDefault();
        parent.slowSpeed()
    }
    var golden_blue = $("golden-blue")
    golden_blue.onclick = function () {
        body.style.backgroundImage = ("linear-gradient(to top, #cd6600, #0067cd)")
    }
    golden_blue.oncontextmenu=function(e){
        e.preventDefault();
        parent.speed()
    }
    var grey = $("grey")
    grey.onclick = function () {
        body.style.backgroundImage = ("linear-gradient(to top, #868f96 0%, #596164 100%)")
        body.style.backgroundBlendMode = ("multiply,multiply")
    }
    grey.oncontextmenu=function(e){
        e.preventDefault();
        parent.middleSpeed()
    }
    var space_blue = $("space-blue")
    space_blue.onclick = function () {
        body.style.backgroundImage = ("linear-gradient(to top, #30cfd0 0%, #330867 100%)")
    }
    space_blue.oncontextmenu=function(e){
        e.preventDefault();
        parent.mostSpeed()
    }
    var rainbow = $("rainbow")
    rainbow.onclick = function () {
        body.style.backgroundImage = ("linear-gradient(to top, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)")
    }
    rainbow.oncontextmenu=function(e){
        e.preventDefault();
        parent.addVoice()
    }
    var sunset_red = $("sunset-red")
    sunset_red.onclick = function () {
        body.style.backgroundImage = ("linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)")
    }
    sunset_red.oncontextmenu=function(e){
        e.preventDefault();
        parent.decreaseVoice()
    }
    var green = $("green")
    green.onclick = function () {
        body.style.backgroundImage = ("linear-gradient(to top, #20E2D7 0%, #F9FEA5 100%)")
    }
    green.oncontextmenu=function(e){
        e.preventDefault();
        parent.backSpeed()
    }
})