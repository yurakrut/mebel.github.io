$(document).ready(function () {

    $('.product-top-slider_first').slick({
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        asNavFor: '.product-top-slider_second'
    });
    $('.product-top-slider_second').slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-top-slider_first',
        responsive: [
            {
                breakpoint: 1441,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('.product-right-more').click(function(){
        $(this).parent().find('.product-right-sublist').slideToggle();
        $(this).parent().siblings().find('.product-right-sublist').slideUp();
        $(this).toggleClass('active').parent().siblings().find('.product-right-more').removeClass('active');
        if($(this).hasClass('active')) {
            $(this).text('-').parent().siblings().find('.product-right-more').text('+');
        }
        else {
            $(this).text('+')
        }
    });

    $('.blog-content').masonry({
        // options
        itemSelector: '.blog-content-item',
        gutter: 50
    });

    var inputValue = 0;
    var thisInput;

    $('.cart-table-arrows_plus').click(function(){
        thisInput = $(this).parent().parent().find('.cart-table-item-input');
        inputValue = +thisInput.val() + 1;
        thisInput.val(inputValue);
        console.log(inputValue);
    });
    $('.cart-table-arrows_minus').click(function(){
        thisInput = $(this).parent().parent().find('.cart-table-item-input');
        inputValue = +thisInput.val() - 1;
        if (inputValue < 0) {
            inputValue = 0;
        }
        thisInput.val(inputValue);
    });

    $(".js-select2").select2();

    $('.cart-total-link').click(function(e){
        e.preventDefault();
        $(this).parent().find('.cart-total-drop').slideToggle();
    });

    $('.cart-pay-label').click(function () {
       $(this).parent().find('.cart-pay-text').slideDown();
       $(this).parent().siblings().find('.cart-pay-text').slideUp();
    });

    $('.header-btn_mobile').click(function(e){
        e.preventDefault();
        $('.transform-content').addClass('close');
    });
    $('.transform-content-overlay, .mobile-menu-close').click(function(){
        $('.transform-content').removeClass('close');
    });

    $('.header-center-searche_mobile').click(function(){
        $('.transform-content').addClass('close');
        $('.header-center-input').focus();
    });
    $('.filter-tab').click(function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.filter-list-link').click(function(e){
        e.preventDefault();
        var itemIndex = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.filter-block-item').eq(itemIndex).addClass('active').siblings().removeClass('active');
        checkHeight();
    });

    $('.constructor-tabs-link').click(function(e){
        e.preventDefault();
        var itemIndex = $(this).index();
        $(this).toggleClass('active').siblings().removeClass('active');
        $('.constructor-main-item').eq(itemIndex).toggleClass('active').siblings().removeClass('active');
        checkHeight();
        if(!$('.constructor-main-item').hasClass('active')) {
            $('.constructor-main-change').addClass('hide')
        }
        else {
            $('.constructor-main-change').removeClass('hide')
        }
    });




    function checkHeight(){
        $('.filter-block-right').height($('.filter-block-item.active').height());
        $('.constructor-main-change').height($('.constructor-main-item.active').height());
    }
    checkHeight();

    $('.constructor-top-input').click(function(){
       var takeItem = $(this).data('number');
       var areaImg = $('.constructor-main-path.active').data('img');
       var indexImg = $('.constructor-main-path.active').index();
       var totalImg = "img/" + areaImg + '-' + takeItem + ".png";
       console.log(totalImg);
       $('.constructor-main-custom-img').eq(indexImg - 1).attr('src', totalImg);
       // $('.constructor-main-path').removeClass('active');
    });
    $('.constructor-main-path').hover(function(){
       $(this).addClass('hover').siblings().removeClass('hover');
       if($(this).hasClass('area1')) {
           $('.area1').addClass('hover');
       }
       else if($(this).hasClass('area2')) {
           $('.area2').addClass('hover');
       }
    },function(){
        $(this).removeClass('hover').siblings().removeClass('hover');
    });
    $('.constructor-main-path').click(function(){
        $('.constructor-top-input').prop('checked', false);
        $(this).toggleClass('active').siblings().removeClass('active');

        if($(this).hasClass('area1')) {
             $('.area1').addClass('active');
         }
         else if($(this).hasClass('area2')) {
             $('.area2').addClass('active');
         }
    });
});
var startScroll = 350;
$('.cart-logo, .catalog-top').css('background-position-y', -startScroll + 'px');
$(window).scroll(function () {
    if($(window).width() > 1024) {
        if ($(this).scrollTop() > 150) {
            $('.header-top').slideUp();
            $('.header-center').slideUp();
        } else {
            $('.header-top').slideDown();
            $('.header-center').slideDown();
        }
    }
    var totlaPosition = $(this).scrollTop() / 1.5 - startScroll;
    $('.cart-logo, .catalog-top').css('background-position-y', totlaPosition + 'px');
});
$('#obs, #visotp, #etagey, .factors, #mainresult').bind('input', calcAndShow);

function calcAndShow() {
  var v1 = parseFloat($("#obs").val());
  var v2 = parseFloat($("#visotp").val());
  var v3 = parseFloat($("#etagey").val());
  //var v4 = parseFloat($('input[name="stena[]"]:checked').val());
  //var v5 = $('#mainresult');
  var text, text2, summa, text3;
  text = ' ';
  text2 = v2 + v3 + v1;
  text3 = '  '
  if (text2 === text2) {

  } else {

    return 0;
  }

  var res = (text2 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  summa = text + ' ' + res + ' ' + text3;
  $('#mainresults').val(summa);


}