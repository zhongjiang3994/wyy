addLoadEvent(()=>{
    var goto = q(".back-top-wrapper");
    var timer = null;
    goto.onclick = function () {
        // 获取当前距离顶部距离
        var s = document.documentElement.scrollTop;
        timer = window.setInterval(function () {
            s -= 50;
            if (s < 0) {
                // 回到顶部时清除计时器
                window.clearInterval(timer);
            }
            // 将高度改变为-50后的高度
            window.scrollTo(0, s);
        }, 10);
        function stop() {
            window.clearInterval(timer);
        }
        // 滚轮下滑时停止回到顶部动作
        window.addEventListener("mousewheel", stop, false)
    }
})