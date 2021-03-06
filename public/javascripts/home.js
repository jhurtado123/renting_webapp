const drawMapModal = document.querySelector('#modalDrawMap');
const showFlatsButton = document.querySelector('#showFlats');
const adList = document.querySelector('#adList-list');
const sortAdsModal = document.querySelector('#sortAds');
const buttonOrder = document.querySelector('#buttonOrder');
const filterAdsModal = document.querySelector('#filterAds');
const filterAdsButton = document.querySelector('#buttonFilter');

document.querySelector('#openDrawMap').addEventListener('click', () => {
  if (drawMapModal.classList.contains('open')) {
    disableDrawMapModal();
  } else {
    enableDrawMapModal();
  }
});
document.querySelector('#modalDrawMap .close').addEventListener('click', disableDrawMapModal);

document.querySelector('#openSortAds').addEventListener('click', () => {
  if (sortAdsModal.classList.contains('open')) {
    disableSortAdsModal();
  } else {
    enableSortAdsModal();
  }
});
document.querySelector('#sortAds .close').addEventListener('click', disableSortAdsModal);


document.querySelector("#openFilterAds").addEventListener("click", () => {
  if (filterAdsModal.classList.contains("open")) {
    disableFilterAdsModal();
  } else {
    enableFilterAdsModal();
  }
});
document.querySelector("#filterAds .close").addEventListener("click", disableFilterAdsModal);


function disableDrawMapModal() {
  backdrop.style.display = 'none';
  content.style.overflowY = 'visible';
  drawMapModal.classList.remove('open');
}

function enableDrawMapModal() {
  content.style.overflowY = 'hidden';
  backdrop.style.display = 'block';
  drawMapModal.classList.add('open');
}

function disableSortAdsModal() {
  backdrop.style.display = 'none';
  sortAdsModal.classList.remove('open');
}

function enableSortAdsModal() {
  backdrop.style.display = 'block';
  sortAdsModal.classList.add('open');
}

function disableFilterAdsModal(){
  backdrop.style.display = 'none';
  filterAdsModal.classList.remove('open');
}
function enableFilterAdsModal(){
  backdrop.style.display = 'block';
  filterAdsModal.classList.add('open');
}

mapboxgl.accessToken = 'pk.eyJ1Ijoiamh1cnRhZG8xMjMiLCJhIjoiY2s3dGlqZWtlMHFveTNvbjF1bjJxYTg2ayJ9.zbzGWyoeQ52ddJTrK2gjdA';

function getCurrentCoords() {
  let coords =  navigator.geolocation.getCurrentPosition(function (coords) {
    if (coords) {
      console.log(coords);
      map.flyTo({
        center: [
         coords.coords.longitude,
          coords.coords.latitude,
        ],
        essential: true
      });
    }
  }, (error) => console.log(error), {timeout:60000});

  if (coords === undefined) return [2.154007, 41.390205];
}

var map = new mapboxgl.Map({
  container: 'mapDraw', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 10,
  center: getCurrentCoords(),
  interactive: true
});

var draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  }
});
map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

const markers = [];
let polygon;

function updateArea(e) {
  var data = draw.getAll();
  var answer = document.getElementById('calculated-area');
  if (data.features.length > 0) {
    removeAllMarkers();
    polygon = data.features[0].geometry.coordinates[0];
    axios.post('/api/get/ads/points', {'polygon': polygon})
      .then(result => {
        const {ads} = result.data;
        ads.forEach(ad => {
          console.log(ad);
          markers.push(new mapboxgl.Marker({color: 'yellow'})
            .setLngLat([ad.location.coordinates[0], ad.location.coordinates[1]])
            .addTo(map));
        });
        showFlatsButton.querySelector('span').innerHTML = `(${ads.length})`;
      })
      .catch(error => console.log(error));
  } else {
    polygon = undefined;
  }
}

function removeAllMarkers() {
  markers.forEach(marker => marker.remove());
}

