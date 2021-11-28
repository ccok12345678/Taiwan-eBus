export default function showStopPosition(e, map, markerLayers) {
  let position = e.target.dataset.stopposition;
  position = JSON.parse(`[${position}]`);
  
  const busStopMarker = L.icon({
    iconUrl: '../images/marker_busStop.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 10],
  });

  const name = e.target.dataset.stopname;

  // 
  let popupContent = `<div class="stop-popup bg-success text-white p-1 rounded-10">${name}</div>`;


  
  const stopPoittion = L.marker(position, {
    icon: busStopMarker,
    minWidth: 0,
    closeButton: false,
    autoClose: true
  })
    .bindPopup(popupContent, {
      closeButton: false
    })
    .on('add', evt => {
      evt.target.openPopup();
      console.log(evt.target._popup._content)

      evt.target._popup._content = 'hihihihi';
    });

  map.setView(position);
  markerLayers
    .addLayer(stopPoittion)
    .addTo(map);

  
}