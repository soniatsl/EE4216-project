$(document).ready(function(){
    $('.index_more_options').click(function(){
        $('.index_boxes.additional').toggleClass('hide');
        if($(this).text() == "More Options")
            $(this).text('Less Options');
        else
            $(this).text('More Options');
    });
});