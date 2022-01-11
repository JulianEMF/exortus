//NEWS SLIDER--------------------------------------------
const slideContainer = document.querySelector('.news');
var slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 2000;
let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId; 

const buildNewsSlider = () => {
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  
  firstClone.id = 'first-clone';
  lastClone.id = 'last-clone';
  
  slide.append(firstClone);
  slide.prepend(lastClone);
  
  // DETECTS RESIZING AND CHANGES THE SIZE OF THE SLIDERS ACCORDINGLY
  window.addEventListener("resize", function() {
    const newWidth = slide.clientWidth;
    slideWidth = newWidth;
    setTimeout(()=>{moveToNextSlide()}, 500);
  });
  
  var slideWidth = slides[index].clientWidth;
  
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  
  const startSlide = () =>{
    slideId = setInterval(() =>{
      moveToNextSlide();
    }, interval);
  };
  
  const getSlides = () => document.querySelectorAll('.slide');
  
  slide.addEventListener('transitionend', ()=>{
    slides = getSlides();
    if(slides[index].id === firstClone.id){
      slide.style.transition = 'none';
      index = 1;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
    if(slides[index].id === lastClone.id){
      slide.style.transition = 'none';
      index = slides.length - 2;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
  });
  
  const moveToNextSlide = ()=>{
    slides = getSlides()
    if(index >= slides.length -1) return;
    index++;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    slide.style.transition = '.7s';
  };
  
  const moveToPrevSlide = ()=> {
    if(index <= 0) return;
    index--;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    slide.style.transition = '.7s';
  };
  
  slideContainer.addEventListener('mouseenter', ()=>{
    clearInterval(slideId)
  });
  
  slideContainer.addEventListener('mouseleave', startSlide);
  
  nextBtn.addEventListener('click', moveToNextSlide);
  prevBtn.addEventListener('click', moveToPrevSlide);

  startSlide();
}

// buildNewsSlider();