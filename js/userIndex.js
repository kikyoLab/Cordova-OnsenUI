document.addEventListener('init', function (event) {
    /* 检测当前页面是否为 userIndex */
    if (event.target.matches('#userIndex')) {
        /* 获取登录 key */
        let ukey = localStorage.getItem('Userkey');
        let userIndexContent = document.getElementById('userIndexContent')
        let userIndexContentBtn = document.getElementById('userIndexContentBtn')
        /* 获取今日处理量和累积量 */
        $.ajax({
            type: 'POST',
            url: 'http://work.ecsun.cn:8080/app/api/count.php',
            data: { "key": ukey, "action": "indexData" },
            success: function (data) {
                data = JSON.parse(data)
                if (data.status == 0) {
                    localStorage.setItem('todayData', data.info.todayData);
                    $("#titleProblemNum").html(data.info.todayData)
                    $("#PBcount").html(data.info.totalData)
                } else {
                    userIndexContent.show()
                }
            }
        })

        userIndexContentBtn.onclick = function () {
            location.reload()
        }

        $("#userIndexTitle2").html(`今日已处理问题`)

        let ant = document.getElementById('addNewTask')
        let st = document.getElementById('seeTask')
        let at = document.getElementById('allTask')
        let pmfb = document.getElementById('problemFeedBack')
        let se = document.getElementById('setting')

        ant.onclick = function () {
            document.querySelector('#myNavigator').pushPage('html/log/newLog.html')
        }

        st.onclick = function () {
            document.querySelector('#myNavigator').pushPage('html/log/logList.html')
        }

        at.onclick = function () {
            document.querySelector('#myNavigator').pushPage('html/problem/statistical.html')
        }

        pmfb.onclick = function () {
            document.querySelector('#myNavigator').pushPage('html/problem/feedBack.html')
        }

        se.onclick = function () {
            document.querySelector('#myNavigator').pushPage('html/userSetting.html')
        }
    }
})