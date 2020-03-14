//Images preview
const imagesInput = document.querySelector('#images');

imagesInput.addEventListener('change', event => {
  const files = event.target.files;
  const output = document.getElementById("images_preview");

  Array.from(files).forEach(file => {
    if(!file.type.match('image')) return;

    const picReader = new FileReader();

    picReader.addEventListener("load",function(event){
      const picFile = event.target;
      const div = document.createElement("div");
      div.classList.add('image-preview-wrapper');
      div.innerHTML = `<img src="${picFile.result}">`;

      document.querySelector('#images_preview').insertBefore(div,null);
    });

    //Read the image
    picReader.readAsDataURL(file);
  });
});