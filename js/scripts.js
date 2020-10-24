$(() => {
	// Основной слайдер на главной
	$('.first_section .slider').owlCarousel({
		items: 1,
		margin: 0,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000,
		onTranslate: (event) => {
			$(event.target).trigger('stop.owl.autoplay')
		},
		onTranslated: (event) => {
			$(event.target).trigger('play.owl.autoplay', [4250, 0])
		},
		responsive: {
			0: {
				nav: false,
				dots: true
			},
			1024: {
				nav: true,
				dots: false
			}
		}
	})


	// Календарь - залипание блока
	$('.your_order_fixed').scrollFix({
		side: 'bottom'
	})


	// Календарь - покупка билета
	$('body').on('click', '.calendar_buy .event .add label', function () {
		let parent = $(this).closest('.add'),
			available = parseInt($(this).find('.available span').text()),
			inputVal = parseInt(parent.find('.amount .input').val())

		if (inputVal > available) {
			parent.find('.amount .input').addClass('error')
			parent.find('.amount .maximum_error_text span').text(available)
			parent.find('.amount .maximum_error_text').fadeIn(300)
		} else {
			parent.find('.amount .input').removeClass('error')
			parent.find('.amount .maximum_error_text').fadeOut(200)
		}
	})

	$('body').on('keydown', '.calendar_buy .event .add .amount .input', function () {
		let parent = $(this).closest('.add'),
			available = parseInt(parent.find('.type input:checked + label .available span').text()),
			input = $(this)

		setTimeout(() => {
			let inputVal = parseInt(input.val())

			if (inputVal > available) {
				input.addClass('error')
				parent.find('.amount .maximum_error_text span').text(available)
				parent.find('.amount .maximum_error_text').fadeIn(300)
			} else {
				input.removeClass('error')
				parent.find('.amount .maximum_error_text').fadeOut(200)
			}
		})
	})


	// Календарь - выбор даты
	$('.calendar .days .day').click(function (e) {
		e.preventDefault()

		// открытие либо повторный клик
		if (!$(this).hasClass('open') && $(this).find('.event.green').length) {
			// Закрытие предыдущей открытой даты
			$('.calendar .days .day').removeClass('open')

			$('.calendar .days .calendar_buy').slideUp(200, () => {
				$('.calendar .days .calendar_buy').remove()
			})

			// Открытие новой даты
			setTimeout(() => {
				// Получение данных (запрос на сервер)
				$.ajax({
					url: 'calendar_buy_template.html',
					cache: false,
					dataType: 'html',
					type: "post",
					success: (html) => {
						// Успешное выполнение запроса
						$(this).addClass('open')

						// Высчитываем позицию
						// Колво дней в строке
						let daysInLine = parseInt($(this).css('--calendar_days_in_line'))

						// Индекс нажатой даты
						let currentIndex = parseInt($(this).index() + 1)

						// Индекс даты после которой должен вставляться контент
						let appendIndex

						((currentIndex % daysInLine) == 0)
							? appendIndex = currentIndex - 1
							: appendIndex = currentIndex - 1 + (daysInLine - (currentIndex % daysInLine))

						// Вставкаи показ html
						$('.calendar .days > *').eq(appendIndex).after(html)
						$('.calendar .days .calendar_buy').slideDown(300)

						// Плавная прокрутка к новой дате
						$('html, body').stop().animate({ scrollTop: $(this).offset().top - $('.mob_header').outerHeight() }, 500)

						// Кастомный select
						$('.calendar .days .calendar_buy select').niceSelect()
					}
				})
			}, 300)
		} else {
			// Закрытие открытой даты
			$('.calendar .days .day').removeClass('open')

			$('.calendar .days .calendar_buy').slideUp(200, () => {
				$('.calendar .days .calendar_buy').remove()
			})
		}
	})
})