/**
 * @file language_switcher.js
 * @description Language switching functionality for Gartenparty 2025 website
 * @date Created on: 13.06.2025
 * @author C.Feng
 */

let translations = {};

// Loads the translation JSON for the selected language
function loadTranslations(lang, callback) {
    fetch(`js/translations_${lang}.json`)
        .then((res) => res.json())
        .then((data) => {
            translations = data;
            if (callback) callback();
        });
}

// Switches all translatable text on the page to the selected language
function switchLanguage(lang) {
    loadTranslations(lang, () => {
        // Update all normal text content
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");

            // If a translation exists for the key and language, update the HTML
            if (translations[key]) {
                // Supports HTML tags like <br>
                el.innerHTML = translations[key];
            }
        });

        // Update all placeholder attributes
        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (translations[key]) {
                el.placeholder = translations[key];
            }
        });

        // Save the user's language preference in localStorage
        localStorage.setItem("lang", lang);

        // Register the click handler for the parking info popup after language switch
        if (typeof ParkingInfoHandler === "function") {
            ParkingInfoHandler();
        }

        document.body.style.visibility = "visible";
    });
}

// Add event listeners to all language buttons to handle switching
document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        const lang = this.dataset.lang;
        switchLanguage(lang); // Switch to selected language
        localStorage.setItem("lang", lang); // Save language preference
    });
});

// On page load, read and apply the saved language preference (default to German)
document.addEventListener("DOMContentLoaded", function () {
    const savedLang = localStorage.getItem("lang") || "de";
    switchLanguage(savedLang);
});
