addLoadEvent(()=>{
    window.alert = function (msg) {							
        var style = `
            <style class="mask-style">
                .alertMask{
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    z-index: 99999;
                    background: #0000002b;
                }
                .alertContainer{
                    border-radius:20px;
                    margin:400px auto;
                    max-width: 320px;
                    background:#fff;
                    border: 1px solid #0000002b;
                    color: rgb(51, 51, 51);
                    overflow: hidden;									
                }
                .alertDes{
                    flex:none;
                    padding:25px 30px 20px 30px;
                    text-align: center;
                    letter-spacing: 1px;
                    font-size:20px;
                    font-weight:600;
                    color: rgb(51, 51, 51);
                }
                .alertDes img{
                    max-width: 100%;
                    height: auto;
                }
                .alertConfirmParent{
                    flex:none;
                    width: 100%;
                    padding:5px 30px 25px 30px;
                    text-align: center;
                    box-sizing: border-box;
                }
                .alertConfirmBtn{
                    cursor: pointer;
                    padding:8px 20px;
                    border: none;
                    border-radius:5px;
                    color: #fff;
                    background-color:rgb(194, 12, 12);
                    box-shadow: 0 0 5px rgb(194, 12, 12);
                }
            </style>
        `;
        var head = q("head");
        head.innerHTML += style
    
        const body = q("body");
    
        var alertMask = ct("div");
        var alertContainer = ct("div");
        var alertDes = ct("div");
        var alertConfirmParent = ct("div");
        var alertConfirmBtn = ct("button");
    
        body.append(alertMask);
        ac(alertMask,"alertMask");
    
        alertMask.append(alertContainer);
        ac(alertContainer,"alertContainer")
    
        alertContainer.append(alertDes);
        ac(alertDes,"alertDes")
    
        alertContainer.append(alertConfirmParent);
        ac(alertConfirmParent,"alertConfirmParent")
    
        alertConfirmParent.append(alertConfirmBtn);
        ac(alertConfirmBtn,"alertConfirmBtn")
        alertConfirmBtn.innerText ="确定";
    
        //加载提示信息	
        alertDes.innerHTML = msg;
        //关闭当前alert弹窗
        function alertBtnClick() {
            body.removeChild(alertMask);
            maskStyle = head.getElementsByClassName("mask-style")[0];
            head.removeChild(maskStyle);
        }
        alertConfirmBtn.addEventListener("click", alertBtnClick);
        setTimeout(alertBtnClick,2000)
    }
})
