/**
 * FormValidator module.
 * @module FormValidator
 * @namespace FormValidator
 */
export default class FormValidator {
  constructor(form, fields, errorClassName) {
    this.form = form;
    this.fields = fields;
    this.errorClassName = errorClassName;
  }

  /**
   * @method initialize
   * @description validates form inputs on change and on submit
   * @see {@link validateOnEntry}
   * @see {@link validateOnSubmit}
   * @param {undefined}
   * @returns {undefined}
   */
  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
  }

  /**
   * @method validateOnSubmit
   * @description validates form inputs on submit
   * @param {undefined}
   * @returns {undefined}
   */
  validateOnSubmit() {
    this.form.addEventListener('submit', event => {
        event.preventDefault()
        this.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        this.validateFields(input);
      })
    })
  }

  /**
   * @method validateOnEntry
   * @description validates form inputs on change
   * @param {undefined}
   * @returns {undefined}
   */
  validateOnEntry() {
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)
      input.addEventListener('input', () => {
        this.validateFields(input);
      })
    })
  }

  /**
   * @method validateFields
   * @description checks the input to set either 'success' or 'error' status through SetStatus method
   * @see {@link setStatus}
   * @param {HTMLInputElement} field input node
   * @returns {undefined}
   */
  validateFields(field) {
    /**
     * checks whether the input is empty
     */
    if (field.value.trim() === "") {
      this.setStatus(field, "error");
    } else {
      this.setStatus(field, "success");
    }

    /**
     * checks the 'email' input with a regular expression
     */
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/
      if (re.test(field.value)) {
        this.setStatus(field, "success");
      } else {
        this.setStatus(field, "error");
      }
    }

    /**
     * checks the textarea
     */
    if (field.id === "comment") {
      if (field.value.trim() == "") {
        this.setStatus(field, "error");
      }
    }
  }

  /**
   * @method setStatus
   * @description toggles error class name to the input whether it fails or passes validateFields method check
   * @param {HTMLInputElement} field  input node 
   * @param {string} status  'success' or 'error' status given by validateFields method
   * @returns {undefined}
   */
  setStatus(field, status) {
    if (status === "success") {
      field.classList.remove(this.errorClassName);
    }

    if (status === "error") {
      field.classList.add(this.errorClassName);
    }
  }
}