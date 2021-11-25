import showSearchResults from "./showSearchResults.js";

export default function searchRoutes(routesData, city) {
  const keyword = document.querySelector('#routeSearchInput').value;  
  const key = new RegExp(keyword);

  const resultData = routesData.filter(route =>  
    key.test(route.RouteName.Zh_tw) ||
    key.test(route.DepartureStopNameZh) ||
    key.test(route.DepartureStopNameEn) ||
    key.test(route.DestinationStopNameZh) ||
    key.test(route.DestinationStopNameEn) ||
    key.test(route.RouteName.En)
  );

  showSearchResults(resultData, city);

}