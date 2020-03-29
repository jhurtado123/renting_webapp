// Range Treatment Owner Flat
const rangeTreatment = document.querySelector("#rangeTreatment");

rangeTreatment.addEventListener("change", event => {
  if (event.currentTarget.value == 1) {
    document.getElementById("infoTreatment").innerHTML =
      "<span class='bad-treatment'>Mal trato</span>";
  } else if (event.currentTarget.value == 2) {
    document.getElementById("infoTreatment").innerHTML =
      "<span class='notgood-treatment'>No muy buen trato</span>";
  } else if (event.currentTarget.value == 3) {
    document.getElementById("infoTreatment").innerHTML =
      "<span class='normal-treatment'>Trato correcto</span>";
  } else if (event.currentTarget.value == 4) {
    document.getElementById("infoTreatment").innerHTML =
      "<span class='good-treatment'>Buen trato</span>";
  } else {
    document.getElementById("infoTreatment").innerHTML =
      "<span class='perfect-treatment'>Perfecto trato</span>";
  }
});
rangeTreatment.dispatchEvent(new Event("change"));

// Range Treatment Owner Flat
const rangeVeracity = document.querySelector("#rangeVeracity");

rangeVeracity.addEventListener("change", event => {
  if (event.currentTarget.value == 1) {
    document.getElementById("infoVeracity").innerHTML =
      "<span class='bad-veracity'>Muy diferente al anuncio</span>";
  } else if (event.currentTarget.value == 2) {
    document.getElementById("infoVeracity").innerHTML =
      "<span class='notgood-veracity'>Diferente al anuncio</span>";
  } else if (event.currentTarget.value == 3) {
    document.getElementById("infoVeracity").innerHTML =
      "<span class='normal-veracity'>Era lo que esperaba</span>";
  } else if (event.currentTarget.value == 4) {
    document.getElementById("infoVeracity").innerHTML =
      "<span class='good-veracity'>Muy similar al anuncio</span>";
  } else {
    document.getElementById("infoVeracity").innerHTML =
      "<span class='perfect-veracity'>Perfecto</span>";
  }
});

rangeVeracity.dispatchEvent(new Event('change'));
