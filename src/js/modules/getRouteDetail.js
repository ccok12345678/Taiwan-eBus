import GetAuthorizationHeader from "./getAurthor.js";
import choiceCity from "./choiceCity.js";
import showRouteTime from "./showRouteTime.js";

const goTime = [],
      backTime = [],
      goStops = [],
      backStops = [];

export default function getRouteDetail(e) {

  const routename = e.target.dataset.routeName,
        routeId = e.target.dataset.routeId,
        departure = e.target.dataset.depa,
        destination = e.target.dataset.dest;
  
        const city = choiceCity();

  const name = document.querySelector('#routeName'),
        goBtn = document.querySelector('#pills-goto-tab'),
        backBtn = document.querySelector('#pills-backto-tab');

  name.innerHTML = routename;
  goBtn.innerHTML = `往 <strong>${destination}</strong>`;
  backBtn.innerHTML = `往 <strong>${departure}</strong>`;

  // get estimate time

  getEstimatetime(routename, routeId, city);
  
  // get bus stop info
  getBusStop(routename, routeId, city);

  // show arrival time
  showRouteTime(goStops, goTime, backStops, backTime);

}

function getEstimatetime(routename, routeId, city) {



  axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url: `v2/Bus/EstimatedTimeOfArrival/City/${city}/${routename}`,
    headers: GetAuthorizationHeader()
  })
    .then(res => {
      let timeData = res.data.filter(data => data.RouteUID === routeId);

      console.log(timeData);

      if (timeData[0].hasOwnProperty('PlateNumb')) {
        timeData = timeData.filter(data => data.PlateNumb)
      } else {
        console.log('no PlateNumb')
      }

      timeData.forEach(data => {
        if (data.Direction === 0) {
          goTime.push({
            stopId: data.StopUID,
            estimateTime: data.EstimateTime
          });
        } else {
          backTime.push({
            stopId: data.StopUID,
            estimateTime: data.EstimateTime
          });
        }
      });

    })
    .catch(err => console.log(err));
}



function getBusStop(routename, routeId, city) {
  axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url: `v2/Bus/StopOfRoute/City/${city}/${routename}?$format=JSON`,
    headers: GetAuthorizationHeader()
  })
    .then(res => {
      const stopData = res.data.filter(data => data.RouteUID === routeId )

      stopData[0].Stops.forEach(obj => {
        goStops.push({
          stopId: obj.StopUID,
          stopname: obj.StopName.Zh_tw
        })
      })

      stopData[1].Stops.forEach(obj => {
        backStops.push({
          stopId: obj.StopUID,
          stopname: obj.StopName.Zh_tw
        })
      })

    })
    .catch(err => console.log(err))
}