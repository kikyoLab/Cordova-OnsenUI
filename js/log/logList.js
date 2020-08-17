document.addEventListener('init', function (event) {
    /* 检测当前页面是否为 logList */
    if (event.target.matches('#logList')) {
        let ukey = localStorage.getItem('Userkey');

        /* 获取日志列表 */
        let log
        log = (function () {
            let result
            $.ajax({
                type: 'POST',
                url: 'http://work.ecsun.cn:8080/app/api/index.php',
                data: { "action": "getWork", "key": ukey },
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

        console.log(log)
        if (!log) return console.error('问题反馈接口故障')

        /* 动态生成反馈卡片 */
        let len = log.info.length
        for (var i = 0; i < len; i++) {
            let color
            switch (log.info[i].result) {
                case '已解决':
                    color = '#51B479'
                    break;
                case '未解决':
                    color = '#51B479'
                    break;
                case '待处理':
                    color = '#51B479'
                    break;
                case '客服取消':
                    color = '#51B479'
            }

            $("#logListCard").append(`
            <ons-card id=${'List' + i} class='listCard'>
                <div class='logListDiv'>
                    <div class='listTitle'>${log.info[i].custom}</div>
                    <div class='listDate'>
                        <span>${log.info[i].qtype}</span>
                    </div>
                </div>

                <div class='logListMain'>
                    <div class='logListMainLeft'>
                        <div style='display: flex;'>
                            <div id='logCsId'>${log.info[i].user}</div>
                            <div id='logSolveId' style='color:${color || 'black'}'>${log.info[i].result}</div>
                        </div>
                        <div style='display: flex;'>
                            <div id='logCs'>客服</div>
                            <div id='logSolve'>处理结果</div>
                        </div>
                    </div>

                    <div id='logListMainRight'>
                        <ons-button id=${'logVisit' + i} class='logVisitBtn' modifier="large">回 访</ons-button>
                    </div>
                </div>
            </ons-card>
            `)
        }

        document.getElementById('logListCard').addEventListener('click', function (event) {
            let eventId = event.path[0].id.slice(0, 8)
            if (eventId == 'logVisit') {
                let id = event.path[0].id.slice(8, event.path[0].id.length)
                document.querySelector('#myNavigator').pushPage('html/log/logVisitDetail.html', {
                    data: log.info[id]
                })
            }
        })

        let SolveTimeoutId = 0;
        $('.logListSearch').off('keyup').on('keyup', function (event) {
            clearTimeout(SolveTimeoutId);
            SolveTimeoutId = setTimeout(function () {
                let val = $(".logListSearch").val()
                let newData = log.info.filter((x) => x.custom.indexOf(val) !== -1)
                $("#logListCard").html(' ')
                for (var i = 0; i < newData.length; i++) {
                    let color
                    switch (newData[i].result) {
                        case '已解决':
                            color = '#51B479'
                            break;
                        case '未解决':
                            color = '#51B479'
                            break;
                        case '待处理':
                            color = '#51B479'
                            break;
                        case '客服取消':
                            color = '#51B479'
                    }

                    $("#logListCard").append(`
                    <ons-card id=${'List' + i} class='listCard'>
                        <div class='logListDiv'>
                            <div class='listTitle'>${newData[i].custom}</div>
                            <div class='listDate'>
                                <span>${newData[i].qtype}</span>
                            </div>
                        </div>
        
                        <div class='logListMain'>
                            <div class='logListMainLeft'>
                                <div style='display: flex;'>
                                    <div id='logCsId'>${newData[i].user}</div>
                                    <div id='logSolveId' style='color:${color || 'black'}'>${newData[i].result}</div>
                                </div>
                                <div style='display: flex;'>
                                    <div id='logCs'>客服</div>
                                    <div id='logSolve'>处理结果</div>
                                </div>
                            </div>
        
                            <div id='logListMainRight'>
                                <ons-button id=${'logVisit' + i} class='logVisitBtn' modifier="large">回 访</ons-button>
                            </div>
                        </div>
                    </ons-card>
                    `)
                }
            }, 1000)
        })
    }
})

