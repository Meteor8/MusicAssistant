//获取所有歌单
//u_id
//用户id
function getlist(u_id){
    $(".message .action").html("正在获取歌单列表...");
    var ajax=new XMLHttpRequest();
    ajax.withCredentials = true;
    //创建http请求，设置请求地址
    var timestamp = Date.parse(new Date());
    ajax.open("post","http://localhost:3000/user/playlist?uid="+u_id+"&limit=100"+"&t="+timestamp);
    //发送请求
    ajax.send(null);
    //给ajax设置事件(这里最多感知4[1-4]个状态)
    ajax.onreadystatechange = function(){
        //responseText以字符串的形式接收服务器返回的信息
        if(ajax.readyState == 4 && ajax.status == 200){
            data = JSON.parse(ajax.responseText);
            album_num = 0;
            album_num_cnt = 0;
            for(var i=0;i<data.playlist.length;i++){
                if(data.playlist[i].userId==u_id){
                    album_num++;
                    //本地变量中添加歌单
                    albumlist[data.playlist[i].id]=[];
                    albumlist[data.playlist[i].id]["name"]=data.playlist[i].name;
                    albumlist[data.playlist[i].id]["list"]=[];
                    //网页中添加歌单
                    var l_div = $("<div sel='0' id='"+String(i)+"' tid='"+data.playlist[i].id+"'></div>").text(data.playlist[i].name);
                    l_div.on("click",function(){
                        //页面获取歌单中歌曲
                        getsonglist($(this).attr("tid"));
                        $(this).parent().find("[sel='1']").attr("sel","0");
                        $(this).attr("sel","1");
                    })
                    $(".playlist").append(l_div);
                }
            }
            //本地变量获取各歌单的歌曲
            for(var key in albumlist){
                getsong(key);
            }
            $(".message .action").html("歌曲添加完成");
        }        
    }
}
