/**
 * @file hamburger_menu.js
 * @description Hamburger menu animation and navigation toggle for Gartenparty 2025 website
 * @date Created on: 11.06.2025
 * @author C.Feng
 */

// Universal forEach for Arrays/NodeLists/Objects
var forEach = function (t, o, r) {
    if ("[object Object]" === Object.prototype.toString.call(t)) for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
    else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t);
};

document.addEventListener("DOMContentLoaded", function () {
    var hamburgers = document.querySelectorAll(".hamburger");
    var nav = document.getElementById("main-nav");
    var body = document.body;

    // Helper: detect mobile (max-width: 600px)
    function isMobile() {
        return window.matchMedia("(max-width: 600px)").matches;
    }

    // Set correct menu state when device changes
    function setMenuState() {
        if (isMobile()) {
            // Hide menu (opacity 0, y -40), CSS display stays "none" until .open
            gsap.set(nav, { clearProps: "all" }); // Remove gsap inline style
            nav.classList.remove("open");
            body.classList.remove("menu-open");
            hamburgers.forEach((h) => h.classList.remove("is-active"));
        } else {
            // Always visible on desktop
            gsap.set(nav, { clearProps: "all" }); // Remove gsap inline style
            nav.classList.remove("open");
            body.classList.remove("menu-open");
            hamburgers.forEach((h) => h.classList.remove("is-active"));
        }
    }
    setMenuState();

    // Handle resize (for responsive switch between mobile/desktop)
    window.addEventListener("resize", setMenuState);

    hamburgers.forEach(function (hamburger) {
        hamburger.addEventListener("click", function () {
            if (!isMobile()) return; // Only handle on mobile

            var isOpen = nav.classList.contains("open");
            this.classList.toggle("is-active");

            if (!isOpen) {
                nav.classList.add("open");
                body.classList.add("menu-open");
                // --- MENU IN: Animate menu opening (fade in and slide down) ---
                gsap.to(nav, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            } else {
                // --- MENU OUT: Animate menu closing (fade out and slide up) ---
                gsap.to(nav, {
                    autoAlpha: 0,
                    y: -40,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: function () {
                        nav.classList.remove("open");
                        body.classList.remove("menu-open");
                        hamburger.classList.remove("is-active");
                        gsap.set(nav, { clearProps: "all" }); // Remove GSAP props
                    },
                });
            }
        });
    });

    // When link is clicked, close the menu on mobile
    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (!isMobile()) return;
            // --- MENU OUT: Animate menu closing when link is clicked ---
            gsap.to(nav, {
                autoAlpha: 0,
                y: -40,
                duration: 0.3,
                ease: "power2.in",
                onComplete: function () {
                    nav.classList.remove("open");
                    body.classList.remove("menu-open");
                    hamburgers.forEach((h) => h.classList.remove("is-active"));
                    gsap.set(nav, { clearProps: "all" });
                },
            });
        });
    });
});

/* 
// --- Old hamburger_menu.js ---
document.addEventListener("DOMContentLoaded", function () {
    var hamburgers = document.querySelectorAll(".hamburger");
    var nav = document.getElementById("main-nav");
    var body = document.body;

    if (hamburgers.length > 0) {
        hamburgers.forEach(function (hamburger) {
            hamburger.addEventListener("click", function () {
                this.classList.toggle("is-active");
                // Toggle navigation menu open/close
                if (nav) nav.classList.toggle("open");
                // Toggle scroll lock on body when menu is open/closed
                body.classList.toggle("menu-open");
            });
        });
    }

    // Close menu when any menu link is clicked
    if (nav) {
        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("open");
                body.classList.remove("menu-open");
                // Reset hamburger icon state
                hamburgers.forEach(function (hamburger) {
                    hamburger.classList.remove("is-active");
                });
            });
        });
    }
});
 */
