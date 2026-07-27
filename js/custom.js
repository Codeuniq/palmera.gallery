//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
// let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
// let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

// thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    // let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        // thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        // thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}



(function() {
  var $$ = function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return [].slice.call(elements);
  };

  

  function _fncSliderInit($slider, options) {
    var prefix = ".fnc-";
    $slider = $slider;
    var $slidesCont = $slider.querySelector(prefix + "slider__slides");
    var $slides = $$(prefix + "slide", $slider);
    var $controls = $$(prefix + "nav__control", $slider);
    var $controlsBgs = $$(prefix + "nav__bg", $slider);
    var $progressAS = $$(prefix + "nav__control-progress", $slider);
    var numOfSlides = $slides.length;
    var curSlide = 1;
    var sliding = false;
    var slidingAT =
      +parseFloat(getComputedStyle($slidesCont)["transition-duration"]) * 1000;
    var slidingDelay =
      +parseFloat(getComputedStyle($slidesCont)["transition-delay"]) * 1000;
    var autoSlidingActive = false;
    var autoSlidingTO;
    var autoSlidingDelay = 5000; // default autosliding delay value

    var autoSlidingBlocked = false;
    var $activeSlide;
    var $activeControlsBg;
    var $prevControl;

    function setIDs() {
      $slides.forEach(function($slide, index) {
        $slide.classList.add("fnc-slide-" + (index + 1));
      });
      $controls.forEach(function($control, index) {
        $control.setAttribute("data-slide", index + 1);
        $control.classList.add("fnc-nav__control-" + (index + 1));
      });
      $controlsBgs.forEach(function($bg, index) {
        $bg.classList.add("fnc-nav__bg-" + (index + 1));
      });
    }

    setIDs();

    function afterSlidingHandler() {
      $slider
        .querySelector(".m--previous-slide")
        .classList.remove("m--active-slide", "m--previous-slide");
      $slider
        .querySelector(".m--previous-nav-bg")
        .classList.remove("m--active-nav-bg", "m--previous-nav-bg");
      $activeSlide.classList.remove("m--before-sliding");
      $activeControlsBg.classList.remove("m--nav-bg-before");
      $prevControl.classList.remove("m--prev-control");
      $prevControl.classList.add("m--reset-progress");
      var triggerLayout = $prevControl.offsetTop;
      $prevControl.classList.remove("m--reset-progress");
      sliding = false;
      var layoutTrigger = $slider.offsetTop;

      if (autoSlidingActive && !autoSlidingBlocked) {
        setAutoslidingTO();
      }
    }

    function performSliding(slideID) {
      if (sliding) return;
      sliding = true;
      window.clearTimeout(autoSlidingTO);
      curSlide = slideID;
      $prevControl = $slider.querySelector(".m--active-control");
      $prevControl.classList.remove("m--active-control");
      $prevControl.classList.add("m--prev-control");
      $slider
        .querySelector(prefix + "nav__control-" + slideID)
        .classList.add("m--active-control");
      $activeSlide = $slider.querySelector(prefix + "slide-" + slideID);
      $activeControlsBg = $slider.querySelector(prefix + "nav__bg-" + slideID);
      $slider
        .querySelector(".m--active-slide")
        .classList.add("m--previous-slide");
      $slider
        .querySelector(".m--active-nav-bg")
        .classList.add("m--previous-nav-bg");
      $activeSlide.classList.add("m--before-sliding");
      $activeControlsBg.classList.add("m--nav-bg-before");
      var layoutTrigger = $activeSlide.offsetTop;
      $activeSlide.classList.add("m--active-slide");
      $activeControlsBg.classList.add("m--active-nav-bg");
      setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
    }
    

    function controlClickHandler() {
      if (sliding) return;
      if (this.classList.contains("m--active-control")) return;

      if (options.blockASafterClick) {
        autoSlidingBlocked = true;
        $slider.classList.add("m--autosliding-blocked");
      }

      var slideID = +this.getAttribute("data-slide");
      performSliding(slideID);
    }

    $controls.forEach(function($control) {
      $control.addEventListener("click", controlClickHandler);
    });

    function setAutoslidingTO() {
      window.clearTimeout(autoSlidingTO);
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 1;
      autoSlidingTO = setTimeout(function() {
        performSliding(curSlide);
      }, delay);
    }

    if (options.autoSliding || +options.autoSlidingDelay > 0) {
      if (options.autoSliding === false) return;
      autoSlidingActive = true;
      setAutoslidingTO();
      $slider.classList.add("m--with-autosliding");
      var triggerLayout = $slider.offsetTop;
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      delay += slidingDelay + slidingAT;
      $progressAS.forEach(function($progress) {
        $progress.style.transition = "transform " + delay / 1000 + "s";
      });
    }

    $slider
      .querySelector(".fnc-nav__control:first-child")
      .classList.add("m--active-control");
  }

  var fncSlider = function fncSlider(sliderSelector, options) {
    var $sliders = $$(sliderSelector);
    $sliders.forEach(function($slider) {
      _fncSliderInit($slider, options);
    });
  };

  window.fncSlider = fncSlider;
})();
/* not part of the slider scripts */

