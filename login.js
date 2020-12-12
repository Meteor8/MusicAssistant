//用于本地保存各个歌单歌曲信息
albumlist=[];

//登录(仅支持手机登录)
//u_type cellphone：电话 email：邮箱
function login() {
    $(".message .action").html("正在登录");

    u_name=$("input[type='text']").val();
    u_pw=$("input[type='password']").val();
    u_type="cellphone";
    t_type_url=u_type.slice(-5,);
    box=$(".loginWindow");

    var ajax = new XMLHttpRequest();
    //打开cookies
    ajax.withCredentials = true;
    //创建http请求，设置请求地址
    var timestamp = Date.parse(new Date());
    ajax.open("post", "http://localhost:3000/login/" + u_type + "?"+t_type_url+"=" + u_name + "&password=" + u_pw + "&t=" + timestamp);
    //发送请求 (get为null post为参数)
    ajax.send(null);
    //给ajax设置事件
    ajax.onreadystatechange = function() {
        //responseText以字符串的形式接收服务器返回的信息
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = JSON.parse(ajax.responseText);

            if (data.code == "200") {
                $(".message .login").html(data.profile.nickname);
                getlist(data.profile.userId);
                box.fadeOut();
                // box.remove();
            } else{
                $(".message .action").html("登录失败(目前仅支持手机号登录，不要频繁尝试登录)");
            }
        }else{
            $(".message .action").html("登录失败(目前仅支持手机号登录，不要频繁尝试登录)");
        }
    }
}
//检查登录状态
function login_status() {
    var ajax = new XMLHttpRequest();
    ajax.withCredentials = true;
    //创建http请求，设置请求地址
    var timestamp = Date.parse(new Date());
    ajax.open("get", "http://localhost:3000/login/status" + "?t=" + timestamp);
    //发送请求 (get为null post为参数)
    ajax.send(null);
    //给ajax设置事件
    ajax.onreadystatechange = function () {
        //responseText以字符串的形式接收服务器返回的信息
        if (ajax.readyState == 4 && ajax.status == 200) {
            data = JSON.parse(ajax.responseText);
            if (data.code == "200") {
                $(".message .login").html("已登录");
            } else {
                $(".message .login").html("未登录");
            }
        }
    }
}

