// ==UserScript==
// @name         Shinden — Holo click counter
// @namespace    https://github.com/mciochu/shindencss
// @version      1.0.0
// @description  Dodaje trwałe numerki w miejscu kliknięcia Holo na profilu Shinden.
// @match        *://shinden.pl/*
// @match        *://*.shinden.pl/*
// @run-at       document-idle
// @grant        none
// @updateURL    https://raw.githubusercontent.com/mciochu/shindencss/main/holo-click-counter.user.js
// @downloadURL  https://raw.githubusercontent.com/mciochu/shindencss/main/holo-click-counter.user.js
// ==/UserScript==

(() => {
  "use strict";

  // Ochrona przed podwójnym uruchomieniem, np. przy nawigacji SPA.
  if (window.__mciochuHoloClickCounterInstalled) return;
  window.__mciochuHoloClickCounterInstalled = true;

  const targetSelector = "body.shinden-list .back-to-top-wrapper";
  let clickNumber = 0;

  document.addEventListener("pointerdown", (event) => {
    // Liczymy wyłącznie zwykłe kliknięcia lewym przyciskiem myszy.
    if (event.button !== 0 || event.pointerType !== "mouse") return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    // Kliknięcie musi trafić bezpośrednio w pseudo-element Holo.
    // Przycisk „powrót na górę” i pozostałe elementy nie zwiększają licznika.
    if (!target.matches(targetSelector)) return;

    clickNumber += 1;

    const marker = document.createElement("span");
    marker.className = "holo-click-number";
    marker.textContent = String(clickNumber);
    marker.setAttribute("aria-hidden", "true");
    marker.dataset.clickNumber = String(clickNumber);

    // Numer pozostaje w miejscu kliknięcia; nie podąża za kursorem.
    marker.style.left = `${Math.round(event.clientX + 17)}px`;
    marker.style.top = `${Math.round(event.clientY - 17)}px`;

    document.body.appendChild(marker);
  }, true);
})();
