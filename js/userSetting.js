document.addEventListener('init', function (event) {
    /* 检测当前页面是否为 userSetting */
    if (event.target.matches('#userSetting')) {
        /* 获取登录key */
        let ukey = localStorage.getItem('Userkey');
        let pwdChange = document.getElementById('pwdSave')
        let userSettingDialog = document.getElementById('userSettingDialog')
        let userSettingDialogBtn = document.getElementById('userSettingDialogBtn')
        let userSettingSuccess = document.getElementById('userSettingSuccess')
        let userSettingSuccessBtn = document.getElementById('userSettingSuccessBtn')

        pwdChange.onclick = function () {
            let newPwd = $("#newPwd").val()
            let reNewPwd = $("#reNewPwd").val()
            let reg = /^[a-zA-Z0-9]{6}$/
            let status
            /* 新密码格式校验 */
            if (!newPwd || !reNewPwd) {
                $("#userSettingerror").html('请输入新密码')
                userSettingDialog.show()
            } else if (!reg.test(newPwd)) {
                $("#userSettingerror").html('新密码格式错误,请设置为六位数字、字母组合')
                userSettingDialog.show()
            } else if (newPwd !== reNewPwd) {
                $("#userSettingerror").html('两次密码不一致')
                userSettingDialog.show()
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'http://work.ecsun.cn:8080/app/api/index.php',
                    data: { "key": ukey, "action": "changePwd", "newPwd": newPwd },
                    async: false,
                    success: function (data) {
                        data = JSON.parse(data)
                        if (data.status == 0 && data.info == '成功') {
                            userSettingSuccess.show()
                        } else {
                            $("#userSettingerror").html('密码修改接口故障,请重试')
                            userSettingDialog.show()
                            status = true
                        }
                    }
                })
            }


            userSettingDialogBtn.onclick = function () {
                if (status) {
                    document.querySelector('#myNavigator').popPage()
                } else {
                    userSettingDialog.hide()
                }
            }

            userSettingSuccessBtn.onclick = function () {
                document.querySelector('#myNavigator').popPage()
            }
        }
    }
})