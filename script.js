console.log("JS LOADED");
const wrapper = document.getElementById("testiWrapper");
const track = document.getElementById("testiTrack");
const customCursor = document.getElementById("cursor");
const brand = document.getElementById("brand");
const bar = document.getElementById("bar");
const progress = document.getElementById("progress");
const skills = document.getElementById("skills");
const modelSection = document.getElementById("modelSection");
const tagline = document.getElementById("tagline");
const cta = document.getElementById("cta");
const scrollDot = document.getElementById("scrollThumb");
document.documentElement.classList.remove("preload");


window.addEventListener("scroll", () => {
  const scroll =
    window.scrollY /
    (document.body.scrollHeight - window.innerHeight);

  scrollDot.style.top = `${scroll * 190}px`;
});

window.addEventListener("pageshow", () => {
  const hasPlayed = sessionStorage.getItem("introPlayed");
  const isAtTop = window.scrollY < 50;

  document.body.classList.add("intro-active");
  if (!hasPlayed && isAtTop) {
    sessionStorage.setItem("introPlayed", "true");
    brand.classList.add("intro");
    brand.classList.remove("hero");
    bar.style.width = "100%";

    setTimeout(() => brand.classList.add("focus"), 800);
    setTimeout(() => {
      brand.classList.remove("focus");
      brand.classList.add("fade-out");
    }, 2200);
    setTimeout(() => {
      brand.classList.add("instant");
      brand.classList.remove("intro");
      brand.classList.add("hero");
      void brand.offsetHeight;
      brand.classList.remove("instant");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          brand.classList.remove("fade-out");
        });
      });
    }, 3500);
    setTimeout(() => {
      progress.style.opacity = "0";
      showUI();
    }, 4500);
  } else {
    skipIntro();
  }
});
function showUI() {
  document.body.classList.remove("intro-active");

  modelSection.classList.add("show");
  skills.classList.add("show");
  tagline.classList.add("show");
  cta.classList.add("show");

  const availability = document.querySelector(".availability");
  const book = document.querySelector(".book-call");
  const nav = document.querySelector(".side-nav");
  const scroll = document.querySelector(".scroll-indicator");

  [availability, book, nav, scroll].forEach(el => {
    if (!el) return;
    el.style.opacity = "1";
    el.style.pointerEvents = "auto";
  });
}

function skipIntro() {
  brand.classList.add("instant");
  brand.classList.remove("intro", "focus", "fade-out");
  brand.classList.add("hero");

  brand.style.position = "";
  brand.style.opacity = "";
  brand.style.filter = "";

  bar.style.width = "100%";
  progress.style.opacity = "0";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      brand.classList.remove("instant");
    });
  });

  showUI();
}

let mouseThrottle = false;
document.addEventListener("mousemove", (e) => {
  if (mouseThrottle) return;
  mouseThrottle = true;
  requestAnimationFrame(() => {
    if (!brand) return;
    const rect = brand.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    brand.style.setProperty("--x", `${x}%`);
    brand.style.setProperty("--y", `${y}%`);
    mouseThrottle = false;
  });
});




const viewer = document.getElementById("viewer");

const startZoom = 200;
const endZoom = 30;

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {

      const scroll =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight);

      const currentZoom =
        startZoom + (endZoom - startZoom) * scroll;

      const rotation = 30 + scroll * 120;

      viewer.cameraOrbit = `${rotation}deg 75deg ${currentZoom}%`;

      ticking = false;
    });

    ticking = true;
  }
});

const cards = document.querySelectorAll(".project-card");

const revealCards = () => {
  const trigger = window.innerHeight * 0.85;

  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;

    if (top < trigger) {
      card.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealCards);

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  mouseX = x;
  mouseY = y;
});

function animateFlower() {
  const scroll =
    window.scrollY /
    (document.body.scrollHeight - window.innerHeight);

  const baseZoom = 200 + (30 - 200) * scroll;
  const baseRotation = 30 + scroll * 120;

  const offsetX = mouseX * 5;
  const offsetY = mouseY * 3;

  viewer.cameraOrbit = `${baseRotation + offsetX}deg ${75 + offsetY}deg ${baseZoom}%`;

  requestAnimationFrame(animateFlower);
}

animateFlower();

const sections = {
  home: document.querySelector(".hero-wrap"),
  projects: document.querySelector(".projects"),
  about: document.querySelector(".about"),
  contact: document.querySelector(".contact"),
};

