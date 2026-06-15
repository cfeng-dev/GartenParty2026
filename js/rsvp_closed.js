/**
 * @file rsvp_closed.js
 * @description Blocks RSVP submissions after the registration deadline
 * @date Created on: 15.06.2026
 * @author C.Feng
 */

/* Store the RSVP deadline after loading it from event.json */
let rsvpDeadline = null;

/**
 * Load event configuration from the shared JSON file.
 */
fetch("config/event.json")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Could not load event.json");
        }

        return response.json();
    })
    .then(function (eventData) {
        if (!eventData.rsvpDeadline) {
            throw new Error("Missing rsvpDeadline in event.json");
        }

        rsvpDeadline = new Date(eventData.rsvpDeadline);

        if (Number.isNaN(rsvpDeadline.getTime())) {
            throw new Error("Invalid rsvpDeadline format in event.json");
        }
    })
    .catch(function (error) {
        console.error("Could not initialize RSVP deadline:", error);
    });

/**
 * Listen for clicks on the whole document.
 * This works even if the RSVP form is loaded dynamically later.
 */
document.addEventListener("click", function (e) {
    const submitButton = e.target.closest('#party-invitation button[type="submit"]');

    /* Ignore all clicks that are not on the RSVP submit button */
    if (!submitButton) {
        return;
    }

    /*
       If the deadline could not be loaded, keep the form open.
       This avoids accidentally blocking guests because of a config error.
    */
    if (!rsvpDeadline) {
        return;
    }

    /*
       If the current time is before the RSVP deadline,
       allow the normal form submission.
    */
    if (new Date() < rsvpDeadline) {
        return;
    }

    /*
       If the current time is after the RSVP deadline,
       block the form before browser validation appears.
    */
    e.preventDefault();

    Swal.fire({
        title: translations.closedTitle,
        html: `<div style="text-align:left;">${translations.closedBody}</div>`,
        icon: "error",
        confirmButtonText: "OK",
    });
});
