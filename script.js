/* =========================================================
   SIM IN THE CITY
   Interactive behavior
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     INLINE VIDEO PLAYBACK

     Opening frame + play button.
     Native controls appear after playback starts.
     Click anywhere in frame to play/pause.
  ======================================================= */

  const videoCards = document.querySelectorAll(".video-card");

  /* =======================================================
     VIDEO STYLES
  ======================================================= */

  const videoStyles = document.createElement("style");

  videoStyles.textContent = `
    /* -------------------------------------------------------
       VIDEO CARD
    ------------------------------------------------------- */
    .video-card {
      position: relative;
    }

    /* -------------------------------------------------------
       VIDEO ELEMENT
    ------------------------------------------------------- */
    .video-card video {
      display: block;
      width: 100%;
      height: 100%;
      appearance: auto;
      -webkit-appearance: auto;
    }

    /* -------------------------------------------------------
       REMOVE LEGACY CONTROLS
    ------------------------------------------------------- */
    .video-card .custom-video-controls,
    .video-card .custom-fullscreen-button {
      display: none !important;
    }

    /* -------------------------------------------------------
       PLAY BUTTON
    ------------------------------------------------------- */
    .video-card .play {
      display: flex !important;
      opacity: 1;
      visibility: visible;
      z-index: 10;
      transition: opacity 0.25s ease;
    }

    .video-card.is-playing .play {
      opacity: 0;
      visibility: hidden;
    }

    /* -------------------------------------------------------
       FULLSCREEN VIDEO
    ------------------------------------------------------- */
    .video-card video:fullscreen {
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      object-fit: contain !important;
      object-position: center center !important;
      background: #000 !important;
    }

    .video-card video:-webkit-full-screen {
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      object-fit: contain !important;
      object-position: center center !important;
      background: #000 !important;
    }

    /* -------------------------------------------------------
       FULLSCREEN CARD FALLBACK
    ------------------------------------------------------- */
    .video-card:fullscreen,
    .video-card:-webkit-full-screen {
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: #000 !important;
      overflow: hidden !important;
    }

    .video-card:fullscreen video,
    .video-card:-webkit-full-screen video {
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      object-fit: contain !important;
      object-position: center center !important;
      background: #000 !important;
    }
  `;

  document.head.appendChild(videoStyles);

  /* =======================================================
   VIDEO SETUP
======================================================= */

videoCards.forEach((card) => {
  const video = card.querySelector("video");

  if (!video) return;

  card.querySelector(".custom-video-controls")?.remove();
  card.querySelector(".custom-fullscreen-button")?.remove();

  video.controls = false;

  video.autoplay = false;
  video.removeAttribute("autoplay");

  video.playsInline = true;

  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  video.muted = true;
  video.loop = false;

  /* -------------------------------------------------------
   CLICK CARD TO START VIDEO
------------------------------------------------------- */

card.addEventListener("click", (event) => {

  /* Ignore clicks once controls exist */
  if (video.controls) return;

  video.controls = true;
  video.play();
});

  video.addEventListener("play", () => {
    card.classList.add("is-playing");
  });

  video.addEventListener("pause", () => {
    card.classList.remove("is-playing");
  });

  video.addEventListener("ended", () => {

    card.classList.remove("is-playing");

    card.classList.remove("started");

    video.controls = false;

    video.currentTime = 0;
  });

  document.addEventListener("fullscreenchange", () => {

    const isFullscreen =
      document.fullscreenElement === video;

    card.classList.toggle(
      "video-is-fullscreen",
      isFullscreen
    );
  });

  video.addEventListener(
    "webkitbeginfullscreen",
    () => {
      card.classList.add(
        "video-is-fullscreen"
      );
    }
  );

  video.addEventListener(
    "webkitendfullscreen",
    () => {
      card.classList.remove(
        "video-is-fullscreen"
      );
    }
  );
});

  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuButton =
    document.querySelector(".mobile-menu-button");

  const mobileNav =
    document.querySelector(".mobile-nav");

  const mobileLinks =
    document.querySelectorAll(".mobile-nav a");

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
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const navLinks =
    document.querySelectorAll(
      '.desktop-nav a[href^="#"]'
    );

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navLinks.forEach((link) => {
            const matches =
              link.getAttribute("href") ===
              `#${currentId}`;

            link.classList.toggle(
              "active",
              matches
            );
          });
        });
      },
      {
        rootMargin:
          "-35% 0px -55% 0px",
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});