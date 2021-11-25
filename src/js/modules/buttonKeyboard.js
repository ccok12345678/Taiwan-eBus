import searchRoutes from "./searchRoutes.js";

export default function buttonKeyboard() {
  const buttonKeyboard = document.querySelector('#buttonKeyboard');
  buttonKeyboard.addEventListener('click', e => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    const buttonValue = e.target.childNodes[0].nodeValue
    let inputValue = document.querySelector('#routeSearchInput').value;

    if (buttonValue === '清除') {
      document.querySelector('#routeSearchInput').value = '';
    } else {
      inputValue += buttonValue;
      document.querySelector('#routeSearchInput').value = inputValue;
    }

  })



}