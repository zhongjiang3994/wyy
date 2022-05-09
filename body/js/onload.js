function addLoadEvent(func) {
    var oldOnload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldOnload();//调用前覆盖的on1oad事件的函数
            func();//调用当前的函数
        }
    }
}