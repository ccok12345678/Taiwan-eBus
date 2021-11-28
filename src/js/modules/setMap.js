export default function setMap(lat, lng, map) {
  if (typeof(map) === undefined) {
    map = L.map('busMap', {
      closePopupOnClick: false,
      zoomControl: false,
      watch: true
    });
  }

  map.setView([lat, lng], 13);

 // current spot
  const markerCurrentLocation = L.icon({
    iconUrl: '../images/marker_currentLocation.svg',
    shadowUrl: '../images/marker_shadow.svg',

    iconSize: [26, 26],
    shadowSize:[40, 40],
    iconAnchor: [13, 10],
    shadowAnchor: [20, 20]
  });

  L.marker([lat, lng], {
    icon: markerCurrentLocation,
    minWidth: 0,
    closeButton: false,
    autoClose: true
  }).addTo(map)

  // map info layer
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    minzoom: 8,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2NvazEyMzQ1Njc4IiwiYSI6ImNrdm5ncWdhbjF1am0ydW10ZXllcXo4cWcifQ.j2BTK9bT7990xsvmVWsWrQ'
  }).addTo(map);

}
