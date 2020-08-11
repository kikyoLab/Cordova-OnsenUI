document.addEventListener('init', function (event) {
    if (event.target.matches('#statistical')) {
        let ukey = localStorage.getItem('Userkey');

        /* 图表时间选择公共方法 */
        function dateVal (val) {
            let date = []
            switch (val) {
                case '全部':
                    date = ['2020.1.1', '2020.12.31']
                    break;
                case '1月':
                    date = ['2020.1.1', '2020.1.31']
                    break;
                case '2月':
                    date = ['2020.2.1', '2020.2.29']
                    break;
                case '3月':
                    date = ['2020.3.1', '2020.3.31']
                    break;
                case '4月':
                    date = ['2020.4.1', '2020.4.30']
                    break;
                case '5月':
                    date = ['2020.5.1', '2020.5.31']
                    break;
                case '6月':
                    date = ['2020.6.1', '2020.6.30']
                    break;
                case '7月':
                    date = ['2020.7.1', '2020.7.31']
                    break;
                case '8月':
                    date = ['2020.8.1', '2020.8.31']
                    break;
                case '9月':
                    date = ['2020.9.1', '2020.9.30']
                    break;
                case '10月':
                    date = ['2020.10.1', '2020.10.31']
                    break;
                case '11月':
                    date = ['2020.11.1', '2020.11.30']
                    break;
                case '12月':
                    date = ['2020.12.1', '2020.12.31']
            }
            return date
        }

        /* 问题总数及饼图初始化 */
        let PB
        function pieChart (date) {
            PB = (function () {
                let result
                $.ajax({
                    type: 'POST',
                    url: 'http://work.ecsun.cn:8080/app/api/count.php',
                    data: {
                        "key": ukey,
                        "action": "count",
                        "type": "workCount",
                        "start_time": date[0],
                        "end_time": date[1]
                    },
                    async: false,
                    success: function (data) {
                        result = JSON.parse(data)
                    }
                })
                return result
            })()

            if (!PB) return console.error('问题统计接口故障')

            let len = PB.length, allPB = 0, solvePB = 0, otherPB = 0, hfPB = 0;

            for (var i = 0; i < len; i++) {
                allPB += PB[i].counts
                solvePB += PB[i].ok
                otherPB += PB[i].no
                hfPB += PB[i].hf
            }

            /* 饼图初始化 */
            const pieChart = echarts.init(document.getElementById('PBpieChart'));
            let todayNum = localStorage.getItem('todayData');
            pieChart.setOption({
                title: {
                    text: `今日新增`,
                    subtext: `${todayNum}`,
                    x: 'center',
                    y: 'center',
                    top: '100',
                    textStyle: {
                        fontSize: 14,
                        color: '#ced4da'
                    },
                    subtextStyle: {
                        fontSize: 34,
                        color: 'black'
                    }
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'horizontal',
                    right: 0,
                    itemGap: 20,
                    itemWidth: 15,
                    itemHeight: 12,
                    data: ['未解决', '已解决', '其他']
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['60%', '70%'],
                        avoidLabelOverlap: false,
                        height: 300,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        data: [
                            {
                                value: solvePB,
                                name: '已解决',
                                itemStyle: {
                                    color: '#66cc9a'
                                }
                            },
                            {
                                value: otherPB,
                                name: '未解决',
                                itemStyle: {
                                    color: '#ff6666'
                                }
                            },
                            {
                                value: otherPB,
                                name: '其他',
                                itemStyle: {
                                    color: '#ffb366'
                                }
                            }
                        ]
                    }
                ]
            });

            /* 数据处理 */
            let minPercentage = Math.round(hfPB / allPB * 10000) / 100.00 + "%"
            let maxPercentage = Math.round(10000 - hfPB / allPB * 10000) / 100.00 + "%"

            $(".PBallProgress").css('width', `${maxPercentage}`)
            $(".PBvisitProgress").css('width', `${minPercentage}`)

            $("#PieAllPB").html(allPB)
            $("#PieSolvedPB").html(solvePB)
            $("#PieOtherPB").html(otherPB)

            $("#PBall").html(allPB + '个')
            $("#PBvisitPercentage").html(minPercentage)
            $("#PBvisitNum").html(hfPB + '个')
        }

        pieChart(['', ''])

        /* 监听日期 */
        document.getElementById('FBStatisticalDate').addEventListener('change', function () {
            let val = $("#FBStatisticalDate").val()
            let date = dateVal(val)

            pieChart(date)
            console.log(`正在选择 ${date} 日期之间的数据`)
        })

        /* 客服表格 */
        var $table = $('#table')
        $(function () {
            let data = PB
            $table.bootstrapTable({ data: data })
        })

        /* 老客户回访初始化 */
        let oldHF
        function oldHFChart (date) {
            oldHF = (function () {
                let result
                $.ajax({
                    type: 'POST',
                    url: 'http://work.ecsun.cn:8080/app/api/count.php',
                    data: {
                        "key": ukey,
                        "action": "count",
                        "type": "oldHf",
                        "start_time": date[0],
                        "end_time": date[1]
                    },
                    async: false,
                    success: function (data) {
                        result = JSON.parse(data)
                    }
                })
                return result
            })()
        }

        oldHFChart(['', ''])

        if (!oldHF) return console.error('老客户回访接口故障')

        document.getElementById('CSStatisticalDate').addEventListener('change', function () {
            let val = $("#CSStatisticalDate").val()
            let date = dateVal(val)

            oldHFChart(date)
            console.log(`正在选择 ${date} 日期之间的数据`)
        })

        /* 老客户回访柱状图 */
        let oldHFuname = [], oldHFcount = [];
        oldHF.filter((x) => oldHFuname.push(x.uname) && oldHFcount.push(x.counts))

        const csVisitHistogram = echarts.init(document.getElementById('CSvisitHistogram'));
        csVisitHistogram.setOption({
            xAxis: {
                type: 'category',
                data: oldHFuname
            },
            yAxis: {
                type: 'value'
            },
            dataZoom: [{
                type: "inside",
                start: 1,
                end: 30,
            }],
            series: [{
                type: 'bar',
                data: oldHFcount
            }],
            color: '#40bf80'
        });



        /* 问题回访柱状图 */
        let pbUname = [], pbHf = []
        PB.filter((x) => pbUname.push(x.uname) && pbHf.push(x.hf))

        const pbVisitHistogram = echarts.init(document.getElementById('PBvisitHistogram'));
        pbVisitHistogram.setOption({
            xAxis: {
                type: 'category',
                data: pbUname
            },
            yAxis: {
                type: 'value'
            },
            dataZoom: [{
                type: "inside",
                start: 1,
                end: 30,
            }],
            series: [{
                type: 'bar',
                data: pbHf
            }],
            color: '#ffa64d'
        });

        document.getElementById('PBStatisticalDate').addEventListener('change', function () {
            let val = $("#PBStatisticalDate").val()
            let date = dateVal(val)

            pieChart(date)
            console.log(`正在选择 ${date} 日期之间的数据`)
        })
    }
})