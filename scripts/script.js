import additionalServices from "../data/additionalServices.json" with { type: "json" };
import chooseUs from "../data/chooseUs.json" with { type: "json" };
import priceList from "../data/priceList.json" with { type: "json" };

let autoLang = ["ro", "ru"].includes(navigator.language.slice(0, 2))
    ? navigator.language.slice(0, 2)
    : null;

let curentLang = localStorage.getItem("selectedLanguage") || autoLang || "ro";

document.addEventListener("DOMContentLoaded", () => {
    fetch("./dictionary/translations.json")
        .then((response) => response.json())
        .then((resources) => {
            let autoLang = ["ro", "ru"].includes(navigator.language.slice(0, 2))
                ? navigator.language.slice(0, 2)
                : null;

            i18next
                .init({
                    lng: curentLang,
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
                curentLang = e.target.dataset?.lang;
                updateContent();
            });
        });
    });

    function updateContent() {
        generateElementsFromData();

        document.getElementById("languageSelector").value = i18next.language;
        document.getElementById("language__default").innerText =
            localStorage.getItem("selectedLanguage") || navigator.language.slice(0, 2) || "ro";
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            el.textContent = i18next.t(el.getAttribute("data-i18n"));
        });
    }

    if (window.innerWidth <= 1190.98) {
        adaptiveMenu();
    }
});



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

// const swiperPartners = new Swiper(".footer-partners-list", {
//     loop: true, // Infinite loop
//     autoplay: {
//         delay: 1, // 3 seconds per slide
//         disableOnInteraction: false, // Keeps autoplay after interaction
//     },
//     speed: 300,
//     slidesPerView: 3, // Number of visible slides
//     spaceBetween: 1, // Space between slides
//     freeMode: true, // Allows continuous movement
//     freeModeMomentum: false,
// });


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
    burgerElement.addEventListener("click", () => {
        burgerElement.classList.toggle("active")
        headerMenu.classList.toggle("active")
        bodyScrollLook.classList.toggle("scroll-look")
    });

}
burgerMenu();

document.querySelectorAll(".header-nav-link").forEach(item => {
    let burgerElement = document.querySelector(".header-burger");
    let headerMenu = document.querySelector(".header-nav");
    let bodyScrollLook = document.querySelector("body");

    if (burgerElement.classList.contains("active")) {
        item.addEventListener("click", () => {
            headerMenu.classList.toggle("active")
            burgerElement.classList.toggle("active")
            bodyScrollLook.classList.toggle("scroll-look")
        })
    }

})

function generateElementsFromData() {
    generatePriceCards(priceList);
    generateServiceCards(additionalServices);
    generateChooseUsCards(chooseUs);
}

document.addEventListener("DOMContentLoaded", () => {
    generateElementsFromData()
});

function generatePriceCards(prices) {
    const priceList = document.querySelector(".cards-rows");

    priceList.innerHTML = "";

    prices.priceList[curentLang].forEach((item) => {
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
        cardTitle.textContent = item.title;

        // Создаём блок с ценой
        const priceWrapper = document.createElement("div");
        // priceWrapper.className.add("card-price-wrapper")
        priceWrapper.classList.add("card-price-wrapper");

        // Создаём элементы для цены
        const priceStartText = document.createElement("span");
        const priceLeiText = document.createElement("span");
        const priceText = document.createElement("span");

        priceStartText.classList.add("card-price-start");
        priceStartText.setAttribute("data-i18n", "start-prices");
        priceStartText.textContent = "de la ";

        priceLeiText.classList.add("card-price");
        priceLeiText.setAttribute("data-i18n", "lei");
        priceLeiText.textContent = " lei";

        priceText.classList.add("card-price");
        priceText.textContent = ` ${item.start_price} `;

        // Добавляем элементы в блок с ценой
        priceWrapper.appendChild(priceStartText);
        priceWrapper.appendChild(priceText);
        priceWrapper.appendChild(priceLeiText);

        // Создаём кнопку
        const orderButton = document.createElement("button");
        orderButton.classList.add("btn");
        orderButton.type = "button";

        const link = document.createElement("a");
        link.setAttribute("data-i18n", "order-now-btn");
        link.textContent = "Comandă acum";
        link.setAttribute("href", "tel:+37379412112")

        orderButton.appendChild(link)
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
    const serviceList = document.querySelector(".additional-services-row");

    serviceList.innerHTML = "";

    services.additionalServices[curentLang].forEach((service) => {
        // Создаём контейнер карточки
        const card = document.createElement("div");
        card.classList.add("additional-services-card");

        // Создаём изображение для карточки
        const img = document.createElement("img");
        img.src = service.icon;
        img.alt = service.title;

        // Создаём элемент для заголовка
        const title = document.createElement("span");
        title.textContent = service.title;

        // Добавляем изображение и заголовок в карточку
        card.appendChild(img);
        card.appendChild(title);

        // Добавляем карточку в список
        serviceList.appendChild(card);
    });
}

function generateChooseUsCards(whyChooseUs) {
    const chooseUsList = document.querySelector(".swiper.choose-us .swiper-wrapper");

    chooseUsList.innerHTML = "";

    whyChooseUs.chooseUs[curentLang].forEach((item) => {
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add('swiper-slide')

        const number = document.createElement("div");
        number.classList.add("params");
        number.textContent = item.id;

        const title = document.createElement("div");
        title.classList.add("choose-us-title");
        title.textContent = item.title;

        swiperSlide.appendChild(number);
        swiperSlide.appendChild(title);

        chooseUsList.appendChild(swiperSlide);
    });
}


const chooseUsSwiper = new Swiper(".choose-us", {
    // loop: true, // Infinite loop
    // autoplay: {
    //     delay: 2000, // Auto-slide every 3 seconds
    //     disableOnInteraction: false,
    // },
    slidesPerView: 4, // Show 1 slide at a time
    spaceBetween: 70, // Space between slides
    autoHeight: true,
    // navigation: {
    //     nextEl: null,
    //     prevEl: null,
    // },
    breakpoints: {
        992: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 3,
        },
        576: {
            slidesPerView: 2,
        },
        320: {
            slidesPerView: 1,
        },
    },
});