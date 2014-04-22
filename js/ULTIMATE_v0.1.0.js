/**
 * Author: Автор Скрипта
 * Date: Дата создания
 * Version: Версия
 * License: GPL
 */
(function($) {
  jQuery.fn.unislider = function(options) {
    // Зададим список свойств и укажем для них значения по умолчанию.
    // Если при вызове метода будут указаны пользовательские
    // варианты некоторых из них, то они автоматически перепишут
    // соответствующие значения по умолчанию
    var options = $.extend({

      /* активация пейджера */
      pager: true,
      /* вид прокрутки */
      circular: false,
      /* класс для кнопки назад */
      prevBtn: 'prev-btn',
      /* класс для кнопки дальше */
      nextBtn: 'next-btn',
      /* класс обвертки для превьюшек */
      thmbWrp: 'thumbnails-carousel',
      /* класс для обвертки постраничной навигации */
      pagerWrp: 'pager',
      /* количество видимых элементов */
      quantity: 1,
      /* автопрокрутка */
      autoPlay: false,
      /* время автопрокрутки в сек. */
      autoPlayDelay: 10,
      /* навигация ( возможно пригодится )*/
      controlls: false,
      /* превьюшки нужно/не нужно */
      thumbnails: false,
      /* количество видимы превьюшек */
      thumbnailsQuantity: 4
    }, options);

    //          $('ТУТ НУЖНЫЙ ДИВ').НАЗВАНИЕ_ПЛАГИНА({опция1:true,опция2: false});

    var make = function() {

      // обрамление элементов в div .slider-wraper + подставлинеи классов в зависимости от параметров
      $(this).wrap('<div class="slider-wraper ' + (options.circular == true ? 'circular' : 'no-circular') + ' ' + (options.thumbnails == true ? 'thumbnails' : 'no-thumbnails') + '"/>');

      /* начальный список слайдера */
      var gallery = $(this),

        trueGallery = $(this),
        /* элементы слайдера */
        item = gallery.find('li'),
        /* обрамление ul.secondSlider + добавление навигации. классы для навигации в настройках */
        wrapper = gallery.parent('.slider-wraper').append('<div class="' + options.prevBtn + '"/><div class="' + options.nextBtn + '"/>'),
        /* кнопка дальше */
        nextBtn = wrapper.find('.' + options.nextBtn),
        /* кнопка назад */
        prevBtn = wrapper.find('.' + options.prevBtn),
        /* текущая позиция слайдера */
        sliderPosition = 0,
        /* реальное количество элементов */
        trueItemCount = item.length;

      /* -----------------------------------------------------simple nav -----------------------------------------*/

      /* если выбрана бесконечная прокрутка */
      if (options.circular === true) {
        /* добавить последний элемент списка в начало */
        gallery.children('li').slice(-options.quantity).clone().prependTo(gallery);
        $('<div/>').prependTo(gallery);

        /* добавить первый элемент списка в конец */
        gallery.children('li').slice(options.quantity, options.quantity * 2).clone().appendTo(gallery).removeClass('active');

        /* если выбрана обычная прокрутка - сделать неактивной кнопку назад */
      } else {
        prevBtn.addClass('disabled');
      }


      /* Количество элементов */
      gallery.find('li').width(Math.floor(wrapper.width() / options.quantity));

      /* ширина слайдера после подставления новых элементов */
      var galleryWidth = gallery.find('li').length * gallery.find('li').width();

      /* задание ширины слайдеру */
      gallery.width(galleryWidth);


      /* для бесконечной прокрутки вернем слайдер на одно окно назад*/
      if (options.circular === true) {

        // gallery.css('left', -item.width()*options.quantity);


      }



      /* вызов функции перелистывания по нажатию на кнопку дальше. вид перелистывания в зависимости от настроек */
      slideItems('-', nextBtn, options.circular);

      /* вызов функции перелистывания по нажатию на кнопку назад. вид перелистывания в зависимости от настроек */
      slideItems('+', prevBtn, options.circular);


      function slideItems($direction, $btn, $type) {

        $($btn).click(function(event) {

          /*отменить стандартное действие браузера*/
          event.preventDefault();


          /* проверить если анимация не закончилась и активна ли кнопка */
          if (!$(this).hasClass('inactive') && !$(this).hasClass('disabled')) {

            /* добавить класс. означает что анимация еще не закончилась */
            $(this).addClass('inactive');

            /* сдвинуть слайдер */
            gallery.animate({
                left: $direction + '=' + item.width() + 'px'
              }, 300,

              /* callback. функция исполняется после завершения анимации */
              function() {

                /* убрать класс, показав что анимация закончилась */
                $btn.removeClass('inactive');

                /* если обычная прокрутка*/

                /*--------------------------------обычная прокрутка-------------------------------*/
                /* текущая позиция слайдера */
                var leftDistance = $(this).css('left');

                /* если выбрано что прокрутка обычная и текущая позиция слайдера не равна сумме количества элементов и их ширине(последний слайд) */
                if ($type == false && leftDistance !== '-' + galleryWidth + 'px') {
                  /* активировать кнопку дальше*/
                  nextBtn.removeClass('disabled');
                }

                /* если выбрано что прокрутка обычная и текущая позиция слайдера не равна нулю(первый слайд) */
                if ($type == false && leftDistance !== 0) {
                  /* активировать кнопку назад */
                  prevBtn.removeClass('disabled');
                }

                /* 
                если выбрано что прокрутка обычная и 
                текущая позиция слайдера равна сумме количества элементов и 
                их ширине минус ширина одного слайда(последний слайд) 
                */
                if ($type == false && leftDistance == '-' + (galleryWidth - item.width()) + 'px') {
                  /* сделать кнопку дальше не активной */
                  $btn.addClass('disabled');

                  /* если выбрано что прокрутка обычная и текущая позиция слайдера равна нулю(первый слайд) */
                } else if ($type == false && leftDistance == '0px') {
                  /* сделать кнопку назад не активной */
                  $btn.addClass('disabled');
                }

                /*-------------------------------  бесконечная прокрутка  -----------------------*/
                /* если выбрано что прокрутка бесконечная */
                if ($type === true) {
                  /* кнопки вперед и назад активировать */
                  prevBtn.removeClass('disabled');
                  nextBtn.removeClass('disabled');
                }

                /* 
                если выбрано что прокрутка обычная и 
                текущая позиция слайдера равна сумме количества элементов и 
                их ширине минус ширина одного слайда(последний слайд) 
                */

                if ($type === true && gallery.css('left') == '-' + (galleryWidth - (item.width() * options.quantity)) + 'px') {
                  // if ($type === true && leftDistance == '-' + item.width*trueItemCount + 'px') {
                  /* меняем позицию слайдера на начало (минус один экран слайда) */
                  $(this).css('left', '-' + item.width() * options.quantity + 'px');
                  /* если выбрано что прокрутка обычная и текущая позиция слайдера равна нулю(первый слайд) */
                } else if ($type === true && leftDistance == '0px') {
                  /* меняем позицию слайдера в конец на последний элемен(реальный) */
                  $(this).css('left', -(galleryWidth - (item.width() * options.quantity * 2)));
                }


              }
            );
          }

          /* отменить все действия на нажатие */
          return false;
        });
      }

      /* -----------------------------------------------------thumbnail nav -----------------------------------------*/
      /* v 0.0.1  !!! использовать только с не бесконечной прокруткой */

      if (options.thumbnails == true) {
        /* создание галереи превьюшек копированием основной и обрамлением в див */
        gallery.clone().appendTo(wrapper).removeClass($(this).attr('class')).addClass(options.thmbWrp).wrapAll('<div class="thumbnails"/>');

        /* галерея превьюшек */
        var thumbnails = wrapper.children('.thumbnails'),
          /* элемент превью */
          thumbItem = thumbnails.find('li').width(thumbnails.width() / options.thumbnailsQuantity);


        /*-------------------добавление классов элементам по номеру. зачем еще не знаю -----------------------------------*/

        for (i = 0; i < item.length; i++) {

          /* добавление класса для первого элемента */
          if (i == 0) {
            thumbItem.eq(i).addClass('first');
          }
          /* добавление класса для остальных элементов */

          item.eq(i).addClass('slide-' + i);
          thumbItem.eq(i).addClass('thumbnail-' + i);

          /* добавление класса для последнего элемента */
          if (i == thumbItem.length - 1) {
            thumbItem.eq(i).addClass('last');
          }
        }

        /*------------------- конец добавление классов элементам. зачем еще не знаю -----------------------------------*/

        /*-------------------при нажатии на кнопку назад/вперед добавить классы превьюшкам -----------------------------------*/

        prevBtn.on('click', function() {
          /* проверить активна ли кнопка */
          if (!$(this).hasClass('disabled')) {

            /* убрать активный класс у всех превьюшек */
            thumbItem.removeClass('active');
            /*изменение переменной позиции слайдера на измененную после нажатия*/

            sliderPosition = gallery.position().left + item.width();
            /* задание номера слайда */
            var slideNum = sliderPosition / item.width();
            /* добавление активного класса превьюшке */
            thumbItem.eq(Math.abs(slideNum)).addClass('active');

          }
        })

        nextBtn.on('click', function() {
          /* проверить активна ли кнопка */
          if (!$(this).hasClass('disabled')) {

            /* убрать активный класс у всех превьюшек */
            thumbItem.removeClass('active');
            /*изменение переменной позиции слайдера на измененную после нажатия*/
            sliderPosition = gallery.position().left - item.width();
            /* задание номера слайда */
            var slideNum = sliderPosition / item.width();
            /* добавление активного класса превьюшке */
            thumbItem.eq(Math.abs(slideNum)).addClass('active');

          }
        })

        /*-------------------конец при нажатии на кнопку назад/вперед добавить классы превьюшкам -----------------------------------*/

        /*-------------------при нажатии на превьюшку добавить класс -----------------------------------*/

        thumbItem.on('click', function() {

          /* убрать активный класс у всех преьюшек*/
          thumbItem.removeClass('active');

          /* добавить активный класс для этой превьюшки*/
          $(this).addClass('active');

          /* активировать кнопки вперед/назад */
          prevBtn.removeClass('disabled');
          nextBtn.removeClass('disabled');

          /* сдвинуть галерею на нужную позицию. найти номер превьюшки и умножить на ширину слайда */
          gallery.animate({
            left: '-' + $(this).index() * item.width()
          })

          /*-------------------конец при нажатии на превьюшку добавить класс -----------------------------------*/

          /*-------------------если нажали на последнюю/первую превьюшку блокировать кнопку дальше/назад -----------------------------------*/

          /* если нажали на последнюю превьюшку сделать неактивной кнопку дальше */
          if ($(this).hasClass('last')) {

            nextBtn.addClass('disabled');
            /* если нажали на первую превьюшку сделать неактивной кнопку назад */
          } else if ($(this).hasClass('first')) {

            prevBtn.addClass('disabled');

          }
          /*-------------------конец если нажали на последнюю/первую превьюшку блокировать кнопку дальше/назад -----------------------------------*/

        })

      }
      /* -----------------------------------------------------конец thumbnail nav -----------------------------------------*/


      if (options.pager == true) {
        var pager = $('<div class="' + options.pagerWrp + '"/>').appendTo(wrapper);

        for (i = 0; i < item.length; i++) {
          $('<div class="page-' + i + '"/>').html(i + 1).appendTo(pager);
        }

        if (options.circular == false) {
          pager.children().on('click', function(event) {
            event.preventDefault();
            gallery.animate({
              left: '-' + item.width() * ($(this).html() - 1)
            })
          });
        }
      }
    };


    /* вернуть применение плагина для каждого элемента*/
    return this.each(make);
  };
})
(jQuery);