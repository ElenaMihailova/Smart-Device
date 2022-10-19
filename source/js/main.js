import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';

window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();
  window.addEventListener('load', () => {
    initModals();
  });
});

/* Источник - https://proweb63.ru/help/js/smooth-scroll-by-js */
const smoothLinks = document.querySelectorAll('a[href="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

/* Источник - https://frontips.ru/variant-modalnyh-okon-na-javascript */
const openModal = (triggerSelector, modalDataSelector, onModalOpened) => {
  const trigger = document.querySelector(triggerSelector);
  const modal = document.querySelector(modalDataSelector);
  if (!trigger || !modal) {
    return;
  }
  trigger.addEventListener('click', (elem) => {
    elem.preventDefault();
    modal.classList.add('modal--active');
    if (onModalOpened) {
      onModalOpened();
    }
  });
};

openModal('.header__button', '.modal', () => {
  setTimeout(() => document.getElementById('input-modal-name').focus(), 100);
});

const closeModal = () => {
  const modals = document.querySelectorAll('.modal');
  if (!modals) {
    return;
  }
  modals.forEach((elem) => {
    elem.addEventListener('click', (el) => {
      if (el.target.closest('.modal__close')) {
        elem.classList.remove('modal--active');
      }
      if (el.target.closest('.modal__overlay')) {
        elem.classList.remove('modal--active');
      }
    });
  });
};

closeModal();

// const popup = document.querySelector('.navigation__wrapper');
// var openPopupButton = document.querySelector('.accordion');

// openPopupButton.addEventListener('click', function (evt) {
//   evt.preventDefault();
//   popup.classList.remove('navigation__wrapper');
//   popup.classList.add('opened');
// });
