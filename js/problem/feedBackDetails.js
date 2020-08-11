document.addEventListener('init', function (event) {
    /* 检测当前页面是否为 feedBackDetails */
    if (event.target.matches('#feedBackDetails')) {
        let data = myNavigator.topPage.data
        let ukey = localStorage.getItem('Userkey');

        /* title */
        $("#csName").html(data.sup)
        $("#problemId").html(data.sn)
        $("#csNameFirst").html(data.sup[0])

        /* content */
        $("#fbsup").html(data.sup)
        $("#fbsn").html(data.sn)
        $("#fbjobnum").html(data['job_num'])
        $("#fbfeedname").html(data['feed_name'])
        $("#fbtel").html(data.tel)
        $("#fbtelname").html(data['tel_name'])
        $("#fbtelqq").html(data['tel_qq'])
        $("#fbtime").html(data.time)
        $("#fbtitle").html(data.title)
        $("#fbdetail").html(data.detail)

        /* footer */
        $("#FBDetailsBack").html(data['back_text'])

        /* 更新反馈回复内容 */
        const FBSave = document.getElementById('FBSave')
        FBSave.onclick = function () {
            let back = $("#FBDetailsBack").html()
            $.ajax({
                type: 'POST',
                url: 'http://work.ecsun.cn:8080/app/api/index.php',
                data: { "key": ukey, "action": "backInfo", "id": data.id, "info": back },
                async: false,
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.status == 0) {
                        console.log(data.info)
                    }
                }
            })
        }
    }
})