$(document).ready(function () {
    $('.index_more_options').click(function () {
        $('.index_boxes.additional').toggleClass('hide');
        if ($(this).text() == "More Options")
            $(this).text('Less Options');
        else
            $(this).text('More Options');
    });

    $(".index_amount_item").click(function () {
        var num = $(this).text();
        if (num != "del") {
            var inputAmount = $(".amount_input").val();
            $(".amount_input").val(inputAmount + num);
        }
        else if (num == "del") {
            var amount = $(".amount_input").val();
            var deleted = amount.substring(0, amount.length - 1);
            $(".amount_input").val(deleted);
        }

    });

    $(".currency-button").click(function() {
        var value = $(".amount_input").val();
        value = Number(value);
        if (isNaN(value)) return alert("Invalid value.");
        var cur_code = $(this).attr("cur-code");
        var url = `result-new.html?cur_code=${cur_code}&value=${value}`;
        location.href = url;
    });

});