import {generateElementsFromData} from "./generateFromMockup.js";

let autoLang = ["ro", "ru"].includes(navigator.language.slice(0, 2))
    ? navigator.language.slice(0, 2)
    : null;

let currentLang = localStorage.getItem("selectedLanguage") || autoLang || "ro";

document.addEventListener("DOMContentLoaded", () => {
    fetch("./dictionary/translations.json")
        .then((response) => response.json())
        .then((resources) => {
            i18next
                .init({
                    lng: currentLang,
                    resources: resources,
                })
                .then(() => updateContent());
        });
});

function updateContent() {
    //regenerate elements using another language
    generateElementsFromData();

    document.getElementById("language__default").innerText = currentLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = i18next.t(el.getAttribute("data-i18n"));
    });
}

function initLanguageSwitcher() {
    document.querySelectorAll(".languageIdentifier").forEach((e) => {
        e.addEventListener("click", (e) => {
            i18next.changeLanguage(e?.target.dataset?.lang, () => {
                localStorage.setItem("selectedLanguage", e.target.dataset?.lang);
                currentLang = e.target.dataset?.lang;
                updateContent();
            });
        });
    });
}

initLanguageSwitcher()

function openLanguageDropDown() {
    const languageSelector = document.querySelector("#languageSelector");
    languageSelector.addEventListener("click", () => languageSelector.classList.toggle("active"));
}

openLanguageDropDown()


export {currentLang, autoLang};