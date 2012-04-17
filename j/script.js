$(document).ready(function(){
    
    $('body').click(function() {
        if($('.ipop .ipop__head').hasClass('active')) {
            $('.ipop .ipop__head').toggleClass('active');
            $('.ipop__pop').toggle();
        }
    });
    
    $('.ipop .ipop__head').click(function(e) {
        $(this).toggleClass('active');
        $('.ipop__pop').toggle();
        e.stopPropagation();
    });
    
    $('.ipop').click(function(e) {
        e.stopPropagation();
    });
    
});