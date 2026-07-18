/* fischer.optix — Navigation, Scroll-Reveal, Lightbox */

(function () {
  "use strict";

  /* Mobile-Navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Scroll-Reveal */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (!reduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* Hintergrund-Wortmark (Startseite): fährt fix mit und blendet am Ende des weißen Bereichs aus.
     Ein unsichtbarer Sentinel am Anfang des farbigen Abschnitts steuert den Fade über
     IntersectionObserver: je weiter er ins Bild rückt, desto transparenter das Wortmark. */
  var bgMark = document.querySelector(".bg-wordmark");
  var fadeTarget = document.querySelector(".statement") || document.querySelector(".site-footer");
  if (bgMark && fadeTarget && "IntersectionObserver" in window) {
    var baseOpacity = 0.4;
    var sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:60vh;pointer-events:none;visibility:hidden;";
    if (!fadeTarget.style.position) fadeTarget.style.position = "relative";
    fadeTarget.appendChild(sentinel);

    var steps = [];
    for (var s = 0; s <= 20; s++) steps.push(s / 20);

    var markIo = new IntersectionObserver(
      function (entries) {
        var ratio = entries[0].isIntersecting ? entries[0].intersectionRatio : (entries[0].boundingClientRect.top < 0 ? 1 : 0);
        bgMark.style.opacity = (baseOpacity * (1 - ratio)).toFixed(3);
      },
      { threshold: steps }
    );
    markIo.observe(sentinel);
  }

  /* Lightbox */
  var frames = Array.prototype.slice.call(document.querySelectorAll("button.frame"));
  if (!frames.length) return;

  var lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Bildansicht");
  lightbox.innerHTML =
    '<figure><img src="" alt=""><figcaption class="label"></figcaption></figure>' +
    '<button type="button" class="lightbox__close">Schließen</button>' +
    '<button type="button" class="lightbox__prev" aria-label="Vorheriges Bild">&larr;</button>' +
    '<button type="button" class="lightbox__next" aria-label="Nächstes Bild">&rarr;</button>';
  document.body.appendChild(lightbox);

  var lbImg = lightbox.querySelector("img");
  var lbCaption = lightbox.querySelector("figcaption");
  var current = -1;
  var lastFocus = null;

  function show(index) {
    current = (index + frames.length) % frames.length;
    var img = frames[current].querySelector("img");
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
  }

  function open(index) {
    lastFocus = document.activeElement;
    show(index);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox__close").focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  frames.forEach(function (frame, i) {
    frame.addEventListener("click", function () {
      open(i);
    });
  });

  lightbox.querySelector(".lightbox__close").addEventListener("click", close);
  lightbox.querySelector(".lightbox__prev").addEventListener("click", function () {
    show(current - 1);
  });
  lightbox.querySelector(".lightbox__next").addEventListener("click", function () {
    show(current + 1);
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
