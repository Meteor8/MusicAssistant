//滚动条移动到指定位置
//scrollwho移动谁 playlist songlist wheresub
function scroll2(scrollwho){
    ctain = $("."+scrollwho);
    if(scrollwho=="wheresub"){
        ctain.scrollTop(0);
    }else{
        ctent = $("."+scrollwho+" [sel='1']");
        ctain.scrollTop(ctent.offset().top-ctain.offset().top+ctain.scrollTop());
    }
    
}

