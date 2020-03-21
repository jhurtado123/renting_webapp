var slideIndex = 0;
activateSliders();

function activateSliders() {
  const sliders = document.querySelectorAll(".slideshow-container");
  sliders.forEach(slider => {
    slider.querySelector('.mySlides').classList.add('active');
  })
}
function plusSlides(slideId) {
  const slider = document.querySelector(`.slideshow-container[data-id="${slideId}"]`);
  const slidesCount = (slider.querySelectorAll('.mySlides').length) - 1;
  const currentSlide = slider.querySelector('.mySlides.active');
  currentSlide.classList.remove('active');
  const currentIndex = parseInt(currentSlide.getAttribute('data-index'));
  let nextIndex = currentIndex + 1;
  if (currentIndex === slidesCount) {
    nextIndex = 0;
  }
  slider.querySelector(`.mySlides[data-index="${nextIndex}"]`).classList.add('active');
}
function minusSlides(slideId) {
  const slider = document.querySelector(`.slideshow-container[data-id="${slideId}"]`);
  const slidesCount = (slider.querySelectorAll('.mySlides').length) - 1;
  const currentSlide = slider.querySelector('.mySlides.active');
  currentSlide.classList.remove('active');
  const currentIndex = parseInt(currentSlide.getAttribute('data-index'));
  let nextIndex = currentIndex - 1;
  if (currentIndex === 0) {
    nextIndex = slidesCount;
  }
  slider.querySelector(`.mySlides[data-index="${nextIndex}"]`).classList.add('active');
}

function goToIndex(index) {
  const slider = document.querySelector('.slideshow-container');
  const currentSlide = slider.querySelector('.mySlides.active');
  currentSlide.classList.remove('active');
  slider.querySelector(`.mySlides[data-index="${index}"]`).classList.add('active');
}

document.querySelectorAll('.image-preview').forEach(element => {
  element.addEventListener('click', function () {
    const index = this.getAttribute('data-index');
    goToIndex(parseInt(index));
  });
});
