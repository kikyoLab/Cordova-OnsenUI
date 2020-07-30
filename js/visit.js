document.addEventListener('init', function (event) {
    $("#visitClient").val('西昌三友超市')
    $("#visitCsname").val('张三')
    $("#visitClientname").val('李四')
    $("#visitClientphone").val('123456789987')
    $("#visitClientqq").val('12345678')

    let visitLine = document.getElementById('visitLine')
    visitLine.onclick = function () {
        console.log('áaa')
    }

    $(function () {
        $('#datetimepicker5').datetimepicker();
        $('#datetimepicker6').datetimepicker();
    });
})