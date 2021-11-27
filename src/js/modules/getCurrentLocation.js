export default function getCurrentLocation(map, layerGroup, func) {
  map.locate({
    enableHighAccuracy: true,
    setView: true
  })
    .on('locationfound', obj => {
      let nowLat = obj.latlng.lat,
          nowLng = obj.latlng.lng;
      func(nowLat, nowLng, map, layerGroup)
    })
    .on('locationerror', err => {
      alert('無法取得您的位置，請開啟定位功能')
      console.warn(err.massege)

      let tempLat = 22.9925951,
          tempLong = 120.2050199;

      func(tempLat, tempLong, map, layerGroup);
    })
}