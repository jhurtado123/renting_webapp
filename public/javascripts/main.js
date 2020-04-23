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
    if (notifications.classList.contains('open')) {
      notifications.classList.remove('open');
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

//NOTIFICATIONS
const notifications = document.querySelector('.notifications');
const notificationsList = document.querySelector('#notificationsList');
const notificationsCount = document.querySelector('.notifications-count');


notifications.addEventListener('click', () => {
  if (notifications.classList.contains('open')) {
    notifications.classList.remove('open');
  } else {
    notifications.classList.add('open');
    notificationsCount.innerHTML = '0';
    axios.post('/api/notifications/read');
  }
});

const footerMenu = document.querySelector('#footerMenu');

stickyFooter();

window.addEventListener('resize', stickyFooter);

function stickyFooter() {
  footerMenu.style.width = wrapper.offsetWidth -4+ 'px';
  footerMenu.style.maxWidth = wrapper.offsetWidth -4 + 'px';
  footerMenu.style.left = wrapper.offsetLeft + 2+ 'px';
  footerMenu.style.top = wrapper.offsetTop + (wrapper.offsetHeight - footerMenu.offsetHeight - 2 ) + 'px';
}
