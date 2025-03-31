// const priceList = [];
// const additionalServices = [];
// const whyChooseUs = [];

import additionalServices from "../data/additionalServices.json" with { type: "json" };
import chooseUs from "../data/chooseUs.json" with { type: "json" };
import priceList from "../data/priceList.json" with { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
    fetch("./dictionary/translations.json")
        .then((response) => response.json())
        .then((resources) => {
            let autoLang = ["ro", "ru"].includes(navigator.language.slice(0, 2))
                ? navigator.language.slice(0, 2)
                : null;

            i18next
                .init({
                    lng: localStorage.getItem("selectedLanguage") || autoLang || "ro",
                    resources: resources,
                })
                .then(() => updateContent());
        });

    const languageSelector = document.getElementById("languageSelector");
    languageSelector.addEventListener("click", (e) => e.target.classList?.toggle("active"));

    Array.from(document.getElementsByClassName("languageIdentificator")).forEach((e) => {
        e.addEventListener("click", (e) => {
            i18next.changeLanguage(e?.target.dataset?.lang, () => {
                localStorage.setItem("selectedLanguage", e.target.dataset?.lang);
                updateContent();
            });
        });
    });

    function updateContent() {
        document.getElementById("languageSelector").value = i18next.language;
        document.getElementById("language__default").innerText =
            localStorage.getItem("selectedLanguage") || navigator.language.slice(0, 2) || "ro";
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            el.textContent = i18next.t(el.getAttribute("data-i18n"));
        });
    }

    function menuPaddingOnScroll() {
        const position = window.pageYOffset;
        if (position >= 100) {
            document.querySelector("header").classList.add("on-scroll");
        }

        window.addEventListener("scroll", scrollFromTop);
        function scrollFromTop() {
            let scrollLenth = window.pageYOffset;
            if (scrollLenth >= 100) {
                document.querySelector("header").classList.add("on-scroll");
            } else {
                document.querySelector("header").classList.remove("on-scroll");
            }
        }
    }
    menuPaddingOnScroll();

    if (window.innerWidth <= 1190.98) {
        adaptiveMenu();
    }

    const swiper = new Swiper(".ads-line", {
        loop: true, // Infinite loop
        autoplay: {
            delay: 1, // 3 seconds per slide
            disableOnInteraction: false, // Keeps autoplay after interaction
        },
        speed: 6000,
        slidesPerView: "auto", // Number of visible slides
        spaceBetween: 1, // Space between slides
        freeMode: true, // Allows continuous movement
        freeModeMomentum: false,
    });
});

let language = document.querySelector(".language");
let languageArrow = language.querySelector("svg");

language.addEventListener("click", () => language.classList.toggle("active"));

function adaptiveMenu() {
    const header = document.querySelector("header");
    const headerTop = document.querySelector(".header-top");
    const headerBottom = document.querySelector(".header-bottom-columns");
    const headerNav = document.querySelector(".header-nav");

    if (window.innerWidth <= 1190.98) {
        headerNav.append(headerTop);
    } else if (window.innerWidth > 1190.98) {
        header.prepend(headerTop);
    }
}

window.addEventListener("resize", () => {
    adaptiveMenu();
});

function burgerMenu() {
    let burgerElement = document.querySelector(".header-burger");
    let headerMenu = document.querySelector(".header-nav");
    let bodyScrollLook = document.querySelector("body");
    burgerElement.addEventListener("click", () => burgerElement.classList.toggle("active"));
    burgerElement.addEventListener("click", () => headerMenu.classList.toggle("active"));
    burgerElement.addEventListener("click", () => bodyScrollLook.classList.toggle("scroll-look"));
}
burgerMenu();

document.addEventListener("DOMContentLoaded", () => {
    // const fetchData = (url, callback) => {
    //     fetch(url)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             return response.json(); // Возвращаем результат метода response.json()
    //         })
    //         .then((data) => {
    //             console.log(data); // Логируем данные
    //             callback(data); // Передаем данные в callback
    //         })
    //         .catch((error) => {
    //             console.error(`Error loading JSON from ${url}:`, error);
    //         });
    // };

    // fetchData("./data/priceList.json", generatePriceCards);
    generatePriceCards(priceList);
    generateServiceCards(additionalServices);
    generateChooseUsCards(chooseUs);
    // fetchData("./data/additionalServices.json", generateServiceCards);
    // fetchData("./data/chooseUs.json", generateChooseUsCards);
});

function generatePriceCards(prices) {
    const priceList = document.querySelector(".cards-rows");

    prices.priceList.forEach((item) => {
        // Создаём основной контейнер карточки
        const card = document.createElement("div");
        card.classList.add("price-card");

        // Создаём изображение карточки
        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.title;

        // Создаём блок с данными о карточке
        const cardContent = document.createElement("div");
        cardContent.classList.add("price-card-info");

        // Создаём заголовок карточки
        const cardTitle = document.createElement("p");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = item.title_ro;

        // Создаём блок с ценой
        const priceWrapper = document.createElement("div");

        // Создаём элементы для цены
        const priceStartText = document.createElement("span");
        priceStartText.classList.add("card-price");
        // priceStartText.setAttribute("data-i18n", "start-prices");
        priceStartText.textContent = `de la ${item.start_price} lei`;

        // const priceLei = document.createElement("span");
        // priceLei.classList.add("card-price");
        // priceLei.setAttribute("data-i18n", "lei");
        // priceLei.textContent = " lei";

        // Добавляем элементы в блок с ценой
        priceWrapper.appendChild(priceStartText);
        // priceWrapper.appendChild(priceLei);

        // Создаём кнопку
        const orderButton = document.createElement("button");
        orderButton.classList.add("btn");
        orderButton.setAttribute("data-i18n", "order-now-btn");
        orderButton.type = "button";
        orderButton.textContent = "Comandă acum";

        // Добавляем заголовок, цену и кнопку в контент карточки
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(priceWrapper);
        cardContent.appendChild(orderButton);

        // Добавляем изображение и контент карточки в основную карточку
        card.appendChild(img);
        card.appendChild(cardContent);

        // Добавляем карточку в список
        priceList.appendChild(card);
    });
}


function generateServiceCards(services) {
    const serviceList = document.querySelector(".additional-services");

    services.additionalServices.forEach((service) => {
        // Создаём контейнер карточки
        const card = document.createElement("div");
        card.classList.add("additional-services-card");

        // Создаём изображение для карточки
        const img = document.createElement("img");
        img.src = service.icon;
        img.alt = service.title_ro;

        // Создаём элемент для заголовка
        const title = document.createElement("span");
        title.textContent = service.title_ro;

        // Добавляем изображение и заголовок в карточку
        card.appendChild(img);
        card.appendChild(title);

        // Добавляем карточку в список
        serviceList.appendChild(card);
    });
}

function generateChooseUsCards(whyChooseUs) {
    const chooseUsList = document.querySelector(".choose-us");

    whyChooseUs.chooseUs.forEach((item) => {
        // Создаём контейнер карточки
        const card = document.createElement("div");
        card.classList.add("choose-us-card");

        // Создаём элемент для заголовка
        const title = document.createElement("div");
        title.classList.add("choose-us-title");
        title.textContent = item.title_ro;

        // Добавляем заголовок в карточку
        card.appendChild(title);

        // Добавляем карточку в список
        chooseUsList.appendChild(card);
    });
}

