document.addEventListener('init', function (event) {
    let data = myNavigator.topPage.data

    $("#titleProblemNum").html(`03`)
    $("#titleProblemDate").html(`/ 08:52:45 时长`)
    $("#userIndexTitle2").html(`今日已处理问题`)

    let ant = document.getElementById('addNewTask')
    let st = document.getElementById('seeTask')
    let at = document.getElementById('allTask')
    let pmfb = document.getElementById('problemFeedBack')
    let se = document.getElementById('setting')

    ant.onclick = function () {
        console.log('新增日志')
    }

    st.onclick = function () {
        document.querySelector('#myNavigator').pushPage('html/log/visit.html')
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
})