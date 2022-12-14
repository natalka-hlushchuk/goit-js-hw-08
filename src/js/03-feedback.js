import throttle from 'lodash.throttle';
const feedBackForm = document.querySelector('.feedback-form');
const FORM_KEY = 'feedback-form-state';

feedBackForm.addEventListener('input', throttle(onInputFeedBackForm, 500));
feedBackForm.addEventListener('submit', onSubmitFeedBackForm);

function onInputFeedBackForm(event) {
  const dataLocalStorage = localStorage.getItem(FORM_KEY);
  const parseData = JSON.parse(dataLocalStorage);
  const formData = parseData ? parseData : {};
  formData[event.target.name] = event.target.value;

  localStorage.setItem(FORM_KEY, JSON.stringify(formData));
}

informFromLocalStorage();

function onSubmitFeedBackForm(event) {
  event.preventDefault();
  const email = event.currentTarget.email.value;
  const message = event.currentTarget.message.value;
  console.log({ email, message });
  event.currentTarget.reset();
  localStorage.removeItem(FORM_KEY);
}

function informFromLocalStorage() {
  const dataLocalStorage = localStorage.getItem(FORM_KEY);
  if (dataLocalStorage) {
    const obj = JSON.parse(dataLocalStorage);
    for (let key in obj) {
      feedBackForm.elements[key].value = obj[key];
    }
  }
}
