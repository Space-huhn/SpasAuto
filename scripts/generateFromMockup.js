import additionalServices from "../data/additionalServices.json" with {type: "json"};
import chooseUs from "../data/chooseUs.json" with {type: "json"};
import priceList from "../data/priceList.json" with {type: "json"};
import {currentLang} from "./translateFunctions.js";


export function generateElementsFromData() {
    generatePriceCards(priceList);
    generateServiceCards(additionalServices);
    // generateChooseUsCards(chooseUs);
}

function generatePriceCards(prices) {
    const priceList = document.querySelector(".cards-rows");

    priceList.innerHTML = "";

    prices.priceList[currentLang].forEach((item) => {
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

    services.additionalServices[currentLang].forEach((service) => {
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
    const chooseUsList = document.querySelector(".swiper.choose-us.css .swiper-wrapper");

    chooseUsList.innerHTML = "";

    whyChooseUs.chooseUs[currentLang].forEach((item) => {
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add('swiper-slide')

        const number = document.createElement("div");
        number.classList.add("params");
        number.textContent = item.id;

        const title = document.createElement("div");
        title.classList.add("choose-us.css-title");
        title.textContent = item.title;

        swiperSlide.appendChild(number);
        swiperSlide.appendChild(title);

        chooseUsList.appendChild(swiperSlide);
    });
}