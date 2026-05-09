/**
 * @file scroll_animations.js
 * @description Animates elements as they enter the viewport on scroll
 * @date Created on: 22.06.2025
 * @author C.Feng
 */

document.addEventListener("DOMContentLoaded", function () {
    // Register the GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate each highlight-item when it enters the viewport
    if (document.querySelector(".highlight-item")) {
        gsap.utils.toArray(".highlight-item").forEach((item, i) => {
            gsap.from(item, {
                opacity: 0,
                y: 60,
                duration: 1.2,
                delay: i * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 100%",
                    toggleActions: "play none none none",
                },
            });
        });
    }

    if (document.querySelector(".slogan-text")) {
        gsap.from(".slogan-text", {
            opacity: 0,
            y: 40,
            duration: 1.1,
            ease: "back.out(1.3)",
            scrollTrigger: {
                trigger: ".slogan-text",
                start: "top 99%",
                toggleActions: "play none none none",
            },
        });
    }

    // Animate the news section title
    if (document.querySelector(".news h2")) {
        gsap.from(".news h2", {
            opacity: 0,
            y: 40,
            scale: 0.95,
            rotate: 3,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: ".news h2",
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }

    if (document.querySelector(".news p:first-of-type")) {
        gsap.from(".news p:first-of-type", {
            opacity: 0,
            y: 25,
            duration: 0.9,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".news p:first-of-type",
                start: "top 90%",
                toggleActions: "play none none none",
            },
        });
    }

    // Animate the event image
    if (document.querySelector(".event-image")) {
        gsap.from(".event-image", {
            opacity: 0,
            x: -70,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".event_info",
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }

    // Animate the event title
    if (document.querySelector(".event_info h2")) {
        gsap.from(".event_info h2", {
            opacity: 0,
            y: 40,
            duration: 1.1,
            delay: 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: ".event_info h2",
                start: "top 90%",
                toggleActions: "play none none none",
            },
        });
    }

    // Animate the event details paragraph
    if (document.querySelector(".event_info p")) {
        gsap.from(".event_info p", {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".event_info p",
                start: "top 95%",
                toggleActions: "play none none none",
            },
        });
    }

    // Animate both calendar buttons
    if (document.querySelector(".calendar-btn")) {
        gsap.from(".calendar-btn", {
            opacity: 0,
            scale: 0.9,
            duration: 0.7,
            stagger: 0.17,
            ease: "back.out(1.6)",
            scrollTrigger: {
                trigger: ".calendar-btn.google",
                start: "top 97%",
                toggleActions: "play none none none",
            },
        });
    }
});
