import getRouteDetail from "./getRouteDetail.js";

export default function toggleInfoPanel() {

  const resultItems = document.querySelectorAll('.routeListItem');
  resultItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()

      getRouteDetail(e);

      const sideBar = document.querySelector('.aside');
      sideBar.className = 'aside vh-100 d-flex flex-column showRoute';

      // console.log(e);
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