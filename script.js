/* =========================================================
   SIM IN THE CITY
   Interactive behavior
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     INLINE VIDEO PLAYBACK

     Videos stay inside their existing frames.

     Behavior:
     - No autoplay
     - Opening frame + play button
     - Clicking opening frame starts the video
     - Native browser controls appear after playback starts
     - Native controls completely control pause/play/seek/etc.
     - Fullscreen remains native
  ======================================================= */

  const videoCards =
    document.querySelectorAll(".video-card");


  /* =======================================================
     VIDEO STYLES
  ======================================================= */

  const videoStyles =
    document.createElement("style");


  videoStyles.textContent = `

    .video-card {
      position: relative;
    }

    .video-card video {
      display: block;
      width: 100%;
      height: 100%;

      appearance: auto;
      -webkit-appearance: auto;
    }

    .video-card .custom-video-controls,
    .video-card .custom-fullscreen-button {
      display: none !important;
    }

    .video-card .play {
      display: flex !important;

      opacity: 1;
      visibility: visible;

      z-index: 10;

      transition:
        opacity 0.25s ease,
        visibility 0.25s ease;
    }

    .video-card.is-playing .play {
      opacity: 0;
      visibility: hidden;
    }

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


    /* =====================================================
       MEDIA HOVER ANIMATION

       Videos, work photos, create photo, and contact photo
       receive the subtle hover zoom.

       IMPORTANT:
       The hero animation is attached ONLY to .hero-image.

       Hovering:
       - Hero photo → zooms
       - Hero logo → does NOT zoom
       - Hero text → does NOT zoom
       - Hero button → does NOT zoom
       - Empty hero area → does NOT zoom

       Native video controls remain untouched.
    ===================================================== */

    .video-card video,
    .work-card img,
    .create-image img,
    .contact-image img,
    .hero-image img {
      transition:
        transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .video-card:hover video,
    .work-card:hover img,
    .create-image:hover img,
    .contact-image:hover img,
    .hero-image:hover img {
      transform: scale(1.035);
    }

    /* Explicitly keep the hero logo static */

    .hero .hero-logo {
      transform: none !important;
      transition: none !important;
    }

    @media (prefers-reduced-motion: reduce) {

      .video-card video,
      .work-card img,
      .create-image img,
      .contact-image img,
      .hero-image img {
        transition: none;
      }

      .video-card:hover video,
      .work-card:hover img,
      .create-image:hover img,
      .contact-image:hover img,
      .hero-image:hover img {
        transform: none;
      }

      .hero .hero-logo {
        transform: none !important;
      }

    }


    /* =====================================================
       SECTION NAVIGATION

       One fixed navigation control.

       ↑ top-right
       ↓ bottom-right
    ===================================================== */

    .section-scroll-nav {
      position: fixed;

      top: 0;
      right: 28px;

      width: 120px;
      height: 100vh;

      z-index: 100;

      pointer-events: none;

      opacity: 0;
      visibility: hidden;

      transition:
        opacity 0.25s ease,
        visibility 0.25s ease;
    }

    .section-scroll-nav.is-visible {
      opacity: 1;
      visibility: visible;
    }

    .section-scroll-prev {
      position: absolute;

      top: 30px;
      right: 0;

      display: flex;

      flex-direction: column;
      align-items: flex-end;

      gap: 5px;

      color: inherit;

      text-decoration: none;

      pointer-events: auto;

      opacity: 0.7;

      transition:
        opacity 0.2s ease,
        transform 0.2s ease;
    }

    .section-scroll-prev:hover {
      opacity: 1;

      transform:
        translateY(-2px);
    }

    .section-scroll-next {
      position: absolute;

      right: 0;
      bottom: 30px;

      display: flex;

      flex-direction: column;
      align-items: flex-end;

      gap: 5px;

      color: inherit;

      text-decoration: none;

      pointer-events: auto;

      opacity: 0.7;

      transition:
        opacity 0.2s ease,
        transform 0.2s ease;
    }

    .section-scroll-next:hover {
      opacity: 1;

      transform:
        translateY(2px);
    }

    .section-scroll-name {
      font-family:
        var(
          --sans,
          "Inter",
          sans-serif
        );

      font-size: 8px;

      font-weight: 600;

      line-height: 1.2;

      letter-spacing: 0.13em;

      text-transform: uppercase;

      white-space: nowrap;

      text-align: right;
    }

    .section-scroll-arrow {
      font-family:
        Arial,
        sans-serif;

      font-size: 17px;

      font-weight: 300;

      line-height: 1;
    }

    .section-scroll-nav.only-next
      .section-scroll-prev {
      display: none;
    }

    .section-scroll-nav.only-prev
      .section-scroll-next {
      display: none;
    }

    .section-scroll-nav.on-dark {
      color: #fff;
    }


    @media (max-width: 720px) {

      .section-scroll-nav {
        right: 16px;
      }

      .section-scroll-name {
        font-size: 7px;

        letter-spacing:
          0.11em;
      }

      .section-scroll-arrow {
        font-size: 15px;
      }

      .section-scroll-prev {
        top: 22px;
      }

      .section-scroll-next {
        bottom: 22px;
      }

    }

  `;


  document.head.appendChild(
    videoStyles
  );


  /* =======================================================
     VIDEO SETUP
  ======================================================= */

  videoCards.forEach((card) => {

    const video =
      card.querySelector("video");


    if (!video) {
      return;
    }


    /* -------------------------------------------------------
       REMOVE LEGACY CUSTOM CONTROLS
    ------------------------------------------------------- */

    card
      .querySelector(
        ".custom-video-controls"
      )
      ?.remove();


    card
      .querySelector(
        ".custom-fullscreen-button"
      )
      ?.remove();


    /* -------------------------------------------------------
       INITIAL VIDEO STATE
    ------------------------------------------------------- */

    video.controls = false;

    video.autoplay = false;

    video.removeAttribute(
      "autoplay"
    );

    video.playsInline = true;

    video.setAttribute(
      "playsinline",
      ""
    );

    video.setAttribute(
      "webkit-playsinline",
      ""
    );

    video.muted = true;

    video.loop = false;


    /* -------------------------------------------------------
       OPENING FRAME → START VIDEO

       Once native controls are enabled, this click handler
       does nothing.

       This is important for native pause/play controls.
    ------------------------------------------------------- */

    card.addEventListener(
      "click",
      (event) => {

        if (video.controls) {
          return;
        }


        video.controls = true;


        const playPromise =
          video.play();


        if (
          playPromise !== undefined
        ) {

          playPromise.catch(
            () => {}
          );

        }

      }
    );


    /* -------------------------------------------------------
       VIDEO PLAY
    ------------------------------------------------------- */

    video.addEventListener(
      "play",
      () => {

        card.classList.add(
          "is-playing"
        );

      }
    );


    /* -------------------------------------------------------
       VIDEO PAUSE
    ------------------------------------------------------- */

    video.addEventListener(
      "pause",
      () => {

        card.classList.remove(
          "is-playing"
        );

      }
    );


    /* -------------------------------------------------------
       VIDEO END
    ------------------------------------------------------- */

    video.addEventListener(
      "ended",
      () => {

        card.classList.remove(
          "is-playing"
        );

        card.classList.remove(
          "started"
        );

        video.controls = false;

        video.currentTime = 0;

      }
    );


    /* -------------------------------------------------------
       FULLSCREEN
    ------------------------------------------------------- */

    document.addEventListener(
      "fullscreenchange",
      () => {

        const isFullscreen =
          document.fullscreenElement ===
          video;


        card.classList.toggle(
          "video-is-fullscreen",
          isFullscreen
        );

      }
    );


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

  const siteNav =
    document.querySelector(
      ".site-nav"
    );


  const menuButton =
    document.querySelector(
      ".mobile-menu-button"
    );


  const mobileNav =
    document.querySelector(
      ".mobile-nav"
    );


  const mobileLinks =
    document.querySelectorAll(
      ".mobile-nav a"
    );


  if (
    menuButton &&
    mobileNav
  ) {

    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          mobileNav.classList.toggle(
            "open"
          );


        if (siteNav) {

          siteNav.classList.toggle(
            "menu-open",
            isOpen
          );

        }


        menuButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    mobileLinks.forEach(
      (link) => {

        link.addEventListener(
          "click",
          () => {

            mobileNav.classList.remove(
              "open"
            );


            if (siteNav) {

              siteNav.classList.remove(
                "menu-open"
              );

            }


            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      }
    );

  }


  /* =======================================================
     SCROLL REVEALS
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".section-heading, .work-card, .logo-item, .offer-item, .create-image, .contact-image"
    );


  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {

              return;
            }


            entry.target.classList.add(
              "is-visible"
            );


            revealObserver.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -50px 0px"
      }
    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );


  /* =======================================================
     BUILD SECTION SEQUENCE

     The navigation sequence is:

       Home
       Introduction
       Selected Work
       Hotels & Stays
       Food & Beverage
       Experiences
       Selected Collaborations
       What I Create
       Contact

     The footer is NOT a navigation section.
  ======================================================= */

  const navigationSections = [];


  /* -------------------------------------------------------
     HOME
  ------------------------------------------------------- */

  const hero =
    document.querySelector(
      "main > .hero"
    );


  if (hero) {

    hero.id =
      "hero";


    navigationSections.push({
      element: hero,
      name: "Home"
    });

  }


  /* -------------------------------------------------------
     INTRODUCTION
  ------------------------------------------------------- */

  const intro =
    document.querySelector(
      "main > .intro"
    );


  if (intro) {

    intro.id =
      "intro";


    navigationSections.push({
      element: intro,
      name: "Introduction"
    });

  }


  /* -------------------------------------------------------
     SELECTED WORK
  ------------------------------------------------------- */

  const work =
    document.querySelector(
      "main > .work"
    );


  if (work) {

    work.id =
      "work";


    navigationSections.push({
      element: work,
      name: "Selected Work"
    });


    /* -----------------------------------------------------
       WORK CATEGORIES

       These are separate navigation destinations even though
       they live inside the .work container.
    ----------------------------------------------------- */

    const categories =
      Array.from(
        work.querySelectorAll(
          ":scope > .category"
        )
      );


    categories.forEach(
      (category, index) => {

        const heading =
          category.querySelector(
            ".section-heading h2"
          );


        if (!heading) {
          return;
        }


        const categoryName =
          heading.textContent.trim();


        let categoryId =
          categoryName
            .toLowerCase()
            .replace(
              /&/g,
              "and"
            )
            .replace(
              /[^a-z0-9]+/g,
              "-"
            )
            .replace(
              /^-+|-+$/g,
              ""
            );


        if (!categoryId) {

          categoryId =
            `work-category-${index + 1}`;

        }


        category.id =
          categoryId;


        navigationSections.push({
          element: category,
          name: categoryName
        });

      }
    );

  }


  /* -------------------------------------------------------
     SELECTED COLLABORATIONS
  ------------------------------------------------------- */

  const collaborations =
    document.querySelector(
      "main > .collaborations"
    );


  if (collaborations) {

    collaborations.id =
      "collaborations";


    navigationSections.push({
      element:
        collaborations,

      name:
        "Selected Collaborations"
    });

  }


  /* -------------------------------------------------------
     WHAT I CREATE
  ------------------------------------------------------- */

  const create =
    document.querySelector(
      "main > .create"
    );


  if (create) {

    create.id =
      "what-i-create";


    navigationSections.push({
      element:
        create,

      name:
        "What I Create"
    });

  }


  /* -------------------------------------------------------
     CONTACT
  ------------------------------------------------------- */

  const contact =
    document.querySelector(
      "main > .contact"
    );


  if (contact) {

    contact.id =
      "contact";


    navigationSections.push({
      element:
        contact,

      name:
        "Contact"
    });

  }


  /* =======================================================
     GLOBAL SECTION NAVIGATION
  ======================================================= */

  const sectionNav =
    document.createElement(
      "div"
    );


  sectionNav.className =
    "section-scroll-nav";


  sectionNav.setAttribute(
    "aria-label",
    "Section navigation"
  );


  document.body.appendChild(
    sectionNav
  );


  /* -------------------------------------------------------
     PREVIOUS / UP
  ------------------------------------------------------- */

  const previousLink =
    document.createElement(
      "a"
    );


  previousLink.className =
    "section-scroll-prev";


  previousLink.innerHTML = `

    <span
      class="section-scroll-name"
    ></span>

    <span
      class="section-scroll-arrow"
      aria-hidden="true"
    >↑</span>

  `;


  sectionNav.appendChild(
    previousLink
  );


  /* -------------------------------------------------------
     NEXT / DOWN
  ------------------------------------------------------- */

  const nextLink =
    document.createElement(
      "a"
    );


  nextLink.className =
    "section-scroll-next";


  nextLink.innerHTML = `

    <span
      class="section-scroll-name"
    ></span>

    <span
      class="section-scroll-arrow"
      aria-hidden="true"
    >↓</span>

  `;


  sectionNav.appendChild(
    nextLink
  );


  /* =======================================================
     SECTION STATE
  ======================================================= */

  let activeIndex =
    -1;


  let isProgrammaticScroll =
    false;


  let programmaticTargetIndex =
    -1;


  let scrollTimer =
    null;


  /* =======================================================
     NAVIGATION ANCHOR

     For normal sections, the section itself is the anchor.

     Selected Work uses the ENTIRE .work section so that
     Selected Work itself is centered during auto-scroll.

     Each individual reel/category also uses the FULL CATEGORY
     as the anchor so the entire reel section is centered.
  ======================================================= */

  function getNavigationAnchor(
    sectionData
  ) {

    const section =
      sectionData.element;


    /* -------------------------------------------------------
       Selected Work
    ------------------------------------------------------- */

    if (
      section.classList.contains(
        "work"
      )
    ) {

      return section;

    }


    /* -------------------------------------------------------
       Reel / Work Categories
    ------------------------------------------------------- */

    if (
      section.classList.contains(
        "category"
      )
    ) {

      return section;

    }


    return section;

  }


  /* =======================================================
     HEADER OFFSET
  ======================================================= */

  function getHeaderOffset() {

    const header =
      document.querySelector(
        ".site-nav"
      );


    if (!header) {
      return 0;
    }


    const position =
      window.getComputedStyle(
        header
      ).position;


    if (
      position === "fixed" ||
      position === "sticky"
    ) {

      return header.offsetHeight;

    }


    return 0;

  }


  /* =======================================================
     CENTER POSITION

     The navigation anchor is centered vertically.
  ======================================================= */

  function getSectionScrollPosition(
    sectionData
  ) {

    const anchor =
      getNavigationAnchor(
        sectionData
      );


    const rect =
      anchor.getBoundingClientRect();


    const anchorHeight =
      rect.height;


    const viewportHeight =
      window.innerHeight;


    if (
      anchorHeight >=
      viewportHeight
    ) {

      return Math.max(
        0,

        window.scrollY +
          rect.top -
          getHeaderOffset()
      );

    }


    return Math.max(
      0,

      window.scrollY +
        rect.top -
        (
          viewportHeight -
          anchorHeight
        ) / 2
    );

  }


  /* =======================================================
     IS CLEANLY CENTERED
  ======================================================= */

  function isSectionCleanlyAligned(
    sectionData
  ) {

    const desiredPosition =
      getSectionScrollPosition(
        sectionData
      );


    const difference =
      Math.abs(
        window.scrollY -
          desiredPosition
      );


    return (
      difference <= 32
    );

  }


  /* =======================================================
     FIND CENTERED SECTION
  ======================================================= */

  function findCleanSection() {

    for (
      let i = 0;
      i <
      navigationSections.length;
      i++
    ) {

      if (
        isSectionCleanlyAligned(
          navigationSections[i]
        )
      ) {

        return i;

      }

    }


    return -1;

  }


  /* =======================================================
     FOOTER DETECTION
  ======================================================= */

  function isFooterVisible() {

    const footer =
      document.querySelector(
        ".site-footer"
      );


    if (!footer) {
      return false;
    }


    const rect =
      footer.getBoundingClientRect();


    return (
      rect.top <=
      window.innerHeight
    );

  }


  /* =======================================================
     UPDATE NAVIGATION
  ======================================================= */

  function updateSectionNav(
    index
  ) {

    if (
      index < 0 ||
      index >=
        navigationSections.length
    ) {

      sectionNav.classList.remove(
        "is-visible"
      );

      return;

    }


    const previous =
      navigationSections[
        index - 1
      ];


    const next =
      navigationSections[
        index + 1
      ];


    /* -------------------------------------------------------
       PREVIOUS / UP

       Contact → What I Create

       Home is ONLY activated when the footer is visible.
    ------------------------------------------------------- */

    if (previous) {

      previousLink
        .querySelector(
          ".section-scroll-name"
        )
        .textContent =
        previous.name;


      previousLink.href =
        `#${previous.element.id}`;


      previousLink.setAttribute(
        "aria-label",
        `Scroll to ${previous.name}`
      );


      previousLink.style.display =
        "flex";

    } else {

      previousLink.style.display =
        "none";

    }


    /* -------------------------------------------------------
       NEXT / DOWN
    ------------------------------------------------------- */

    if (next) {

      nextLink
        .querySelector(
          ".section-scroll-name"
        )
        .textContent =
        next.name;


      nextLink.href =
        `#${next.element.id}`;


      nextLink.setAttribute(
        "aria-label",
        `Scroll to ${next.name}`
      );


      nextLink.style.display =
        "flex";

    } else {

      nextLink.style.display =
        "none";

    }


    /* -------------------------------------------------------
       DIRECTION CLASSES
    ------------------------------------------------------- */

    sectionNav.classList.toggle(
      "only-next",
      !previous && !!next
    );


    sectionNav.classList.toggle(
      "only-prev",
      !next
    );


    /* -------------------------------------------------------
       DARK SECTIONS
    ------------------------------------------------------- */

    sectionNav.classList.remove(
      "on-dark"
    );


    const section =
      navigationSections[
        index
      ].element;


    if (
      section.classList.contains(
        "hero"
      ) ||
      section.classList.contains(
        "create"
      )
    ) {

      sectionNav.classList.add(
        "on-dark"
      );

    }


    sectionNav.classList.add(
      "is-visible"
    );

  }


  /* =======================================================
     UPDATE FOOTER ARROW

     This uses the SAME UP arrow.

     It does not create a footer arrow.

     Contact remains:
       ↑ What I Create

     Only when the footer becomes visible:
       ↑ Home
  ======================================================= */

  function updateFooterNavigation() {

    if (
      !isFooterVisible()
    ) {

      return false;

    }


    /*
       Hide the normal ↓ arrow.
    */

    nextLink.style.display =
      "none";


    /*
       Convert the existing ↑ arrow into Home.
    */

    previousLink
      .querySelector(
        ".section-scroll-name"
      )
      .textContent =
      "Home";


    previousLink.href =
      "#hero";


    previousLink.setAttribute(
      "aria-label",
      "Return to Home"
    );


    previousLink.style.display =
      "flex";


    sectionNav.classList.remove(
      "only-next"
    );


    sectionNav.classList.add(
      "only-prev"
    );


    sectionNav.classList.remove(
      "on-dark"
    );


    sectionNav.classList.add(
      "is-visible"
    );


    return true;

  }


  /* =======================================================
     HIDE NAVIGATION
  ======================================================= */

  function hideSectionNav() {

    sectionNav.classList.remove(
      "is-visible"
    );

  }


  /* =======================================================
     REFRESH NAVIGATION STATE
  ======================================================= */

  function refreshSectionState() {

    /*
       Footer only changes the arrow after the footer has
       actually entered the viewport.
    */

    if (
      updateFooterNavigation()
    ) {

      return;

    }


    const cleanIndex =
      findCleanSection();


    if (
      cleanIndex === -1
    ) {

      hideSectionNav();

      return;

    }


    /*
       During a programmatic arrow scroll, do not show the
       arrows until the intended section has arrived.
    */

    if (
      isProgrammaticScroll &&
      cleanIndex !==
        programmaticTargetIndex
    ) {

      hideSectionNav();

      return;

    }


    activeIndex =
      cleanIndex;


    updateSectionNav(
      activeIndex
    );


    if (
      isProgrammaticScroll &&
      cleanIndex ===
        programmaticTargetIndex
    ) {

      isProgrammaticScroll =
        false;


      programmaticTargetIndex =
        -1;

    }

  }


  /* =======================================================
     SCROLL HANDLING

     Manual scrolling immediately hides arrows.

     They return only after the new section is centered.
  ======================================================= */

  window.addEventListener(
    "scroll",
    () => {

      if (
        !isProgrammaticScroll
      ) {

        hideSectionNav();

      }


      clearTimeout(
        scrollTimer
      );


      scrollTimer =
        setTimeout(
          () => {

            refreshSectionState();

          },
          160
        );

    },
    {
      passive: true
    }
  );


  /* =======================================================
     CANCEL PROGRAMMATIC SCROLL

     Any deliberate manual input cancels an arrow-initiated
     smooth scroll.
  ======================================================= */

  function cancelProgrammaticScroll() {

    isProgrammaticScroll =
      false;


    programmaticTargetIndex =
      -1;


    hideSectionNav();

  }


  /* =======================================================
     WHEEL
  ======================================================= */

  window.addEventListener(
    "wheel",
    (event) => {

      if (
        Math.abs(
          event.deltaY
        ) > 0 ||
        Math.abs(
          event.deltaX
        ) > 0
      ) {

        cancelProgrammaticScroll();

      }

    },
    {
      passive: true
    }
  );


  /* =======================================================
     TOUCH
  ======================================================= */

  window.addEventListener(
    "touchstart",
    () => {

      cancelProgrammaticScroll();

    },
    {
      passive: true
    }
  );


  /* =======================================================
     KEYBOARD
  ======================================================= */

  window.addEventListener(
    "keydown",
    (event) => {

      const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " "
      ];


      if (
        scrollKeys.includes(
          event.key
        )
      ) {

        cancelProgrammaticScroll();

      }

    }
  );


  /* =======================================================
     SCROLL TO SECTION
  ======================================================= */

  function scrollToSection(
    targetIndex
  ) {

    if (
      targetIndex < 0 ||
      targetIndex >=
        navigationSections.length
    ) {

      return;

    }


    const target =
      navigationSections[
        targetIndex
      ];


    if (!target) {
      return;
    }


    isProgrammaticScroll =
      true;


    programmaticTargetIndex =
      targetIndex;


    hideSectionNav();


    const targetPosition =
      getSectionScrollPosition(
        target
      );


    window.scrollTo({
      top:
        targetPosition,

      behavior:
        "smooth"
    });

  }


  /* =======================================================
     PREVIOUS / UP CLICK
  ======================================================= */

  previousLink.addEventListener(
    "click",
    (event) => {

      event.preventDefault();


      /*
         Footer state:

         ↑ Home
      */

      if (
        isFooterVisible()
      ) {

        scrollToSection(
          0
        );

        return;

      }


      /*
         Normal state:

         ↑ Previous section
      */

      if (
        activeIndex <= 0
      ) {

        return;

      }


      scrollToSection(
        activeIndex - 1
      );

    }
  );


  /* =======================================================
     NEXT / DOWN CLICK
  ======================================================= */

  nextLink.addEventListener(
    "click",
    (event) => {

      event.preventDefault();


      if (
        activeIndex < 0
      ) {

        return;

      }


      if (
        activeIndex >=
        navigationSections.length - 1
      ) {

        return;

      }


      scrollToSection(
        activeIndex + 1
      );

    }
  );


  /* =======================================================
     INITIAL NAVIGATION STATE
  ======================================================= */

  requestAnimationFrame(
    () => {

      requestAnimationFrame(
        () => {

          refreshSectionState();

        }
      );

    }
  );


  /* =======================================================
     ACTIVE DESKTOP NAVIGATION
  ======================================================= */

  const navLinks =
    document.querySelectorAll(
      '.desktop-nav a[href^="#"]'
    );


  const topLevelSections =
    document.querySelectorAll(
      "main > section[id]"
    );


  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            const currentId =
              entry.target.id;


            navLinks.forEach(
              (link) => {

                const matches =
                  link.getAttribute(
                    "href"
                  ) ===
                  `#${currentId}`;


                link.classList.toggle(
                  "active",
                  matches
                );

              }
            );

          }
        );

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );


  topLevelSections.forEach(
    (section) => {

      sectionObserver.observe(
        section
      );

    }
  );


});