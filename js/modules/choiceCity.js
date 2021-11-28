export default function choiceCity() {
  if (document.querySelector('#taipei')) {
    return 'Taipei'
    // new taipei???
  } else if (document.querySelector('#taoyuan')) {
    return 'Taoyuan';
  } else if (document.querySelector('#taichung')) {
    return 'Taichung';
  } else if (document.querySelector('#tainan')) {
    return 'Tainan';
  } else if (document.querySelector('#kaohsiung')) {
    return 'Kaohsiung';
  } else {
    return '';
  }
}
//# sourceMappingURL=choiceCity.js.map
