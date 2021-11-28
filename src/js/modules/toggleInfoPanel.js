import getRouteDetail from "./getRouteDetail.js";
import showRouteOnMap from "./showRouteOnMap.js";

// show detail route info
export default function toggleInfoPanel(map, layerGroup) {

  const resultItems = document.querySelectorAll('.routeListItem');
  resultItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()

      getRouteDetail(e);
      showRouteOnMap(e, map, layerGroup);

      const sideBar = document.querySelector('.aside');
      sideBar.className = 'aside vh-100 d-flex flex-column showRoute';

    })
  })

  const refreshBtn = document.querySelector('#refreshBtn');
  refreshBtn.addEventListener('click', e => {
    e.preventDefault();
    getRouteDetail(e);
  })
  
  const closePanel = document.querySelector('#closePanel');
  closePanel.addEventListener('click', e => {
    e.preventDefault();

    const sideBar = document.querySelector('.aside');
    sideBar.className ='aside vh-100 d-flex flex-column';

  })




}