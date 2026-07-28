/* Khatiwada POS, live demo. Entirely client-side: no backend call anywhere
   in this file, on purpose. "Cleared with the browser session" only makes
   sense if nothing here ever reaches a real server, so every product/cart/
   sale change lives in sessionStorage (this tab, until it's closed) rather
   than the real accounts/product database.

   Structure mirrors the real product (cashier bar, admin sidebar with
   Catalog/Reports & Data/Account, category-folder + standalone tile mix on
   the cashier grid) rather than the site's own invented layout, per the
   user's explicit ask to match the actual app, in the landing page's own
   colors rather than the real app's navy/green.

   Bilingual via the same data-en/data-ne + KhatiwadaLang convention as the
   rest of the site (see script.js). Dynamically-created elements get
   data-en/data-ne set on them too, exactly like static markup, so a later
   language toggle updates content that was already rendered. */
(function () {
  "use strict";

  var PRODUCTS_KEY = "khatiwada_demo_products";
  var CART_KEY = "khatiwada_demo_cart";
  var SALES_KEY = "khatiwada_demo_sales";

  function lang() {
    return (window.KhatiwadaLang && window.KhatiwadaLang.getLang()) || "en";
  }

  function localized(value) {
    if (typeof value === "object" && value !== null) return value;
    return { en: value, ne: value };
  }

  function setBilingualText(el, textPair) {
    el.setAttribute("data-en", textPair.en);
    el.setAttribute("data-ne", textPair.ne);
    el.textContent = textPair[lang()];
  }

  // ---- Category metadata (icon/color/name) -- separate from the product
  // list itself, since many products can share one category. ---------------
  var CATEGORY_META = {
    rice: { icon: "🍚", color: "var(--terracotta)", name: { en: "Rice", ne: "चामल" } },
    dal: { icon: "🫘", color: "var(--green)", name: { en: "Dal", ne: "दाल" } },
    sugar: { icon: "▦", color: "var(--green-light)", name: { en: "Sugar", ne: "चिनी" } },
    flour: { icon: "🌾", color: "var(--brown)", name: { en: "Flour", ne: "पीठो" } },
    other: { icon: "🧺", color: "var(--terracotta-dark)", name: { en: "Other", ne: "अन्य" } },
    lpg: { icon: "🛢", color: "var(--terracotta)", name: { en: "LPG", ne: "ग्यास" } },
    dairy: { icon: "🥛", color: "var(--green)", name: { en: "Dairy", ne: "दुग्ध पदार्थ" } },
    custom: { icon: "📦", color: "var(--brown)", name: { en: "Custom", ne: "आफ्नै" } }
  };

  // Flat product list is the single source of truth (mirrors how the real
  // product's database has one products table, categories are just a
  // column on it). `standalone: true` means it also shows as its own tile
  // on the cashier grid directly; everything else is only reachable through
  // its category folder tile, matching the real cashier screen's mix of
  // "N varieties" folders and individual SKU tiles.
  var DEFAULT_PRODUCTS = [
    { id: "rice-basmati", name: { en: "Basmati Rice 1kg", ne: "बासमती चामल 1kg" }, price: 180, barcode: "8901030875315", catId: "rice", unit: { en: "kg", ne: "kg" }, weighed: false, status: "active", standalone: false },
    { id: "rice-mota", name: { en: "Mota Chamal 1kg", ne: "मोटा चामल 1kg" }, price: 120, barcode: null, catId: "rice", unit: { en: "kg", ne: "kg" }, weighed: true, status: "active", standalone: false },
    { id: "rice-sona", name: { en: "Sona Masuri 1kg", ne: "सोना मसुरी 1kg" }, price: 140, barcode: null, catId: "rice", unit: { en: "kg", ne: "kg" }, weighed: true, status: "active", standalone: false },
    { id: "dal-musuro", name: { en: "Musuro Dal 1kg", ne: "मुसुरो दाल 1kg" }, price: 180, barcode: "8901030111111", catId: "dal", unit: { en: "kg", ne: "kg" }, weighed: false, status: "active", standalone: false },
    { id: "dal-chana", name: { en: "Chana Dal 1kg", ne: "चना दाल 1kg" }, price: 145, barcode: null, catId: "dal", unit: { en: "kg", ne: "kg" }, weighed: true, status: "active", standalone: false },
    { id: "dal-kalo", name: { en: "Kalo Dal 1kg", ne: "कालो दाल 1kg" }, price: 200, barcode: null, catId: "dal", unit: { en: "kg", ne: "kg" }, weighed: true, status: "active", standalone: false },
    { id: "sugar-1kg", name: { en: "Sugar 1kg", ne: "चिनी 1kg" }, price: 120, barcode: "8901030222222", catId: "sugar", unit: { en: "kg", ne: "kg" }, weighed: false, status: "active", standalone: false },
    { id: "flour-wheat", name: { en: "Wheat Flour 1kg", ne: "गहुँको पीठो 1kg" }, price: 90, barcode: "8901030333333", catId: "flour", unit: { en: "kg", ne: "kg" }, weighed: false, status: "active", standalone: false },
    { id: "flour-maize", name: { en: "Maize Flour 1kg", ne: "मकैको पीठो 1kg" }, price: 85, barcode: null, catId: "flour", unit: { en: "kg", ne: "kg" }, weighed: true, status: "active", standalone: false },
    { id: "flour-rice", name: { en: "Rice Flour 500g", ne: "चामलको पीठो 500g" }, price: 70, barcode: null, catId: "flour", unit: { en: "g", ne: "g" }, weighed: true, status: "active", standalone: false },
    { id: "flour-besan", name: { en: "Besan 500g", ne: "बेसन 500g" }, price: 95, barcode: "8901030444444", catId: "flour", unit: { en: "g", ne: "g" }, weighed: false, status: "active", standalone: false },
    { id: "other-salt", name: { en: "Salt 1kg", ne: "नुन 1kg" }, price: 25, barcode: "8901030555555", catId: "other", unit: { en: "kg", ne: "kg" }, weighed: false, status: "active", standalone: false },
    { id: "other-matches", name: { en: "Matches", ne: "सलाई" }, price: 10, barcode: null, catId: "other", unit: { en: "piece", ne: "थान" }, weighed: false, status: "active", standalone: false },
    { id: "lpg-refill", name: { en: "LPG Cylinder Refill", ne: "ग्यास सिलिन्डर रिफिल" }, price: 1900, barcode: null, catId: "lpg", unit: { en: "piece", ne: "थान" }, weighed: false, status: "active", standalone: false },
    { id: "lpg-new", name: { en: "LPG New Connection", ne: "नयाँ ग्यास जडान" }, price: 3500, barcode: null, catId: "lpg", unit: { en: "piece", ne: "थान" }, weighed: false, status: "active", standalone: false },
    { id: "milk-bluecow", name: { en: "Blue Cow Milk 390g", ne: "ब्लु काउ दूध 390g" }, price: 210, barcode: "9556040082007", catId: "dairy", unit: { en: "piece", ne: "थान" }, weighed: false, status: "active", standalone: true },
    { id: "milk-ddc", name: { en: "DDC Milk", ne: "DDC दूध" }, price: 30, barcode: null, catId: "dairy", unit: { en: "piece", ne: "थान" }, weighed: false, status: "active", standalone: true }
  ];

  function loadProducts() {
    try {
      var stored = sessionStorage.getItem(PRODUCTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    saveProducts(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS.slice();
  }
  function saveProducts(list) { try { sessionStorage.setItem(PRODUCTS_KEY, JSON.stringify(list)); } catch (e) {} }

  function loadCart() {
    try { var s = sessionStorage.getItem(CART_KEY); if (s) return JSON.parse(s); } catch (e) {}
    return [];
  }
  function saveCart(list) { try { sessionStorage.setItem(CART_KEY, JSON.stringify(list)); } catch (e) {} }

  function loadSales() {
    try { var s = sessionStorage.getItem(SALES_KEY); if (s) return JSON.parse(s); } catch (e) {}
    return [];
  }
  function saveSales(list) { try { sessionStorage.setItem(SALES_KEY, JSON.stringify(list)); } catch (e) {} }

  var products = loadProducts();
  var cart = loadCart();
  var sales = loadSales();

  function money(n) { return "Rs " + n.toLocaleString("en-IN"); }
  function findProduct(id) { for (var i = 0; i < products.length; i++) if (products[i].id === id) return products[i]; return null; }

  // ---- Toast --------------------------------------------------------------
  var toastEl = document.getElementById("demo-toast");
  var toastTimer = null;
  function showToast(textPair) {
    setBilingualText(toastEl, textPair);
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("visible"); }, 2400);
  }

  // ---- Header clock ---------------------------------------------------------
  var WEEKDAYS = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    ne: ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"]
  };
  var MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    ne: ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"]
  };
  var datetimeEl = document.getElementById("demo-datetime");
  function renderDatetime() {
    var now = new Date();
    var l = lang();
    var h = now.getHours();
    var ampm = h >= 12 ? (l === "ne" ? "बेलुका" : "PM") : (l === "ne" ? "बिहान" : "AM");
    var h12 = h % 12 || 12;
    var mins = String(now.getMinutes()).padStart(2, "0");
    datetimeEl.textContent =
      WEEKDAYS[l][now.getDay()] + ", " + now.getDate() + " " + MONTHS[l][now.getMonth()] + " · " + h12 + ":" + mins + " " + ampm;
  }
  renderDatetime();
  setInterval(renderDatetime, 30000);

  // ---- Sidebar / page navigation ------------------------------------------
  var sidebar = document.getElementById("demo-sidebar");
  var sidebarLinks = document.querySelectorAll(".demo-sidebar-link[data-page]");
  var views = document.querySelectorAll(".demo-view");
  var PAGE_RENDER = {
    products: renderProductsTable,
    groups: renderGroups,
    duplicates: renderDuplicates,
    reports: renderReports
  };

  function showView(id, isAdminPage) {
    views.forEach(function (v) { v.classList.toggle("active", v.id === "demo-view-" + id); });
    sidebar.classList.toggle("open", !!isAdminPage);
    if (isAdminPage) {
      sidebarLinks.forEach(function (l) { l.classList.toggle("active", l.dataset.page === id); });
    }
    if (PAGE_RENDER[id]) PAGE_RENDER[id]();
  }

  document.getElementById("demo-admin-open").addEventListener("click", function () { showView("products", true); });
  document.getElementById("demo-sidebar-back").addEventListener("click", function () { showView("cashier", false); });
  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function () { showView(link.dataset.page, true); });
  });
  document.getElementById("demo-logout").addEventListener("click", function () {
    showToast({ en: "Logged out (demo only)", ne: "लग आउट भयो (डेमो मात्र)" });
    showView("cashier", false);
  });

  // ---- Cashier: grid (category folders + standalone tiles) ---------------
  var gridEl = document.getElementById("demo-product-grid");
  var searchEl = document.getElementById("demo-search");

  function activeProducts() { return products.filter(function (p) { return p.status === "active"; }); }

  function categoryCounts() {
    var counts = {};
    activeProducts().forEach(function (p) {
      if (p.standalone) return;
      counts[p.catId] = (counts[p.catId] || 0) + 1;
    });
    return counts;
  }

  function renderGrid() {
    var term = searchEl.value.trim().toLowerCase();
    gridEl.innerHTML = "";

    if (term) {
      // While searching, skip the folder concept entirely and just show
      // matching individual products directly, same as the real product's
      // search behavior.
      activeProducts().filter(function (p) {
        var n = localized(p.name);
        return n.en.toLowerCase().indexOf(term) !== -1 || n.ne.indexOf(term) !== -1;
      }).forEach(function (p) { gridEl.appendChild(buildProductTile(p)); });
    } else {
      var counts = categoryCounts();
      Object.keys(counts).forEach(function (catId) {
        gridEl.appendChild(buildFolderTile(catId, counts[catId]));
      });
      activeProducts().filter(function (p) { return p.standalone; }).forEach(function (p) {
        gridEl.appendChild(buildProductTile(p));
      });
    }

    var quickAdd = document.createElement("button");
    quickAdd.type = "button";
    quickAdd.className = "demo-quick-add";
    setBilingualText(quickAdd, { en: "+ Quick Add item", ne: "+ द्रुत सामान थप्नुहोस्" });
    quickAdd.addEventListener("click", function () { openAddModal(); });
    gridEl.appendChild(quickAdd);
  }

  function buildFolderTile(catId, count) {
    var meta = CATEGORY_META[catId] || CATEGORY_META.custom;
    var tile = document.createElement("button");
    tile.type = "button";
    tile.className = "demo-product-tile";
    tile.style.background = meta.color;
    var iconEl = document.createElement("div");
    iconEl.className = "demo-tile-icon";
    iconEl.textContent = meta.icon;
    var nameEl = document.createElement("span");
    nameEl.className = "name";
    setBilingualText(nameEl, meta.name);
    var subEl = document.createElement("span");
    subEl.className = "sub";
    setBilingualText(subEl, {
      en: count + (count === 1 ? " variety" : " varieties"),
      ne: count + " प्रकार"
    });
    tile.appendChild(iconEl);
    tile.appendChild(nameEl);
    tile.appendChild(subEl);
    tile.addEventListener("click", function () { openCategoryModal(catId, meta); });
    return tile;
  }

  function buildProductTile(p) {
    var meta = CATEGORY_META[p.catId] || CATEGORY_META.custom;
    var name = localized(p.name);
    var tile = document.createElement("button");
    tile.type = "button";
    tile.className = "demo-product-tile";
    tile.style.background = meta.color;
    var iconEl = document.createElement("div");
    iconEl.className = "demo-tile-icon";
    iconEl.textContent = meta.icon;
    var nameEl = document.createElement("span");
    nameEl.className = "name";
    setBilingualText(nameEl, name);
    var priceEl = document.createElement("span");
    priceEl.className = "sub";
    priceEl.textContent = money(p.price);
    tile.appendChild(iconEl);
    tile.appendChild(nameEl);
    tile.appendChild(priceEl);
    tile.addEventListener("click", function () { addToCart(p.id); });
    return tile;
  }

  searchEl.addEventListener("input", renderGrid);

  // ---- Category drill-down modal ------------------------------------------
  var categoryModal = document.getElementById("demo-category-modal");
  var categoryModalTitle = document.getElementById("demo-category-modal-title");
  var categoryItemList = document.getElementById("demo-category-item-list");
  function openCategoryModal(catId, meta) {
    setBilingualText(categoryModalTitle, meta.name);
    categoryItemList.innerHTML = "";
    activeProducts().filter(function (p) { return p.catId === catId && !p.standalone; }).forEach(function (p) {
      var name = localized(p.name);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "demo-category-item-btn";
      var nameSpan = document.createElement("span");
      setBilingualText(nameSpan, name);
      var priceSpan = document.createElement("span");
      priceSpan.textContent = money(p.price);
      btn.appendChild(nameSpan);
      btn.appendChild(priceSpan);
      btn.addEventListener("click", function () {
        addToCart(p.id);
        categoryModal.hidden = true;
      });
      categoryItemList.appendChild(btn);
    });
    categoryModal.hidden = false;
  }
  document.getElementById("demo-category-cancel").addEventListener("click", function () { categoryModal.hidden = true; });

  // ---- Cart -----------------------------------------------------------------
  var cartItemsEl = document.getElementById("demo-cart-items");
  var cartTotalEl = document.getElementById("demo-cart-total");
  var CART_EMPTY_TEXT = { en: "Tap a product, or scan one, to start a sale.", ne: "बिक्री सुरु गर्न कुनै प्रोडक्ट थिच्नुहोस्, वा स्क्यान गर्नुहोस्।" };

  function addToCart(id) {
    var line = null;
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id) line = cart[i];
    if (line) line.qty += 1; else cart.push({ id: id, qty: 1 });
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
      var qtyEl = document.createElement("span"); qtyEl.textContent = line.qty;
      var plusBtn = document.createElement("button");
      plusBtn.type = "button"; plusBtn.className = "demo-qty-btn"; plusBtn.textContent = "+";
      plusBtn.addEventListener("click", function () { changeQty(line.id, 1); });
      var priceEl = document.createElement("span");
      priceEl.className = "demo-cart-item-price";
      priceEl.textContent = money(p.price * line.qty);
      row.appendChild(nameEl); row.appendChild(minusBtn); row.appendChild(qtyEl); row.appendChild(plusBtn); row.appendChild(priceEl);
      cartItemsEl.appendChild(row);
    });
    cartTotalEl.textContent = money(total);
  }

  document.getElementById("demo-cart-clear").addEventListener("click", function () {
    if (cart.length === 0) return;
    cart = [];
    saveCart(cart);
    renderCart();
  });

  document.getElementById("demo-checkout").addEventListener("click", function () {
    if (cart.length === 0) return;
    var total = 0;
    cart.forEach(function (line) { var p = findProduct(line.id); if (p) total += p.price * line.qty; });
    sales.push({ time: Date.now(), total: total, itemCount: cart.reduce(function (n, l) { return n + l.qty; }, 0) });
    saveSales(sales);
    cart = [];
    saveCart(cart);
    renderCart();
    showToast({
      en: "Sale complete, " + money(total) + " (demo only, nothing was actually charged)",
      ne: "बिक्री पूरा भयो, " + money(total) + " (यो डेमो मात्र हो, वास्तवमा केही शुल्क लागेको छैन)"
    });
  });

  // ---- Add / Edit product modal --------------------------------------------
  var addModal = document.getElementById("demo-add-modal");
  var addForm = document.getElementById("demo-add-form");
  var addNameInput = document.getElementById("demo-add-name");
  var addPriceInput = document.getElementById("demo-add-price");
  var editingId = null;

  function openAddModal(existing) {
    editingId = existing ? existing.id : null;
    document.getElementById("demo-add-modal-title").textContent = existing
      ? { en: "Edit product", ne: "प्रोडक्ट सम्पादन गर्नुहोस्" }[lang()]
      : { en: "Add a product", ne: "प्रोडक्ट थप्नुहोस्" }[lang()];
    document.getElementById("demo-add-submit").textContent = existing
      ? { en: "Save changes", ne: "परिवर्तन सुरक्षित गर्नुहोस्" }[lang()]
      : { en: "Add product", ne: "प्रोडक्ट थप्नुहोस्" }[lang()];
    addNameInput.value = existing ? localized(existing.name)[lang()] : "";
    addPriceInput.value = existing ? existing.price : "";
    addModal.hidden = false;
  }
  document.getElementById("demo-add-product-open").addEventListener("click", function () { openAddModal(); });
  document.getElementById("demo-add-cancel").addEventListener("click", function () { addModal.hidden = true; addForm.reset(); editingId = null; });

  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = addNameInput.value.trim();
    var price = parseFloat(addPriceInput.value);
    if (!name || !price) return;

    if (editingId) {
      var existing = findProduct(editingId);
      existing.name = name;
      existing.price = price;
      saveProducts(products);
      renderGrid();
      renderProductsTable();
      showToast({ en: '"' + name + '" updated (demo only)', ne: '"' + name + '" अपडेट भयो (डेमो मात्र)' });
    } else {
      products.push({
        id: "custom-" + Date.now(), name: name, price: price, barcode: null,
        catId: "custom", unit: { en: "piece", ne: "थान" }, weighed: false, status: "active", standalone: true
      });
      saveProducts(products);
      renderGrid();
      renderProductsTable();
      showToast({ en: '"' + name + '" added (demo only, not really saved anywhere)', ne: '"' + name + '" थपियो (यो डेमो मात्र हो, कतै साँच्चै सुरक्षित हुँदैन)' });
    }
    addModal.hidden = true;
    addForm.reset();
    editingId = null;
  });

  // ---- Products/admin table ------------------------------------------------
  var tbodyEl = document.getElementById("demo-products-tbody");
  var productsSearchEl = document.getElementById("demo-products-search");
  var categoryFilterEl = document.getElementById("demo-category-filter");
  var NO_BARCODE_TEXT = { en: "None", ne: "छैन" };
  var UNIT_LABELS = {}; // unused placeholder kept out; units already carry {en,ne}

  function populateCategoryFilter() {
    var current = categoryFilterEl.value;
    categoryFilterEl.innerHTML = "";
    var allOpt = document.createElement("option");
    allOpt.value = "";
    setBilingualText(allOpt, { en: "All categories", ne: "सबै श्रेणी" });
    categoryFilterEl.appendChild(allOpt);
    var seen = {};
    products.forEach(function (p) {
      if (seen[p.catId]) return;
      seen[p.catId] = true;
      var meta = CATEGORY_META[p.catId] || CATEGORY_META.custom;
      var opt = document.createElement("option");
      opt.value = p.catId;
      setBilingualText(opt, meta.name);
      categoryFilterEl.appendChild(opt);
    });
    categoryFilterEl.value = current || "";
  }

  function renderProductsTable() {
    populateCategoryFilter();
    var term = productsSearchEl.value.trim().toLowerCase();
    var catFilter = categoryFilterEl.value;
    tbodyEl.innerHTML = "";
    products.filter(function (p) {
      var name = localized(p.name);
      var matchesTerm = !term || name.en.toLowerCase().indexOf(term) !== -1 || name.ne.indexOf(term) !== -1 ||
        (p.barcode && p.barcode.indexOf(term) !== -1);
      var matchesCat = !catFilter || p.catId === catFilter;
      return matchesTerm && matchesCat;
    }).forEach(function (p) {
      var name = localized(p.name);
      var meta = CATEGORY_META[p.catId] || CATEGORY_META.custom;
      var unit = localized(p.unit);
      var tr = document.createElement("tr");

      var nameTd = document.createElement("td"); setBilingualText(nameTd, name);
      var barcodeTd = document.createElement("td");
      if (p.barcode) barcodeTd.textContent = p.barcode; else setBilingualText(barcodeTd, NO_BARCODE_TEXT);
      var catTd = document.createElement("td"); setBilingualText(catTd, meta.name);
      var priceTd = document.createElement("td"); priceTd.textContent = money(p.price);
      var unitTd = document.createElement("td"); setBilingualText(unitTd, unit);
      var weighedTd = document.createElement("td");
      setBilingualText(weighedTd, p.weighed ? { en: "Yes", ne: "हो" } : { en: "No", ne: "होइन" });
      var statusTd = document.createElement("td");
      var pill = document.createElement("span");
      pill.className = "demo-status-pill " + (p.status === "active" ? "active" : "inactive");
      setBilingualText(pill, p.status === "active" ? { en: "Active", ne: "सक्रिय" } : { en: "Inactive", ne: "निष्क्रिय" });
      statusTd.appendChild(pill);

      var actionsTd = document.createElement("td");
      var editBtn = document.createElement("button");
      editBtn.type = "button"; editBtn.className = "demo-row-action edit";
      setBilingualText(editBtn, { en: "Edit", ne: "सम्पादन" });
      editBtn.addEventListener("click", function () { openAddModal(p); });

      var deactivateBtn = document.createElement("button");
      deactivateBtn.type = "button"; deactivateBtn.className = "demo-row-action deactivate";
      setBilingualText(deactivateBtn, p.status === "active" ? { en: "Deactivate", ne: "निष्क्रिय गर्नुहोस्" } : { en: "Activate", ne: "सक्रिय गर्नुहोस्" });
      deactivateBtn.addEventListener("click", function () {
        p.status = p.status === "active" ? "inactive" : "active";
        saveProducts(products);
        renderProductsTable();
        renderGrid();
      });

      var deleteBtn = document.createElement("button");
      deleteBtn.type = "button"; deleteBtn.className = "demo-row-action delete";
      setBilingualText(deleteBtn, { en: "Delete", ne: "मेट्नुहोस्" });
      deleteBtn.addEventListener("click", function () {
        products = products.filter(function (x) { return x.id !== p.id; });
        saveProducts(products);
        renderProductsTable();
        renderGrid();
        showToast({ en: '"' + name.en + '" deleted (demo only)', ne: '"' + name.ne + '" मेटियो (डेमो मात्र)' });
      });

      actionsTd.appendChild(editBtn); actionsTd.appendChild(deactivateBtn); actionsTd.appendChild(deleteBtn);

      tr.appendChild(nameTd); tr.appendChild(barcodeTd); tr.appendChild(catTd); tr.appendChild(priceTd);
      tr.appendChild(unitTd); tr.appendChild(weighedTd); tr.appendChild(statusTd); tr.appendChild(actionsTd);
      tbodyEl.appendChild(tr);
    });
  }
  productsSearchEl.addEventListener("input", renderProductsTable);
  categoryFilterEl.addEventListener("change", renderProductsTable);
  document.getElementById("demo-products-clear").addEventListener("click", function () {
    productsSearchEl.value = "";
    categoryFilterEl.value = "";
    renderProductsTable();
  });

  // ---- Groups ---------------------------------------------------------------
  function renderGroups() {
    var listEl = document.getElementById("demo-groups-list");
    listEl.innerHTML = "";
    var counts = {};
    products.forEach(function (p) { counts[p.catId] = (counts[p.catId] || 0) + 1; });
    Object.keys(counts).forEach(function (catId) {
      var meta = CATEGORY_META[catId] || CATEGORY_META.custom;
      var li = document.createElement("li");
      var nameSpan = document.createElement("span"); setBilingualText(nameSpan, meta.name);
      var countSpan = document.createElement("span");
      setBilingualText(countSpan, {
        en: counts[catId] + (counts[catId] === 1 ? " product" : " products"),
        ne: counts[catId] + " प्रोडक्ट"
      });
      li.appendChild(nameSpan); li.appendChild(countSpan);
      listEl.appendChild(li);
    });
  }

  // ---- Duplicates -------------------------------------------------------------
  function renderDuplicates() {
    var el = document.getElementById("demo-duplicates-content");
    el.innerHTML = "";
    var byName = {};
    products.forEach(function (p) {
      var key = localized(p.name).en.toLowerCase();
      (byName[key] = byName[key] || []).push(p);
    });
    var dupGroups = Object.keys(byName).map(function (k) { return byName[k]; }).filter(function (g) { return g.length > 1; });
    if (dupGroups.length === 0) {
      var none = document.createElement("p");
      none.className = "demo-info-note";
      setBilingualText(none, { en: "No duplicate product names found.", ne: "कुनै दोहोरिएको प्रोडक्ट नाम फेला परेन।" });
      el.appendChild(none);
      return;
    }
    var list = document.createElement("ul");
    list.className = "demo-simple-list";
    dupGroups.forEach(function (group) {
      var li = document.createElement("li");
      setBilingualText(li, {
        en: localized(group[0].name).en + " (" + group.length + " entries)",
        ne: localized(group[0].name).ne + " (" + group.length + " प्रविष्टि)"
      });
      list.appendChild(li);
    });
    el.appendChild(list);
  }

  // ---- Reports (built from this session's real sales, not fabricated) -----
  function renderReports() {
    var el = document.getElementById("demo-reports-content");
    el.innerHTML = "";
    if (sales.length === 0) {
      var none = document.createElement("p");
      none.className = "demo-info-note";
      setBilingualText(none, { en: "No sales yet this session. Ring one up on the cashier screen first.", ne: "यो सेसनमा अहिलेसम्म कुनै बिक्री छैन। पहिले क्यासियर स्क्रिनमा बिक्री गर्नुहोस्।" });
      el.appendChild(none);
      return;
    }
    var totalCount = sales.length;
    var totalAmount = sales.reduce(function (n, s) { return n + s.total; }, 0);

    var summaryCard = document.createElement("div");
    summaryCard.className = "demo-report-card";
    var summaryInner = document.createElement("div");
    summaryInner.style.padding = "18px 20px";
    var h3 = document.createElement("h3");
    setBilingualText(h3, { en: "This session", ne: "यो सेसन" });
    var summaryRow = document.createElement("div");
    summaryRow.style.display = "flex";
    summaryRow.style.justifyContent = "space-between";
    summaryRow.style.fontWeight = "800";
    var countSpan = document.createElement("span");
    setBilingualText(countSpan, { en: totalCount + (totalCount === 1 ? " sale" : " sales"), ne: totalCount + " बिक्री" });
    var totalSpan = document.createElement("span");
    totalSpan.textContent = money(totalAmount);
    totalSpan.style.color = "var(--terracotta)";
    summaryRow.appendChild(countSpan); summaryRow.appendChild(totalSpan);
    summaryInner.appendChild(h3); summaryInner.appendChild(summaryRow);
    summaryCard.appendChild(summaryInner);
    el.appendChild(summaryCard);

    var table = document.createElement("table");
    table.className = "demo-products-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    var timeTh = document.createElement("th"); setBilingualText(timeTh, { en: "Time", ne: "समय" });
    var itemsTh = document.createElement("th"); setBilingualText(itemsTh, { en: "Items", ne: "सामान" });
    var totalTh = document.createElement("th"); setBilingualText(totalTh, { en: "Total", ne: "जम्मा" });
    headRow.appendChild(timeTh); headRow.appendChild(itemsTh); headRow.appendChild(totalTh);
    thead.appendChild(headRow);
    var tbody = document.createElement("tbody");
    sales.slice().reverse().forEach(function (sale) {
      var tr = document.createElement("tr");
      var timeTd = document.createElement("td");
      // toUpperCase() only touches the Latin am/pm text (Devanagari has no
      // case), keeping this consistent with the header clock's "PM" style.
      timeTd.textContent = new Date(sale.time).toLocaleTimeString(lang() === "ne" ? "ne-NP" : "en-IN", { hour: "2-digit", minute: "2-digit" }).toUpperCase();
      var itemsTd = document.createElement("td"); itemsTd.textContent = sale.itemCount;
      var totalTd = document.createElement("td"); totalTd.textContent = money(sale.total);
      tr.appendChild(timeTd); tr.appendChild(itemsTd); tr.appendChild(totalTd);
      tbody.appendChild(tr);
    });
    table.appendChild(thead); table.appendChild(tbody);
    var wrap = document.createElement("div");
    wrap.className = "demo-table-wrap";
    wrap.appendChild(table);
    el.appendChild(wrap);
  }

  // ---- Export CSV (real download of this session's own demo data) ---------
  document.getElementById("demo-export-btn").addEventListener("click", function () {
    var rows = [["time", "item_count", "total_rs"]];
    sales.forEach(function (s) { rows.push([new Date(s.time).toISOString(), s.itemCount, s.total]); });
    var csv = rows.map(function (r) { return r.join(","); }).join("\n");
    var blob = new Blob([csv], { type: "text/csv" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "demo-sales.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast({ en: "Downloaded demo-sales.csv", ne: "demo-sales.csv डाउनलोड भयो" });
  });

  // ---- Import products (real CSV parse into this session's product list) --
  document.getElementById("demo-import-file").addEventListener("change", function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var lines = String(reader.result).split(/\r?\n/).filter(function (l) { return l.trim(); });
      var added = 0;
      lines.forEach(function (line, i) {
        if (i === 0 && line.toLowerCase().indexOf("name") !== -1) return; // header row
        var parts = line.split(",");
        var name = (parts[0] || "").trim();
        var price = parseFloat(parts[1]);
        if (!name || !price) return;
        products.push({
          id: "import-" + Date.now() + "-" + i, name: name, price: price, barcode: null,
          catId: "custom", unit: { en: "piece", ne: "थान" }, weighed: false, status: "active", standalone: true
        });
        added++;
      });
      saveProducts(products);
      renderGrid();
      renderProductsTable();
      showToast({ en: added + " product(s) imported (demo only)", ne: added + " प्रोडक्ट आयात भयो (डेमो मात्र)" });
      e.target.value = "";
    };
    reader.readAsText(file);
  });

  // ---- Change password (stub) ------------------------------------------------
  document.getElementById("demo-password-form").addEventListener("submit", function (e) {
    e.preventDefault();
    this.reset();
    showToast({ en: "Password updated (demo only)", ne: "पासवर्ड अपडेट भयो (डेमो मात्र)" });
  });

  // ---- Scan modal, real camera if available, simulated result either way --
  var scanModal = document.getElementById("demo-scan-modal");
  var scanVideo = document.getElementById("demo-scan-video");
  var scanStatus = document.getElementById("demo-scan-status");
  var scanNoCamera = document.getElementById("demo-scan-no-camera");
  var scanStream = null;
  var scanTimer = null;
  var SCAN_PROMPT_TEXT = { en: "Point your camera at a barcode…", ne: "क्यामेरालाई बारकोडतिर देखाउनुहोस्…" };
  var SCAN_SIMULATING_TEXT = { en: "Simulating a scan…", ne: "स्क्यान सिमुलेट गर्दै…" };

  function stopScan() {
    if (scanStream) { scanStream.getTracks().forEach(function (t) { t.stop(); }); scanStream = null; }
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
        .then(function (stream) { scanStream = stream; scanVideo.srcObject = stream; scanVideo.hidden = false; })
        .catch(function () { setBilingualText(scanStatus, SCAN_SIMULATING_TEXT); scanNoCamera.hidden = false; });
    } else {
      setBilingualText(scanStatus, SCAN_SIMULATING_TEXT);
      scanNoCamera.hidden = false;
    }

    scanTimer = setTimeout(function () {
      if (scanModal.hidden) return;
      var pool = activeProducts();
      var p = pool[Math.floor(Math.random() * pool.length)];
      var name = localized(p.name);
      stopScan();
      addToCart(p.id);
      showToast({ en: "Scanned: " + name.en, ne: "स्क्यान भयो: " + name.ne });
    }, 1800);
  });
  document.getElementById("demo-scan-cancel").addEventListener("click", stopScan);

  // ---- Init -------------------------------------------------------------------
  renderGrid();
  renderCart();
})();
