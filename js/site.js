/* Sheetwise Engineering website - the only script on the site. No tracking, no cookies, no third-party code.

   ====== SHOP SETTINGS - the ONE place to switch on real sales ======
   checkoutUrl : the Lemon Squeezy checkout link of the MathSheet product (Lemon Squeezy > Products > MathSheet > Share).
                 It must start with https:// and be a lemonsqueezy.com address. Leave "" until the store is approved (pre-launch mode).
   downloadUrl : the link to the signed MathSheet installer (Lemon Squeezy file link or GitHub Release asset). Leave "" until it exists.
   While a link is "", its buttons say "Coming soon" and do not pretend to work. */
var SHOP = {
  checkoutUrl: "",
  downloadUrl: "",
  price: "$99",
  version: "1.35"
};

(function () {
  document.documentElement.className += " js";
  function ok(u, host) { return /^https:\/\//.test(u) && (!host || u.indexOf(host) > 0); }

  /* Buy buttons: <a data-buy>. Without a checkout link they show "Coming soon". */
  var buy = ok(SHOP.checkoutUrl, "lemonsqueezy.com");
  [].forEach.call(document.querySelectorAll("[data-buy]"), function (a) {
    if (buy) { a.href = SHOP.checkoutUrl; a.className = a.className.replace(/\bsoon\b/, "primary"); a.textContent = a.getAttribute("data-buy") || ("Buy MathSheet - " + SHOP.price); a.removeAttribute("aria-disabled"); }
  });
  /* Download buttons: <a data-download>. */
  var dl = ok(SHOP.downloadUrl);
  [].forEach.call(document.querySelectorAll("[data-download]"), function (a) {
    if (dl) { a.href = SHOP.downloadUrl; a.className = a.className.replace(/\bsoon\b/, a.getAttribute("data-style") || "secondary"); a.textContent = a.getAttribute("data-download") || "Download free trial"; a.removeAttribute("aria-disabled"); }
  });
  [].forEach.call(document.querySelectorAll("[data-when-live]"), function (e) { if (buy) e.hidden = false; });
  [].forEach.call(document.querySelectorAll("[data-when-prelaunch]"), function (e) { if (buy) e.hidden = true; });
  [].forEach.call(document.querySelectorAll("a[aria-disabled='true']"), function (a) { a.addEventListener("click", function (e) { e.preventDefault(); }); });

  /* Tabs: [data-tabs] holds role=tab buttons and role=tabpanel panels. Arrow keys move between tabs. */
  [].forEach.call(document.querySelectorAll("[data-tabs]"), function (box) {
    var tabs = [].slice.call(box.querySelectorAll("[role=tab]")), panels = [].slice.call(box.querySelectorAll("[role=tabpanel]"));
    box.querySelector("[role=tablist]").hidden = false;
    function show(i, focus) {
      tabs.forEach(function (t, k) { t.setAttribute("aria-selected", k === i); t.tabIndex = k === i ? 0 : -1; panels[k].hidden = k !== i; });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { show(i); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") show((i + 1) % tabs.length, true);
        if (e.key === "ArrowLeft") show((i - 1 + tabs.length) % tabs.length, true);
      });
    });
    show(0);
  });

  /* Click a screenshot to see it full size (native <dialog>; Esc closes). */
  var dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.innerHTML = '<button class="x" type="button">Close &times;</button><img alt=""><div class="cap"></div>';
  document.body.appendChild(dlg);
  dlg.querySelector(".x").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  [].forEach.call(document.querySelectorAll("button.zoom"), function (b) {
    b.addEventListener("click", function () {
      var img = b.querySelector("img");
      if (!dlg.showModal) { window.open(img.src); return; }
      dlg.querySelector("img").src = img.src; dlg.querySelector("img").alt = img.alt;
      dlg.querySelector(".cap").textContent = img.alt;
      dlg.showModal();
    });
  });
})();
