document.addEventListener('init', function (event) {
    let data = myNavigator.topPage.data

    $("#userIndexTitle1").html(`你好, ${data.uname} !`)
    $("#userIndexTitle2").html(`今天已处理的问题数: ${data.ustatus}`)

    let sideFuncBar = document.getElementById('sideFuncBar')
    sideFuncBar.onclick = function () {
        document.querySelector('#myNavigator').pushPage('html/taskView/visit.html')
    }
})