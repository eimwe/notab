import '../styles/index.less';

class FormValidator {
  constructor(form, fields) {
    this.form = form
    this.fields = fields
  }

  initialize() {
    this.validateOnEntry()
    this.validateOnSubmit()
  }

  validateOnSubmit() {
    let self = this

    this.form.addEventListener('submit', e => {
        e.preventDefault()
        self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        self.validateFields(input)
      })
    })
  }

  validateOnEntry() {
    let self = this
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)

      input.addEventListener('input', event => {
        self.validateFields(input)
      })
    })
  }

  validateFields(field) {

    // Empty field check
    if (field.value.trim() === "") {
      this.setStatus(field, "error")
    } else {
      this.setStatus(field, "success")
    }

    // Check validity of email
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/
      if (re.test(field.value)) {
        this.setStatus(field, "success")
      } else {
        this.setStatus(field, "error")
      }
    }

    // Textarea check
    if (field.id === "comment") {
      if (field.value.trim() == "") {
        this.setStatus(field, "error")
      }
    }
  }

  setStatus(field, status) {
    
    if (status === "success") {
      field.classList.remove('invalid-field')
    }

    if (status === "error") {
      field.classList.add('invalid-field')
    }
  }
}

const form = document.querySelector('.feedback__form');
const fields = ["username", "venue", "city", "capital", "email", "subject", "comment"];

const validator = new FormValidator(form, fields);
validator.initialize();