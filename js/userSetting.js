document.addEventListener('init', function (event) {
    /* 检测当前页面是否为 userSetting */
    if (event.target.matches('#userSetting')) {
        /* 获取登录key */
        let ukey = localStorage.getItem('Userkey');
        let pwdChange = document.getElementById('pwdSave')

        pwdChange.onclick = function () {
            let newPwd = $("#newPwd").val()
            let reNewPwd = $("#reNewPwd").val()

            /* 新密码格式校验 */
            if (newPwd) {

            }

            /* 密码一致性校验 */
            if (reNewPwd !== newPwd) return (console.error('两次输入的密码不一致'))

            $.ajax({
                type: 'POST',
                url: 'http://work.ecsun.cn:8080/app/api/index.php',
                data: { "key": ukey, "action": "changePwd", "newPwd": newPwd },
                async: false,
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.status == 0) {
                        /* 成功提示 */
                    }
                }
            })
        }
    }
})