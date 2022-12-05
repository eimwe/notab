/**
 * @module FormValidator
 */
import FormValidator from './formValidator.js';

/**
 * Variables for a feedback form
 * @constant
 * @default
 * @member {HTMLElement}
 */
const form = document.querySelector('.feedback__form');
const fields = ["username", "venue", "city", "capital", "email", "subject", "comment"];

/**
 * @constant
 * @default
 * @memberof FormValidator
 * @instance
 */
const VALIDATOR = new FormValidator(form, fields, 'form__control--invalid');

/**
 * @method initialize 
 * @description validates form inputs on submit
 * @memberof FormValidator
 * @see {@link initialize}
 */
VALIDATOR.initialize();



/**
 * Variables for a cookies modal
 * @member {HTMLElement}
 */
 let cookieModal = document.querySelector('.modal--cookies'),
 cookieConsent = document.querySelector('.btn--modal'),
 id = null;

/**
* @function showCookieModal
* @description shows cookies modal
* @param {undefined}
* @returns {undefined}
*/
const showCookieModal = () => {
let position = -110;
clearInterval(id);
id = setInterval(frame, 10);
function frame() {
 if (position == 0) {
   clearInterval(id);
 } else {
   position++;
   cookieModal.style.bottom = `${position}px`;
 }
}
}

/**
* @function dismissCookieModal
* @description hides cookies modal
* @param {undefined}
* @returns {undefined}
*/
const dismissCookieModal = () => {
let position = 0;
clearInterval(id);
id = setInterval(frame, 10);
function frame() {
 if (position == -110) {
   clearInterval(id);
 } else {
   position--;
   cookieModal.style.bottom = `${position}px`;
 }
}
}

/**
* Shows cookies modal on page load
* @see {@link showCookieModal}
*/
showCookieModal();

/**
* Hides cookies modal on 'OK' button click
* @listens click
* @fires dismissCookieModal
* @see {@link dismissCookieModal}
*/
cookieConsent.addEventListener('click', dismissCookieModal);