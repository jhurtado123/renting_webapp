document.querySelectorAll('[data-validate').forEach(element => {
  element.addEventListener('change', function () {
    const validatorType = this.getAttribute('data-validate');
    const response = Validator[validatorType](this.value);
    const parentElement = this.parentElement;
    if (response.validation) {
      if (parentElement.classList.contains('has-error')) {
        parentElement.classList.remove('has-error');
        parentElement.querySelector('.error-message').remove();
      }
    } else {
      parentElement.classList.add('has-error');
      parentElement.insertAdjacentHTML('beforeend',`<div class="error-message">${response.message}</div>`);
    }
  })
});

let Validator = {};

Validator.notEmpty = (value) => {
  if (value === '' || !value) return {validation: false, message: 'Debes rellenar este campo'};
  return {validation: true};
};
Validator.postal_code = (value) => {
  if (/^\d{4,5}/.test(value)) return {validation: true};
  return {validation: false, message: 'Código postal incorrecto'};
};

