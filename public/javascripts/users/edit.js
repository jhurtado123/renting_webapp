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


const lesseeMode = document.querySelector('#lesseeMode');
const lesseeModal = document.querySelector('#modalLesseeMode');
const lesseModeActivate = document.querySelector('#lesseeModeActivate');
const acceptDecline = document.querySelector('#acceptDecline');
const lesseeDni = document.querySelector('#lesseeDni');
const lesseeModeFinish = document.querySelector('#lesseeModeFinish');
const lesseeModeCancel = document.querySelectorAll('.lesseeModeCancel');
const inputDNI = document.querySelector('#inputDNI');
let activatedLesseMode = false;

lesseeMode.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
   if (activatedLesseMode) {
     activatedLesseMode = false;
     lesseeMode.checked = false;
     return false;
   } else {
     resetLesseeModal();
     openLesseModal();
   }
});
lesseeModal.querySelector('.close').addEventListener('click', () => {
  closeLesseModal();
  setTimeout(resetLesseeModal, 100);
});

function openLesseModal() {
  lesseeModal.classList.add('open');

}
function closeLesseModal() {
  lesseeModal.classList.remove('open');
}
function resetLesseeModal() {
  acceptDecline.style.opacity = 1;
  acceptDecline.style.display = 'block';
  lesseeDni.style.display = 'none';
  lesseeDni.style.opacity = 0;
}

lesseModeActivate.addEventListener('click', () => {
  acceptDecline.style.opacity = 0;
  setTimeout(() => {
    acceptDecline.style.display = 'none';
    lesseeDni.style.display = 'block';
    lesseeDni.style.opacity = 1;
  },500);
});

lesseeModeCancel.forEach(element => {
  element.addEventListener('click', () => {
    closeLesseModal();
    setTimeout(resetLesseeModal, 100);
  });
});

lesseeModeFinish.addEventListener('click', () => {
  if (lesseeDni.querySelectorAll('.error-message').length) {
    lesseeDni.querySelector('.error-message').remove();
  }
  const validation_response = Validator.dni(inputDNI.value);

  if (validation_response.validation) {
    closeLesseModal();
    lesseeMode.checked = true;
    activatedLesseMode = true;
  } else {
    lesseeDni.insertAdjacentHTML('beforeend', `<div class="error-message">${validation_response.message}</div>`)
  }

});