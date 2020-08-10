document.addEventListener('init', function (event) {
    let btn1 = document.getElementById('test1')
    let btn2 = document.getElementById('test2')
    let btn3 = document.getElementById('test3')

    btn1.onclick = function () {
        document.querySelector('#myNavigator').pushPage('html/problem/feedBackDetails.html')
    }

    btn2.onclick = function () {
        console.log('test2')
    }

    btn3.onclick = function () {
        console.log('test3')
    }

})