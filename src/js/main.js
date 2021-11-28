import getRouteDataByCity from "./modules/getRouteData.js";
import buttonKeyboard from "./modules/buttonKeyboard.js";
import getCurrentLocation from "./modules/getCurrentLocation.js";
import setMap from "./modules/setMap.js";

// map
const map = L.map('busMap', {
  closePopupOnClick: false,
  zoomControl: false
});

const markers = new L.layerGroup().addTo(map),
      busLines = new L.layerGroup().addTo(map);

L.control.zoom({
  position: 'bottomright'
}).addTo(map);


// init
init();

export default function init() {
  
  if (!document.querySelector('.index')) {
    getRouteDataByCity(map, busLines, markers);
    buttonKeyboard();
    getCurrentLocation(map, markers, setMap);
  }
}