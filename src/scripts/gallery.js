/**
 * Gallery module.
 * @module Gallery
 * @namespace Gallery
 */
class Gallery {
  constructor(gallery) {
    this.gallery = gallery;
    this.activeIndex = 0;
    this.numItems = this.gallery.children.length;
  }

  /**
   * @method prev
   * @description decreases activeIndex prop and initiates showSlide method
   * @see {@link showSlide}
   * @param {undefined}
   * @returns {undefined}
   */
  prev() {
    this.activeIndex--;
    if(this.activeIndex < 0)
      this.activeIndex = this.numItems - 1;
    this.showSlide();
  }

  /**
   * @method next
   * @description increases activeIndex prop and initiates showSlide method
   * @see {@link showSlide}
   * @param {undefined}
   * @returns {undefined}
   */
  next() {
    this.activeIndex++;
    if(this.activeIndex >= this.numItems)
      this.activeIndex = 0;
    this.showSlide();
  }

  /**
   * @method showSlide
   * @description calculates coordinates 
   * (current activeIndex * slide container's width)
   * @param {undefined}
   * @returns {Number}
   */
  showSlide() {
    let innerSpace = this.gallery.offsetWidth;

    let coord = parseInt(`${this.activeIndex}` * innerSpace);
    
    this.gallery.scrollTo({
      top: 0,
      left: coord,
      behavior: 'smooth'
    });

    return this.activeIndex;
  }
}

/**
 * PaginatedCarousel module.
 * @module PaginatedCarousel
 * @see module:Gallery
 * @namespace PaginatedCarousel
 * @memberof Gallery
 * @instance
 */
class PaginatedCarousel extends Gallery {
  constructor(gallery, activeSlide, pages, activePage) {
    super(gallery);
    this.activeSlide = activeSlide;
    this.slides = Array.from(this.gallery.children);
    this.pages = Array.from(pages.children);
    this.activePage = activePage;
  }

  /**
   * @description toggles active class name to the previous slide and page
   * @see {@link prev}
   * @see {@link toggleActive}
   */
  prev() {
    super.prev();
    this.toggleActive(this.slides, this.activeSlide);
    this.toggleActive(this.pages, this.activePage);
  }

  /**
   * @description toggles active class name to the next slide and page
   * @see {@link prev}
   * @see {@link toggleActive}
   */
  next() {
    super.next();
    this.toggleActive(this.slides, this.activeSlide);
    this.toggleActive(this.pages, this.activePage);
  }

  /**
   * @method toggleActive
   * @description switches active class for slides and corresponding pages
   * @param {Array}
   * @param {String}
   * @returns {undefined}
   */
  toggleActive(lists, activeClass) {
    lists.forEach(listItem => {
      listItem.classList.remove(activeClass);

      if(listItem.dataset.id == this.activeIndex) {
        listItem.classList.toggle(activeClass);
      }
    });
  }

  /**
   * @method navigatePage
   * @description shows slide according to the page clicked,
   * toggles between active pages and slides
   * @see {@link showSlide}
   * @see {@link toggleActive}
   * @param {undefined}
   * @returns {undefined}
   */
  navigatePage() {
    this.pages.forEach(page => {
      page.addEventListener('click', event => {
        this.activeIndex = event.target.dataset.id;

        super.showSlide();
        this.toggleActive(this.slides, this.activeSlide);
        this.toggleActive(this.pages, this.activePage);
      });
    });
  }
}

export { PaginatedCarousel };