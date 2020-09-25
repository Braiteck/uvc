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
})