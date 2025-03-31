document.addEventListener("DOMContentLoaded", () => {
    fetch("./dictionary/translations.json")
        .then(response => response.json())
        .then(resources => {
            let autoLang = ["ro", "ru"].includes(navigator.language.slice(0, 2))
                ? navigator.language.slice(0, 2)
                : null;

            i18next.init({
                lng: localStorage.getItem("selectedLanguage") || autoLang || "ro",
                resources: resources
            }).then(() => updateContent());
        });

    const languageSelector = document.getElementById("languageSelector");
    languageSelector.addEventListener("click", (e) => e.target.classList?.toggle("active"))

    Array.from(document.getElementsByClassName("languageIdentificator")).forEach(e => {
        e.addEventListener("click", (e) => {
            i18next.changeLanguage(e?.target.dataset?.lang, () => {
                localStorage.setItem("selectedLanguage", e.target.dataset?.lang);
                updateContent();
            });
        });
    })

    function updateContent() {
        document.getElementById("languageSelector").value = i18next.language;
        document.getElementById("language__default").innerText = localStorage.getItem("selectedLanguage") || navigator.language.slice(0, 2) || "ro";
        document.querySelectorAll("[data-i18n]").forEach(el => {
            el.textContent = i18next.t(el.getAttribute("data-i18n"));
        });
    }

    function menuPaddingOnScroll() {
        const position = window.pageYOffset;
        if (position >= 100) {
            document.querySelector('header').classList.add('on-scroll');
        }

        window.addEventListener('scroll', scrollFromTop);
        function scrollFromTop() {
            let scrollLenth = window.pageYOffset;
            if (scrollLenth >= 100) {
                document.querySelector('header').classList.add('on-scroll');
            } else {
                document.querySelector('header').classList.remove('on-scroll');
            }
        }
    }
    menuPaddingOnScroll();

    if (window.innerWidth <= 1190.98) {
        adaptiveMenu()
    }


    const swiper = new Swiper(".ads-line", {
        loop: true, // Infinite loop
        autoplay: {
            delay: 1, // 3 seconds per slide
            disableOnInteraction: false, // Keeps autoplay after interaction
        },
        speed: 6000,
        slidesPerView: 'auto', // Number of visible slides
        spaceBetween: 1, // Space between slides
        freeMode: true, // Allows continuous movement
        freeModeMomentum: false,
    });


});

let language = document.querySelector('.language');
let languageArrow = language.querySelector('svg');

language.addEventListener('click', () => language.classList.toggle('active'));


function adaptiveMenu() {
    const header = document.querySelector("header");
    const headerTop = document.querySelector(".header-top");
    const headerBottom = document.querySelector(".header-bottom-columns");
    const headerNav = document.querySelector(".header-nav");

    if (window.innerWidth <= 1190.98) {
        headerNav.append(headerTop)
    } else if (window.innerWidth > 1190.98) {
        header.prepend(headerTop)
    };
}

window.addEventListener('resize', () => {
    adaptiveMenu()
})


function burgerMenu() {
    let burgerElement = document.querySelector('.header-burger');
    let headerMenu = document.querySelector('.header-nav');
    let bodyScrollLook = document.querySelector('body');
    burgerElement.addEventListener('click', () => burgerElement.classList.toggle('active'));
    burgerElement.addEventListener('click', () => headerMenu.classList.toggle('active'));
    burgerElement.addEventListener('click', () => bodyScrollLook.classList.toggle('scroll-look'));
}
burgerMenu();


document.addEventListener("DOMContentLoaded", () => {
    const fetchData = (url, callback) => {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error(`Error loading JSON from ${url}:`, error));
    };

    fetchData("./data/pricesList.json", generatePriceCards);
    // fetchData("./data/additionalServices.json", generateServiceCards);
    // fetchData("./data/chooseUs.json", generateChooseUsCards);
});


function generatePriceCards(prices) {
    const priceList = document.querySelector(".cards-rows");
    prices.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("price-card");
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div>
            <p class="card-title">${item.title}</p>
            <div>
            <span data-i18n="start-prices" class="card-price">de la </span>
            <span data-i18n="start-prices" class="card-price">${item['start-price']}</span>
            <span data-i18n="lei" class="card-price"> lei</span>
            </div>
            <button data-i18n="order-now-btn" type="button" class="btn">Comandă acum</button>
            </div>
        `;
        priceList.appendChild(card);
    });
}

function generateServiceCards(services) {
    const serviceList = document.querySelector(".additional-services");
    services.forEach(service => {
        const card = document.createElement("div");
        card.classList.add("additional-services-card");
        card.innerHTML = `
            <img src="${service.icon}" alt="${service.title}">
            <span>${service.title}</span>
        `;
        serviceList.appendChild(card);
    });
}

function generateChooseUsCards(whyChooseUs) {
    const chooseUsList = document.querySelector(".choose-us");
    whyChooseUs.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("choose-us-card");
        card.innerHTML = `
            <div class="choose-us-title">${item.title}</div>
            <div class="choose-us-article">${item.description}</div>
        `;
        chooseUsList.appendChild(card);
    });
}
