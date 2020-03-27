const password = document.querySelector('[name=password]');
const strengtText = document.querySelector('.password-strength');

password.addEventListener('keyup', () => {
  const score = scorePassword(password.value);
  console.log(score);
  if (score >= 60) {
    password.style.borderBottom = "2px solid green";
    strengtText.style.color = 'green';
    strengtText.innerHTML = 'Strong';
  }
  if (score < 60) {
    password.style.borderBottom = "2px solid orange";
    strengtText.style.color = 'orange';
    strengtText.innerHTML = 'Normal';
  }
  if (score <= 30) {
    password.style.borderBottom = "2px solid red";
    strengtText.style.color = 'red';
    strengtText.innerHTML = 'Weak';
  }
});

function scorePassword(pass) {
  var score = 0;
  if (!pass)
    return score;

  // award every unique letter until 5 repetitions
  var letters = new Object();
  for (var i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  var variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  }

  variationCount = 0;
  for (var check in variations) {
    variationCount += (variations[check] == true) ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  return parseInt(score);
}