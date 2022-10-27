import { iosVhFix } from "./utils/ios-vh-fix";
import { initModals } from "./modules/modals/init-modals";

document.querySelector(".nojs").classList.remove("nojs");

window.addEventListener("DOMContentLoaded", () => {
  iosVhFix();
  window.addEventListener("load", () => {
    initModals();
  });
});

/* Источник - https://frontips.ru/variant-modalnyh-okon-na-javascript */
const openModal = (triggerSelector, modalDataSelector, onModalOpened) => {
  const trigger = document.querySelector(triggerSelector);
  const modal = document.querySelector(modalDataSelector);
  if (!trigger || !modal) {
    return;
  }
  trigger.addEventListener("click", (elem) => {
    if (document.querySelector(".modal")) {
      elem.preventDefault();
      modal.classList.add("modal--active");
      if (onModalOpened) {
        onModalOpened();
      }
    }
    return;
  });
};

openModal(".header__button", ".modal", () => {
  setTimeout(() => document.getElementById("input-modal-name").focus(), 100);
});

const closeModal = () => {
  const modals = document.querySelectorAll(".modal");
  if (!modals) {
    return;
  }
  modals.forEach((elem) => {
    elem.addEventListener("click", (el) => {
      if (el.target.closest(".modal__close")) {
        elem.classList.remove("modal--active");
      }
      if (el.target.closest(".modal__overlay")) {
        elem.classList.remove("modal--active");
      }
    });
  });
};

closeModal();

function showMoreText() {
  const btn = document.querySelector(".about__button");
  const moreText = document.querySelector(".about__description-more");

  if (!moreText.classList.contains("about__description--opened")) {
    btn.textContent = "Свернуть";
    moreText.classList.add("about__description--opened");
  } else {
    btn.textContent = "Подробнее";
    moreText.classList.remove("about__description--opened");
  }
}

document
  .querySelector(".about__button")
  .addEventListener("click", showMoreText);

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('[data-mask="phone"]');
  if (!elements) {
    return;
  }
  const PHONE_OPTIONS = {
    mask: "+{7}(000)000-00-00",
  };
  elements.forEach((el) => {
    IMask(el, PHONE_OPTIONS);
  });
});

function addAccordionListener(accordionItemElement) {
  const buttonElement =
    accordionItemElement.querySelector(".accordion__button");
  buttonElement.addEventListener("click", () => {
    accordionItemElement.classList.add("accordion__item--opened");
  });
}

addAccordionListener(document.querySelector(".footer__nav.accordion__item"));
addAccordionListener(
  document.querySelector(".footer__address.accordion__item")
);

/* Источник - https://proweb63.ru/help/js/smooth-scroll-by-js */
const smoothLinks = document.querySelectorAll(".link-js");
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const link = smoothLink.getAttribute("href");

    document.querySelector(link).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

const form = document.querySelector(".js-form");

const pristine = new Pristine(
  form,
  {
    classTo: "form__input-wrapper",
    errorClass: "form__item--invalid",
    successClass: "form__item--valid",
    errorTextParent: "form__input-wrapper",
    // errorTextTag: "span",
    errorTextClass: "form__error",
  },
  false
);

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  pristine.validate();
});
