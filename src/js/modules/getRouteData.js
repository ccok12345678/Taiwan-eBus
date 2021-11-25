import GetAuthorizationHeader from "./getAurthor.js";
import showSearchResults from "./showSearchResults.js";
import searchRoutes from "./searchRoutes.js";

export default function getRouteDataByCity() {
  
  let city = '';

  if (document.querySelector('#taipei')) {
    city = 'Taipei'
    // new taipei???
  } else if (document.querySelector('#taoyuan')) {
    city = 'Taoyuan';
  } else if (document.querySelector('#taichung')) {
    city = 'Taichung';
  } else if (document.querySelector('#tainan')) {
    city = 'Tainan';
  } else if (document.querySelector('#kaohsiung')) {
    city = 'Kaohsiung';
  } else {
    return;
  }

  axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url:`v2/Bus/Route/City/${city}?$format=JSON`,
    headers: GetAuthorizationHeader()
  })
    .then(res => {
      const allRoutes = res.data;
      showSearchResults(allRoutes, city);

      return allRoutes;
    })
    .then(routes => {
      const searchBtn = document.querySelector('#inputSubmitBtn');
      searchBtn.addEventListener('click', e => {
        searchRoutes(routes, city);
      })

      const searchInput = document.querySelector('#routeSearchInput');
      searchInput.addEventListener('input', e => {
        searchRoutes(routes, city);
      })

      const buttonKeyboard = document.querySelector('#buttonKeyboard');
      buttonKeyboard.addEventListener('click', e => {
        if (e.target.nodeName !== 'BUTTON') {
          return;
        }
        
        searchRoutes(routes, city);
      })

    })
    .catch(err => console.log(err));
}