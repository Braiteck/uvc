$(function(){
	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Ленивая загрузка
	setTimeout(function(){
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: function(el) {
				el.classList.add('loaded')
			}
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() +'px')


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')

	// Кастомный select
	$('select').niceSelect()

	// Выбор файла
	$('body').on('change', '.form input[type=file]', function(e) {
		$(this).closest('.line').find('label').text($(this).val())
	})


	// Аккордион
	$('.accordion .item .head').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.item')
		let accordion = $(this).closest('.accordion')

		if (parent.hasClass('active')) {
			parent.removeClass('active')
			parent.find('.data').slideUp(300)
		} else {
			accordion.find('.item').removeClass('active')
			accordion.find('.data').slideUp(300)

			parent.addClass('active')
			parent.find('.data').slideDown(300)
		}
	})


	// Мини всплывающие окна
	firstClick = false

	$('.mini_modal_link').click(function(e) {
		e.preventDefault()

		let modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			firstClick = false

			if (is_touch_device()) {
				$('body').css('cursor', 'default')
			}
		} else {
			$('.mini_modal_link').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			firstClick = true

			if (is_touch_device()) {
				$('body').css('cursor', 'pointer')
			}
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(function(e) {
		if (!firstClick && $(e.target).closest('.mini_modal').length == 0) {
			$('.mini_modal, .mini_modal_link').removeClass('active')

			if (is_touch_device()) {
				$('body').css('cursor', 'default')
			}
		}

		firstClick = false
	})

	// Закрываем всплывашку при клике на крестик во всплывашке
	$('body').on('click', '.mini_modal .close', function(e) {
		e.preventDefault()

		$('.mini_modal, .mini_modal_link').removeClass('active')

		if (is_touch_device()) {
			$('body').css('cursor', 'default')
		}

		firstClick = false
	})


	// Моб. версия
	if( $(window).width() < 360 ){
		$('meta[name=viewport]').attr('content', 'width=360px, user-scalable=no, minimum-scale=1, maximum-scale=1')
	} else {
		$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
	}


	// Моб. меню
	$('.mob_header .mob_menu_link').click(function(e) {
		e.preventDefault()

		$(this).addClass('active')
		$('body').addClass('menu_open')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header > .close, .overlay').click(function(e) {
		e.preventDefault()

		$('.mob_header .mob_menu_link').removeClass('active')
		$('body').removeClass('menu_open')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
	})


    if (is_touch_device()) {
		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', function(e) {
			ts = e.originalEvent.touches[0].clientX
		})

		$('body').on('touchend', function(e) {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('.mob_header .mob_menu_link').removeClass('active')
				$('body').removeClass('menu_open')
				$('header').removeClass('show')
				$('.overlay').fadeOut(300)
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})



// Вспомогательные функции
function setHeight(className){
    let maxheight = 0

    className.each(function() {
    	let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
        	maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}


function is_touch_device() {
	return !!('ontouchstart' in window)
}


function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}