const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;


  let current = "home";

  if (scrollY >= sections.contact.offsetTop - window.innerHeight / 2) {
    current = "contact";
  } else if (scrollY >= sections.about.offsetTop - window.innerHeight / 2) {
    current = "about";
  } else if (scrollY >= sections.projects.offsetTop - window.innerHeight / 2) {
    current = "projects";
  }

  navItems.forEach((item) => {
    item.classList.remove("active");

    const label = item.getAttribute("data-label").toLowerCase();

    if (label === current) {
      item.classList.add("active");
    }
  });
});

const aboutSection = document.querySelector(".about");
const aboutText = document.querySelector(".about-text");

window.addEventListener("scroll", () => {
  const rect = aboutSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const progress = Math.min(
    Math.max((windowHeight - rect.top) / windowHeight, 0),
    1
  );

  aboutText.style.filter = `brightness(${0.6 + progress * 0.4})`;
});

document.addEventListener("DOMContentLoaded", () => {

  const chessPieces = document.querySelectorAll(".chess-wrap");
  const certModal = document.getElementById("certModal");
  const certImage = document.getElementById("certImage");
  const closeBtn = document.querySelector(".close-btn");

  let isOpening = false;

  chessPieces.forEach(piece => {
    piece.addEventListener("click", (e) => {
      e.stopPropagation();

      if (isOpening) return;
      isOpening = true;

      const imgSrc = piece.getAttribute("data-cert");

      console.log("CLICKED:", imgSrc);

      certImage.src = "";

      setTimeout(() => {
        certImage.src = imgSrc;

        certModal.classList.add("show");
        document.body.classList.add("modal-open");

        isOpening = false;
      }, 50);
    });
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    certModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  });

  certModal.addEventListener("click", () => {
    certModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  });

  document.querySelector(".cert-content").addEventListener("click", (e) => {
    e.stopPropagation();
  });

});


let isDragging = false;
let startX = 0;
let currentTranslate = 0;

wrapper.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;

  track.style.animation = "none";
  track.style.willChange = "transform";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const delta = e.clientX - startX;

  currentTranslate += delta;

  const trackWidth = track.scrollWidth / 2;

  if (currentTranslate > 0) {
    currentTranslate -= trackWidth;
  }

  if (Math.abs(currentTranslate) >= trackWidth) {
    currentTranslate += trackWidth;
  }

  track.style.transform = `translateX(${currentTranslate}px)`;

  startX = e.clientX;
});

window.addEventListener("mouseup", () => {
  if (!isDragging) return;

  isDragging = false;

  track.style.animation = "none";
  track.style.transform = `translateX(${currentTranslate}px)`;
});


wrapper.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".testi-card").forEach(card => {
    const rect = card.getBoundingClientRect();

    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
});


wrapper.addEventListener("mouseenter", () => {
  customCursor.classList.add("show");
});

wrapper.addEventListener("mouseleave", () => {
  customCursor.classList.remove("show");

  document.querySelectorAll(".testi-card").forEach(card => {
    card.classList.remove("active");
  });
});
window.addEventListener("scroll", () => {
  if (!wrapper.matches(":hover")) {
    customCursor.classList.remove("show");

    document.querySelectorAll(".testi-card").forEach(card => {
      card.classList.remove("active");
    });
  }
});
window.addEventListener("mousemove", (e) => {
  customCursor.style.left = e.clientX + "px";
  customCursor.style.top = e.clientY + "px";
});


let autoSpeed = 0.3;

let rafId = null;

function autoScroll() {
  if (rafId) return;

  function loop() {
    if (!isDragging) {
      currentTranslate -= autoSpeed;

      const trackWidth = track.scrollWidth / 2;

      if (Math.abs(currentTranslate) >= trackWidth) {
        currentTranslate += trackWidth;
      }

      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    rafId = requestAnimationFrame(loop);
  }

  loop();
}

autoScroll();

const copyBtn = document.getElementById("copyBtn");
const emailText = document.getElementById("emailText");
const copyMsg = document.getElementById("copyMsg");

copyBtn.addEventListener("click", () => {
  const text = emailText.value;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  }

  copyMsg.textContent = "Copied!";
  copyMsg.style.opacity = "1";

  setTimeout(() => {
    copyMsg.style.opacity = "0";
  }, 1500);
});


