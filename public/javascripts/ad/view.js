document.querySelectorAll('.image-preview').forEach(element => {
  element.addEventListener('click', function() {
    document.querySelector('.slide.active').classList.remove('active');
    const previewIndex = this.getAttribute('data-index');
    document.querySelector(`.slide[data-index="${previewIndex}"]`).classList.add('active');
  })
});