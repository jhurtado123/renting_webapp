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
  axios.post('/ad/api/removeImage', {'image': image.valuet});

  image.parentElement.remove();
}

const rangeStatus = document.querySelector('#rangeStatus');

rangeStatus.addEventListener('change', (event) => {
  if (event.currentTarget.value == 1) {
    document.getElementById("infoStatus").innerHTML = "<span class='bad-status'>Mal estado</span>";
  } else if (event.currentTarget.value == 2) {
    document.getElementById("infoStatus").innerHTML = "<span class='notgood-status'>No muy buen estado</span>";
  } else if (event.currentTarget.value == 3) {
    document.getElementById("infoStatus").innerHTML = "<span class='normal-status'>Estado correcto</span>";
  } else if (event.currentTarget.value == 4) {
    document.getElementById("infoStatus").innerHTML = "<span class='good-status'>Buen estado</span>";
  } else {
    document.getElementById("infoStatus").innerHTML = "<span class='perfect-status'>Perfecto estado</span>";
  }
})
rangeStatus.dispatchEvent(new Event("change"));


document.querySelectorAll('[name=square_meters], [name=postal_code], [name=terrace], [name=hasElevator], [name=height], [name=flat_status], [name=parking], [name=storage_room]').forEach(element =>{
  element.addEventListener('change', event => {
    let data = {
      terrace: document.querySelector('[name=terrace]').checked,
      hasElevator: document.querySelector('[name=hasElevator]').checked,
      storage_room: document.querySelector('[name=storage_room]').checked,
      parking: document.querySelector('[name=parking]').checked,
      square_meters: document.querySelector('[name=square_meters]').value,
      height: document.querySelector('[name=height]').value,
      flat_status: document.querySelector('[name=flat_status]').value,
      postal_code: document.querySelector('[name=postal_code]').value,
    }
    axios.post('/api/get/fairPrice', {data})
      .then(result => {
        document.querySelector('#fairPrice span').innerHTML = Math.floor(result.data.fairPrice)
      })
      .catch(error => console.log(error))
  })
})


