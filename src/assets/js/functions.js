/* ==============================================
	Preload
=============================================== */
$(window).on('load', function () { // makes sure the whole site is loaded
		'use strict';
		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(350).css({
			'overflow': 'visible'
		});
	})

/* ==============================================
	Sticky nav
=============================================== */
$(window).on('resize', function () {
	'use strict';
	// This will fire each time the window is resized:
	if ($(window).width() >= 1024) {
		// if larger or equal
		$("header").headroom({
			"offset": 150,
			"tolerance": 5,
			"classes": {
				"initial": "animated",
				"pinned": "swingInX",
				"unpinned": "swingOutX"
			}
		});
	} else {
		// if smaller
		$('header').removeClass("animated");
	}
}).resize();

/* ==============================================
	Common
=============================================== */
//Tooltip		
$('.tooltip-1').tooltip({
	html: true
});

//Accordion	
function toggleChevron(e) {
	'use strict';
	$(e.target)
		.prev('.panel-heading')
		.find("i.indicator")
		.toggleClass('icon_plus_alt2 icon_minus_alt2');
}
$('#accordion').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);

//Footer reveal
$('footer').footerReveal({
	shadow: true,
	zIndex: -101
});

/* ==============================================
	Video modal dialog + Parallax + Scroll to top + Incrementer
=============================================== */
$(function () {
	'use strict';
	$('.video').magnificPopup({
		type: 'iframe'
	});//Video modal
	
	//Gallery images modal
	$('.magnific-gallery').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	});

	//Hamburger icon
	var toggles = document.querySelectorAll(".cmn-toggle-switch");
	for (var i = toggles.length - 1; i >= 0; i--) {
		var toggle = toggles[i];
		toggleHandler(toggle);
	};

	function toggleHandler(toggle) {
		toggle.addEventListener("click", function (e) {
			e.preventDefault();
			(this.classList.contains("active") === true) ? this.classList.remove("active"): this.classList.add("active");
		});
	};

	//Scroll to top
	$(window).on('scroll', function () {
		'use strict';
		if ($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});
});

/* ==============================================
	Carousel
=============================================== */
$('.carousel_testimonials').owlCarousel({
	items: 1,
	loop: true,
	autoplay: false,
	animateIn: 'flipInX',
	margin: 30,
	stagePadding: 30,
	smartSpeed: 450,
	responsiveClass: true,
	responsive: {
		600: {
			items: 1
		},
		1000: {
			items: 1,
			nav: false
		}
	}
});