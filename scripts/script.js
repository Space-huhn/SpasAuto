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
    let hederMenu = document.querySelector('.header-nav');
    let bodyScrollLook = document.querySelector('body');
    burgerElement.addEventListener('click', () => burgerElement.classList.toggle('active'));
    burgerElement.addEventListener('click', () => hederMenu.classList.toggle('active'));
    burgerElement.addEventListener('click', () => bodyScrollLook.classList.toggle('scroll-look'));
}
burgerMenu();
