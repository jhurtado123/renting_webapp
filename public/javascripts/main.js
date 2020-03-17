const lateralMenu = document.querySelector('#lateralMenu');
const wrapper = document.querySelector('#wrapper');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');

document.querySelector('#moreMenu').addEventListener('click', function () {
  if (lateralMenu.classList.contains('open')) {
    enableLateralMenu();
  } else {
    disableLateralMenu();
  }
});
document.querySelectorAll('#content, .close-menu, #backdrop').forEach(element => {
  element.addEventListener('click', function () {
    if (lateralMenu.classList.contains('open')) {
      enableLateralMenu();
    }
  });
});

function enableLateralMenu() {
  lateralMenu.classList.remove('open');
  content.style.overflowY = 'visible';
  backdrop.style.display = 'none';
}
function disableLateralMenu() {
  lateralMenu.classList.add('open');
  content.style.overflowY = 'hidden';
  backdrop.style.display = 'block';
}