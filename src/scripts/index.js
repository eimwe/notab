import '../styles/index.less';

/* Валидатор формы '.feedback__form' -->*/

// Создание класса и методов для валидации других форм
class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  // Инициализатор валидации при отправке формы и ее заполнении
  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
  }

  // Валидация при отправке формы
  validateOnSubmit() {
    let self = this;
    this.form.addEventListener('submit', e => {
        e.preventDefault()
        self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        self.validateFields(input);
      })
    })
  }

  // Валидация при заполнении полей формы
  validateOnEntry() {
    let self = this;
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)
      input.addEventListener('input', event => {
        self.validateFields(input);
      })
    })
  }

  // Метод проверки полей формы
  validateFields(field) {

    // Проверка на пустые поля и отправка статуса 'success'/'error' в метод setStatus
    if (field.value.trim() === "") {
      this.setStatus(field, "error");
    } else {
      this.setStatus(field, "success");
    }

    // Проверка поля 'email' с помощью regExp и отправка статуса 'success'/'error' в метод setStatus
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/
      if (re.test(field.value)) {
        this.setStatus(field, "success");
      } else {
        this.setStatus(field, "error");
      }
    }

    // Проверка textarea и отправка статуса 'error' в метод setStatus при некорректном заполнении поля
    if (field.id === "comment") {
      if (field.value.trim() == "") {
        this.setStatus(field, "error");
      }
    }
  }

  // Метод, обрабатывающий статусы 'success'/'error', отправленные выше, для добавления/удаления error-состояния поля
  setStatus(field, status) {
    if (status === "success") {
      field.classList.remove('invalid-field');
    }

    if (status === "error") {
      field.classList.add('invalid-field');
    }
  }
}

// Получение ноды формы и ее полей
const form = document.querySelector('.feedback__form');
const fields = ["username", "venue", "city", "capital", "email", "subject", "comment"];

// Создание копии из класса и инициализация методов валидации
const validator = new FormValidator(form, fields);
validator.initialize();
/* <-- */



/* Модальное окно '.cookies' --> */

// Получение нод модального окна и установка id для интервала
let cookieModal = document.querySelector('.cookies'),
    cookieConsent = document.querySelector('.btn--modal'),
    id = null;

// Функция показа модального окна
function showCookieModal() {
  let position = -110;
  clearInterval(id);
  id = setInterval(frame, 10);
  function frame() {
    if (position == 0) {
      clearInterval(id);
    } else {
      position++;
      cookieModal.style.bottom = position + 'px';
    }
  }
}

// Функция закрытия модального окна
function dismissCookieModal() {
  let position = 0;
  clearInterval(id);
  id = setInterval(frame, 10);
  function frame() {
    if (position == -110) {
      clearInterval(id);
    } else {
      position--;
      cookieModal.style.bottom = position + 'px';
    }
  }
}

// Показ модального окна при загрузке страницы
showCookieModal();

// Добавление слушателя на кнопку 'Ок' для закрытия модального окна
cookieConsent.addEventListener('click', e => {
  e.preventDefault();
  if(cookieModal.style.bottom = 0 + 'px') {
    dismissCookieModal();
  } else {
    showCookieModal();
  }
});
/* <-- */