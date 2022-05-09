addLoadEvent(()=>{
    // 获取所有歌单
    var items = ql(".item")
    // 获取所有小圆点
    var points = ql(".songs-circle")
    // 获取左箭头
    var songsLeft = $("songs-left")
    // 获取右箭头
    var songsRight = $("songs-right")
    // 获取容器
    var all = q(".hot-recommend")
    // 索引
    var index2 = 0
    // 计时器
    var time2 = 0
    // 重置类方法,清除所有的active
    var clearActive = function () {
        for (var i = 0; i < items.length; i++) {
            items[i].className = 'item';
        }
        for (j = 0; j < points.length; j++) {
            points[j].className = 'songs-circle';
        }
    }
    var goIndex = function () {
        clearActive();
        // 设置active类
        items[index2].className = 'item active';
        points[index2].className = 'songs-circle active'
    }

    var goLeft = function () {
        if (index2 == 0) {
            // 重置索引
            index2 = 4;
        } else {
            index2--;
        }
        goIndex();
    }


    var goRight = function () {
        if (index2 < 4) {
            index2++;
        } else {
            // 重置索引
            index2 = 0;
        }
        goIndex();
    }


    songsLeft.addEventListener('click', function () {
        goLeft();
        // 跳转时清除计时器
        time2 = 0;
    })

    songsRight.addEventListener('click', function () {
        goRight();
        time2 = 0;
    })

    for (i = 0; i < points.length; i++) {
        points[i].addEventListener('click', function () {
            // 获取当前小圆点的data-index属性值,改变索引值并跳转
            var pointIndex = this.getAttribute('data-index')
            index2 = pointIndex;
            goIndex();
            time2 = 0;
        })
    }
    //计时器
    var timer2;
    function play() {
        // 定时器
        // 每0.2s flag+1,flag=20时进行跳转,即每4s进行一次
        timer2 = setInterval(() => {
            time2++;
            if (time2 == 20) {
                goRight();
                time2 = 0;
            }
        }, 200)
    }
    play();
    //移入清除计时器
    all.onmousemove = function () {
        clearInterval(timer2)
    }
    //移出启动计时器
    all.onmouseleave = function () {
        clearInterval(timer2)
        play();
    }
})