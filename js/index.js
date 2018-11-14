$(document).ready(function(){
    $('.index_more_options').click(function(){
        $('.index_boxes.additional').toggleClass('hide');
        if($(this).text() == "More Options")
            $(this).text('Less Options');
        else
            $(this).text('More Options');
    });

    $(".index_amount_item").click(function(){
        var num = $(this).text();
        if(num != "del"){
            var inputAmount = $(".amount_input").val();
            $(".amount_input").val(inputAmount + num);
        }
        else if(num == "del"){
            var amount = $(".amount_input").val();
            var deleted = amount.substring(0, amount.length - 1);
            $(".amount_input").val(deleted);
        }

    });


});