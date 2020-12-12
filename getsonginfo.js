//获取歌曲信息
//s_id
//歌曲id
function getsonginfo(s_id){
    $(".message .action").html("正在获取歌曲信息...");
    var ajax=new XMLHttpRequest();
    //创建http请求，设置请求地址
    var timestamp = Date.parse(new Date());
    ajax.open("post","http://localhost:3000/song/detail?ids="+s_id+"&t="+timestamp);
    //发送请求 (get为null post为参数)
    ajax.send(null);
    //给ajax设置事件
    ajax.onreadystatechange = function(){
        //responseText以字符串的形式接收服务器返回的信息
        if(ajax.readyState == 4 && ajax.status == 200){
            data = JSON.parse(ajax.responseText);
            $(".songname").html(data.songs[0].name);
            $(".artist").html(data.songs[0].ar[0].name);
            $(".album").html(data.songs[0].al.name);


            $("iframe").attr("src", "https://music.163.com/outchain/player?type=2&id="+s_id+"&auto=1&height=66");

            $(".wheresub").html("");
            for(var key in albumlist){
                var sub = "0";
                var where = "-1";

                for(var i=0;i<albumlist[key]["list"].length;i++){
                    var sn_id = String(albumlist[key]["list"][i]);
                    if(s_id==sn_id){
                       sub = "1";
                       where = String(i);
                       break;
                    }
                }
                var sl_div = $("<div sub='"+sub+"' tid='"+key+"' where='"+where+"'></div>").text(albumlist[key]["name"]);
                sl_div.on("click",function(){
                    var sl_id = $(this).attr("tid");
                    if($(this).attr("sub")=="1"){
                        //删除
                        $(this).attr("sub","0");
                        albumlist[sl_id]["list"].splice(where,1);
                        $(this).attr("where","-1");
                        changesonginfo(sl_id, s_id, "del");
                    }else{
                        //增加
                        $(this).attr("sub","1");
                        $(this).attr("where",albumlist[sl_id]["list"].length);
                        albumlist[sl_id]["list"].push(s_id);
                        changesonginfo(sl_id, s_id, "add");
                    }
                })
                if(sub=="1"){
                    $(".wheresub").prepend(sl_div);
                }else{
                    $(".wheresub").append(sl_div);
                }
            }
            $(".message .action").html("获取歌曲信息成功");
        }
    }
}