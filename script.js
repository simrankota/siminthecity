/* =========================================================
   SIM IN THE CITY
   Interactive behavior
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     VIDEO LIGHTBOX
  ======================================================= */

  const modal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  const closeButton = document.querySelector(".modal-close");

  const videoCards = document.querySelectorAll(".video-card");

  videoCards.forEach((card) => {

    card.addEventListener("click", () => {

      const videoSource = card.dataset.video;

      if (!videoSource) return;

      modalVideo.src = videoSource;

      modal.showModal();

      modalVideo.currentTime = 0;

      const playPromise = modalVideo.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser may require manual play.
        });
      }

    });

  });


  function closeVideoModal() {

    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();

    modal.close();

  }


  closeButton.addEventListener("click", closeVideoModal);


  modal.addEventListener("click", (event) => {

    const rect = modal.getBoundingClientRect();

    const clickedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!clickedInside) {
      closeVideoModal();
    }

  });


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && modal.open) {
      closeVideoModal();
    }

  });


  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuButton = document.querySelector(".mobile-menu-button");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav a");

  if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

      const isOpen = mobileNav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =======================================================
     SCROLL REVEALS
  ======================================================= */

  const revealElements = document.querySelectorAll(
    ".section-heading, .work-card, .logo-item, .offer-item, .create-image, .contact-image"
  );


  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }
  );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const navLinks = document.querySelectorAll(
    '.desktop-nav a[href^="#"]'
  );

  const sections = document.querySelectorAll(
    "main section[id]"
  );


  const sectionObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navLinks.forEach((link) => {

          const matches =
            link.getAttribute("href") === `#${currentId}`;

          link.classList.toggle("active", matches);

        });

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );


  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
