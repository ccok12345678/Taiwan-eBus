import getRouteDetail from "./getRouteDetail.js";
import showRouteOnMap from "./showRouteOnMap.js";

// show detail route info
export default function toggleInfoPanel(map, lineLayers, markerLayers) {

  const resultItems = document.querySelectorAll('.routeListItem');
  resultItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()

      lineLayers.clearLayers();
      markerLayers.clearLayers();
      getRouteDetail(e, map, markerLayers);
      showRouteOnMap(e, map, lineLayers);

      const sideBar = document.querySelector('.aside');
      sideBar.className = 'aside vh-100 d-flex flex-column showRoute';

    })
  })

  const refreshBtn = document.querySelector('#refreshBtn');
  refreshBtn.addEventListener('click', e => {
    e.preventDefault();
    markerLayers.clearLayers();
    getRouteDetail(e, map, markerLayers);
  })
  
  const closePanel = document.querySelector('#closePanel');
  closePanel.addEventListener('click', e => {
    e.preventDefault();

    const sideBar = document.querySelector('.aside');
    sideBar.className ='aside vh-100 d-flex flex-column';

  })




}