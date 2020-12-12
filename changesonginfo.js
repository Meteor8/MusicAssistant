//歌曲收藏或取消收藏
//sl_id：歌单id
//s_di；歌曲id
//chg：改变状态 add：增加 del：删除
function changesonginfo(sl_id, s_id, chg) {
    $(".message .action").html("正在修改中...");
    var ajax = new XMLHttpRequest();
    //打开cookies
    ajax.withCredentials = true;
    //创建http请求，设置请求地址
    ajax.open("get", "http://localhost:3000/playlist/tracks?op=" + chg + "&pid=" + sl_id + "&tracks=" + s_id);
    //发送请求 (get为null post为参数)
    ajax.send(null);
    //给ajax设置事件(这里最多感知4[1-4]个状态)
    ajax.onreadystatechange = function () {
        //responseText
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = JSON.parse(ajax.responseText);
            if (data.code == "200" || data.status == "200") {
                if(chg=="add"){
                    $(".message .action").html("歌曲已收藏");
                }else{
                    $(".message .action").html("歌曲已取消收藏");
                }
            } else {
                $(".message .action").html("修改失败");
            }

        }
    }
}