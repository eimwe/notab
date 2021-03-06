/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/slider.less":
/*!********************************!*\
  !*** ./src/styles/slider.less ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/scripts/slider.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_slider_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/slider.less */ "./src/styles/slider.less");


/**
*????????????????????:
1.?????????????????????????? ????????????????
 1.1 ?????????????????? DOM ??????????????????, ?????????????????????? ?????? ??????????????????????????
 1.2 ??????????????????????????:
   1.2.1 ???????????????? ????????????????????
   1.2.2 ???????????????????????????????? ??????????????
2.?????????????? ?????????????????? ???????????????? ??????????????????:
  2.1 ?????????????????? ?????????????????? ?????????????????? ???????????????????? ???? DOM
  2.2 ?????????????????? ?????????????????? ????????????
  2.3 ?????????????????? ?????????????????? ????????????????????
3.?????????????? ???????????????????? ?????????????????? ?? ?????????????? ????????????????????
4.?????????????? ???????????????????? ?????????????????? ?? ?????????????? ???????????? ??????????????????:
  4.1 ?????????????? ?????? ???????????? '????????????'
  4.2 ?????????????? ?????? ???????????? '??????????'
5.???????????? ????????????????:
  5.1 ???????????? ?????????????? ?????? ????????????????????
  5.2 ???????????????????? ???????????????????? ?????????????? ?????? ???????????? ??????????????????
*/

/**1.?????????????????????????? ???????????????? -->*/
//1.1 ?????????????????? DOM ??????????????????, ?????????????????????? ?????? ??????????????????????????
let sliderWrapper = document.querySelector('.slideshow__wrapper'),
    bannerSlides = document.querySelectorAll('.gallery__item'),
    sliderWidth = sliderWrapper.offsetWidth,
    prevButton = document.querySelector('.prev-slide'),
    nextButton = document.querySelector('.next-slide'),
    id = null;
//

//1.2 ??????????????????????????
(function(){
  //1.2.1 ???????????????? ????????????????????
  let ulNode = document.createElement('UL');
  ulNode.classList.add('slideshow__indicators');

  for (let slideItr = 0; slideItr < bannerSlides.length; slideItr++) {
    let liNode = document.createElement('LI');
    let liTextNode = document.createTextNode(slideItr + 1);
    liNode.appendChild(liTextNode);
    liNode.classList.add('indicator');
    ulNode.appendChild(liNode);
  }
  
  ulNode.firstChild.classList.add('active');
  sliderWrapper.appendChild(ulNode);
  //

  //1.2.2 ???????????????????????????????? ??????????????
  for (let slideIndex = 0; slideIndex < bannerSlides.length; slideIndex++) {
    if(bannerSlides[slideIndex].classList.contains('active')) {
      bannerSlides[slideIndex].style.left = 0;
    } else {
      bannerSlides[slideIndex].style.left = sliderWidth + 'px';
    }
  }
  //
})();
/**<-- */


/**2.?????????????? ?????????????????? ???????????????? ?????????????????? -->*/
//2.1 ?????????????????? ?????????????????? ?????????????????? ???????????????????? ???? DOM
let bannerDots = document.querySelectorAll('.indicator');
//

//2.2 ?????????????????? ?????????????????? ????????????
function findActiveSlide(slideScope) {
  let currentSlide;
  for (let slideCounter = 0; slideCounter < slideScope.length; slideCounter++) {
    if(slideScope[slideCounter].classList.contains('active')) {
      currentSlide = slideScope[slideCounter];
    }
  }
  return currentSlide;
}
//

//2.3 ?????????????????? ?????????????????? ????????????????????
function findActiveDot(dotScope) {
  let currentDot;
  for (let dotCounter = 0; dotCounter < dotScope.length; dotCounter++) {
    if(dotScope[dotCounter].classList.contains('active')) {
      currentDot = dotScope[dotCounter];
    }
  }
  return currentDot;
}
//
/**<-- */


