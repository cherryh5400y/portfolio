
/* ==================================
   1. TYPING ANIMATION
================================== */

const typingElement = document.getElementById("typing-text");

const roles = [
    "Computer Science Student",
    "Developer",
    "Robotics Enthusiast",
    "Cybersecurity Learner",
    "AI Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingElement.textContent =
        currentRole.substring(0, characterIndex);

    let speed = deleting ? 45 : 90;

    if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        speed = 1800;
    }

    else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

if (typingElement) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingElement.textContent = roles[0];
    } else {
        typeEffect();
    }
}


/* ==================================
   2. MOBILE NAVIGATION
================================== */

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");

if (navbar && navLinks) {

    const menuButton = document.createElement("button");

    menuButton.className = "menu-toggle";
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("type", "button");

    navbar.insertBefore(menuButton, navLinks);

    menuButton.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuButton.textContent = isOpen ? "✕" : "☰";

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuButton.textContent = "☰";

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");

        });

    });
}


/* ==================================
   3. SCROLL REVEAL ANIMATIONS
================================== */

const revealElements = document.querySelectorAll(
    "section:not(.hero), .skill-card, .project-card"
);

if ("IntersectionObserver" in window) {

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* ==================================
   4. ACTIVE NAVIGATION HIGHLIGHT
================================== */

const pageSections = document.querySelectorAll(
    "section[id]"
);

if ("IntersectionObserver" in window) {

    const navigationObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    document.querySelectorAll(".nav-links a")
                        .forEach(link => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === "#" + currentId
                            );

                        });

                }

            });

        },
        {
            threshold: 0.4
        }
    );

    pageSections.forEach(section => {
        navigationObserver.observe(section);
    });

}


/* ==================================
   5. DYNAMIC COPYRIGHT YEAR
================================== */

const footerText = document.querySelector("footer p");

if (footerText) {

    footerText.textContent =
        `© ${new Date().getFullYear()} Charithardh Chandrasekhar Jutta. All Rights Reserved.`;

}


/* ==================================
   6. INITIALIZATION
================================== */

console.log("Portfolio JavaScript loaded successfully!");
