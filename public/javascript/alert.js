export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
export const showAlert = (type, msg) => {
  hideAlert();
  const markUp = `<div class="alert alert--${type}">${msg}</div>`;
  // insert alert box in out html
  document.querySelector('body').insertAdjacentHTML('afterbegin', markUp);
  //hide alert after 5 seconds
  window.setTimeout(hideAlert, 5000);
};
