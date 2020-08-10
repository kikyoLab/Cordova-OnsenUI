document.addEventListener('init', function (event) {
    /* pieChart */
    let pieChart = echarts.init(document.getElementById('PBpieChart'));
    let aa = '08'
    pieChart.setOption({
        title: {
            text: `今日新增`,
            subtext: `${aa}`,
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
                        value: 1600,
                        name: '已解决',
                        itemStyle: {
                            color: '#66cc9a'
                        }
                    },
                    {
                        value: 9,
                        name: '未解决',
                        itemStyle: {
                            color: '#ff6666'
                        }
                    },
                    {
                        value: 34,
                        name: '其他',
                        itemStyle: {
                            color: '#ffb366'
                        }
                    }
                ]
            }
        ]
    });

    /* CSvisitHistogram */
    let csVisitHistogram = echarts.init(document.getElementById('CSvisitHistogram'));
    csVisitHistogram.setOption({
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        dataZoom: [{
            start: 0,
            end: 10,
            type: "inside"
        }, {
            start: 80
        }],
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    });

    /* data */
    $("#PieAllPB").html(1643)
    $("#PieSolvedPB").html(1600)
    $("#PieOtherPB").html(34)

    $("#PBall").html('1643个')
    $("#PBvisitPercentage").html('23.8%')
    $("#PBvisitNum").html('69个')

    /* user table */
    var $table = $('#table')
    $(function () {
        var data = [
            {
                'name': 0,
                'pbNum': 52,
                'solveNum': 30,
                'other': 22
            },
            {
                'name': 1,
                'pbNum': 52,
                'solveNum': 30,
                'other': 22
            },
            {
                'name': 2,
                'pbNum': 52,
                'solveNum': 30,
                'other': 22
            },
            {
                'name': 3,
                'pbNum': 52,
                'solveNum': 30,
                'other': 22
            },
            {
                'name': 4,
                'pbNum': 52,
                'solveNum': 30,
                'other': 22
            },
            {
                'name': 5,
                'pbNum': 52,
                'solveNum': 30,
                'other': 22
            }
        ]
        $table.bootstrapTable({ data: data })
    })
})