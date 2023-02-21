

gsap.registerPlugin(ScrollTrigger);

let $body,
	windowHeight,
	windowWidth,
	degree = 0.0174532925,
	mediaPoint1 = 1024,
	mediaPoint2 = 768,
	mediaPoint3 = 480,
	mediaPoint4 = 320,
	devStatus = window.productionStatus === 'development';
	const win = document.body

$(document).ready(function ($) {
	$body = $('body');
	if(devStatus) {
		pageWidget(['index']);
		pageWidget(['page-contacts']);
		pageWidget(['page-reviews']);
		pageWidget(['policy']);
		pageWidget(['page-work-single']);
		pageWidget(['page-work']);
		pageWidget(['single-service']);
		getAllClasses('html', '.elements_list');
	}
});

$(window).on('load', function () {
	updateSizes();
	loadFunc();
	sliderInitSingle();
	modal();
	upLinkScroll();
	testSucces();

	if(windowWidth > mediaPoint1) {
		scrollAnimation();
	}
});

$(window).on('resize', function () {
	resizeFunc();
});

$(window).on('scroll', function () {
	scrollFunc();
});

function loadFunc() {
	calcViewportHeight();
}

function resizeFunc() {
	updateSizes();

	calcViewportHeight();
}

function scrollFunc() {}

function calcViewportHeight() {
	if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');
	}
}

function updateSizes() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
}

if ('objectFit' in document.documentElement.style === false) {
	document.addEventListener('DOMContentLoaded', function () {
		Array.prototype.forEach.call(
			document.querySelectorAll('img[data-object-fit]'),
			function (image) {
				(image.runtimeStyle || image.style).background =
					'url("' +
					image.src +
					'") no-repeat 50%/' +
					(image.currentStyle
						? image.currentStyle['object-fit']
						: image.getAttribute('data-object-fit'));

				image.src =
					"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" +
					image.width +
					"' height='" +
					image.height +
					"'%3E%3C/svg%3E";
			}
		);
	});
}

function succes(success) {
	$(success).toggleClass('active');
		setTimeout(function() {
			$(success).removeClass('active')
		}, 3000)
}

