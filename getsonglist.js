//页面获取歌单中歌曲
//sl_id
//歌单id
function getsonglist(sl_id){
    $(".message .action").html("正在获取歌曲列表...");

    var ajax=new XMLHttpRequest();
    ajax.withCredentials = true;
    //创建http请求，设置请求地址
    var timestamp = Date.parse(new Date());
    ajax.open("post","http://localhost:3000/playlist/detail?id="+sl_id+"&t="+timestamp);
    //发送请求 (get为null post为参数)
    ajax.send(null);
    //给ajax设置事件
    ajax.onreadystatechange = function(){
        //responseText以字符串的形式接收服务器返回的信息
        if(ajax.readyState == 4 && ajax.status == 200){
            data = JSON.parse(ajax.responseText);
            $(".songlist").html("");
            for(var i=0;i<data.playlist.tracks.length;i++){
                var s_div = $("<div sel='0' id='"+String(i)+"' tid='"+data.playlist.tracks[i].id+"'></div>").text(data.playlist.tracks[i].name);
                s_div.on("click",function(){
                    getsonginfo($(this).attr("tid"));
                    $(this).parent().find("[sel='1']").attr("sel","0");
                    $(this).attr("sel","1");
                })
                $(".songlist").append(s_div);
            }
            $(".message .action").html("获取歌曲列表成功");

        }
    }
}

//变量获取歌单中歌曲
function getsong(sl_id){
    $(".message .action").html("加载歌曲数据信息...");
    var ajax=new XMLHttpRequest();
    ajax.withCredentials = true;
    //创建http请求，设置请求地址
    var timestamp = Date.parse(new Date());
    ajax.open("post","http://localhost:3000/playlist/detail?id="+sl_id+"&t="+timestamp);
    //发送请求 (get为null post为参数)
    ajax.send(null);
    //给ajax设置事件
    ajax.onreadystatechange = function(){
        //responseText以字符串的形式接收服务器返回的信息
        if(ajax.readyState == 4 && ajax.status == 200){
            album_num_cnt++;
            data = JSON.parse(ajax.responseText);
            $(".songlist").html("");
            
            for(var i=0;i<data.playlist.tracks.length;i++){
                albumlist[sl_id]["list"].push(data.playlist.tracks[i].id);
                // $(".message .action").html("["+album_num_cnt+"/"+album_num+"]数据加载：["+String(i)+"/"+String(data.playlist.tracks.length)+"]");
            }
            $(".message .action").html("["+album_num_cnt+"/"+album_num+"]数据加载["+String(i)+"/"+String(data.playlist.tracks.length)+"]");
        }
    }
}