showFlatsButton.addEventListener('click', () => {
  if (!polygon) return false;

  axios.post('/api/get/ads', {'polygon': polygon})
    .then(result => {
      createAdsOnView(result.data.ads);
      disableDrawMapModal();
    })
    .catch(error => console.log(error));
});

let order;
buttonOrder.addEventListener('click', () => {
  axios.post('/api/sort/ads', {'order': document.querySelector('#orderBy').value})
    .then(result => {
      createAdsOnView(result.data.ads);
      disableSortAdsModal();
    })
    .catch(error => console.log(error));
});

filterAdsButton.addEventListener("click", () => {
  let filter = {
    price: document.querySelector("#priceMin").value
      ? document.querySelector("#priceMin").value
      : 1,
    meters: document.querySelector("#metersMin").value
      ? document.querySelector("#metersMin").value
      : 1,
    rooms: document.querySelector("#rooomsMin").value
      ? document.querySelector("#rooomsMin").value
      : 1,
    wc: document.querySelector("#wcMin").value
      ? document.querySelector("#wcMin").value
      : 1,
    parking: document.querySelector("#parking").checked,
    terrace: document.querySelector("#terrace").checked,
    elevator: document.querySelector("#elevator").checked,
    storage: document.querySelector("#storage").checked
  };
  axios.post('/api/filter/ads', { 'filter': filter })
    .then(result => {
      createAdsOnView(result.data.ads);
      disableFilterAdsModal();
    })
    .catch(error => console.log(error));
});


function createAdsOnView(ads) {
  adList.innerHTML = '';
  if (!ads.length) {
    adList.innerHTML = '<div class="not-found">No hay anuncios disponibles es esta búsqueda</div>';
    return;
  }
  ads.forEach(ad => {
    const imagesHtmlString = getHtmlImagesString(ad.images);
    const fairPriceString = getFairPriceString(ad.fairPrice, ad.price);
    let string = `<div id="adList">
            <div class="slideshow-container" data-id="${ad._id}">
                ${imagesHtmlString}
              <a class="prev" onclick="plusSlides('${ad._id}')">&#10094;</a>
              <a class="next" onclick="plusSlides('${ad._id}')">&#10095;</a>
            </div>
            <a href="/ad/${ad._id}" class="ad-info">
              <h3>${ad.title}</h3>
              <h4>${ad.price}€</h4>
              ${fairPriceString}
              <p>${ad.neighborhood}, ${ad.city}</p>
              <div class="summary-info">
                <p><img src="/images/icons/area.png"> ${ad.parameters.square_meters} m²</p>
                <p><img src="/images/icons/bed.png"> ${ad.parameters.rooms} hab.</p>
                <p><img src="/images/icons/shower.png"> ${ad.parameters.bathrooms} bañ.</p>
              </div>
            </a>
          </div>`;
    adList.innerHTML += string;
  });
  disableDrawMapModal();
  activateSliders();

}

function getFairPriceString(fairPrice, price) {
  if (!fairPrice || !price) return;
  let percentDifference, result;
  if (fairPrice > price) {
    percentDifference = -(Math.round(((price - fairPrice) / price * 100)));
  } else {
    percentDifference = Math.round(((price - fairPrice) / price * 100));
  }
  if (fairPrice < price && percentDifference >= 5){
    result = `<div class="fairPrice expensive"><i class="fa fa-arrow-up"></i>El piso es un ${percentDifference}% mas caro de lo recomendado</div>`;
  } else if ( fairPrice > price && percentDifference >= 5) {
    result = `<div class="fairPrice cheap"><i class="fa fa-arrow-down"></i>El piso es un ${percentDifference}% más barato de lo recomendado</div>`;
  } else {
    result = `<div class="fairPrice ok">El precio del piso está dentro la cantidad recomendada</div>`;
  }
  return result;
}

function getHtmlImagesString(images) {
  let string = '';
  images.forEach((image, index) => {
    string += `<div class="mySlides fade" data-index="${index}"><img src="/uploads/picturesAd/${image}" class="slide"></div>`;
  });
  return string;
}