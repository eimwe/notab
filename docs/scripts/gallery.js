class Gallery{constructor(e){this.gallery=e,this.activeIndex=0,this.numItems=this.gallery.children.length}prev(){this.activeIndex--,this.activeIndex<0&&(this.activeIndex=this.numItems-1),this.showSlide()}next(){this.activeIndex++,this.activeIndex>=this.numItems&&(this.activeIndex=0),this.showSlide()}showSlide(){let e=this.gallery.offsetWidth,t=parseInt(`${this.activeIndex}`*e);return this.gallery.scrollTo({top:0,left:t,behavior:"smooth"}),this.activeIndex}}class PaginatedCarousel extends Gallery{constructor(e,t,i,s){super(e),this.activeSlide=t,this.slides=Array.from(this.gallery.children),this.pages=Array.from(i.children),this.activePage=s}prev(){super.prev(),this.toggleActive(this.slides,this.activeSlide),this.toggleActive(this.pages,this.activePage)}next(){super.next(),this.toggleActive(this.slides,this.activeSlide),this.toggleActive(this.pages,this.activePage)}toggleActive(e,t){e.forEach((e=>{e.classList.remove(t),e.dataset.id==this.activeIndex&&e.classList.toggle(t)}))}navigatePage(){this.pages.forEach((e=>{e.addEventListener("click",(e=>{this.activeIndex=e.target.dataset.id,super.showSlide(),this.toggleActive(this.slides,this.activeSlide),this.toggleActive(this.pages,this.activePage)}))}))}}export{PaginatedCarousel};