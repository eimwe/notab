import '../styles/slider.less';

//пагинатор для каруселей на первом экране
function startOwlCarousel(dots, slides) {
  for (let cnt = 0; cnt < dots.length; cnt++) {
    dots[cnt].addEventListener('click', function() {
      let currentDot = this;
      for (let itr = 0; itr < dots.length; itr++) {
        if (currentDot !== dots[itr]) {
          dots[itr].classList.remove('active');
          slides[itr].classList.remove('active');
        } else {
          currentDot.classList.add('active');
          slides[itr].classList.add('active');
        }
      }
    });
  }
}
//

//запуск каруселей слева-направо ('>') на первом экране
function showNextSlide(slideScope, dotScope) {
  let currentSlide, currentDot;
  for (let slideCounter = 0; slideCounter < slideScope.length; slideCounter++) {
    if(slideScope[slideCounter].classList.contains('active')) {
      currentSlide = slideScope[slideCounter];
    }
  }

  for (let dotCounter = 0; dotCounter < dotScope.length; dotCounter++) {
    if(dotScope[dotCounter].classList.contains('active')) {
      currentDot = dotScope[dotCounter];
    }
  }

  if (currentSlide.nextElementSibling) {
    currentSlide.classList.remove('active');
    currentSlide.nextElementSibling.classList.add('active');
  } else {
    currentSlide.parentElement.firstElementChild.classList.add('active');
    currentSlide.parentElement.lastElementChild.classList.remove('active');
  }
  
  if (currentDot.nextElementSibling) {
    currentDot.classList.remove('active');
    currentDot.nextElementSibling.classList.add('active');
  } else {
    currentDot.parentElement.firstElementChild.classList.add('active');
    currentDot.parentElement.lastElementChild.classList.remove('active');
  }
}
//

//запуск каруселей справа-налево ('<') на первом экране
function showPrevSlide(slideScope, dotScope) {
  let currentSlide, currentDot;
  for (let slideCounter = 0; slideCounter < slideScope.length; slideCounter++) {
    if(slideScope[slideCounter].classList.contains('active')) {
      currentSlide = slideScope[slideCounter];
    }
  }

  for (let dotCounter = 0; dotCounter < dotScope.length; dotCounter++) {
    if(dotScope[dotCounter].classList.contains('active')) {
      currentDot = dotScope[dotCounter];
    }
  }

  if (currentSlide.previousElementSibling) {
    currentSlide.classList.remove('active');
    currentSlide.previousElementSibling.classList.add('active');
  } else {
    currentSlide.parentElement.lastElementChild.classList.add('active');
    currentSlide.parentElement.firstElementChild.classList.remove('active');
  }

  if (currentDot.previousElementSibling) {
    currentDot.classList.remove('active');
    currentDot.previousElementSibling.classList.add('active');
  } else {
    currentDot.parentElement.lastElementChild.classList.add('active');
    currentDot.parentElement.firstElementChild.classList.remove('active');
  }
}
//

//получение контролов (кнопок '<'/'>' и элементов пагинатора) каждой карусели
let bannerDots = document.querySelectorAll('.hero__banner .indicator'),
    bannerSlides = document.querySelectorAll('.hero__banner .gallery__item'),
    bannerControls = document.querySelectorAll('.hero__banner .slideshow__control');
//

//передача полученных контролов в качестве параметров для функций, управляющих каруселями
//через пагинатор:
startOwlCarousel(bannerDots, bannerSlides); //карусель '.hero__banner'
//

//через кнопки '<'/'>':
//карусель '.hero__banner':
for(let ind = 0; ind < bannerControls.length; ind++) {
  bannerControls[ind].addEventListener('click', function(){
    if(bannerControls[ind].classList.contains('next-slide')) {
      showNextSlide(bannerSlides, bannerDots);
    } else {
      showPrevSlide(bannerSlides, bannerDots);
    }
  });
}
//