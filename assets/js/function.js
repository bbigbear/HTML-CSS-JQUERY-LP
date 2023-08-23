'use strict';

var MEDIAQUERY = window.matchMedia('screen and (max-width: 768px)');

// hide body
if( !MEDIAQUERY.matches ) {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.id = 'styleHideBody';
    style.textContent = 'body { position: relative; opacity: 0; }';
    head.appendChild(style);
}


$(document).ready(function() {

    // accordion
    $('[data-accordion-switch]').on('click', function () {
        $(this).toggleClass('is-active');
        $('[data-accordion="'+ $(this).data('accordionSwitch') +'"]').slideToggle(200);
    });
    $('[data-accordion-switch]').each(function() {
        $(this).removeClass('is-active');
        $('[data-accordion="'+ $(this).data('accordionSwitch') +'"]').hide();
    });

    // smooth scroll
    $('a[href^="#"]').on('click',function(e) {
        var speed = 'slow',
            easing = 'swing',
            $this = $(this),
            $target = $(this.hash),
            $scrollElm = $(document.scrollingElement || document.documentElement),
            isTarget = $target.length > 0 && $target.is(':visible'),
            isNoscroll = $this.hasClass('js-no-scroll') ||
                         $this.parents('.js-no-scroll').length > 0;
        if(!isNoscroll && isTarget) {
            var targetOffset = $target.offset().top > 50 ? $target.offset().top : 0;
            $scrollElm.animate({scrollTop: targetOffset}, speed, easing);
            e.preventDefault();
        }
    });


    // fadein body
    function fadeInBody() {
        $('body').animate({ opacity: 1 }, {
            duration: 200,
            complete: function() {
                $('#styleHideBody').remove();
            }
        });
    }
    setTimeout(function() {// 一定時間が経過したら強制的にフェードイン
        fadeInBody();
    }, 3000);


    // choose device
    function chooseDevice() {
        if($('img[src*="\-sp\."][data-responsive-image]').length && !MEDIAQUERY.matches) { // spからpc
            responsiveImage('-sp','-pc');
        } else if($('img[src*="\-pc\."][data-responsive-image]').length && MEDIAQUERY.matches) { // pcからsp
            responsiveImage('-pc','-sp');
        } else {
            fadeInBody();
        }
    }

    // responsive change image
    function responsiveImage(imgSuffixBefore,imgSuffixAfter) {
        var $elem = $('[data-responsive-image]');
        for(var i = 0, len= $elem.length; i < len; i++) {
            var $this = $elem.eq(i);
           if( i === len - 1 ){
              $this.attr('src', $this.attr('src').replace(imgSuffixBefore, imgSuffixAfter)).on('load', function(){
                fadeInBody();
              });
            } else {
              $this.attr('src', $this.attr('src').replace(imgSuffixBefore, imgSuffixAfter));
            }
        }
    }

    // ロード時に実行
    chooseDevice();

    // ブレイクポイントで実行
    MEDIAQUERY.addListener(chooseDevice);

});