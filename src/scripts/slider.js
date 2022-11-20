/**
 * @module PaginatedCarousel
 */
import { PaginatedCarousel } from './gallery.js';

/**
 * Variables for a gallery
 * @member {HTMLElement}
 */
let galleryContainer = document.querySelector('.gallery__slides'),
    galleryPages = document.querySelector('.gallery__pages'),
    galleryNext = document.querySelector('.gallery__control--next'),
    galleryPrev = document.querySelector('.gallery__control--prev');

/**
 * @constant
 * @default
 * @memberof PaginatedCarousel
 * @instance
 */
const SLIDER = new PaginatedCarousel(
  galleryContainer,
  'gallery__slide--active',
  galleryPages,
  'gallery__page--active'
  );

/**
 * @function nextSlide
 * @description show next slide
 * @memberof PaginatedCarousel
 */
let nextSlide = () => SLIDER.next();

/**
 * @function prevSlide 
 * @description show previous slide
 * @memberof PaginatedCarousel
 */
let prevSlide = () => SLIDER.prev();

/**
 * Show next gallery slide
 * @listens click
 * @fires nextSlide
 * @see {@link nextSlide}
 */
galleryNext.addEventListener('click', nextSlide);

/**
 * Show previous gallery slide
 * @listens click
 * @fires prevSlide
 * @see {@link prevSlide}
 */
galleryPrev.addEventListener('click', prevSlide);

/**
 * @method navigatePage 
 * @description show slide by the page clicked
 * @memberof PaginatedCarousel
 * @see {@link navigatePage}
 */
SLIDER.navigatePage();