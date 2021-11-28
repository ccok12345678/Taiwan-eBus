import choiceCity from "./choiceCity.js";
import GetAuthorizationHeader from "./getAurthor.js";

export default function showRouteOnMap(e, map, layerGroup) {
  const routeName = e.target.dataset.routeName,
        routeId = e.target.dataset.routeId,
        city = choiceCity();

  const url = `https://ptx.transportdata.tw/MOTC/v2/Bus/Shape/City/${city}/${routeName}`;

  fetch(url, {
    method: 'get',
    headers: GetAuthorizationHeader()
  })
    .then(res => {
      if (res.status !== 200)
        throw new Error(res.status)

      return res.json()
    })
    .then(res => {
      
      const data = res.filter(route =>  route.RouteUID === routeId);

      const lineString = data[0].Geometry;
      // console.log(lineString);
      let lineArr = JSON.parse(lineString.replace('LINESTRING(', '[[')
                      .replace(')', ']]')
                      .replace(/,/g, '],[')
                      .replace(/ /g, ',')
                      )
      lineArr = lineArr.map(line => [line[1], line[0]]);
      
      // console.log(lineArr);

      return lineArr;
    })
    .then(arr => {

      layerGroup.clearLayers();

      const busStopMarker = L.icon({
        iconUrl: '../images/marker_busStop.svg',
        iconSize: [26, 26],
        iconAnchor: [13, 10],
      });

      const depatureMarker = L.marker(arr[0], {
                                icon: busStopMarker,
                                minWidth: 0,
                                closeButton: false,
                                autoClose: true
                              });
      const destinationMarker = L.marker(arr[(arr.length - 1)], {
                                icon: busStopMarker,
                                minWidth: 0,
                                closeButton: false,
                                autoClose: true
                              });

      const busLine = L.polyline(arr, { color: '#345E8A' });
      layerGroup
        .addLayer(busLine)
        .addLayer(depatureMarker)
        .addLayer(destinationMarker)
        .addTo(map);

      map.fitBounds(busLine.getBounds());

    })
    .catch(err => console.log('error', err))
}