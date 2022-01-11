class ValidateForm {
  constructor() {
    this.form = document.querySelector('.form');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => {
      this.handleSubmit(e);
    });

    const cepContainer = document.querySelector('.cepForm');
    const cepEl = document.querySelector('.cep');
    cepEl.addEventListener('blur', () => {
      for(let errorCep of cepContainer.querySelectorAll('.error-text')){
        errorCep.remove();
      }

      this.recoverCEP();
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validateFields = this.fieldsAreValidated();
    const validatePassword = this.passwordIsValidated();

    if(validateFields && validatePassword) {
      alert('Formulário enviado.');
      this.form.submit();
    }
  }

  fieldsAreValidated() {
    let valid = true;

    for(let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let field of this.form.querySelectorAll('.toValidate')) {
      const label = field.previousElementSibling.innerText;

      if(!field.value) {
        this.createError(field, `Campo "${label}" não pode estar em branco.`);
        valid = false;
      }

      if(field.classList.contains('cpf')) {
        if(!this.validateCPF(field)) valid = false;
      }

      if (field.classList.contains('birthday')) {
        if (!this.validateBirthday(field)) valid = false;
      }

      if(field.classList.contains('user')) {
        if(!this.validateUser(field)) valid = false;
      }

    }

    return valid;
  }

  createError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }

  validateUser(field) {
    const user = field.value;
    let valid = true;

    if(user.length < 3 || user.length > 12) {
      this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if(!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(field, 'Nome de usuário precisar conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  }

  validateCPF(field) {
    const cpf = new validateCPF(field.value);

    if(!cpf.validate()) {
      this.createError(field, 'CPF inválido.');
      return false;
    }

    return true;
  }

  validateBirthday(field) {

    const bDay = new Date(field.value);
    let valid = true;

    if(!this.legalAge(bDay)) {
      this.createError(field, 'Usuário precisa ter mais de 18 anos de idade.');
      valid = false;
    }

    return valid;
  }

  legalAge(date){
    const currentDate = new Date()
    const dateLegalAge = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate());
  
    return dateLegalAge <= currentDate;
  }

  recoverCEP(field) {
    field = document.querySelector('.cep');

    const cep = field.value.replace(/\D/g, '');
    const regExCEP = /^[0-9]{8}$/;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if(!regExCEP.test(cep)){
      this.createError(field, 'Favor digitar um CEP válido.');
    }

    if (cep !== '') {
      fetch(url).then(
        response => response.json()
      ).then(
        data => {
          console.log(data)
          if (data.erro) {
            this.createError(field, 'Não foi possível buscar o CEP.');
            this.fillFieldsWithCep(data)
            return
          }
          this.fillFieldsWithCep(data)
          return
        }
      )
    }
  }


  fillFieldsWithCep(data) {
    const street = document.querySelector('[data-tipo="street"]');
    const city = document.querySelector('[data-tipo="city"]');
    const state = document.querySelector('[data-tipo="state"]');

    if (data.erro) {
      street.value = ''
      city.value = ''
      state.value = ''
    } else {
      street.value = data.logradouro
      city.value = data.localidade
      state.value = data.uf
    }
  }

  passwordIsValidated() {
    let valid = true;

    const password = this.form.querySelector('.password');
    const repeatPassword = this.form.querySelector('.repeat-password');

    const checkPassword = password.value.replace(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,12}$/g);

    if (checkPassword != 'undefined') {
      valid = false;
      this.createError(password, 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula e uma minúscula, e deve conter algum caracter especial (!@#$%^&*_=+-)');
    }
    if (password.value !== repeatPassword.value) {
      valid = false;
      this.createError(password, 'Campos senha e repetir senha precisar ser iguais.');
      this.createError(repeatPassword, 'Campos senha e repetir senha precisar ser iguais.');
    }
    return valid;
  }
}

const validate = new ValidateForm();
