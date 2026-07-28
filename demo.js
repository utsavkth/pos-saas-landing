/* Khatiwada POS, live demo. Entirely client-side: no backend call anywhere
   in this file, on purpose. "Cleared with the browser session" only makes
   sense if nothing here ever reaches a real server, so every product/cart
   change lives in sessionStorage (this tab, until it's closed) rather than
   the real accounts/product database. A visitor can add a product or ring
   up a sale and it'll feel real, but it's never going anywhere.

   Bilingual via the same data-en/data-ne + KhatiwadaLang convention as the
   rest of the site (see script.js). Every dynamically-created element below
   gets data-en/data-ne set on it, exactly like static markup, so script.js's
   existing document-wide language sweep updates this content too on a
   later toggle, not just at the moment it's first rendered. */
(function () {
  "use strict";

  var PRODUCTS_KEY = "khatiwada_demo_products";
  var CART_KEY = "khatiwada_demo_cart";

  var TILE_COLORS = ["var(--terracotta)", "var(--green)", "var(--green-light)", "var(--brown)", "var(--terracotta-dark)"];

  var DEFAULT_PRODUCTS = [
    { id: "rice", name: { en: "Rice (1kg)", ne: "चामल (1kg)" }, price: 145, category: { en: "Grains", ne: "अन्न" } },
    { id: "dal", name: { en: "Dal (1kg)", ne: "दाल (1kg)" }, price: 180, category: { en: "Grains", ne: "अन्न" } },
    { id: "oil", name: { en: "Cooking Oil (1L)", ne: "पकाउने तेल (1L)" }, price: 320, category: { en: "Pantry", ne: "भान्सा सामान" } },
    { id: "sugar", name: { en: "Sugar (1kg)", ne: "चिनी (1kg)" }, price: 120, category: { en: "Pantry", ne: "भान्सा सामान" } },
    { id: "milk", name: { en: "Milk (500ml)", ne: "दूध (500ml)" }, price: 65, category: { en: "Dairy", ne: "दुग्ध पदार्थ" } },
    { id: "soap", name: { en: "Soap", ne: "साबुन" }, price: 55, category: { en: "Household", ne: "घरायसी सामान" } },
    { id: "biscuits", name: { en: "Biscuits", ne: "बिस्कुट" }, price: 40, category: { en: "Snacks", ne: "खाजा" } },
    { id: "noodles", name: { en: "Instant Noodles", ne: "इन्स्ट्यान्ट नुडल्स" }, price: 35, category: { en: "Snacks", ne: "खाजा" } }
  ];

  var CUSTOM_CATEGORY = { en: "Custom", ne: "आफ्नै" };

  function lang() {
    return (window.KhatiwadaLang && window.KhatiwadaLang.getLang()) || "en";
  }

  // A product loaded fresh from DEFAULT_PRODUCTS has {en, ne} pairs for name/
  // category. One added through the demo's own "Add product" form only ever
  // has whatever the visitor actually typed, in whichever language they typed
  // it, so there's nothing to translate there: same string for both.
  function localized(value) {
    if (typeof value === "object" && value !== null) return value;
    return { en: value, ne: value };
  }

  function loadProducts() {
    try {
      var stored = sessionStorage.getItem(PRODUCTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    saveProducts(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS.slice();
  }

  function saveProducts(list) {
    try { sessionStorage.setItem(PRODUCTS_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function loadCart() {
    try {
      var stored = sessionStorage.getItem(CART_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  }

  function saveCart(list) {
    try { sessionStorage.setItem(CART_KEY, JSON.stringify(list)); } catch (e) {}
  }

  var products = loadProducts();
  var cart = loadCart();

  function money(n) { return "Rs " + n.toLocaleString("en-IN"); }

  function setBilingualText(el, textPair) {
    el.setAttribute("data-en", textPair.en);
    el.setAttribute("data-ne", textPair.ne);
    el.textContent = textPair[lang()];
  }

  // ---- Toast ------------------------------------------------------------
  var toastEl = document.getElementById("demo-toast");
  var toastTimer = null;
  function showToast(textPair) {
    setBilingualText(toastEl, textPair);
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("visible"); }, 2200);
  }

  // ---- Tabs ---------------------------------------------------------------
  var tabs = document.querySelectorAll(".demo-tab");
  var views = document.querySelectorAll(".demo-view");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
      views.forEach(function (v) { v.classList.toggle("active", v.id === "demo-view-" + tab.dataset.view); });
      if (tab.dataset.view === "products") renderProductsTable();
    });
  });

  // ---- Cashier: product grid -------------------------------------------
  var gridEl = document.getElementById("demo-product-grid");
  var searchEl = document.getElementById("demo-search");

  function renderGrid() {
    var term = searchEl.value.trim().toLowerCase();
    var visible = products.filter(function (p) {
      var name = localized(p.name);
      return name.en.toLowerCase().indexOf(term) !== -1 || name.ne.indexOf(term) !== -1;
    });
    gridEl.innerHTML = "";
    visible.forEach(function (p, i) {
      var name = localized(p.name);
      var tile = document.createElement("button");
      tile.type = "button";
      tile.className = "demo-product-tile";
      tile.style.background = TILE_COLORS[i % TILE_COLORS.length];
      var nameEl = document.createElement("span");
      nameEl.className = "name";
      setBilingualText(nameEl, name);
      var priceEl = document.createElement("span");
      priceEl.className = "price";
      priceEl.textContent = money(p.price);
      tile.appendChild(nameEl);
      tile.appendChild(priceEl);
      tile.addEventListener("click", function () { addToCart(p.id); });
      gridEl.appendChild(tile);
    });
  }

  searchEl.addEventListener("input", renderGrid);

  // ---- Cart ---------------------------------------------------------------
  var cartItemsEl = document.getElementById("demo-cart-items");
  var cartTotalEl = document.getElementById("demo-cart-total");
  var CART_EMPTY_TEXT = {
    en: "Tap a product, or scan one, to start a sale.",
    ne: "बिक्री सुरु गर्न कुनै प्रोडक्ट थिच्नुहोस्, वा स्क्यान गर्नुहोस्।"
  };

  function findProduct(id) {
    for (var i = 0; i < products.length; i++) if (products[i].id === id) return products[i];
    return null;
  }

  function addToCart(id) {
    var line = null;
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id) line = cart[i];
    if (line) line.qty += 1;
    else cart.push({ id: id, qty: 1 });
    saveCart(cart);
    renderCart();
  }

  function changeQty(id, delta) {
    var line = null, idx = -1;
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id) { line = cart[i]; idx = i; }
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart.splice(idx, 1);
    saveCart(cart);
    renderCart();
  }

  function renderCart() {
    cartItemsEl.innerHTML = "";
    if (cart.length === 0) {
      var empty = document.createElement("div");
      empty.className = "demo-cart-empty";
      setBilingualText(empty, CART_EMPTY_TEXT);
      cartItemsEl.appendChild(empty);
    }
    var total = 0;
    cart.forEach(function (line) {
      var p = findProduct(line.id);
      if (!p) return;
      var name = localized(p.name);
      total += p.price * line.qty;
      var row = document.createElement("div");
      row.className = "demo-cart-item";
      var nameEl = document.createElement("span");
      nameEl.className = "demo-cart-item-name";
      setBilingualText(nameEl, name);
      var minusBtn = document.createElement("button");
      minusBtn.type = "button"; minusBtn.className = "demo-qty-btn"; minusBtn.textContent = "−";
      minusBtn.addEventListener("click", function () { changeQty(line.id, -1); });
      var qtyEl = document.createElement("span");
      qtyEl.textContent = line.qty;
      var plusBtn = document.createElement("button");
      plusBtn.type = "button"; plusBtn.className = "demo-qty-btn"; plusBtn.textContent = "+";
      plusBtn.addEventListener("click", function () { changeQty(line.id, 1); });
      var priceEl = document.createElement("span");
      priceEl.className = "demo-cart-item-price";
      priceEl.textContent = money(p.price * line.qty);
      row.appendChild(nameEl);
      row.appendChild(minusBtn);
      row.appendChild(qtyEl);
      row.appendChild(plusBtn);
      row.appendChild(priceEl);
      cartItemsEl.appendChild(row);
    });
    cartTotalEl.textContent = money(total);
  }

  document.getElementById("demo-checkout").addEventListener("click", function () {
    if (cart.length === 0) return;
    var total = 0;
    cart.forEach(function (line) {
      var p = findProduct(line.id);
      if (p) total += p.price * line.qty;
    });
    cart = [];
    saveCart(cart);
    renderCart();
    showToast({
      en: "Sale complete, " + money(total) + " (demo only, nothing was actually charged)",
      ne: "बिक्री पूरा भयो, " + money(total) + " (यो डेमो मात्र हो, वास्तवमा केही शुल्क लागेको छैन)"
    });
  });

  // ---- Products/admin table ---------------------------------------------
  var tbodyEl = document.getElementById("demo-products-tbody");
  function renderProductsTable() {
    tbodyEl.innerHTML = "";
    products.forEach(function (p) {
      var name = localized(p.name);
      var category = localized(p.category);
      var tr = document.createElement("tr");
      var nameTd = document.createElement("td");
      setBilingualText(nameTd, name);
      var catTd = document.createElement("td");
      setBilingualText(catTd, category);
      var priceTd = document.createElement("td");
      priceTd.textContent = money(p.price);
      tr.appendChild(nameTd);
      tr.appendChild(catTd);
      tr.appendChild(priceTd);
      tbodyEl.appendChild(tr);
    });
  }

  // ---- Add product modal --------------------------------------------------
  var addModal = document.getElementById("demo-add-modal");
  var addForm = document.getElementById("demo-add-form");
  document.getElementById("demo-add-product-open").addEventListener("click", function () { addModal.hidden = false; });
  document.getElementById("demo-add-cancel").addEventListener("click", function () { addModal.hidden = true; addForm.reset(); });
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("demo-add-name").value.trim();
    var price = parseFloat(document.getElementById("demo-add-price").value);
    if (!name || !price) return;
    products.push({ id: "custom-" + Date.now(), name: name, category: CUSTOM_CATEGORY, price: price });
    saveProducts(products);
    renderGrid();
    renderProductsTable();
    addModal.hidden = true;
    addForm.reset();
    showToast({
      en: '"' + name + '" added (demo only, not really saved anywhere)',
      ne: '"' + name + '" थपियो (यो डेमो मात्र हो, कतै साँच्चै सुरक्षित हुँदैन)'
    });
  });

  // ---- Scan modal, real camera if available, simulated result either way
  var scanModal = document.getElementById("demo-scan-modal");
  var scanVideo = document.getElementById("demo-scan-video");
  var scanStatus = document.getElementById("demo-scan-status");
  var scanNoCamera = document.getElementById("demo-scan-no-camera");
  var scanStream = null;
  var scanTimer = null;

  var SCAN_PROMPT_TEXT = { en: "Point your camera at a barcode…", ne: "क्यामेरालाई बारकोडतिर देखाउनुहोस्…" };
  var SCAN_SIMULATING_TEXT = { en: "Simulating a scan…", ne: "स्क्यान सिमुलेट गर्दै…" };

  function stopScan() {
    if (scanStream) {
      scanStream.getTracks().forEach(function (t) { t.stop(); });
      scanStream = null;
    }
    clearTimeout(scanTimer);
    scanModal.hidden = true;
  }

  document.getElementById("demo-scan-open").addEventListener("click", function () {
    scanModal.hidden = false;
    setBilingualText(scanStatus, SCAN_PROMPT_TEXT);
    scanVideo.hidden = true;
    scanNoCamera.hidden = true;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
          scanStream = stream;
          scanVideo.srcObject = stream;
          scanVideo.hidden = false;
        })
        .catch(function () {
          // Camera denied or unavailable: the simulated result below still
          // runs on the same timer either way, so the demo still works.
          setBilingualText(scanStatus, SCAN_SIMULATING_TEXT);
          scanNoCamera.hidden = false;
        });
    } else {
      setBilingualText(scanStatus, SCAN_SIMULATING_TEXT);
      scanNoCamera.hidden = false;
    }

    scanTimer = setTimeout(function () {
      if (scanModal.hidden) return; // cancelled before this fired
      var p = products[Math.floor(Math.random() * products.length)];
      var name = localized(p.name);
      stopScan();
      addToCart(p.id);
      showToast({ en: "Scanned: " + name.en, ne: "स्क्यान भयो: " + name.ne });
    }, 1800);
  });

  document.getElementById("demo-scan-cancel").addEventListener("click", stopScan);

  // ---- Init ---------------------------------------------------------------
  renderGrid();
  renderCart();
})();
