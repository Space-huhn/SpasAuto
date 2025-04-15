import { generateElementsFromData } from './generateFromMockup.js'
import { currentLang } from "./translateFunctions.js";
// import dictionary from "../dictionary/translations.json" assert { type: 'json' };

const burgerMenu = document.querySelector(".header-burger");
const html = document.querySelector("html");
const body = document.querySelector("body");
const header = document.querySelector("header");
const headerTop = document.querySelector(".header-top");
const headerNav = document.querySelector(".header-nav");
const head = document.querySelector("head");

function scrollFromTop() {
    const header = document.querySelector("header");
    if (window.scrollY >= 100) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
}

scrollFromTop();
window.addEventListener("scroll", scrollFromTop);

function adaptiveMenu() {
    if (window.innerWidth <= 1200 && !headerNav.contains(headerTop)) {
        headerNav.appendChild(headerTop);
    } else if (window.innerWidth > 1200 && !header.firstElementChild.isSameNode(headerTop)) {
        header.prepend(headerTop);
    }
}

adaptiveMenu();
window.addEventListener("resize", adaptiveMenu);

function toggleMenu() {
    const isActive = burgerMenu.classList.toggle("active");

    headerNav.classList.toggle("active", isActive);
    body.classList.toggle("scroll-look", isActive);
    html.classList.toggle("scroll-look", isActive);
}

burgerMenu.addEventListener("click", (e) => {
    toggleMenu();
});

function linkClickHandler(e) {
    if (window.innerWidth >= 1200) return;
    if (e.target.classList.contains("header-nav-link")) {
        toggleMenu();
    }
};

headerNav.addEventListener("click", (e) => linkClickHandler(e))

document.addEventListener("DOMContentLoaded", generateElementsFromData);

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            e.stopPropagation();
            target.scrollIntoView({ behavior: "smooth" });
            // toggleMenu()

            burgerMenu.classList.remove("active");
            headerNav.classList.remove("active");
            body.classList.remove("scroll-look");
            html.classList.remove("scroll-look");
        }
    });
});


function setMetaTags() {
    fetch('../dictionary/translations.json')
        .then((response) => response.json())
        .then((data) => {
            head.querySelector('meta[name="description"]').setAttribute("content", data[currentLang].translation.meta.description);
            head.querySelector('meta[name="keywords"]').setAttribute("content", data[currentLang].translation.meta.keywords);
            head.querySelector('meta[name="title"]').setAttribute("content", data[currentLang].translation.meta.title);
        })
        .catch((error) => {
            console.error('Error Fetching JSON File:', error);
        });
}

document.addEventListener("DOMContentLoaded", setMetaTags())


export { setMetaTags };