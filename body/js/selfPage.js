addLoadEvent(()=>{
    let userLists=q(".user-lists-inner")
    let userLike=q(".user-like-inner")
    let userRadio=q(".user-radio-inner")
    let userInformation=q(".change-information-inner")
    q(".user-like").onclick=function(){
        userLists.style.display="none"
        userRadio.style.display="none"
        userInformation.style.display="none"
        userLike.style.display="block"
    }
    q(".user-lists").onclick=function(){
        userLists.style.display="block"
        userRadio.style.display="none"
        userInformation.style.display="none"
        userLike.style.display="none"
    }
    q(".user-radio").onclick=function(){
        userLists.style.display="none"
        userRadio.style.display="block"
        userInformation.style.display="none"
        userLike.style.display="none"
    }
    q(".change-information").onclick=function(){
        userLists.style.display="none"
        userRadio.style.display="none"
        userInformation.style.display="block"
        if(userCookie==""){
            q(".information-wrapper").style.display="none"
        }else{
            q(".information-wrapper").style.display="block"
        }
        userLike.style.display="none"
    }
    q(".change").onclick=function(){
        q(".information-wrapper").style.display="none"
        q(".change-information-wrapper").style.display="block"
    }
})