/**
 * @file scroll_smooth.js
 * @description Enables Apple-style smooth scrolling for desktop browsers
 * @date Created on: 22.06.2025
 * @author C.Feng
 */

// Register the required GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Initialize ScrollSmoother for desktop smooth scrolling effects
ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 0.9,
    effects: true,
});

// Enable smooth scrolling for anchor links when ScrollSmoother is active (desktop)
// Fallback to native behavior on mobile
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        const el = document.querySelector(targetId);
        if (targetId.length > 1 && el) {
            if (window.ScrollSmoother && ScrollSmoother.get()) {
                // Desktop: smooth scroll via GSAP ScrollSmoother
                e.preventDefault();
                ScrollSmoother.get().scrollTo(targetId, true, "top");
            }
            // On mobile: native anchor scrolling is used (no e.preventDefault())
        }
    });
});