function failed(failed) {
	$(failed).toggleClass('active');
		setTimeout(function() {
			$(failed).removeClass('active')
		}, 3000)
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

var styles = ['color: red', 'background: black'].join(';');
var message = 'Developed by KotoFeelGood Arkada-Studio https://arkada-web.ru/';
console.info('%c%s', styles, message);



$(document).ready(function() {
	const btns = document.querySelectorAll('.btn')

	btns.forEach(el => {
			el.addEventListener('click', function(e) {
					let
							size = Math.max(this.offsetWidth, this.offsetHeight),
							x = e.offsetX - size / 2,
							y = e.offsetY - size / 2,
							wave = this.querySelector('.wave')
	
					// Create an element if it doesn't exist
					if (!wave) {
							wave = document.createElement('span')
							wave.className = 'wave'
					}
					wave.style.cssText = `width:${size}px;height:${size}px;top:${y}px;left:${x}px`
					this.appendChild(wave)
			})
	})
})






function scrollAnimation(bottom = false, start = "-=30% center", end = 'bottom') {
	const animationBlock = Array.from(document.querySelectorAll('.animationBlock')).map((el) => {
		const animationEl = Array.from(el.querySelectorAll('.animationEl')).map(function(item, index) {
			const tl = gsap.timeline();

			ScrollTrigger.create({
				animation: tl,
				trigger: el,
				start: start,
				end: end,
				ease: 'none',
			})
			tl.fromTo(item, {
				y: 100, 
				duration: .4,
				autoAlpha: 0,
			}, {
				y: 0,
				autoAlpha: 1,
				delay: 0.1 + (0.1 * index),
			});
		})
	})
}










$(document).ready(function()  {

	var inputsTel = document.querySelectorAll('input[type="tel"]');
	Inputmask({
		"mask": "+7 (999) 999-99-99",
		showMaskOnHover: false
	}).mask(inputsTel);
})



async function maps(street, city, size) {

	function init() {
		const geocoder = ymaps.geocode(`${street} ${city}`);
		geocoder.then(
			async function (res) {
				var myMapMobile = await new ymaps.Map('map', {
						center: res.geoObjects.get(0).geometry.getCoordinates(),
						zoom: 16,
					}, {
						searchControlProvider: 'yandex#search'
					}),
					myPlacemark = new ymaps.Placemark(myMapMobile.getCenter(), {
						balloonContent: `${street} ${city}`
					}, {
						iconLayout: 'default#image',
						iconImageHref: '/i/global/map.svg',
						iconImageSize: size,
						iconImageOffset: [-5, -38]
					});

				myMapMobile.geoObjects
					.add(myPlacemark)
				myMapMobile.behaviors.disable('scrollZoom')
			}
		);
	}
	await ymaps.ready(init);

}



function sliderInitSingle() {
	var galleryThumbs = new Swiper(".slider_thumb", {
		spaceBetween: 5,
		loopedSlides: 6,
		loop: true,
		freemode: true,
		slideToClickedSlide: true,
		navigation: {
			prevEl: '.workThumbs_prev',
			nextEl: '.workThumbs_next'
		},
		breakpoints: {
			320: {
				direction: "horizontal",
				slidesPerView: 5
			},
			768: {
				direction: "vertical",
				slidesPerView: 6
			},
			1200: {
				direction: "vertical",
				slidesPerView: 6
			}
		},
	});
	var galleryTop = new Swiper(".slider_main", {
		direction: "horizontal",
		spaceBetween: 10,
		loopedSlides: 6, 
		loop: true,
		observer: true,
		keyboard: {
			enabled: true,
		},
	});

	galleryTop.controller.control = galleryThumbs;
	galleryThumbs.controller.control = galleryTop;

	
}

function accordion(title, content) {
	// hide all content	
	let accordionTitle = $(title),
		accordionContent = $(content);
	$(accordionContent).hide();
	
	$(accordionTitle).on('click', function () {
		let $this = $(this);
		$this.parent().toggleClass('active_mod').siblings().removeClass('active_mod');
		$(accordionContent).slideUp();

		if (!$this.next().is(":visible")) {
			$this.next().slideDown();
		}
	});
};

accordion('.price_item_head', '.price_item_body');

function succes(success) {
	$(success).toggleClass('active');
		setTimeout(function() {
			$(success).removeClass('active')
		}, 3000)
}

function failed(failed) {
	$(failed).toggleClass('active');
		setTimeout(function() {
			$(failed).removeClass('active')
		}, 3000)
}



function modal() {
	let popup = document.querySelectorAll('.popup')
	let btnArray = document.querySelectorAll('.trigger')
	
	btnArray.forEach((el) => {
		el.addEventListener('click', function(e) {
			e.preventDefault();
			let path = e.currentTarget.dataset.target
			
			popup.forEach((el) => {
				isRemove(el)
				if(el.dataset.id == path) {
					isOpen(el)
				}
			})
			
		})
	})
	

	popup.forEach((pop) => {
		let remove = pop.querySelectorAll('.remove')
		remove.forEach(el => {
			el.addEventListener('click', (e) => {
				isRemove(pop);
			})
		});
	})
}



function isOpen(popup) {
	document.body.classList.add('fixed')
	popup.classList.add('active')
}

function isRemove(popup) {
	popup.classList.remove('active')
	document.body.classList.remove('fixed')
}



// tabs
function tabs(link, block) {
	let linkSelector = $(link),
		blockSelector = $(block);

	$(linkSelector).on('click', function (e) {
		e.preventDefault();

		let $this = $(this),
			currentData = $(this).data('tab');

		$(blockSelector).removeClass('active_tab');
		$(linkSelector).removeClass('active_tab');

		$(block + '[data-tab="' + currentData + '"]').addClass('active_tab');
		$this.addClass('active_tab');

	});
}

tabs('.hero_tab_link', '.hero_tab_content');

function upLinkScroll() {

	// считываем кнопку
	const goTopBtn = document.querySelector(".upLink");

	
	// обработчик на скролл окна
	window.addEventListener("scroll", trackScroll);
	// обработчик на нажатии
	goTopBtn.addEventListener("click", goTop);
	
	function trackScroll() {
		// вычисляем положение от верхушки страницы
		const scrolled = window.pageYOffset;
		// считаем высоту окна браузера
		const coords = document.documentElement.clientHeight;
		// если вышли за пределы первого окна
		if (scrolled > coords) {
			// кнопка появляется
			goTopBtn.classList.add("active");
		} else {
			// иначе исчезает
			goTopBtn.classList.remove("active");
		}
	}
	
	function goTop() {
		console.log('good')
		// пока не вернулись в начало страницы
		if (window.pageYOffset > 0) {
			// скроллим наверх
			window.scrollBy(0, -40); // второй аргумент - скорость
			setTimeout(goTop, 0); // входим в рекурсию
		}
	}
}

function testSucces() {
	const inputTypeSubmit = document.querySelectorAll('input[type="submit"]')
	const currentPopup = document.querySelectorAll('.popup')

Array.from(inputTypeSubmit).map((el) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();
		currentPopup.forEach(item => {
			isRemove(item)
		});
		succes('.success')
	})
})
}














































