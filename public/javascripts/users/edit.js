//Images preview
const imagesInput = document.querySelector('#imageUploadInput');
const image = document.querySelector('.uploaded-image');


imagesInput.addEventListener('change', event => {
  const files = event.target.files;

  Array.from(files).forEach(file => {
    if (!file.type.match('image')) return;

    const picReader = new FileReader();

    picReader.addEventListener("load", function (event) {
      const picFile = event.target;
      const data = new FormData();
      data.append('file', file);
      removeImageAtServer(document.querySelector('[name="profile_image"]').value);

      axios.post('/users/api/uploadImage', data, {
        headers: {'content-type': `multipart/form-data`}
      })
        .then(response => {
          image.innerHTML =`<img class="image-preview" src="${picFile.result}"><input type="hidden" value="${response.data.filename}" name="profile_image">`;
        });
    });
    picReader.readAsDataURL(file);
  });
});

function removeImageAtServer(image) {
  axios.post('/users/api/removeImage', {'image': image});
}
