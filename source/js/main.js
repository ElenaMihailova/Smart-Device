import { iosVhFix } from "./utils/ios-vh-fix";
import { initModals } from "./modules/modals/init-modals";
import { createFocusTrap } from "focus-trap";

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

let focusTrap;

openModal(".header__button", ".modal", () => {
  setTimeout(() => {
    focusTrap = createFocusTrap(".modal");
    focusTrap.activate();
    document.getElementById("input-modal-name").focus();
  }, 100);
});

const closeModal = () => {
  const modals = document.querySelectorAll(".modal");
  if (!modals) {
    return;
  }
  modals.forEach((elem) => {
    elem.addEventListener("click", (el) => {
      if (
        el.target.closest(".modal__close") ||
        el.target.closest(".modal__overlay")
      ) {
        elem.classList.remove("modal--active");
        if (focusTrap) focusTrap.deactivate();
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
  const element = document.getElementById("tel");
  if (!element) {
    return;
  }
  const maskOptions = {
    mask: "+{7}(000)000-00-00",
  };
  IMask(element, maskOptions);
});

document.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById("tel-modal");
  if (!element) {
    return;
  }
  const maskOptions = {
    mask: "+{7}(000)000-00-00",
  };
  IMask(element, maskOptions);
});

/* Аккордион. Источник - https://www.cyberforum.ru/javascript/thread2770907.html */
document.addEventListener("DOMContentLoaded", getReady);
function getReady() {
  document.querySelectorAll(".accordion__order").forEach((elem) => {
    elem.addEventListener("click", click__title);
  });
}

function click__title() {
  if (this.nextElementSibling.style.display == "block") {
    this.nextElementSibling.style.display = "none";
    return;
  }
  document.querySelectorAll(".accordion__content").forEach((elem) => {
    elem.style.display = "none";
  });
  this.nextElementSibling.style.display = "block";
}

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

const forms = document.querySelectorAll(".js-form");

forms.forEach((formElem) => {
  const pristine = new Pristine(formElem, {
    classTo: "form__input-wrapper",
    errorClass: "form__item--invalid",
    successClass: "form__item--valid",
    errorTextParent: "form__input-wrapper",
    errorTextTag: "span",
    errorTextClass: "form__error",
  });

  function validatePhone(value) {
    return value.length === 16;
  }

  pristine.addValidator(
    formElem.querySelector(".js-input--tel"),
    validatePhone,
    "Телефонный номер в формате +7(495)000-00-00"
  );

  formElem.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    if (valid) {
      formElem.submit();
    }
  });
});
