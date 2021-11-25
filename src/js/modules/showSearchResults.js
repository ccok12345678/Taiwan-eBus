export default function showSearchResults(routesData, city) {
  const resultContainer = document.querySelector('#searchResultsContainer');
  let results = '';

  if (routesData.length === 0) {
    results = `
      <div class="alert alert-info text-center border-0 fs-14" role="alert">
      <i class="bi bi-file-earmark-excel"></i>
        沒有相關路線，囧
      </div>
    `;
    resultContainer.innerHTML = results;
    return;
  }

  routesData.forEach(route => {
    let name = route.RouteName.Zh_tw,
        departure = route.DepartureStopNameZh,
        destination = route.DestinationStopNameZh;
    
    results += `
      <a class="routeListItem list-group-item d-flex justify-content-between hover-slide" href="#">
        <div>
          <h4 class="fs-20 fw-bold mb-0">${name}</h4>
          <p class="fs-14 text-88 mb-0">${departure} - ${destination}</p>
        </div>
        <div class="d-flex flex-column"><img class="mb-auto ms-auto hover-heart-fill" src="../images/icon_heart.svg">
          <p class="fs-14 text-88 mb-0">${city}</p>
        </div>
      </a>
    `;
  });

  resultContainer.innerHTML = results;
}