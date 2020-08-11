document.addEventListener('init', function (event) {
    let login = document.getElementById('login')
    let loginFail = document.getElementById('login-fail-alert');
    let close = document.getElementById('close')
    login.onclick = function () {
        let username = $("#user").val()
        let userpwd = $("#pwd").val()

        /* 登录 */
        $.ajax({
            type: 'POST',
            url: 'http://work.ecsun.cn:8080/app/api/login.php',
            data: { "code": username, "userPwd": userpwd },
            success: function (data) {
                data = JSON.parse(data)
                if (data.status == 0) {
                    localStorage.setItem('Userkey', data.key);
                    document.querySelector('#myNavigator').pushPage('html/userIndex.html');
                } else {
                    loginFail.show()
                }
            }
        })
    }

    close.onclick = function () {
        loginFail.hide();
    }
})