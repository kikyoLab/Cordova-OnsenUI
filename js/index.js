document.addEventListener('init', function (event) {
    let login = document.getElementById('login')
    let loginFail = document.getElementById('login-fail-alert');
    login.onclick = function () {
        let username = $("#user").val()
        let userpwd = $("#pwd").val()

        $.ajax({
            type: 'POST',
            url: 'http://work.ecsun.cn:8080/app/api/login.php',
            data: { "code": username, "userPwd": userpwd },
            success: function (data) {
                data = JSON.parse(data)
                if (data.status == 0) {
                    let ukey = data.key
                    let uname = data.uname
                    let ustatus = data.status
                    console.log(`你好, ${uname}! 你的Key是${ukey} 今天已处理的问题数:${ustatus}`)
                    document.querySelector('#myNavigator').pushPage('html/userIndex.html', {
                        data: {
                            uname: uname,
                            ukey: ukey,
                            ustatus: ustatus
                        }
                    });
                } else {
                    loginFail.show()
                }
            }
        })
    }

    function appEnd () {
        loginFail.hide();
    }

})