const contactSectionEl = document.querySelector(".contact");
const floatingCall = document.querySelector(".book-call");

window.addEventListener("scroll", () => {
  const rect = contactSectionEl.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.3 && rect.bottom > 0) {
    floatingCall.innerHTML = "🌸";
    floatingCall.style.pointerEvents = "none";
  } else {
    floatingCall.innerHTML = '<i class="ri-phone-line"></i>';
    floatingCall.style.opacity = "1";
    floatingCall.style.pointerEvents = "auto";
  }
});

window.addEventListener("scroll", () => {
  const rect = wrapper.getBoundingClientRect();

  if (rect.bottom < 0 || rect.top > window.innerHeight) {
    customCursor.classList.remove("show");

    document.querySelectorAll(".testi-card").forEach(card => {
      card.classList.remove("active");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openCalendly");
  const modal = document.getElementById("calendlyModal");
  const closeBtn = document.getElementById("closeCalendly");
  const floatingCallEl = document.querySelector(".book-call");

  if (!openBtn || !modal || !closeBtn) {
    console.log("Calendly elements not found");
    return;
  }

  function openCalendlyModal() {
    modal.style.display = "flex";
    modal.style.opacity = "1";
    document.body.style.overflow = "hidden";
  }

  function closeCalendlyModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", openCalendlyModal);

  if (floatingCallEl) {
    floatingCallEl.addEventListener("click", openCalendlyModal);
  }

  closeBtn.addEventListener("click", closeCalendlyModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeCalendlyModal();
    }
  });
});


document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    const label = item.getAttribute("data-label").toLowerCase();
    const section = sections[label];

    if (!section) return;

    let offset = 0;

    if (label === "about") {
      offset = 145;
    }

    if (label === "projects") {
      offset = 80;
    }

    const top = section.offsetTop + offset;

    window.scrollTo({
      top: top,
      behavior: "smooth"
    });
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const aboutCta = document.getElementById("aboutCta");
  const contactSectionTarget = document.getElementById("contact");

  if (!aboutCta || !contactSectionTarget) return;

  aboutCta.style.pointerEvents = "auto";

  aboutCta.addEventListener("click", (e) => {
    e.preventDefault();

    contactSectionTarget.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const aboutCta = document.getElementById("aboutCta");
  const contactSectionTarget = document.getElementById("contact");

  if (!aboutCta || !contactSectionTarget) return;

  aboutCta.addEventListener("click", () => {
    window.scrollTo({
      top: contactSectionTarget.offsetTop,
      behavior: "smooth"
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const project1Card = document.querySelector(".project-card[data-project='project1']");
  const project2Card = document.querySelector(".project-card[data-project='project2']");
  const project3Card = document.querySelector(".project-card[data-project='project3']");
  const project4Card = document.querySelector(".project-card[data-project='project4']");
  const projectModal = document.getElementById("projectModal");
  const galleryMode = document.getElementById("galleryMode");
  const detailMode = document.getElementById("detailMode");
  const detailModeP2 = document.getElementById("detailModeP2");
  const detailModeP3 = document.getElementById("detailModeP3");
  const detailModeP4 = document.getElementById("detailModeP4");
  const projectPreview = document.getElementById("projectPreview");
  const closeProject = document.getElementById("closeProject");
  const galleryPrev = document.getElementById("galleryPrev");
  const galleryNext = document.getElementById("galleryNext");
  const galleryCounter = document.getElementById("galleryCounter");
  const galleryThumbs = document.getElementById("galleryThumbs");
  const sampleGrid = document.getElementById("sampleGrid");
  const videoGrid = document.getElementById("videoGrid");
  const p2MainImage = document.getElementById("p2MainImage");
  const p2Arrow = document.getElementById("p2Arrow");


  let currentGalleryImages = [];
  let currentGalleryIndex = 0;

  const project1Samples = ["pr1.jpg","pr2.jpg","pr3.jpg","pr4.png","pr5.png","pr6.jpg","pr7.jpg","pr9.jpg"]; 
const project1Videos = ["v1.mp4","v2.mp4"];

  const REAL_PREFIX = "REAL";
  const WATER_PREFIX = "WATER";
  const PRODUCT_PREFIX = "PRODUCT";

  function getAllGraphicSampleFiles() {
    // Preserve existing pr* samples and additionally include newer categorized assets
    // that exist in this project folder.
    return [
      ...project1Samples,
      // REAL estate marketing
      "REAL1.png", "REAL2.png", "REAL3.png", "REAL4.png",
      // Small business marketing
      "WATER1.png", "WATER2.png", "WATER3.png", "WATER4.png", "WATER5.png", "WATER6.png",
      // Product marketing
      "PRODUCT1.png", "PRODUCT2.png", "PRODUCT3.png", "PRODUCT4.png", "PRODUCT5.png", "PRODUCT6.png", "PRODUCT7.png"
    ];
  }

  function groupGraphicSamples(samples) {
    const buckets = {
      real: [],
      water: [],
      product: [],
      other: []
    };

    samples.forEach((src) => {
      const upper = src.toUpperCase();
      if (upper.startsWith(REAL_PREFIX)) buckets.real.push(src);
      else if (upper.startsWith(WATER_PREFIX)) buckets.water.push(src);
      else if (upper.startsWith(PRODUCT_PREFIX)) buckets.product.push(src);
      else buckets.other.push(src);
    });

    return buckets;
  }

  function renderSampleGrid(gridEl, images) {
    gridEl.innerHTML = "";
    images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        openGalleryMode([src]);
      });
      gridEl.appendChild(img);
    });
  }


  function renderThumbs() {
    galleryThumbs.innerHTML = "";
    currentGalleryImages.forEach((src, idx) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.classList.toggle("active", idx === currentGalleryIndex);
      thumb.addEventListener("click", (e) => {
        e.stopPropagation();
        currentGalleryIndex = idx;
        updateGallery();
      });
      galleryThumbs.appendChild(thumb);
    });
  }

  function updateGallery() {
    projectPreview.src = currentGalleryImages[currentGalleryIndex];
    galleryCounter.textContent = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
    renderThumbs();
  }

  function openGalleryMode(images) {
    galleryMode.style.display = "block";
    detailMode.style.display = "none";
    currentGalleryImages = images;
    currentGalleryIndex = 0;

    // Single-image mode (Graphic Design sample previews)
    const isSingleImage = images.length === 1;
    projectModal.classList.toggle("single-image-gallery", isSingleImage);

    updateGallery();
    projectModal.classList.add("show");
    document.body.classList.add("modal-open");
  }


  function openDetailMode() {
    galleryMode.style.display = "none";
    detailMode.style.display = "block";

    // New categorized sample grids (ordered: REAL -> WATER -> PRODUCT -> Other)
    const buckets = groupGraphicSamples(getAllGraphicSampleFiles());

    const realGrid = document.getElementById("sampleGridReal");
    const waterGrid = document.getElementById("sampleGridWater");
    const productGrid = document.getElementById("sampleGridProduct");
    const otherGrid = document.getElementById("sampleGridOther");

    // Fallback (in case DOM IDs changed)
    if (!realGrid || !waterGrid || !productGrid || !otherGrid) {
      // keep old behavior
      if (sampleGrid) {
        sampleGrid.innerHTML = "";
        project1Samples.forEach(src => {
          const img = document.createElement("img");
          img.src = src;
          img.addEventListener("click", (e) => {
            e.stopPropagation();
            openGalleryMode([src]);
          });
          sampleGrid.appendChild(img);
        });
      }
    } else {
      renderSampleGrid(realGrid, buckets.real);
      renderSampleGrid(waterGrid, buckets.water);
      renderSampleGrid(productGrid, buckets.product);
      renderSampleGrid(otherGrid, buckets.other);
    }

    // Videos unchanged
    videoGrid.innerHTML = "";
    project1Videos.forEach(src => {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.preload = "metadata";
      videoGrid.appendChild(video);
    });

    projectModal.classList.add("show");
    document.body.classList.add("modal-open");
  }

  if (project1Card) {
    project1Card.style.cursor = "pointer";
    project1Card.addEventListener("click", () => {
      openDetailMode();
    });
  }

  if (project2Card) {
    project2Card.style.cursor = "pointer";
    project2Card.addEventListener("click", () => {
      galleryMode.style.display = "none";
      detailMode.style.display = "none";
      detailModeP2.style.display = "block";
      projectModal.classList.add("show");
      document.body.classList.add("modal-open");
    });
  }

  if (project3Card) {
    project3Card.style.cursor = "pointer";
    project3Card.addEventListener("click", () => {
      galleryMode.style.display = "none";
      detailMode.style.display = "none";
      detailModeP2.style.display = "none";
      detailModeP3.style.display = "block";
      if (detailModeP4) detailModeP4.style.display = "none";
      projectModal.classList.add("show");
      document.body.classList.add("modal-open");
    });
  }

  if (project4Card) {
    project4Card.style.cursor = "pointer";
    project4Card.addEventListener("click", () => {
      galleryMode.style.display = "none";
      detailMode.style.display = "none";
      detailModeP2.style.display = "none";
      detailModeP3.style.display = "none";
      if (detailModeP4) detailModeP4.style.display = "block";
      projectModal.classList.add("show");
      document.body.classList.add("modal-open");
    });
  }


  if (p2Arrow && p2MainImage) {
    p2Arrow.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentSrc = p2MainImage.getAttribute("src");
      p2MainImage.src = currentSrc === "p22.png" ? "p21.png" : "p22.png";
    });
  }

  galleryPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateGallery();
  });

  galleryNext.addEventListener("click", (e) => {
    e.stopPropagation();
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    updateGallery();
  });

  galleryBack.addEventListener("click", (e) => {
    e.stopPropagation();
    goBackToDetail();
  });

  // Accordion behavior (used by VA detail view)
  document.querySelectorAll('.accordion').forEach((accordionEl) => {
    const items = accordionEl.querySelectorAll('.accordion-item');

    // start fully collapsed (all panels closed, no aria-expanded mismatch)
    items.forEach((item) => {
      const btn = item.querySelector('.accordion-btn');
      const panel = item.querySelector('.accordion-panel');
      item.classList.remove('open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (panel) {
        panel.hidden = true;
        panel.style.maxHeight = '0px';
        panel.style.opacity = '0';
      }
    });

    accordionEl.querySelectorAll('.accordion-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        const accordionItem = btn.closest('.accordion-item');
        const panelId = btn.getAttribute('data-accordion');
        const panel = accordionEl.querySelector(`.accordion-panel[data-accordion-panel="${panelId}"]`);
        if (!accordionItem || !panel) return;

        const isOpen = accordionItem.classList.contains('open');

        // close all siblings first (single-open behavior)
        const allItems = accordionEl.querySelectorAll('.accordion-item');
        allItems.forEach((item) => {
          if (item !== accordionItem) {
            item.classList.remove('open');
            const otherBtn = item.querySelector('.accordion-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');

            const otherPanel = item.querySelector('.accordion-panel');
            if (otherPanel) {
              otherPanel.style.maxHeight = '0px';
              otherPanel.style.opacity = '0';
              window.setTimeout(() => {
                otherPanel.hidden = true;
              }, 450);
            }
          }
        });

        if (isOpen) {
          accordionItem.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');

          panel.style.maxHeight = '0px';
          panel.style.opacity = '0';
          window.setTimeout(() => {
            panel.hidden = true;
          }, 450);
        } else {
          accordionItem.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');

          // open with smooth downward animation
          panel.hidden = false;
          const targetHeight = panel.scrollHeight;
          panel.style.maxHeight = targetHeight + 'px';
          panel.style.opacity = '1';

          // allow growth if content wraps/reflows after open
          window.setTimeout(() => {
            panel.style.maxHeight = 'none';
          }, 460);
        }
      });
    });
  });


function goBackToDetail() {
    galleryMode.style.display = "none";
    detailMode.style.display = "block";
  }


  function closeProjectModal() {
    // Stop all videos
    document.querySelectorAll('.video-grid video').forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
    projectModal.classList.remove("show");
    projectModal.classList.remove("single-image-gallery");

    document.body.classList.remove("modal-open");
    setTimeout(() => {
      galleryMode.style.display = "block";
      detailMode.style.display = "none";
      detailModeP2.style.display = "none";
      detailModeP3.style.display = "none";
      if (detailModeP4) detailModeP4.style.display = "none";
    }, 400);
  }


  closeProject.addEventListener("click", closeProjectModal);

  projectModal.addEventListener("click", closeProjectModal);

  document.querySelector(".project-box").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("keydown", (e) => {
    if (!projectModal.classList.contains("show")) return;
    if (e.key === "Escape") {
      closeProjectModal();
    }
    if (galleryMode.style.display !== "none") {
      if (e.key === "ArrowLeft") {
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        updateGallery();
      }
      if (e.key === "ArrowRight") {
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
        updateGallery();
      }
    }
  });
});
