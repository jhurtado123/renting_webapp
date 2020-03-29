// Range Treatment Owner Flat
const stars = document.querySelectorAll(".stars");
stars.forEach((star)=>{
  let starsDisplay = parseInt(star.innerHTML)
  switch (starsDisplay) {
    case 1:
      star.innerHTML = "★★★★<span class='star-active'>★<span>";
      break;
    case 2:
      star.innerHTML = "★★★<span class='star-active'>★<span>";
      break;
    case 3:
      star.innerHTML = "★★<span class='star-active'>★★★<span>";
      break;
    case 4:
      star.innerHTML = "★<span class='star-active'>★★★★<span>";
      break;
    case 5:
      star.innerHTML = "<span class='star-active'>★★★★★<span>";
      break;
    default:
      break;
  }
})
// Range Treatment Owner Flat
const treament = document.querySelectorAll(".treatment");
treament.forEach((treat)=>{
  let treatsDisplay = parseInt(treat.innerHTML)
  switch (treatsDisplay) {
    case 1:
      treat.innerHTML = "<span class='bad-treatment'>Malo</span>";
      break;
    case 2:
      treat.innerHTML = "<span class='notgood-treatment'>No muy bueno</span>";
      break;
    case 3:
      treat.innerHTML = "<span class='normal-treatment'>Correcto</span>";
      break;
    case 4:
      treat.innerHTML = "<span class='good-treatment'>Bueno</span>";
      break;
    case 5:
      treat.innerHTML = "<span class='perfect-treatment'>Perfecto</span>";
      break;
    default:
      break;
  }
})
// Range Treatment Owner Flat
const veracity = document.querySelectorAll(".veracity");
veracity.forEach((v)=>{
  let veracityDisplay = parseInt(v.innerHTML)
  switch (veracityDisplay) {
    case 1:
      v.innerHTML = "<span class='bad-veracity'>Muy diferente al anuncio</span>";
      break;
    case 2:
      v.innerHTML = "<span class='notgood-veracity'>Diferente al anuncio</span>";
      break;
    case 3:
      v.innerHTML = "<span class='normal-veracity'>Era lo que esperaba</span>";
      break;
    case 4:
      v.innerHTML = "<span class='good-veracity'>Muy similar al anuncio</span>";
      break;
    case 5:
      v.innerHTML = "<span class='perfect-veracity'>Perfecto</span>";
      break;
    default:
      break;
  }
})


