document.addEventListener('init', function (event) {
    /* 检测当前页面是否为 newLog */
    if (event.target.matches('#newLog')) {
        /* 登录 Key */
        let ukey = localStorage.getItem('Userkey');

        /**
         * 客户名称
         * @param addSup新增超市名
         * @param emptyBtn清空文本区域
         */
        const emptyBtn = document.getElementById('newLogCSnameIcon')
        const addSup = document.getElementById('addSup')

        emptyBtn.onclick = function () {
            $("#newLogCSname0").val('')
        }

        addSup.onclick = function () {
            let val = $("#newLogCSname2").val()
            $.ajax({
                type: 'POST',
                url: 'http://work.ecsun.cn:8080/app/api/index.php',
                data: { "key": ukey, "action": "insertInfo", "type": "custom", "value": val },
                async: false,
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.status == 0) {
                        console.log('成功')
                        $("#newLogCSname0").attr('style', 'display:block')
                        $("#newLogCSnameIcon").attr('style', 'display:block')
                        $("#newLogCSname1").attr('style', 'display:none')
                        $(".newLogCSname2").attr('style', 'display:none')
                        $("#newLogCSname0").val(val)
                    }
                }
            })
        }

        /* 延时获取文本输入值 */
        let timeoutId = 0;
        $('#newLogCSname0').off('keyup').on('keyup', function (event) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                let select = $("#newLogCSname1")[0];
                select.length = 0;
                let val = $('#newLogCSname0').val()
                $.ajax({
                    type: 'POST',
                    url: 'http://work.ecsun.cn:8080/app/api/index.php',
                    data: { "key": ukey, "action": "getInfo", "type": "custom", "value": val },
                    async: false,
                    success: function (data) {
                        data = JSON.parse(data)
                        if (data.status == 0) {
                            $("#newLogCSname0").attr('style', 'display:none')
                            $("#newLogCSnameIcon").attr('style', 'display:none')
                            $("#newLogCSname1").attr('style', 'display:block')

                            newData = data.info
                            let len = newData.length
                            if (len && len > 0) {
                                $("#newLogCSname1").append(`<option></option>`)
                                for (var i = 0; i < len; i++) {
                                    $("#newLogCSname1").append(`
                                    <option>${newData[i].cusname}${newData[i].cusid}</option>
                                    `)
                                }
                            } else {
                                $("#newLogCSname0").attr('style', 'display:none')
                                $("#newLogCSnameIcon").attr('style', 'display:none')
                                $("#newLogCSname1").attr('style', 'display:none')
                                $(".newLogCSname2").attr('style', 'display:block')
                                $("#newLogCSname2").val(val)
                            }
                        }
                    }
                })
            }, 1000);
        });

        document.getElementById('newLogCSname1').addEventListener('change', function () {
            let val = $("#newLogCSname1").val()
            $("#newLogCSname0").attr('style', 'display:block')
            $("#newLogCSnameIcon").attr('style', 'display:block')
            $("#newLogCSname1").attr('style', 'display:none')
            $(".newLogCSname2").attr('style', 'display:none')
            $("#newLogCSname0").val(val)
        })


        /**
         * 客户姓名 电话 QQ
        */
        let newLogCSxm = $("#newLogCSxm").val()
        let newLogCStel = $("#newLogCStel").val()
        let newLogCSqq = $("#newLogCSqq").val()


        /**
         * 问题来源
         * @param PBemptyBtn清空问题来源
         * @param addPBfrom新增问题来源
        */
        const PBemptyBtn = document.getElementById('newLogPBfromIcon')
        const addPBfrom = document.getElementById('addPBfrom')

        PBemptyBtn.onclick = function () {
            $("#newLogPBfrom0").val('')
        }

        addPBfrom.onclick = function () {
            let val = $("#newLogPBfrom2").val()
            $.ajax({
                type: 'POST',
                url: 'http://work.ecsun.cn:8080/app/api/index.php',
                data: { "key": ukey, "action": "insertInfo", "type": "qsname", "value": val },
                async: false,
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.status == 0) {
                        console.log('成功')
                        $("#newLogPBfrom0").attr('style', 'display:block')
                        $("#newLogPBfromIcon").attr('style', 'display:block')
                        $("#newLogPBfrom1").attr('style', 'display:none')
                        $(".newLogPBfrom2").attr('style', 'display:none')
                        $("#newLogPBfrom0").val(val)
                    }
                }
            })
        }

        /* 延时获取文本输入值 */
        let PBtimeoutId = 0;
        $('#newLogPBfrom0').off('keyup').on('keyup', function (event) {
            clearTimeout(PBtimeoutId);
            PBtimeoutId = setTimeout(function () {
                let select = $("#newLogPBfrom1")[0];
                select.length = 0;
                let val = $('#newLogPBfrom0').val()
                $.ajax({
                    type: 'POST',
                    url: 'http://work.ecsun.cn:8080/app/api/index.php',
                    data: { "key": ukey, "action": "getInfo", "type": "qsource", "value": val },
                    async: false,
                    success: function (data) {
                        data = JSON.parse(data)
                        if (data.status == 0) {
                            $("#newLogPBfrom0").attr('style', 'display:none')
                            $("#newLogPBfromIcon").attr('style', 'display:none')
                            $("#newLogPBfrom1").attr('style', 'display:block')

                            newData = data.info
                            let len = newData.length
                            if (len && len > 0) {
                                $("#newLogPBfrom1").append(`<option></option>`)
                                for (var i = 0; i < len; i++) {
                                    $("#newLogPBfrom1").append(`
                                    <option>${newData[i].qsid}-${newData[i].qsname}</option>
                                    `)
                                }
                            } else {
                                $("#newLogPBfrom0").attr('style', 'display:none')
                                $("#newLogPBfromIcon").attr('style', 'display:none')
                                $("#newLogPBfrom1").attr('style', 'display:none')
                                $(".newLogPBfrom2").attr('style', 'display:block')
                                $("#newLogPBfrom2").val(val)
                            }
                        }
                    }
                })
            }, 1000);
        });

        document.getElementById('newLogPBfrom1').addEventListener('change', function () {
            let val = $("#newLogPBfrom1").val()
            $("#newLogPBfrom0").attr('style', 'display:block')
            $("#newLogPBfromIcon").attr('style', 'display:block')
            $("#newLogPBfrom1").attr('style', 'display:none')
            $(".newLogPBfrom2").attr('style', 'display:none')
            $("#newLogPBfrom0").val(val)
        })

        /**
         * 问题类型
         * @param PBTypeemptyBtn清空问题类型
         * @param addPBtype新增问题类型
        */
        const PBTypeemptyBtn = document.getElementById('newLogPBtypeIcon')
        const addPBtype = document.getElementById('addPBtype')

        PBTypeemptyBtn.onclick = function () {
            $("#newLogPBtype0").val('')
        }

        addPBtype.onclick = function () {
            let val = $("#newLogPBtype2").val()
            $.ajax({
                type: 'POST',
                url: 'http://work.ecsun.cn:8080/app/api/index.php',
                data: { "key": ukey, "action": "insertInfo", "type": "qtype", "value": val },
                async: false,
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.status == 0) {
                        console.log('成功')
                        $("#newLogPBtype0").attr('style', 'display:block')
                        $("#newLogPBtypeIcon").attr('style', 'display:block')
                        $("#newLogPBtype1").attr('style', 'display:none')
                        $(".newLogPBtype2").attr('style', 'display:none')
                        $("#newLogPBtype0").val(val)
                    }
                }
            })
        }

        /* 延时获取文本输入值 */
        let PBtypeTimeoutId = 0;
        $('#newLogPBtype0').off('keyup').on('keyup', function (event) {
            clearTimeout(PBtypeTimeoutId);
            PBtypeTimeoutId = setTimeout(function () {
                let select = $("#newLogPBtype1")[0];
                select.length = 0;
                let val = $('#newLogPBtype0').val()
                $.ajax({
                    type: 'POST',
                    url: 'http://work.ecsun.cn:8080/app/api/index.php',
                    data: { "key": ukey, "action": "getInfo", "type": "qtype", "value": val },
                    async: false,
                    success: function (data) {
                        data = JSON.parse(data)
                        if (data.status == 0) {
                            $("#newLogPBtype0").attr('style', 'display:none')
                            $("#newLogPBtypeIcon").attr('style', 'display:none')
                            $("#newLogPBtype1").attr('style', 'display:block')

                            newData = data.info
                            let len = newData.length
                            if (len && len > 0) {
                                $("#newLogPBtype1").append(`<option></option>`)
                                for (var i = 0; i < len; i++) {
                                    $("#newLogPBtype1").append(`
                                   <option>${newData[i].qtid}-${newData[i].qtname}</option>
                                   `)
                                }
                            } else {
                                $("#newLogPBtype0").attr('style', 'display:none')
                                $("#newLogPBtypeIcon").attr('style', 'display:none')
                                $("#newLogPBtype1").attr('style', 'display:none')
                                $(".newLogPBtype2").attr('style', 'display:block')
                                $("#newLogPBtype2").val(val)
                            }
                        }
                    }
                })
            }, 1000);
        });

        document.getElementById('newLogPBtype1').addEventListener('change', function () {
            let val = $("#newLogPBtype1").val()
            $("#newLogPBtype0").attr('style', 'display:block')
            $("#newLogPBtypeIcon").attr('style', 'display:block')
            $("#newLogPBtype1").attr('style', 'display:none')
            $(".newLogPBtype2").attr('style', 'display:none')
            $("#newLogPBtype0").val(val)
        })
    }
})