/* Slider initialization
options:
autoSliding - boolean
autoSlidingDelay - delay in ms. If audoSliding is on and no value provided, default value is 5000
blockASafterClick - boolean. If user clicked any sliding control, autosliding won't start again
*/


/* 1. Proloder */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

    

    // zoom image
    $(document).ready(function(){
	
	$(".zoom").mousemove(function(e){
		zoom(e);
	});

	function zoom(e){
		var x, y;
		var zoomer = e.currentTarget;
		if(e.offsetX) {
			offsetX = e.offsetX;
		} else {
			offsetX = e.touches[0].pageX;
		}

		if(e.offsetY) {
			offsetY = e.offsetY;
		} else {
			offsetX = e.touches[0].pageX;
		}
		x = offsetX/zoomer.offsetWidth*100;
		y = offsetY/zoomer.offsetHeight*100;
		zoomer.style.backgroundPosition = x+'% '+y+'%';
	}
});





let image = document.querySelectorAll(".floatimg");
let winScroll = 0;
let posNeg = 0;
let isScrolling;

// change speed (hight < 8 < low)
const speed = 8;

image.forEach((elm) => {
  window.addEventListener("scroll", function () {
    winScroll = window.scrollY;

    elm.style.transition = "none";
    elm.style.transform = `translateY(${0 + winScroll / speed}px)`;

    if (posNeg < winScroll) {
      console.log("+++++");
      setTimeout(() => {
        elm.style.transition = "500ms ease-in-out";
        elm.style.transform = `translateY(${0 + winScroll / (speed - 1)}px)`;
      }, 66);
    } else {
      console.log("----");
      setTimeout(() => {
        elm.style.transition = "500ms ease-in-out";
        elm.style.transform = `translateY(${0 + winScroll / (speed + 1)}px)`;
      }, 66);
    }

    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(function () {
      posNeg = winScroll;
    }, 66);
  });
});

 document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault(); // block right-click on images
  }
});

document.addEventListener('contextmenu', e => e.preventDefault()); // block right-click
document.addEventListener('dragstart', e => e.preventDefault());   // block drag

document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
    }
    
    // Ctrl + Shift + I (Windows/Linux) or Cmd + Option + I (Mac)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
    }

    // Ctrl + Shift + C (select element)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
    }

    // Ctrl + Shift + J (console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'j') {
        e.preventDefault();
    }

    // Ctrl + U (view source)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
    }
});

//CART SECTION
function openCart() {
	document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
	document.getElementById("cartModal").style.display = "none";
}

function removeItem(el) {
	el.closest(".cart-item").remove();
	updateTotal();
}


// Calculate total (static demo)
function updateTotal() {
	let items = document.querySelectorAll(".cart-item");
	let total = 0;
	items.forEach(item => {
		let price = parseFloat(item.querySelector(".item-info p").innerText.replace("$", ""));
		let qty = parseInt(item.querySelector(".qty span").innerText);
		total += price * qty;
	});
	document.getElementById("cartTotal").innerText = `$${total.toFixed(2)}`;
}

function getCart() {
	return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
	localStorage.setItem("cart", JSON.stringify(cart));
}

function open_cart_popup() {
	renderCart();
	document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
	document.getElementById("cartModal").style.display = "none";
}

function renderCart() {
	const cart = getCart();
	const container = document.querySelector(".cart-items");
	const totalEl = document.querySelector(".cart-footer .total strong");
	const checkoutBtn = document.getElementById("checkout");

	container.innerHTML = "";
	let total = 0;

	if (!cart.length) {
		container.innerHTML = "<p style='text-align:center'>Cart is empty</p>";
		totalEl.innerHTML = "0.00";
		checkoutBtn.style.pointerEvents = "none";  // ← disable
		checkoutBtn.style.opacity = "0.4";          // ← dim it
		return;
	}
	// Re-enable when cart has items
	checkoutBtn.style.pointerEvents = "auto";
	checkoutBtn.style.opacity = "1";

	cart.forEach((item, index) => {
		let item_total = item.price * item.qty;
		total += item_total;

		container.innerHTML += `
		<div class="cart-item">
			<div class="cart-gallery">
				<img src="${item.image}" class="main-img">
			</div>

			<div class="item-info">
				<h4>${item.name}</h4>
				<h5 style="color: #000;">Size : ${item.size}</h5>
				<div class="price-qty">
					<p class="price">
						<img src="images/aed.webp" style="height:15px;margin-top:-4px;padding-right:2px;">
						<span>${item.price.toFixed(2)}</span>
					</p>

					<div class="qty modern-qty">
						<button onclick="updateQty(${index}, -1)">-</button>
						<span class="qty-num">${item.qty}</span>
						<button onclick="updateQty(${index}, 1)">+</button>
					</div>
				</div>
			</div>

		  <span class="remove" onclick="removeItem(${index})">&times;</span>
		</div>
	  `;
	});

	totalEl.innerHTML = `
	  <img src="images/aed.webp" style="height:12px;margin-top:-4px;padding-right:2px;">
	  ${total.toFixed(2)}
	`;

	document.getElementById("checkout").onclick = function (e) {
		e.preventDefault();
		openCustomerPopup();
	};
}

