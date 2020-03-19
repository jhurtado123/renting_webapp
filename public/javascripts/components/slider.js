var slideIndex = 0;
showSlides();
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  slides[slideIndex].style.display = "block";
}
function plusSlides(n) {
  slideIndex += n;
  console.log(slideIndex);
  showSlides();
}

function goToIndex(index) {
  slideIndex = index;
  showSlides();
}
document.querySelectorAll('.image-preview').forEach(element => {
  element.addEventListener('click', function () {
    const index = this.getAttribute('data-index');
    goToIndex(parseInt(index));
  });
});
