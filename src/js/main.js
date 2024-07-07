import "../scss/main.scss";

document.addEventListener("DOMContentLoaded", (event) => {
  let screenWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    screenWidth = window.innerWidth;
  });

  // ******************************************** СВАЙПЕРЫ ********************************************

  let brandsSwiper;
  let equipmentSwiper;
  let pricesSwiper;
  // Прослушивание изменения размера окна
  window.addEventListener("resize", updateSwipersOnResize);

  // Первоначальная проверка
  updateSwipersOnResize();

  function initSwiper(selector) {
    return new Swiper(selector, {
      slidesPerView: "auto",
      loop: true,
      spaceBetween: 16,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          spaceBetween: 0,
          enabled: false,
        },
      },
    });
  }

  function updateSwipersOnResize() {
    if (screenWidth <= 768) {
      if (!brandsSwiper) {
        brandsSwiper = initSwiper(".brands__swiper");
      }
      if (!equipmentSwiper) {
        equipmentSwiper = initSwiper(".equipment__swiper");
      }
      if (!pricesSwiper) {
        pricesSwiper = initSwiper(".prices__swiper");
      }
    } else {
      // Уничтожаем Swiper только если он был инициализирован
      if (brandsSwiper) {
        brandsSwiper.destroy(true, true);
        brandsSwiper = undefined;
      }
      if (equipmentSwiper) {
        equipmentSwiper.destroy(true, true);
        equipmentSwiper = undefined;
      }
      if (pricesSwiper) {
        pricesSwiper = undefined;
      }
    }
  }

  // ФУНКЦИЯ, УБИРАЮЩАЯ СКРОЛЛ ПРИ ОТКРЫТЫХ МЕНЮ-БУРГЕР ИЛИ МОДАЛЬНЫХ ОКНАХ

  function toggleScroll(shouldScroll) {
    if (shouldScroll) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }

  // ******************************************** УПРАВЛЕНИЕ МЕНЮ-БУРГЕР ПРИ РЕСАЙЗЕ И КЛИКЕ ********************************************

  const blurBurgerMenu = document.querySelector(".blur-burger-menu");
  const burgerMenu = document.querySelector(".burger-menu");

  window.addEventListener("resize", () => {
    if (screenWidth >= 1440) {
      burgerMenu.style.transform = "none";
      burgerMenu.style.boxShadow = "none";
      blurBurgerMenu.style.display = "none";
      toggleScroll(true);
    } else {
      burgerMenu.style.transform = "translateX(-100%)";
      burgerMenu.style.boxShadow = "none";
      blurBurgerMenu.style.display = "none";
      toggleScroll(true);
    }
  });

  document.addEventListener("click", (event) => {
    if (screenWidth <= 1440) {
      if (event.target.closest(".burger")) {
        burgerMenu.style.transform = "translateX(0)";
        burgerMenu.style.boxShadow = "16px 0px 52px 0px rgba(14, 24, 80, 0.2)";
        blurBurgerMenu.style.display = "block";
        toggleScroll(false);
      } else if (
        event.target.closest(".burger-menu__close") ||
        !event.target.closest(".burger-menu")
      ) {
        burgerMenu.style.transform = "translateX(-100%)";
        burgerMenu.style.boxShadow = "none";
        blurBurgerMenu.style.display = "none";
        toggleScroll(true);
      }
    } else {
      burgerMenu.style.transform = "none";
      burgerMenu.style.boxShadow = "none";
      blurBurgerMenu.style.display = "none";
      toggleScroll(true);
    }
  });

  // ******************************************** УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ ПРИ КЛИКЕ ********************************************

  const blurModalCall = document.querySelector(".blur-modal-call");
  const blurModalFeedback = document.querySelector(".blur-modal-feedback");

  const modalCall = document.querySelector(".modal-call");
  const modalFeedback = document.querySelector(".modal-feedback");
  // ЗАКАЗАТЬ ЗВОНОК
  document.addEventListener("click", (event) => {
    if (event.target.closest(".call")) {
      modalCall.style.transform = "translateX(0)";
      modalCall.style.boxShadow = "16px 0px 52px 0px rgba(14, 24, 80, 0.2)";
      blurModalCall.style.display = "block";
      toggleScroll(false);
    } else if (
      event.target.closest(".modal__close") ||
      !event.target.closest(".modal-call")
    ) {
      modalCall.style.transform = "translateX(120%)";
      modalCall.style.boxShadow = "none";
      blurModalCall.style.display = "none";
      toggleScroll(true);
    }
  });
  // ОБРАТНАЯ СВЯЗЬ
  document.addEventListener("click", (event) => {
    if (event.target.closest(".feedback")) {
      modalFeedback.style.transform = "translateX(0)";
      modalFeedback.style.boxShadow = "16px 0px 52px 0px rgba(14, 24, 80, 0.2)";
      blurModalFeedback.style.display = "block";
      toggleScroll(false);
    } else if (
      event.target.closest(".modal__close") ||
      !event.target.closest(".modal-feedback")
    ) {
      modalFeedback.style.transform = "translateX(120%)";
      modalFeedback.style.boxShadow = "none";
      blurModalFeedback.style.display = "none";
      toggleScroll(true);
    }
  });

  // ******************************************** КНОПКА ЧИТАТЬ ДАЛЕЕ В БЛОКЕ info-service ********************************************

  const readMoreInfoService = document.querySelector(
    ".info-service__read-more"
  );
  const readMoreInfoServiceImg = readMoreInfoService.firstElementChild;
  const readMoreInfoServiceContent = readMoreInfoService.lastElementChild;
  const infoServiceHiddenContent = document.querySelector(
    ".info-service__description-text_hide"
  );
  readMoreInfoService.addEventListener("click", () => {
    if (infoServiceHiddenContent.style.maxHeight) {
      infoServiceHiddenContent.style.maxHeight = null;
      readMoreInfoServiceImg.style.transform = "none";
      readMoreInfoServiceContent.textContent = "Читать далее";
    } else {
      infoServiceHiddenContent.style.maxHeight =
        infoServiceHiddenContent.scrollHeight + "px";
      readMoreInfoServiceImg.style.transform = "rotate(180deg)";
      readMoreInfoServiceContent.textContent = "Скрыть";
    }
  });

  // ******************************************** КНОПКА ПОКАЗАТЬ ЕЩЕ В БЛОКЕ brands ********************************************

  const showMoreBrands = document.querySelector(".brands__show-more");
  const showMoreBrandsImg = showMoreBrands.firstElementChild;
  const showMoreBrandsContent = showMoreBrands.lastElementChild;
  const brandsHiddenContent = document.querySelector(".brands__swiper-wrapper");

  showMoreBrands.addEventListener("click", () => {
    if (brandsHiddenContent.style.maxHeight) {
      brandsHiddenContent.style.maxHeight = null;
      showMoreBrandsImg.style.transform = "none";
      showMoreBrandsContent.textContent = "Показать еще";
    } else {
      brandsHiddenContent.style.maxHeight =
        brandsHiddenContent.scrollHeight + "px";
      showMoreBrandsImg.style.transform = "rotate(180deg)";
      showMoreBrandsContent.textContent = "Скрыть";
    }
  });

  // ******************************************** КНОПКА ПОКАЗАТЬ ЕЩЕ В БЛОКЕ equipment ********************************************

  const showMoreEquipment = document.querySelector(".equipment__show-more");
  const showMoreEquipmentImg = showMoreEquipment.firstElementChild;
  const showMoreEquipmentContent = showMoreEquipment.lastElementChild;
  const equipmentHiddenContent = document.querySelector(
    ".equipment__swiper-wrapper"
  );

  showMoreEquipment.addEventListener("click", () => {
    if (equipmentHiddenContent.style.maxHeight) {
      equipmentHiddenContent.style.maxHeight = null;
      showMoreEquipmentImg.style.transform = "none";
      showMoreEquipmentContent.textContent = "Показать еще";
    } else {
      equipmentHiddenContent.style.maxHeight =
        equipmentHiddenContent.scrollHeight + "px";
      showMoreEquipmentImg.style.transform = "rotate(180deg)";
      showMoreEquipmentContent.textContent = "Скрыть";
    }
  });

  function validateForm() {
    // Проверка каждого поля формы
    // Если какое-либо поле не заполнено, возвращаем false
    // Если все поля заполнены, возвращаем true
  }
});
