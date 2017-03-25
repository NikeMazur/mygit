jQuery(document).ready(function($) {



    $('#fullpage').fullpage({
        //Navigation
        menu: '#menu',
        lockAnchors: false,
        anchors:['firstPage', 'secondPage', 'thirdPage', 'fourPage'],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide', 'thirdPage', 'fourPage'],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',
    	 onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);
            $('.more').removeClass('visible');

            if(nextIndex == 2){
                 $('.more').addClass('visible');
            }
        }
    });

    $('.slider').slick({
         responsive: [
    {
      breakpoint: 766,
      settings: {
        arrows: false
      }
    }
  ]
    });

var src = '';

$('section.about .col img').hover(function(){
	    src = $(this).attr('src');
	      $(this).attr('src', src.replace('.jpg', '.gif'));
	      // $(this).attr('src', src);

	  }, function(){
      $(this).attr('src', src);
    });


var port = '';
var portheight = '';


$(window).resize(function(event) {
    if ($(window).width() <= 1200) {
        if ($('div').is('#fullpage')) {
            $.fn.fullpage.destroy();
        }
        port = $('section.portfolio').offset().top;
        portheight = $('section.portfolio').height();
        $(window).scroll(function(event) {
            var scrtop = $(window).scrollTop();
            if ((scrtop >= port) && (scrtop <= port+portheight)) {
                $('aside .more').addClass('visible');
            }
            else {
                $('aside .more').removeClass('visible');
            }
        });
    }


});

if ($(window).width() <= 1200) {
    if ($('div').is('#fullpage')) {
        $.fn.fullpage.destroy();
    }
        port = $('section.portfolio').offset().top;
        portheight = $('section.portfolio').height();
        $(window).scroll(function(event) {
            var scrtop = $(window).scrollTop();
            if ((scrtop >= port) && (scrtop <= port+portheight)) {
                $('aside .more').addClass('visible');
            }
            else {
                $('aside .more').removeClass('visible');
            }
        });
    }


$('.responsive_menu').click(function(event) {
    if ($('.aside-cell').hasClass('open')) {
        $('.aside-cell').removeClass('open');
    }
    else {
        $('.aside-cell').addClass('open');
    }
});




    $(".aside-cell ul").on("click","a", function (event) {
        if ($(window).width() <= 766) {
            var navh = $('aside').height();
            event.preventDefault();
            var id  = $(this).closest('li').attr('data-menuanchor');
            if ($(window).width()>=1320 && $(window).width()<=1900) {
             var top = $('section[data-anchor='+id+']').offset().top;
                $('html,body').animate({ scrollTop: top-navh}, 800, 'swing');
            }
            else {
             var top = $('section[data-anchor='+id+']').offset().top;
               $('html,body').animate({ scrollTop: top-navh}, 800, 'swing');
            }
        }
        if ($('aside').is('.another')) {
            event.preventDefault();
            var id  = $(this).closest('li').attr('data-menuanchor');
             var top = $('section[data-anchor='+id+']').offset().top;
               $('html,body').animate({ scrollTop: top}, 800, 'swing');
        }
    });






 function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('.preview .bg-block').css('background-image', 'url('+e.target.result)+')';
                $('.uploads b').css('display','block');
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    $(".uploads input").change(function(){
        readURL(this);
    });



    var upload = document.getElementById("up-inp");

function getFileNames() {
  return Array.prototype.map.call(upload.files, function(file) {
    return file.name;
  });
}


 $('.uploads b').click(function(event) {
     $('#up-inp').val('');
      $('.uploads b').css('display','none');
      $('.preview .bg-block').css('background-image', 'none');
 });


});