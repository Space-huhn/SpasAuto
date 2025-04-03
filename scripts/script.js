import {generateElementsFromData} from './generateFromMockup.js'

const burgerMenu = document.querySelector(".header-burger");
const body = document.querySelector("body");
const header = document.querySelector("header");
const headerTop = document.querySelector(".header-top");
const headerNav = document.querySelector(".header-nav");


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

    if (window.innerWidth <= 1190.98) {
        headerNav.appendChild(headerTop);
    } else {
        header.prepend(headerTop);
    }
}

adaptiveMenu();
window.addEventListener("resize", adaptiveMenu);

function openMenu() {
    burgerMenu.classList.add("active")
    headerNav.classList.add("active")
    body.classList.add("scroll-look")
}

function closeMenu() {
    burgerMenu.classList.remove("active")
    headerNav.classList.remove("active")
    body.classList.remove("scroll-look")
}

function toggleMenu() {
    if (burgerMenu.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
}

burgerMenu.addEventListener("click", toggleMenu);

function linkClickHandler() {
    if (window.innerWidth >= 1190.98) return;

    headerNav.addEventListener("click", (event) => {
        if (event.target.classList.contains("header-nav-link")) {
            toggleMenu();
        }
    }, {once: true});
}

linkClickHandler()

document.addEventListener("DOMContentLoaded", generateElementsFromData);