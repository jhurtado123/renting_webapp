//Images preview
const imagesInput = document.querySelector('#imageUploadInput');
const imageList = document.querySelector('#imageList');

imagesInput.addEventListener('change', event => {
  const files = event.target.files;

  Array.from(files).forEach(file => {
    if (!file.type.match('image')) return;

    const picReader = new FileReader();

    picReader.addEventListener("load", function (event) {
      const picFile = event.target;
      const data = new FormData();
      data.append('file', file);
      axios.post('/ad/api/uploadImage', data, {
        headers: {'content-type': `multipart/form-data`}
      })
        .then(response => {
          imageList.insertAdjacentHTML('afterbegin', `<div class='uploaded-image'><img class="image-preview" src="${picFile.result}"><input type="hidden" value="${response.data.filename}" name="images"></div>`);
          document.querySelectorAll('.uploaded-image').forEach(node => {
            node.removeEventListener('click', removeImageAtServer);
            node.addEventListener('click', removeImageAtServer);
          })
        });
    });
    picReader.readAsDataURL(file);
  });
});

function removeImageAtServer(event) {
  const image = event.target.nextSibling;
  axios.post('/ad/api/removeImage', {'image': image.value});

  image.parentElement.remove();
}
