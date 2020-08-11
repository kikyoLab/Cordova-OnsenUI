document.addEventListener('init', function (event) {
    /* 检测当前页面是否为 feedBack */
    if (event.target.matches('#feedBack')) {
        let ukey = localStorage.getItem('Userkey');

        /* 获取问题反馈 */
        let fb
        fb = (function () {
            let result
            $.ajax({
                type: 'POST',
                url: 'http://work.ecsun.cn:8080/app/api/index.php',
                data: { "key": ukey, "action": "getBack" },
                async: false,
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.status == 0) {
                        result = data
                    }
                }
            })
            return result
        })()

        if (!fb.info[0]) return console.error('问题反馈接口故障')

        console.log(fb.info[0])

        /* 动态生成反馈卡片 */
        let len = fb.info.length
        for (var i = 0; i < len; i++) {
            $("#feedBackCard").append(`
            <ons-card id=${'card' + i} class='problemCard'>
                <div class='problemTitle'>${fb.info[i].title}</div>
                <span class='problemDate'>${fb.info[i].time}</span>
                <div class='problemDetails'>${fb.info[i].detail}......</div>
                <div class='problemFrom'>
                    <span class='shopName'>
                        ${fb.info[i].sup}
                    </span>
                    <span class='shopId'>
                    ${fb.info[i].sn}
                    </span>
                </div>
            </ons-card>
            `)
        }

        document.getElementById('feedBackCard').addEventListener('click', function (event) {
            let eventId = event.path[1].id
            let id = eventId.slice(4, eventId.length)
            document.querySelector('#myNavigator').pushPage('html/problem/feedBackDetails.html', {
                data: fb.info[id]
            })
        })
    }
})