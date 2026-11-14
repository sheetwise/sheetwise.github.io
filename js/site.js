/* Sheetwise Engineering website - our own script. No cookies. (Visits are counted by Cloudflare Web Analytics, a separate cookie-free script in each page.)
   (The contact form sends its fields to Web3Forms, which e-mails them to us - privacy.html#messages.)

   ====== LAUNCH NEWS ======
   NEWS.formUrl : the Lemon Squeezy e-mail sign-up address. Once e-mail sign-ups work in Lemon Squeezy, put
                  "https://sheetwiseeng.lemonsqueezy.com/email-subscribe/external" here. "" = the box shows an e-mail link.
                  The form sends the visitor's address straight to Lemon Squeezy (privacy.html#news describes it). */
var NEWS = { formUrl: "" };

/* ====== CONTACT FORM ======
   CONTACT.key : the Web3Forms access key (web3forms.com, made for the Sheetwise Gmail). It is not a secret.
                 "" = the Support page shows the e-mail address instead of the form. */
var CONTACT = { key: "7e087e4b-5e73-433a-a0cc-3b1182cb698f" };

/*

   ====== SHOP SETTINGS - the ONE place to switch on real sales ======
   checkoutUrl : the Lemon Squeezy checkout link of the MathSheet product (Lemon Squeezy > Products > MathSheet > Share).
                 It must start with https:// and be a lemonsqueezy.com address. Leave "" until the store is approved (pre-launch mode).
   downloadUrl : the link to the signed MathSheet installer (Lemon Squeezy file link or GitHub Release asset). Leave "" until it exists.
   installer   : the installer file name, and sha256 : its SHA-256 checksum - copy both from SHA256SUMS.txt in the release folder
                 (folder WindowsApp/release/vX.Y, made by release.ps1). Change all four lines together for every release.
   While a link is "", its buttons say "Coming soon" and do not pretend to work. */
var SHOP = {
  checkoutUrl: "",
  downloadUrl: "",
  price: "$99",
  version: "1.36",
  installer: "MathSheet-Setup-1.36.exe",
  sha256: ""
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
  /* installer name + checksum on the Download page */
  [].forEach.call(document.querySelectorAll("[data-installer-name]"), function (e) { if (SHOP.installer) e.textContent = SHOP.installer; });
  if (/^[0-9a-fA-F]{64}$/.test(SHOP.sha256)) [].forEach.call(document.querySelectorAll("[data-sha256]"), function (e) { e.textContent = SHOP.sha256.toUpperCase(); });
  [].forEach.call(document.querySelectorAll("[data-when-live]"), function (e) { if (buy) e.hidden = false; });
  [].forEach.call(document.querySelectorAll("[data-when-prelaunch]"), function (e) { if (buy) e.hidden = true; });
  [].forEach.call(document.querySelectorAll("a[aria-disabled='true']"), function (a) { a.addEventListener("click", function (e) { e.preventDefault(); }); });

  /* Launch news sign-up: <form data-signup> posts to Lemon Squeezy; <... data-signup-off> is the e-mail-us fallback. */
  var news = ok(NEWS.formUrl, "lemonsqueezy.com");
  [].forEach.call(document.querySelectorAll("form[data-signup]"), function (f) { if (news) { f.action = NEWS.formUrl; f.hidden = false; } });
  [].forEach.call(document.querySelectorAll("[data-signup-off]"), function (e) { if (news) e.hidden = true; });
  /* Contact form: <form data-contact> posts to Web3Forms; <... data-contact-off> is the e-mail fallback. */
  var ckey = /^[0-9a-f-]{36}$/i.test(CONTACT.key);
  [].forEach.call(document.querySelectorAll("form[data-contact]"), function (f) {
    if (!ckey) return;
    f.access_key.value = CONTACT.key; f.hidden = false;
    var res = f.querySelector(".result"), btn = f.querySelector("button[type=submit]");
    f.addEventListener("submit", function (e) {
      if (!window.fetch || !window.FormData) return;
      e.preventDefault();
      f.subject.value = "MathSheet website: " + f.topic.value;
      btn.disabled = true; res.className = "result"; res.textContent = "Sending...";
      fetch(f.action, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d.success) throw new Error(d.message || "not sent");
          f.reset(); res.className = "result ok";
          res.textContent = "Thank you - your message is on its way. We usually reply within two working days.";
        })
        .catch(function () {
          res.className = "result bad";
          res.textContent = "Sorry, the message could not be sent. Please e-mail us at support@mathsheet.net.";
        })
        .then(function () { btn.disabled = false; });
    });
  });
  [].forEach.call(document.querySelectorAll("[data-contact-off]"), function (e) { if (ckey) e.hidden = true; });
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
