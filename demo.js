/* Khatiwada POS, live demo. Entirely client-side: no backend call anywhere
   in this file, on purpose. "Cleared with the browser session" only makes
   sense if nothing here ever reaches a real server, so every product/cart
   change lives in sessionStorage (this tab, until it's closed) rather than
   the real accounts/product database. A visitor can add a product or ring
   up a sale and it'll feel real, but it's never going anywhere. */
(function () {
  "use strict";

  var PRODUCTS_KEY = "khatiwada_demo_products";
  var CART_KEY = "khatiwada_demo_cart";

  var TILE_COLORS = ["var(--terracotta)", "var(--green)", "var(--green-light)", "var(--brown)", "var(--terracotta-dark)"];

  var DEFAULT_PRODUCTS = [
    { id: "rice", name: "Rice (1kg)", price: 145, category: "Grains" },
    { id: "dal", name: "Dal (1kg)", price: 180, category: "Grains" },
    { id: "oil", name: "Cooking Oil (1L)", price: 320, category: "Pantry" },
    { id: "sugar", name: "Sugar (1kg)", price: 120, category: "Pantry" },
    { id: "milk", name: "Milk (500ml)", price: 65, category: "Dairy" },
    { id: "soap", name: "Soap", price: 55, category: "Household" },
    { id: "biscuits", name: "Biscuits", price: 40, category: "Snacks" },
    { id: "noodles", name: "Instant Noodles", price: 35, category: "Snacks" }
  ];

  function loadProducts() {
    try {
      var stored = sessionStorage.getItem(PRODUCTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    saveProducts(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS.slice();
  }

  function saveProducts(products) {
    try { sessionStorage.setItem(PRODUCTS_KEY, JSON.stringify(products)); } catch (e) {}
  }

  function loadCart() {
    try {
      var stored = sessionStorage.getItem(CART_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  }

  function saveCart(cart) {
    try { sessionStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  var products = loadProducts();
  var cart = loadCart();

  function money(n) { return "Rs " + n.toLocaleString("en-IN"); }

  // ---- Toast --------------------------------------------------------
  var toastEl = document.getElementById("demo-toast");
  var toastTimer = null;
  function showToast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("visible"); }, 2200);
  }

  // ---- Tabs -----------------------------------------------------------
  var tabs = document.querySelectorAll(".demo-tab");
  var views = document.querySelectorAll(".demo-view");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
      views.forEach(function (v) { v.classList.toggle("active", v.id === "demo-view-" + tab.dataset.view); });
      if (tab.dataset.view === "products") renderProductsTable();
    });
  });

  // ---- Cashier: product grid -----------------------------------------
  var gridEl = document.getElementById("demo-product-grid");
  var searchEl = document.getElementById("demo-search");

  function renderGrid() {
    var term = searchEl.value.trim().toLowerCase();
    var visible = products.filter(function (p) { return p.name.toLowerCase().indexOf(term) !== -1; });
    gridEl.innerHTML = "";
    visible.forEach(function (p, i) {
      var tile = document.createElement("button");
      tile.type = "button";
      tile.className = "demo-product-tile";
      tile.style.background = TILE_COLORS[i % TILE_COLORS.length];
      tile.innerHTML =
        '<span class="name">' + escapeHtml(p.name) + "</span>" +
        '<span class="price">' + money(p.price) + "</span>";
      tile.addEventListener("click", function () { addToCart(p.id); });
      gridEl.appendChild(tile);
    });
  }

  searchEl.addEventListener("input", renderGrid);

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  // ---- Cart -------------------------------------------------------------
  var cartItemsEl = document.getElementById("demo-cart-items");
  var cartTotalEl = document.getElementById("demo-cart-total");

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
      cartItemsEl.innerHTML = '<div class="demo-cart-empty">Tap a product, or scan one, to start a sale.</div>';
    }
    var total = 0;
    cart.forEach(function (line) {
      var p = findProduct(line.id);
      if (!p) return;
      total += p.price * line.qty;
      var row = document.createElement("div");
      row.className = "demo-cart-item";
      row.innerHTML =
        '<span class="demo-cart-item-name">' + escapeHtml(p.name) + "</span>" +
        '<button type="button" class="demo-qty-btn" data-action="minus">−</button>' +
        "<span>" + line.qty + "</span>" +
        '<button type="button" class="demo-qty-btn" data-action="plus">+</button>' +
        '<span class="demo-cart-item-price">' + money(p.price * line.qty) + "</span>";
      row.querySelector('[data-action="minus"]').addEventListener("click", function () { changeQty(line.id, -1); });
      row.querySelector('[data-action="plus"]').addEventListener("click", function () { changeQty(line.id, 1); });
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
    showToast("Sale complete, " + money(total) + " (demo only, nothing was actually charged)");
  });

  // ---- Products/admin table ------------------------------------------
  var tbodyEl = document.getElementById("demo-products-tbody");
  function renderProductsTable() {
    tbodyEl.innerHTML = "";
    products.forEach(function (p) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + escapeHtml(p.name) + "</td>" +
        "<td>" + escapeHtml(p.category) + "</td>" +
        "<td>" + money(p.price) + "</td>";
      tbodyEl.appendChild(tr);
    });
  }

  // ---- Add product modal --------------------------------------------
  var addModal = document.getElementById("demo-add-modal");
  var addForm = document.getElementById("demo-add-form");
  document.getElementById("demo-add-product-open").addEventListener("click", function () { addModal.hidden = false; });
  document.getElementById("demo-add-cancel").addEventListener("click", function () { addModal.hidden = true; addForm.reset(); });
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("demo-add-name").value.trim();
    var price = parseFloat(document.getElementById("demo-add-price").value);
    if (!name || !price) return;
    products.push({ id: "custom-" + Date.now(), name: name, category: "Custom", price: price });
    saveProducts(products);
    renderGrid();
    renderProductsTable();
    addModal.hidden = true;
    addForm.reset();
    showToast('"' + name + '" added (demo only, not really saved anywhere)');
  });

  // ---- Scan modal, real camera if available, simulated result either way
  var scanModal = document.getElementById("demo-scan-modal");
  var scanVideo = document.getElementById("demo-scan-video");
  var scanStatus = document.getElementById("demo-scan-status");
  var scanNoCamera = document.getElementById("demo-scan-no-camera");
  var scanStream = null;
  var scanTimer = null;

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
    scanStatus.textContent = "Point your camera at a barcode…";
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
          scanStatus.textContent = "Simulating a scan…";
          scanNoCamera.hidden = false;
        });
    } else {
      scanStatus.textContent = "Simulating a scan…";
      scanNoCamera.hidden = false;
    }

    scanTimer = setTimeout(function () {
      if (scanModal.hidden) return; // cancelled before this fired
      var p = products[Math.floor(Math.random() * products.length)];
      stopScan();
      addToCart(p.id);
      showToast("Scanned: " + p.name);
    }, 1800);
  });

  document.getElementById("demo-scan-cancel").addEventListener("click", stopScan);

  // ---- Init ------------------------------------------------------------
  renderGrid();
  renderCart();
})();
