import GetAuthorizationHeader from "./getAurthor.js";
import showSearchResults from "./showSearchResults.js";
import searchRoutes from "./searchRoutes.js";
import toggleInfoPanel from "./toggleInfoPanel.js";
import choiceCity from "./choiceCity.js";


export default function getRouteDataByCity() {

  const city = choiceCity();

  axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url: `v2/Bus/Route/City/${city}?$format=JSON`,
    headers: GetAuthorizationHeader()
  })
    .then(res => {
      const allRoutes = res.data;
      showSearchResults(allRoutes, city);
      toggleInfoPanel();

      return allRoutes;
    })
    .then(routes => {
      const searchBtn = document.querySelector('#inputSubmitBtn');
      const searchInput = document.querySelector('#routeSearchInput');
      const buttonKeyboard = document.querySelector('#buttonKeyboard');
      
      searchBtn.addEventListener('click', e => {
        searchRoutes(routes, city);
        toggleInfoPanel();
      })
      
      searchInput.addEventListener('input', e => {
        searchRoutes(routes, city);
        toggleInfoPanel();
      })
      
      buttonKeyboard.addEventListener('click', e => {
        if (e.target.nodeName !== 'BUTTON') {
          return;
        }
        searchRoutes(routes, city);
        toggleInfoPanel();
      })
      

    })
    .catch(err => console.log(err));
}