import '../styles/slider.less';

/**
*Содержание:
1.Инициализация слайдера
 1.1 Получение DOM элементов, необходимых для инициализации
 1.2 Инициализация:
   1.2.1 Создание пагинатора
   1.2.2 Позиционирование слайдов
2.Функция получения активных элементов:
  2.1 Получение созданных элементов пагинатора из DOM
  2.2 Получение активного слайда
  2.3 Получение активного пагинатора
3.Функция управления слайдером с помощью пагинатора
4.Функции управления слайдером с помощью кнопок навигации:
  4.1 Функция для кнопки 'Вперед'
  4.2 Функция для кнопки 'Назад'
5.Запуск слайдера:
  5.1 Запуск функции для пагинатора
  5.2 Добавление слушателей событий для кнопок навигации
*/

/**1.Инициализация слайдера -->*/
//1.1 Получение DOM элементов, необходимых для инициализации
let sliderWrapper = document.querySelector('.slideshow__wrapper'),
    bannerSlides = document.querySelectorAll('.gallery__item'),
    sliderWidth = sliderWrapper.offsetWidth,
    prevButton = document.querySelector('.prev-slide'),
    nextButton = document.querySelector('.next-slide'),
    id = null;
//

//1.2 Инициализация
(function(){
  //1.2.1 Создание пагинатора
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

  //1.2.2 Позиционирование слайдов
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


/**2.Функция получения активных элементов -->*/
//2.1 Получение созданных элементов пагинатора из DOM
let bannerDots = document.querySelectorAll('.indicator');
//

//2.2 Получение активного слайда
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

//2.3 Получение активного пагинатора
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


/**3.Функция управления слайдером с помощью пагинатора -->*/
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


/**4.Функции управления слайдером с помощью кнопок навигации -->*/
//4.1 Функция для кнопки 'Вперед'
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

//4.2 Функция для кнопки 'Назад'
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


/**5.Запуск слайдера -->*/
//5.1 Запуск функции для пагинатора
animateOwls(bannerDots, bannerSlides);
//

//5.2 Добавление слушателей событий для кнопок навигации
nextButton.addEventListener('click', animateNextSlide);
prevButton.addEventListener('click', animatePrevSlide);
//
/**<-- */