var windowsH = 0;
var t = null;

$(document).ready(function(){
    windowsH = $(window).height();
    /*$('.page_container').height(windowsH);*/
    
});

$(document).ready(function(){
    alert('loaded');
    $('#main_container').scrollTop(1).scrollTop(0);
});

function change_page(page_){
    
    if(page_ == 'game_page'){
        $('#info_page_bottom').animate({'left': '-2000px'}, 1000);
        $('#info_page .container').animate({'margin-top': '-2000px'}, 1000, function() {
            $('.page').hide();
            $('#'+page_).show();
            
            $("#mesa").memotest('images/grilla/default.png', new Array(
                    'images/grilla/1.png',
                    'images/grilla/2.png',
                    'images/grilla/3.png',
                    'images/grilla/4.png',
                    'images/grilla/5.png',
                    'images/grilla/6.png'
            ));
            
        });
    }else if(page_ == 'home'){
        location.reload(); 
        stopSnow();
        
        $('#info_page_bottom').css('left', '0px');
        $('#info_page .container').css('margin-top', '0px');
        
        $('.page').fadeOut('500', function(){ $('#'+page_).fadeIn();});
        
        var sound_win = document.getElementById('sound_win');
        sound_win.pause();
        sound_win.currentTime = 0;
        
    }else if(page_ == 'win_page'){
        var sound_win = document.getElementById('sound_win');
        sound_win.play();
        
        $('.page').fadeOut('500', function(){ 
            $('#'+page_).show();
            showSnow();
            
            $('#win_page .container_left').animate({'margin-left': '8%'}, 1000);
            $('#win_page .container_right').animate({'margin-top': '0px'}, 1000);
            
        });
        
    }else if(page_ == 'loose_page'){
        var sound_game_over = document.getElementById('sound_game_over');
        sound_game_over.play();
        
        $('.page').fadeOut('500', function(){
            
            $('#'+page_).show();
            
            $('#loose_page .container_left').animate({'margin-left': '8%'}, 1000);
            $('#loose_page .container_right').animate({'margin-top': '0px'}, 1000);
            
        });
    } else{
        //$('.page').hide();
        //$('#'+page_).show();
        $('.page').fadeOut('500', function(){ $('#'+page_).fadeIn();});
    }
}

function changeLifes(intentos){
    $('#vidas_cant').html(intentos);
    $('#vidas_img img').first().remove();
}

function restartLifes(){
    intentos = 2;
    $('#vidas_cant').html(intentos);
    var img_vidas = '<img src="images/vida.png" />';
    $('#vidas_img').append(img_vidas);
    $('#vidas_img').append(img_vidas);
}

function stopSnow(){
    //if(t != null){
        
        window.setTimeout(function() {
            $('.flake_').remove();
            clearInterval(t);
            t = null;
        }, 1000);
        //t = null;
    //}
}

function showSnow(){
    clearInterval(t);
    $('body').append('<div id="flake" class="flake_"><img src="images/confetti.png" /></div>');
t = setInterval(
	function(){
		var documentHeight 		= $(document).height();
		var startPositionLeft 	= Math.random() * $(document).width() - 100;
		var startOpacity		= 1;
		var sizeFlake			= 10 + Math.random() * 20;
		var endPositionTop		= documentHeight - 40;
		var endPositionLeft		= startPositionLeft - 100 + Math.random() * 200;
		var durationFall		= documentHeight * 10 + Math.random() * 5000;
		$('#flake')
			.clone()
			.appendTo('body')
			.css(
				{
					left: startPositionLeft,
					opacity: startOpacity,
					'font-size': sizeFlake
				}
			)
			.animate(
				{
					top: endPositionTop,
					left: endPositionLeft,
					opacity: 0.8
				},
				durationFall,
				'linear',
				function() {
					$(this).remove()
				}
			);
	},500);

	var snow = {};
	var snowflex = {};

	snowflex.create  = function(){
		var flex = document.createElement('div');
			flex.innerHTML		 	= "&#10052;";
			flex.style.fontSize 	= 10 + Math.random() * 20 + 'px';
			flex.style.top 			= - 50 + Math.random() * 20 + 'px';
			flex.style.left 		= Math.random() * 1500 + 'px';
			flex.style.position 	= "absolute";
			flex.style.color 		= "#F3F3F3";
			flex.style.opacity		= Math.random();
			document.getElementsByTagName('body')[0].appendChild(flex);
			return flex;
	};


	snow.snowflex = function(){
		var flex = snowflex.create();
		var x = -1 + Math.random() * 2;
		t = setInterval( 
					function(){
						flex.style.top 	= parseInt(flex.style.top) +  5 + 'px';
						flex.style.left = parseInt(flex.style.left) +  x + 'px';
						if (parseInt(flex.style.top) > 1500) {
							clearInterval(t);
							document.getElementsByTagName('body')[0].removeChild(flex);
						}			
					}, 45 + Math.random() * 20);
	};
	
	snow.storm = function(){
		t	= setInterval(
					function(){
						snow.snowflex();
					}, 1000);
	};
}