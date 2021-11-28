export default function showStopPosition(e, map, markerLayers) {
  let position = e.target.dataset.stopposition;
  position = JSON.parse(`[${position}]`);

  
  
  const busStopMarker = L.icon({
    iconUrl: '../images/marker_busStop.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 10],
  });
  
  const busComingMarker = L.icon({
    iconUrl: '../images/marker_busComing.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 10],
  });

  const id = e.target.dataset.stopid;
  const name = e.target.dataset.stopname;
  const direction = e.target.dataset.direction;

  let status = '';
  if (direction === 'go') {
    if (document.querySelector(`.item-badge-go-${id}`))
      status = document.querySelector(`.item-badge-go-${id}`).textContent;
  } else if (direction === 'back'){
    if (document.querySelector(`.item-badge-back-${id}`))
      status = document.querySelector(`.item-badge-back-${id}`).textContent;
  }

  let popupContent = '';
  let marker = busStopMarker;

  if(status === '進站中') {
    popupContent = `
      <div class="stop-popup bg-info text-white p-1 rounded-10">
        <img src="../images/popup_bus.svg">
        <p class="my-0">${name}</p>
        <strong>${status}</strong>
      </div>
      `;
    marker = busComingMarker;
  } else if (status === '即將進站') {
    popupContent = `
    <div class="stop-popup bg-info text-white p-1 rounded-10">
      <p class="my-0">${name}</p>
      <strong>${status}</strong>
    </div>
    `;
    marker = busComingMarker;
  } else if (status === '') {
    popupContent = `
    <div class="stop-popup bg-a9 text-white p-1 rounded-10">
      <p class="my-0">${name}</p>
    </div>
    `;
  } else {
    popupContent = `
    <div class="stop-popup bg-success text-white p-1 rounded-10">
      <p class="my-0">${name}</p>
      <strong>${status}</strong>
    </div>
    `;
  }


  const stopPoittion = L.marker(position, {
    icon: marker,
    minWidth: 0,
    closeButton: false,
    autoClose: true
  })
    .bindPopup(popupContent, {
      closeButton: false
    })
    .on('add', evt => {
      evt.target.openPopup();
    });

  map.setView(position);
  markerLayers
    .addLayer(stopPoittion)
    .addTo(map);

  
}