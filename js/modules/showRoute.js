export default function showRoute(stops, isGo) {
  
  const goStopsContainer = document.querySelector('#gotoRouteStops'),
        backStopsContainer = document.querySelector('#backtoRouteStops');

  let busStops = '';
  stops.forEach(stop => {
    let name = stop.stopName,
        id = stop.stopId,
        position = stop.stopPosition,
        go = '';

    if (isGo) {
      go = 'go';
    } else {
      go = 'back';
    }

    busStops += `
      <a class="stops-item list-group-item d-flex px-0 item-border-right rounded-0 hover-bg-ee" href="#" data-stopId="${id}" data-stopName="${name}" data-stopPosition="${position}" data-direction="${go}">
        <span class="item-badge-${go} item-badge d-block text-nowrap rounded-10 text-white lh-sm fs-14 text-center py-1 me-3 bg-a9" data-stopId="${id}" data-stopName="${name}" data-stopPosition="${position}" data-direction="${go}">未發車</span>
        <p class="item-name-${go} fs-14 text-88 my-auto" data-stopId="${id}" data-stopName="${name}" data-stopPosition="${position}" data-direction="${go}">${name}</p>
        <div class="item-dot-${go} item-dot-gray" data-stopId="${id}" data-stopName="${name}" data-stopPosition="${position}" data-direction="${go}"></div>
      </a>
    `;
    
  });

  if (busStops === '') {
    if (isGo) {
      busStops = `
        <div class="alert alert-info text-center border-0 fs-14" role="alert">
          <i class="bi bi-file-earmark-excel"></i>
          沒有去程資料
        </div>
      `;
    } else {
      busStops = `
      <div class="alert alert-info text-center border-0 fs-14" role="alert">
        <i class="bi bi-file-earmark-excel"></i>
        沒有返程資料
      </div>
    `;
    }
  }

  if (isGo) {
    goStopsContainer.innerHTML = busStops + '<div class="list-group-item item-border-right rounded-0 border-bottom-0"></div>';
  } else {
    backStopsContainer.innerHTML = busStops + '<div class="list-group-item item-border-right rounded-0 border-bottom-0"></div>';
  }

}
//# sourceMappingURL=showRoute.js.map
