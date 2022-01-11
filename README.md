# Validating a Form 📋

Checks if information is validated in a form.

## 🚀 Technologies
- HTML
- CSS
- JavaScript
- ViaCEP API (API to get addresses based on CEP/zip code)

## ℹ Description/Important notes

It was a class that I've learned about how validate some informations in a form in a course on the 'Udemy Courses', called "Curso de JavaScript e TypeScript do básico ao avançado 2021
" made by the developer and mentor:
- Luiz Otávio Miranda 🧙‍♂️

I totally recommend this course if you want to learn principally about JS, node, typeScript and much more. </br>
Look how many topics he teaches, link below: https://www.udemy.com/course/curso-de-javascript-moderno-do-basico-ao-avancado/

My intention in this project was to learn how validate some informations in a form like: </br>
- [x] CPF (if you want to know more about how calculate this validation and what is a CPF look this project: https://github.com/lucasVirolli/CPF-validate )</br>
- [x] If the person has a legal age or not (18 years old) </br>
- [x] CEP/zip code to validate and fill automatically other address fields as street, city and state. To do it I used the API of ViaCEP that you can check
better with the link: https://viacep.com.br/
- [x] The user name
- [x] The password and if the user repeated the same password correctly

I added some validates on the project, things that I've learned in other places on the internet, that I searched just out of curiosity. You can see below:

```javascript
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
```

### The project working:

<h1>
  <img src="./assets/lucas-validacao-formulario.gif" />
</h1>

Well, it's not everything about the project, but I just want to bring here what I did differently to practice what I have been learning!

## 📝License
This project is under the MIT license. See the [LICENSE](https://choosealicense.com/licenses/mit/) for more information.

##

If you want to collaborate, to give some opinion, if you know a different way to do, or just want to make a new friend, than send me a e-mail or message on my LinkedIn:
 <a href = "mailto:lucas.virolli2@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
 <a href="https://www.linkedin.com/in/lucasvirollidalbello/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 

##

Made with much 💜 by Lucas Virolli 🙋‍♂️