/**3.?????????????? ???????????????????? ?????????????????? ?? ?????????????? ???????????????????? -->*/
function animateOwls(dots, slides) {
  for(let ind = 0; ind < slides.length; ind++) {
    for(let int = 0; int < dots.length; int++) {
      dots[int].addEventListener('click', function(){
        if(int == ind) {
          let position = sliderWidth,
              currentSlide = findActiveSlide(slides),
              currentDot = findActiveDot(dots),
              clickedtDot = this;
          clearInterval(id);
          id = setInterval(function () {
            for (var i = 0; i < 1000; i++) {
              if(clickedtDot == currentDot) {
                return;
              } else {
                if(position == 0) {
                  clearInterval(id);
                } else {
                  currentDot.classList.remove('active');
                  clickedtDot.classList.add('active');
                  currentSlide.style.left = sliderWidth + 'px';
                  currentSlide.classList.remove('active');
                  position--;
                  slides[ind].style.left = position + 'px';
                  slides[ind].classList.add('active');
                }
              }
            }
          }, 150);
        }
      });
    }
  }
}
/**<-- */


/**4.?????????????? ???????????????????? ?????????????????? ?? ?????????????? ???????????? ?????????????????? -->*/
//4.1 ?????????????? ?????? ???????????? '????????????'
function animateNextSlide() {
  let position = sliderWidth,
      currentSlide = findActiveSlide(bannerSlides),
      currentDot = findActiveDot(bannerDots);
  clearInterval(id);
  nextButton.disabled = false;
  id = setInterval(function () {
    for (var i = 0; i < 1000; i++) {
      if (position == 0) {
        clearInterval(id);
        nextButton.disabled = false;
      } else {
        if (currentSlide.nextElementSibling) {
          currentSlide.classList.remove('active');
          currentSlide.nextElementSibling.classList.add('active');
          currentSlide.style.left = sliderWidth + 'px';
          nextButton.disabled = true;
          position--;
          currentSlide.nextElementSibling.style.left = position + 'px';
        } else {
          currentSlide.parentElement.firstElementChild.classList.add('active');
          currentSlide.parentElement.lastElementChild.classList.remove('active');
          nextButton.disabled = true;
          position--;
          currentSlide.parentElement.firstElementChild.style.left = position + 'px';
          currentSlide.parentElement.lastElementChild.style.left = sliderWidth + 'px';
        }
        if (currentDot.nextElementSibling) {
          currentDot.classList.remove('active');
          currentDot.nextElementSibling.classList.add('active');
        } else {
          currentDot.parentElement.firstElementChild.classList.add('active');
          currentDot.parentElement.lastElementChild.classList.remove('active');
        }
      }
    }
  }, 150);
}
//

//4.2 ?????????????? ?????? ???????????? '??????????'
function animatePrevSlide() {
  let position = sliderWidth,
      currentSlide = findActiveSlide(bannerSlides),
      currentDot = findActiveDot(bannerDots);
  clearInterval(id);
  prevButton.disabled = false;
  id = setInterval(function () {
    for (var i = 0; i < 1000; i++) {
      if (position == 0) {
        clearInterval(id);
        prevButton.disabled = false;
      } else {
        if (currentSlide.previousElementSibling) {
          currentSlide.classList.remove('active');
          currentSlide.previousElementSibling.classList.add('active');
          currentSlide.style.left = sliderWidth + 'px';
          prevButton.disabled = true;
          position--;
          currentSlide.previousElementSibling.style.left = position + 'px';
        } else {
          currentSlide.parentElement.lastElementChild.classList.add('active');
          currentSlide.parentElement.firstElementChild.classList.remove('active');
          prevButton.disabled = true;
          position--;
          currentSlide.parentElement.lastElementChild.style.left = position + 'px';
          currentSlide.parentElement.firstElementChild.style.left = sliderWidth + 'px';
        }
        if (currentDot.previousElementSibling) {
          currentDot.classList.remove('active');
          currentDot.previousElementSibling.classList.add('active');
        } else {
          currentDot.parentElement.lastElementChild.classList.add('active');
          currentDot.parentElement.firstElementChild.classList.remove('active');
        }
      }
    }
  }, 150);
}
//
/**<-- */


/**5.???????????? ???????????????? -->*/
//5.1 ???????????? ?????????????? ?????? ????????????????????
animateOwls(bannerDots, bannerSlides);
//

//5.2 ???????????????????? ???????????????????? ?????????????? ?????? ???????????? ??????????????????
nextButton.addEventListener('click', animateNextSlide);
prevButton.addEventListener('click', animatePrevSlide);
//
/**<-- */
})();

/******/ })()
;
//# sourceMappingURL=slider.js.map