document.addEventListener('init', function (event) {
    /* 检测当前页面是否为 visit */
    if (event.target.matches('#visit')) {
        /* 文件上传插件初始化 */
        bsCustomFileInput.init()

        /* Date */
        $(function () {
            $('#datetimepickerStart').datetimepicker({ format: 'YYYY-MM-DD HH:mm' });
            $('#datetimepickerEnd').datetimepicker({ format: 'YYYY-MM-DD HH:mm' });
        });

        /* Data */
        $("#visitClient").val('西昌三友超市')
        $("#visitCsname").val('张三')
        $("#visitClientname").val('李四')
        $("#visitClientphone").val('123456789987')
        $("#visitClientqq").val('12345678')

        /* Hidden Content  */
        let visitLine = document.getElementById('visitLine')
        let visitLineStatus = true
        visitLine.onclick = function () {
            if (visitLineStatus) {
                $("#visitHideContent").attr('style', 'display:block')
                $("#visitLine").children('p').html('收起展开内容')
                visitLineStatus = false
            } else {
                $("#visitHideContent").attr('style', 'display:none')
                $("#visitLine").children('p').html('展开全部内容')
                visitLineStatus = true
            }
        }

        /* Save Button */
        let visitSave = document.getElementById('visitSave')
        visitSave.onclick = function () {
            let Client = $("#visitClient").val()
            let CsName = $("#visitCsname").val()
            let ClientName = $("#visitClientname").val()
            let ClientPhone = $("#visitClientphone").val()
            let Clientqq = $("#visitClientqq").val()
            let StartTime = $("#datetimepickerStart").val()
            let EndTime = $("#datetimepickerEnd").val()
            let ProblemDetails = $("#visitProblemDetails").html()
            let ProblemNotes = $("#visitProblemNotes").val()
            let DealResult = $("#visitDealResult").val()
            let VisitContent = $("#visitContent").val()
            let VisitRemarks = $("#visitRemarks").val()
            let ProblemDeal = $("#visitProblemDeal").val()
            let CsStatus = $("#visitCsStatus").val()
        }
    }
})