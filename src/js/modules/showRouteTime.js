export default function showRouteTime(goStops, goTime, backStops, backTime) {

  // console.log('go time:', goTime);
  
  const stopArr = [];
  


  goStops.forEach(stop => {
    goTime.forEach(time => {
      if(time.stopId === stop.stopId) {
        goStops.time = time.estimateTime;
      }
    })
  });
  
  // console.log('go stop:', goStops);
  


  // console.log('back time:', backTime);
  // console.log('back stop:', backStops)
}