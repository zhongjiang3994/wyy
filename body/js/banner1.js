let setImg = function (banners) {
    // 获取左箭头
    let oLeft = q(".left-angle")
    // 获取右箭头
    let oRight = q(".right-angle")
    // 获取图片容器
    let oImgList = q(".images")
    let oImgs = oImgList.children
    let imgBackground = $("imgBackground")
    // 节流flag
    var canClick = true
    // 复制第一个一个元素节点
    let cloneFirstImg = oImgList.firstElementChild.cloneNode()
    // 在最后添加第一个元素节点的复制品
    oImgList.appendChild(cloneFirstImg);
    // 索引
    let index = 0
    function handleRightBtn() {
        if (canClick == true) {
            // 索引改变,容器位置改变
            index++
            imgBackground.style.backgroundImage = "url(" + oImgs[index].src + "?imageView&blur=40x20)"
            oImgList.style.left = index * -982 + "px"
            // 重置缓冲时间
            oImgList.style.transition = ".8s";
            if (index == banners) {
                // 重置索引
                index = 0;
                // 在转移置第一个元素的复制品时,在一个缓冲效果的时间后清空缓冲效果,并且将位置重置为初始状态
                setTimeout(() => {
                    oImgList.style.transition = "none";
                    oImgList.style.left = 0;
                }, 800)
            }
            setCircles()
            // 节流flag改变,防止点击频率过快
            canClick = false
            setTimeout(() => {
                canClick = true
            }, 800)
        }
    }
    oRight.addEventListener("click", handleRightBtn)
    oLeft.addEventListener("click", () => {
        if (canClick == true) {

            index--
            if (index !== -1) {
                imgBackground.style.backgroundImage = "url(" + oImgs[index].src + "?imageView&blur=40x20)"
            }
            // imgBackground.style.background="url("+oImgs[index].src+")"
            // 如果是第一张切换到最后一张,清空缓冲效果,转移置复制的第一张图片,设置异步执行的动画效果,在转移后进行,达到无缝效果
            if (index === -1) {
                oImgList.style.left = banners * -982 + "px"
                oImgList.style.transition = "none";
                // 改变索引
                index = banners - 1
                imgBackground.style.backgroundImage = "url(" + oImgs[index].src + "?imageView&blur=40x20)"
                setTimeout(() => {
                    oImgList.style.left = index * -982 + "px"
                    oImgList.style.transition = ".8s";
                }, 0);
            } else {
                oImgList.style.left = index * -982 + "px"
            }
            setCircles()
            canClick = false
            setTimeout(() => {
                canClick = true
            }, 800)
        }
    })
    // 获取所有小圆点
    const circles = ql(".image-button");
    function setCircles() {
        for (let i = 0; i < circles.length; i++) {
            if (i === index) {
                // 为当前索引的小圆点添加active类
                circles[i].classList.add("active");
            } else {
                // 为其他不为当前索引的小圆点移除active类
                circles[i].classList.remove("active");
            }
        }
    }
    // 获取小圆点容器
    const oCircle =  q(".min")
    // 将click事件设置给小圆点容器,利用冒泡事件来调用函数
    oCircle.addEventListener("click", (e) => {
        // 判断是否为小圆点点击事件的发生
        if (e.target.nodeName.toLowerCase() === "li") {
            const n = Number(e.target.getAttribute("data-n"))
            index = n;
            oImgList.style.left = index * -982 + "px"
            oImgList.style.transition = ".8s";
            setCircles()
        }
    })
    // 设置自动进行,每两秒进行一次
    let autoplay = setInterval(() => {
        handleRightBtn()
    }, 2000)
    // 获取图片容器的容器
    const oWrap = $("image-wrapper")
    // 设置鼠标移入事件,清除计时器
    oWrap.addEventListener("mouseenter", () => {
        clearInterval(autoplay)
    })
    // 设置鼠标移出事件
    oWrap.addEventListener("mouseleave", () => {
        // 移出时先进行一次计时器清空,再重新打开计时器,防止启动多个计时器
        clearInterval(autoplay);
        autoplay = setInterval(() => {
            handleRightBtn()
        }, 2000)
    })
}
addLoadEvent(() => {
    let banners = 0
    let time = Date.now()
    ajax({
        type: "get",
        url: "https://autumnfish.cn/banner",
        data: {
            timestamp: time
        },
        success: function (data, xhr) {
            banners = JSON.parse(data).banners.length
            for (var i = 0; i < banners; i++) {
                let img = ct("img")
                img.style.width = "982px"
                img.style.height = "100%"
                img.style.flex = "none"
                img.style.cursor="pointer";
                if (i == 0) {
                    $("imgBackground").style.backgroundImage = "url(" + JSON.parse(data).banners[i].imageUrl + "?imageView&blur=40x20)"
                }
                img.src = JSON.parse(data).banners[i].imageUrl
                $("images").appendChild(img)
                let li = ct("li")
                if (i == 0) {
                    li.classList.add("active")
                }
                li.classList.add("image-button")
                li.setAttribute('data-n', i);
                $("min").appendChild(li)
            }
            setImg(banners)
            let allImg=$("images").children
            for(let i=0;i<banners;i++){
                allImg[i].onclick=function(){
                    window.location.href="https://music.163.com/#/song?id="+JSON.parse(data).banners[i].encodeId;
                }
            }
            allImg[banners].onclick=function(){
                window.location.href="https://music.163.com/#/song?id="+JSON.parse(data).banners[0].encodeId;
            }
        },
        error: function (data, xhr) {
            console.log(JSON.parse(data))
        }
    })
})