const drawMapModal = document.querySelector('#modalDrawMap');
const showFlatsButton = document.querySelector('#showFlats');
const adList = document.querySelector('#adList');
const sortAdsModal = document.querySelector('#sortAds');
const buttonOrder = document.querySelector('#buttonOrder');

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

function disableSortAdsModal(){
  sortAdsModal.classList.remove('open');
}
function enableSortAdsModal(){
  sortAdsModal.classList.add('open');
}

mapboxgl.accessToken = 'pk.eyJ1Ijoiamh1cnRhZG8xMjMiLCJhIjoiY2s3dGlqZWtlMHFveTNvbjF1bjJxYTg2ayJ9.zbzGWyoeQ52ddJTrK2gjdA';
var map = new mapboxgl.Map({
  container: 'mapDraw', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 10,
  center: [2.154007, 41.390205],
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
          markers.push(new mapboxgl.Marker({color:'yellow'})
            .setLngLat([ad.coords.lng, ad.coords.lat])
            .addTo(map));
        });
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
      console.log("hola")
      createAdsOnView(result.data.ads);
      disableSortAdsModal();
    })
    .catch(error => console.log(error));
});


function createAdsOnView(ads) {
  adList.innerHTML = '';
  ads.forEach(ad => {
    const imagesHtmlString = getHtmlImagesString(ad.images);
    let string = `<div>
            <div class="slideshow-container">
                ${imagesHtmlString}
              <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
              <a class="next" onclick="plusSlides(1)">&#10095;</a>
            </div>
            <h3>${ad.title}</h3>
            <h4>${ad.price}€</h4>
            <p>${ad.city}</p>
            <div class ="summary-info">
              <p>${ad.parameters.square_meters} m² <img src="/images/icons/area.png"></p>
              <p>${ad.parameters.flat_status}º piso<img src="/images/icons/ruler.png"></p>
              <p>2 hab.<img src="/images/icons/bed.png"></p>
              <p>1 bañ.<img src="/images/icons/shower.png"></p>
            </div>
            <p>${ad.description}</p>
            <a href="/ad/${ad._id}" class="button">Ver piso</a>
          </div>`;
    adList.innerHTML += string;
  });
  if (!ads.length) {
    adList.innerHTML = '<div class="not-found">No hay anuncios disponibles es esta busqueda</div>'
  } else {
    showSlides();
  }
}

function getHtmlImagesString(images) {
  let string = '';
  images.forEach(image => {
    string += `<div class="mySlides fade"><img src="/uploads/picturesAd/${image}" class="slide"></div>`;
  });
  return string;
}