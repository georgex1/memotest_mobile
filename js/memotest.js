var intentos = 2;
jQuery.fn.memotest = function(_carta_oculta, _cartas) {
    var elemento = $(this);
    this.iniciar = function() {
	_this.carta_oculta = _carta_oculta;
	_this.cartas = _cartas;
        _this.jugar(true);
    };
    var _this = {
        cartas: null,
        carta_oculta: 'imagenes/00.jpg',
        puntuaciones: new Array(),
        jugada: 0,
        carta1: null,
        carta2: null,
        time_now_inicial: null,
        duplicarCartas: function() {
            var cartas = new Array();
            for (var i = 0; i < _this.cartas.length; i++) {
                cartas.push(_this.cartas[i]);
                cartas.push(_this.cartas[i]);
            }
            _this.cartas = cartas;
        },
        mezclarCartas: function() {
            var contador = 0;
            var cantidad_de_cartas = _this.cartas.length;
            var posiciones = new Array();
            var numero_al_azar;
            var posicion_encontrada = false;
            var cartas = new Array();
            while (contador < cantidad_de_cartas) {
                numero_al_azar = Math.floor((Math.random() * cantidad_de_cartas) + 0);
                for (var i = 0; i < posiciones.length; i++) {
                    if (posiciones[i] === numero_al_azar) {
                        posicion_encontrada = true;
                        break;
                    }
                }
                if (!posicion_encontrada) {
                    contador++;
                    posiciones.push(numero_al_azar);
                    cartas.push(_this.cartas[numero_al_azar]);
                }
                posicion_encontrada = false;
            }
            _this.cartas = cartas;
        },
        dibujarCartas: function() {
            var codigo_html = '<ul>';
            for (var i = 0; i < _this.cartas.length; i++) {
                codigo_html += '<li class="memotest_cartas memotest_carta_invisible"> <img src="' + _this.carta_oculta + '" alt="" /> </li>';
            }
            codigo_html += '</ul>';
            elemento.html(codigo_html);
        },
        mostrarCarta: function(posicion, elemento) {
            var imagen = _this.cartas[posicion];
            elemento.fadeOut('200', function(){
                var sound_vuelta = document.getElementById('sound_vuelta');
                sound_vuelta.play();
                
                if (_this.jugada === 0) {
                    elemento.find('img').attr('src', _this.cartas[posicion]);
                    elemento.removeClass('memotest_carta_invisible');
                    _this.carta1 = elemento;
                    _this.jugada++;
                } else if (_this.jugada === 1) {
                    elemento.find('img').attr('src', _this.cartas[posicion]);
                    elemento.removeClass('memotest_carta_invisible');
                    _this.carta2 = elemento;
                    _this.jugada++;
                    _this.comprobarIgualdades();
                }
                elemento.fadeIn('200');
            });
        },
        mostrarTodasCartas: function(){
            $('.memotest_cartas').each(function(){
                $(this).find('img').attr('src', _this.cartas[$(this).index()]);
                $(this).removeClass('memotest_carta_invisible');
            });
            
            $('#countdown').show();
            var cdn = 3;
            $('#countdownNumber img').attr('src', 'images/count_'+cdn+'.png');
            var cdInt = window.setInterval(function() {
                cdn -= 1;
                if(cdn > 0){
                    
                    $('#countdownNumber img').attr('src', 'images/count_'+cdn+'.png');
                    //$('#countdownNumber').fadeOut('200', function(){ $('#countdownNumber').fadeOut();});
                }
                var sound_timer = document.getElementById('sound_timer');
                sound_timer.pause();
                sound_timer.currentTime = 0;
                sound_timer.play();
            }, 1000);
            
            
            window.setTimeout(function() {
                
                $('.memotest_cartas').each(function(){
                    $(this).find('img').attr('src', _this.carta_oculta);
                    $(this).addClass('memotest_carta_invisible');
                    clearInterval(cdInt);
                    $('#countdown').fadeOut();
                });
            }, 3000);
            //alert(_this.cartas);
        },
        comprobarIgualdades: function() {
            if (_this.carta1.find('img').attr('src') === _this.carta2.find('img').attr('src')) {
                window.setTimeout(function() {
                    var sound_bonus = document.getElementById('sound_bonus');
                    sound_bonus.play();
                    
                    _this.carta1.css('opacity', 0.8);
                    _this.carta2.css('opacity', 0.8);
                    _this.comprobarFinDelJuego();
                    _this.jugada = 0;
                }, 500);
            } else {
                var sound_fail = document.getElementById('sound_fail');
                sound_fail.play();
                intentos -=1;
                changeLifes(intentos);
                if(intentos < 1){
                    window.setTimeout(function() {
                        change_page('loose_page');
                        //change_page('win_page');
                        //_this.jugar(true);
                    }, 500);
                }
                //if(intentos > 0){
                    window.setTimeout(function() {
                        _this.carta1.find('img').attr('src', _this.carta_oculta);
                        _this.carta1.addClass('memotest_carta_invisible');
                        _this.carta2.find('img').attr('src', _this.carta_oculta);
                        _this.carta2.addClass('memotest_carta_invisible');
                        _this.jugada = 0;
                    }, 500);
                //}
            }
        },
        comprobarFinDelJuego: function() {
            if ($(".memotest_carta_invisible").size() === 0) {
                var milisegundos = (_this.getDateNow() - _this.time_now_inicial) / 1000;
                var puntuacion = 1000 - milisegundos;
                puntuacion = Math.ceil(puntuacion);
                _this.puntuaciones.push(puntuacion);
                elemento.html('');
                elemento.append('<div class="memotest_fin_juego"> Fin del juego. Tu puntuaci&oacute;n es de ' + puntuacion + '.</div>');
                _this.mostrarPuntuaciones();
                elemento.append('<div> <a class="memotest_jugar_de_nuevo" href="javascript:void(0);"> Jugar de nuevo </a> </div>');
            }
        },
        mostrarPuntuaciones: function() {
            change_page('win_page');
            /*var codigo_html = '<div>';
            codigo_html += '<p> Puntuaciones: </p>';
            codigo_html += '<ul>';
            for (var i = 0; i < _this.puntuaciones.length; i++) {
                codigo_html += '<li class="memotest_puntuaciones"> ' + _this.puntuaciones[i] + ' </li>';
            }
            codigo_html += '</ul>';
            codigo_html += '</div>';
            elemento.append(codigo_html);*/
        },
        eventos: function() {
            elemento.delegate('.memotest_cartas', 'click', function(posicion) {
                if ($(this).hasClass('memotest_carta_invisible')) {
                    _this.mostrarCarta($(this).index(), $(this));
                }
            });
            elemento.delegate('.memotest_jugar_de_nuevo', 'click', function() {
                _this.jugar(false);
            });
        },
        jugar: function(primera_vuelta) {
            if (primera_vuelta) {
                _this.duplicarCartas();
            } else {
                _this.jugada = 0;
            }
            restartLifes();
	    _this.time_now_inicial = _this.getDateNow();
            _this.mezclarCartas();
            _this.dibujarCartas();
            _this.eventos();
            _this.mostrarTodasCartas();
        },
	getDateNow: function(){
		var timeNow;
		try{
			timeNow = Date.now();
		}catch(e){
			timeNow = +new Date();
		}
		return timeNow;
	}
    };
    return this.iniciar();
};