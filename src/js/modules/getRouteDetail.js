import GetAuthorizationHeader from "./getAurthor.js";
import choiceCity from "./choiceCity.js";
import showRoute from "./showRoute.js";

let goTime = [],
    backTime = [],
    goStops = [],
    backStops = [];

export default function getRouteDetail(e) {

  const routename = e.target.dataset.routeName,
        routeId = e.target.dataset.routeId,
        departure = e.target.dataset.depa || '',
        destination = e.target.dataset.dest || '';

  const city = choiceCity();

  const name = document.querySelector('#routeName'),
        goBtn = document.querySelector('#pills-goto-tab'),
        backBtn = document.querySelector('#pills-backto-tab'),
        refreshBtn = document.querySelector('#refreshBtn');

  name.innerHTML = routename;
  goBtn.innerHTML = `往 <strong>${destination}</strong>`;
  backBtn.innerHTML = `往 <strong>${departure}</strong>`;

  // 立即更新
  refreshBtn.setAttribute('data-route-name', routename);
  refreshBtn.setAttribute('data-route-id', routeId);
  refreshBtn.setAttribute('data-depa', departure);
  refreshBtn.setAttribute('data-dest', destination);


  // get bus stop info
  getBusStop(routename, routeId, city);

}


function getBusStop(routename, routeId, city) {
  axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url: `v2/Bus/StopOfRoute/City/${city}/${routename}?$format=JSON`,
    headers: GetAuthorizationHeader()
  })
    .then(res => {

      // 過濾含有同樣數字的路線名稱
      const stopData = res.data.filter(data => data.RouteUID === routeId)

      // 去程
      stopData[0].Stops.forEach(obj => {
        goStops.push({
          stopId: obj.StopUID,
          stopname: obj.StopName.Zh_tw
        })
      })

      // 返程
      if (stopData[1] !== undefined) {
        stopData[1].Stops.forEach(obj => {
          backStops.push({
            stopId: obj.StopUID,
            stopname: obj.StopName.Zh_tw
          })
        })
      }

    })
    .then(res => {

      // 顯示沿線各站
      showRoute(goStops, true);
      showRoute(backStops, false);

      // get estimate time
      getEstimatetime(routename, routeId, city);

    })
    .catch(err => console.log(err))
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

      // bus of Taipie doesn't have 'PlateNumb' property
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
    .then(res => {

      // show go time
      const goItemBsdges = document.querySelectorAll('.item-badge-go'),
            goItemDots = document.querySelectorAll('.item-dot-go'),
            goNames = document.querySelectorAll('.item-name-go');


      goTime.forEach(go => {
        goItemBsdges.forEach(badge => {

          let stopid = badge.getAttribute('data-stopId');

          if (stopid === go.stopId) {
            if ((go.estimateTime / 60) <= 1) {
              badge.className = 'item-badge-go item-badge d-block text-nowrap rounded-10 text-white lh-sm fs-14 text-center py-1 me-3 bg-info'
              badge.innerHTML = '進站中';
            } else if ((go.estimateTime / 60) > 1 && (go.estimateTime / 60) <= 2) {
              badge.className = 'item-badge-go item-badge d-block text-nowrap rounded-10 text-white lh-sm fs-14 text-center py-1 me-3 bg-info'
              badge.innerHTML = '即將進站';
            } else if (isNaN(go.estimateTime)) {
              badge.className = 'item-badge-go item-badge d-block text-nowrap rounded-10 text-white lh-sm fs-14 text-center py-1 me-3 bg-a9'
            } else {
              badge.className = 'item-badge-go item-badge d-block text-nowrap rounded-10 text-white lh-sm fs-14 text-center py-1 me-3 bg-success'
              badge.innerHTML = `${Math.floor(go.estimateTime / 60)} 分鐘`;
            }
          }

        })

        goItemDots.forEach(dot => {
          let stopid = dot.getAttribute('data-stopId');

          if (stopid === go.stopId) {
            if ((go.estimateTime / 60) <= 1) {
              dot.className = 'item-dot-go item-dot-info';
            } else if ((go.estimateTime / 60) > 1 && (go.estimateTime / 60) <= 2) {
              dot.className = 'item-dot-go item-dot-info';
            }
          }
        })

        goNames.forEach(name => {
          let stopid = name.getAttribute('data-stopId');

          if (stopid === go.stopId) {
            if ((go.estimateTime / 60) <= 1) {
              name.className = 'item-name-go fs-14 fw-bold my-auto';
            } else {
              name.className = 'item-name-go fs-14 my-auto';
            }
          }

        })
      })

      // show back time
      const backItemBsdges = document.querySelectorAll('.item-badge-back'),
            backItemDots = document.querySelectorAll('.item-dot-back'),
            backNames = document.querySelectorAll('.item-name-back');

      backTime.forEach(back => {
        backItemBsdges.forEach(badge => {
          let stopid = badge.getAttribute('data-stopId');

          if (stopid === back.stopId) {
            if ((back.estimateTime / 60) <= 1) {
              badge.className = 'item-badge-back item-badge d-block text-nowrap rounded-10 text-white lh-sm fs-14 text-center py-1 me-3 bg-info'
              badge.innerHTML = '進站中';
            } else if ((back.estimateTime / 60) > 1 && (back.estimateTime / 60) <= 2) {
              badge.className = 'item-badge-back item-badge d-block text-nowrap rounded-10 text-white lh-sm fs-14 text-center py-1 me-3 bg-info'
              badge.innerHTML = '即將進站';
            } else if (isNaN(back.estimateTime)) {
              badge.className = 'item-badge-go item-badge d-block text-nowrap rounded-10 text-white lh-sm fs-14 text-center py-1 me-3 bg-a9'
            } else {
              badge.className = 'item-badge-back item-badge d-block text-nowrap rounded-10 text-white lh-sm fs-14 text-center py-1 me-3 bg-success'
              badge.innerHTML = `${Math.floor(back.estimateTime / 60)} 分鐘`;
            }
          }
        })

        backItemDots.forEach(dot => {
          let stopid = dot.getAttribute('data-stopId');

          if (stopid === back.stopId) {
            if ((back.estimateTime / 60) <= 1) {
              dot.className = 'item-dot-back item-dot-info';
            } else if ((back.estimateTime / 60) > 1 && (back.estimateTime / 60) <= 2) {
              dot.className = 'item-dot-back item-dot-info';
            }
          }
        })

        backNames.forEach(name => {
          let stopid = name.getAttribute('data-stopId');

          if (stopid === back.stopId) {
            if ((back.estimateTime / 60) <= 1) {
              name.className = 'item-name-back fs-14 fw-bold my-auto';
            } else {
              name.className = 'item-name-back fs-14 my-auto';
            }
          }
        })
      })

    })
    .then(rew => {
      goStops = [];
      goTime = [];
      backStops = [];
      backTime = [];
    })
    .catch(err => console.log(err));
}
