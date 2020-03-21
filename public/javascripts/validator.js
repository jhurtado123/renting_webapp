document.querySelectorAll('[data-validate').forEach(element => {
  element.addEventListener('change', function () {
    const validatorType = this.getAttribute('data-validate');
    const response = Validator[validatorType](this.value);
    const parentElement = this.parentElement;
    if (parentElement.classList.contains('has-error')) {
      parentElement.classList.remove('has-error');
      parentElement.querySelector('.error-message').remove();
    }
    if (!response.validation) {
      parentElement.classList.add('has-error');
      parentElement.insertAdjacentHTML('beforeend',`<div class="error-message">${response.message}</div>`);
    }
  })
});

document.querySelector('form.validate').addEventListener('submit', function (e) {
  e.preventDefault();
  if (document.contains(document.querySelector('.form-error-message'))) document.querySelector('.form-error-message').remove();
  document.querySelectorAll('[data-validate').forEach(element => element.dispatchEvent(new Event('change')));
  if (!document.querySelectorAll('.has-error').length) {
    this.submit();
  } else {
    document.querySelector('form.validate').insertAdjacentHTML('beforeend','<div class="form-error-message">El formulario contiene errores</div>' )
  }
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
Validator.notNumbers = (value) => {
  if (value === '')  return {validation: false, message: 'Debes rellenar este campo'};
  if (/\d/.test(value)) return {validation: false, message: 'No puede contener números'};
  return {validation: true};
};

Validator.phone = (value) => {
  const str = value.toString().replace(/\s/g, '');
  if (str.length === 9 && /^[679]{1}[0-9]{8}$/.test(str)) {
    return {validation: true};
  }
  return {validation: false, message: 'Número de telefono incorrecto'};
};
Validator.dni = (value) => {
  const dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  const letter = dni_letters.charAt( parseInt( value, 10 ) % 23 );

  if (letter === value.charAt(8)) return {validation: true};
  return {validation: false, message: 'DNI invalido'};
};
Validator.email = (value) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(String(value).toLowerCase())) return {validation: true};
  return {validation: false, message: 'Email con formato no válido'};
}
