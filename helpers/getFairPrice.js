const { curly } = require("node-libcurl");

async function getFairPrice(data){
  console.log("data", data)
  let { flat_status, parking, storage_room, postal_code, height, hasElevator, terrace, square_meters } = data;
  return await getSalaryByPostalCode(postal_code)
    .then(response => {
      let basePrice = (response / 12) * 0.25;
      let meterPrice = (response / 12) * 0.003;
      let fairPrice = basePrice;
      if (!hasElevator && height >= 2) fairPrice -= 50;
      if (terrace) fairPrice += 50;
      if (parking) fairPrice += 75;
      if (storage_room) fairPrice += 25;
      if (square_meters && square_meters > 60) { fairPrice += ((square_meters - 60) * meterPrice) }
      else if (square_meters && square_meters < 60) {
        fairPrice -= ((60 - square_meters) * meterPrice)
      }
      switch (parseInt(flat_status)) {
        case 1:
          fairPrice -= (fairPrice * 0.1)
          break;
        case 2:
          fairPrice -= (fairPrice * 0.05)
          break;
        case 4:
          fairPrice += (fairPrice * 0.05)
          break;
        case 5:
          fairPrice += (fairPrice * 0.1)
          break;
        default:
          break;
      }
      return fairPrice;
    })
    .catch(error => console.log(error))
}

async function getSalaryByPostalCode(postal_code) {
  const url = `https://seguro.elpais.com/estaticos/2019/01/renta_codigos_postal/suggest.pl?q=${postal_code}&code=9`;
  const { data } = await curly.get(url);
  const response = getJsonFromResponse(data);

  return response !== '' ? parseInt(response.renta) : 22000;
}

function getJsonFromResponse(response) {
  response = response.split('[')[1];
  response = response.split(']')[0];

  return response === '' ? '' : JSON.parse(response);
}
module.exports = getFairPrice;