function updateQty(index, change) {
	let cart = getCart();
	cart[index].qty += change;

	if (cart[index].qty <= 0) {
		cart.splice(index, 1);
	}

	saveCart(cart);
	updateCartCount();
	renderCart();
}

function removeItem(index) {
	let cart = getCart();
	cart.splice(index, 1);
	saveCart(cart);
	updateCartCount();
	renderCart();
}

function updateCartCount() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const cartCountEl1 = document.getElementById("cartCount1");
	const cartCountEl2 = document.getElementById("cartCount2");

	const totalQty = cart.length;

	if (totalQty > 0) {
		cartCountEl1.textContent = totalQty;
		cartCountEl2.textContent = totalQty;
		cartCountEl1.style.display = "flex";
		cartCountEl2.style.display = "flex";
	} else {
		cartCountEl1.style.display = "none";
		cartCountEl2.style.display = "none";
	}
}

function openCustomerPopup() {
	document.getElementById("customerPopup").style.display = "flex";

	const saved = JSON.parse(localStorage.getItem("customerDetails") || "{}");

	if (saved) {
		document.getElementById("custFirstName").value = saved.firstName || "";
		document.getElementById("custLastName").value = saved.lastName || "";
		document.getElementById("custMobile").value = saved.mobile || "";
		document.getElementById("custAddress").value = saved.address || "";
		document.getElementById("custApartment").value = saved.apartment || "";
		document.getElementById("custCity").value = saved.city || "";

		if (saved.emirate) {
			document.getElementById("custEmirate").value = saved.emirate;
		}

		// auto-check checkbox if data exists
		document.getElementById("saveInfo").checked = true;
	}
}

function closeCustomerPopup() {
	document.getElementById("customerPopup").style.display = "none";
}

function submitCustomerDetails() {
	const firstName = document.getElementById("custFirstName").value.trim();
	const lastName = document.getElementById("custLastName").value.trim();
	const mobile = document.getElementById("custMobile").value.trim();
	const address = document.getElementById("custAddress").value.trim();
	const apartment = document.getElementById("custApartment").value.trim();
	const emirate = document.getElementById("custEmirate").value;
	const city = document.getElementById("custCity").value;
	const post = document.getElementById("custPost").value.trim();

	if (!firstName || !mobile || !address || !city) {
		showToast("Please fill required fields", "error");
		return;
	}
	const saveInfo = document.getElementById("saveInfo").checked;

	if (saveInfo) {
		const customerData = {
			firstName,
			lastName,
			mobile,
			address,
			apartment,
			post,
			emirate,
			city
		};

		localStorage.setItem("customerDetails", JSON.stringify(customerData));
	} else {
		localStorage.removeItem("customerDetails"); // optional cleanup
	}

	const fullName = `${firstName} ${lastName}`;

	const fullAddress = `Address: ${address}\nAppartment: ${apartment}\nCity: ${city}\nPost Code: ${post}\nEmirate : ${emirate}`.trim();

	let cart = getCart();
	let total = 0;
	let whatsappText = "I'd like to place an order:\n\n*Order Summary*\n";

	cart.forEach(item => {
		let item_total = item.price * item.qty;
		total += item_total;

		whatsappText += `*${item.id}* - *${item.name}* (Size:${item.size}) x ${item.qty} - ${item_total.toFixed(2)} AED\n`;
	});

	whatsappText += `\nTotal: ${total.toFixed(2)} AED\n`;

	whatsappText += `\n--------------------\n`;
	whatsappText += `\n*Customer Information*\n\n`;
	whatsappText += `Name: ${fullName}\n`;
	whatsappText += `Mobile: ${mobile}\n`;
	whatsappText += `\n*Delivery Address*\n`;
	whatsappText += `\n${fullAddress}\n`;

	const finalUrl = `https://wa.me/971507135589?text=${encodeURIComponent(whatsappText)}`;

	// window.location.href = finalUrl;
	window.open(finalUrl, '_blank');
}

$(document).ready(function() {
	$('#custCountry').select2({
		placeholder: "Search your country",
		allowClear: true
	});
});

const country = document.getElementById("custCountry");
const emirate = document.getElementById("custEmirate");

function toggleEmirate() {
	if (country.value === "United Arab Emirates") {
		emirate.disabled = false;
	} else {
		emirate.disabled = true;
		emirate.selectedIndex = 0;
	}
}

country.addEventListener("change", function () {
	toggleEmirate();
});

toggleEmirate(); // Initial check on page load
