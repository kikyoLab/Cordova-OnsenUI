document.addEventListener('init', function (event) {
    /* 检测当前页面是否为 logVisitDetail */
    if (event.target.matches('#logVisitDetail')) {

        let ukey = localStorage.getItem('Userkey');
        let logVisitSuccess = document.getElementById('logVisitSuccess')
        let logVisitBad = document.getElementById('logVisitBad')
        let logVisitSuccessBtn = document.getElementById('logVisitSuccessBtn')
        let logVisitBadBtn = document.getElementById('logVisitBadBtn')

        bsCustomFileInput.init()

        let data = myNavigator.topPage.data
        console.log(data)

        /* Date */
        $(function () {
            $('#logVisitDateStart').datetimepicker({ format: 'YYYY-MM-DD HH:mm' });
            $('#logVisitDateEnd').datetimepicker({ format: 'YYYY-MM-DD HH:mm' });
        });

        /* Data */
        $("#visitClient").val(`${data.custom}-${data.id}`)
        $("#visitCsname").val(`${data.user}`)
        $("#visitClientname").val(`${data.cusname}`)
        $("#visitClientphone").val(`${data.cusph}`)
        $("#visitClientqq").val(`${data.cusqq}`)
        $("#visitProblemDetails").html(`${data.detail}`)
        $("#visitProblemNotes").val(`${data.remark}`)
        $("#visitDealResult").val(`${data.result}`)

        /* Hidden Content  */
        let visitLine = document.getElementById('visitLine')
        let visitLineStatus = true
        visitLine.onclick = function () {
            $("#logVisitDateStart").val(`${data.starttime}`)
            $("#logVisitDateEnd").val(`${data.endtime}`)
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
            let hfdetail = $("#visitContent").val()
            let hfremark = $("#visitRemarks").val()
            let hflevel = $("#visitCsStatus").val()
            let hfresult
            $("#visitProblemDeal").val() == '已解决' ? hfresult = '1' : hfresult = '2'
            let hfStarttime = $("#logVisitDateStart").val()
            let hfEndtime = $("#logVisitDateEnd").val()
            let cusname = $("#visitCsname").val()
            let cusph = $("#visitClientname").val()
            let cusqq = $("#visitClientqq").val()
            let serdmark = $("#visitProblemNotes").val()

            $.ajax({
                type: 'POST',
                url: 'http://work.ecsun.cn:8080/app/api/index.php',
                data: {
                    "key": ukey,
                    "action": "insertWork",
                    "type": "hfWork",
                    "serid": data.id,
                    "sercus": data.id,
                    "sertype": data.sertype,
                    "sersou": data.sersou,
                    "cusname": cusname,
                    "cusph": cusph,
                    "cusqq": cusqq,
                    "serstart": hfStarttime,
                    "serend": hfEndtime,
                    "serdetail": data.detail,
                    "serdmark": serdmark,
                    "hfdetail": hfdetail,
                    "hfremark": hfremark,
                    "hf_level": hflevel,
                    "seresult": hfresult,
                },
                async: false,
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.status == 0 && data.info == "成功") {
                        logVisitSuccess.show()
                    } else {
                        logVisitBad.show()
                    }
                }
            })
        }

        logVisitSuccessBtn.onclick = function () {
            document.querySelector('#myNavigator').resetToPage('html/userIndex.html')
        }

        logVisitBadBtn.onclick = function () {
            document.querySelector('#myNavigator').popPage()
        }
    }
})