/* Khatiwada POS — FAQ chat widget. No AI, no backend, no cost: a curated
   list of question/answer pairs the visitor taps through. Bilingual via the
   same data-en/data-ne + KhatiwadaLang convention as the rest of the site
   (see script.js) — every string here follows that pattern so the existing
   language toggle updates this widget too, with no special-casing needed. */
(function () {
  "use strict";

  var FAQS = [
    { id: "what-is",
      keywords: ["what is", "khatiwada pos", "what's this", "explain", "what does it do", "के हो", "बारेमा", "भनेको के हो"],
      q: { en: "What is Khatiwada POS?", ne: "खटीवाडा POS के हो?" },
      a: { en: "Khatiwada POS is a simple point-of-sale system that runs on the phone or tablet you already have. No special hardware to buy. Scan barcodes with your camera, and manage sales, stock, and reports from one place.",
           ne: "खटीवाडा POS एउटा सजिलो पसल बिक्री प्रणाली हो, जुन तपाईंसँग भइरहेको फोन वा ट्याब्लेटमा नै चल्छ। छुट्टै हार्डवेयर किन्नु पर्दैन। क्यामेराले बारकोड स्क्यान गर्नुहोस्, र बिक्री, स्टक, रिपोर्ट सबै एकै ठाउँबाट व्यवस्थापन गर्नुहोस्।" } },
    { id: "cost",
      keywords: ["cost", "price", "pricing", "how much", "expensive", "afford", "मूल्य", "पैसा", "कति पर्छ", "कति हो"],
      q: { en: "How much does it cost?", ne: "यसको मूल्य कति हो?" },
      a: { en: "We have Starter and Growth plans, but pricing isn't finalized yet. We're still working that out. Reach out via the Contact page and we'll talk you through it.",
           ne: "हामीसँग Starter र Growth दुई प्लान छन्, तर मूल्य अझै टुंगिएको छैन। हामी त्यसमा काम गरिरहेका छौं। Contact पेजबाट सम्पर्क गर्नुहोस्, हामी विस्तारमा कुरा गर्छौं।" } },
    { id: "hardware",
      keywords: ["hardware", "device", "scanner", "equipment", "buy anything", "special phone", "हार्डवेयर", "उपकरण", "किन्नु"],
      q: { en: "Do I need to buy any special hardware?", ne: "के मैले कुनै विशेष हार्डवेयर किन्नु पर्छ?" },
      a: { en: "No. Any phone, tablet, or laptop with a camera and a browser is enough. You can pair a dedicated barcode scanner if you already have one, but it's never required.",
           ne: "पर्दैन। क्यामेरा र ब्राउजर भएको फोन, ट्याब्लेट, वा ल्यापटप भए पुग्छ। तपाईंसँग पहिल्यै बारकोड स्क्यानर छ भने त्यो पनि जोड्न सकिन्छ, तर त्यो कहिल्यै आवश्यक छैन।" } },
    { id: "features",
      keywords: ["feature", "features", "what can it do", "capabilities", "फिचर", "सुविधा"],
      q: { en: "What features are included?", ne: "यसमा कस्ता फिचरहरू छन्?" },
      a: { en: "Camera barcode scanning, support for weighed items like rice and lentils, a bilingual English/Nepali cashier screen, cash and QR payments, sales reports, and more. See the Features page for the full list.",
           ne: "क्यामेरा बारकोड स्क्यानिङ, चामल-दाल जस्ता तौलिने सामानको लागि सपोर्ट, अंग्रेजी/नेपाली दुवैमा चल्ने क्यासियर स्क्रिन, नगद र QR भुक्तानी, बिक्री रिपोर्ट, र थप धेरै। पूरा सूचीको लागि Features पेज हेर्नुहोस्।" } },
    { id: "starter-vs-growth",
      keywords: ["starter", "growth", "difference", "which plan", "compare", "फरक", "प्लान"],
      q: { en: "What's the difference between Starter and Growth?", ne: "Starter र Growth बीच के फरक छ?" },
      a: { en: "Growth includes everything in Starter, plus CSV import/export, product photos, multiple staff logins, advanced sales reports, and priority support.",
           ne: "Growth मा Starter का सबै सुविधा छन्, त्यसमाथि CSV import/export, प्रोडक्टका फोटो, धेरै स्टाफ लगइन, उन्नत बिक्री रिपोर्ट, र प्राथमिकता सहयोग थपिन्छ।" } },
    { id: "get-started",
      keywords: ["get started", "sign up", "signup", "join", "how do i start", "begin", "सुरु", "दर्ता", "कसरी"],
      q: { en: "How do I get started?", ne: "कसरी सुरु गर्ने?" },
      a: { en: "Tap “Get Started” or “Log In” on any page, then “Create your account.” Fill in a few details about your shop and one of our team will reach out to set everything up.",
           ne: "जुनसुकै पेजमा “Get Started” वा “Log In” थिच्नुहोस्, त्यसपछि “Create your account.” आफ्नो पसलको बारेमा केही जानकारी भर्नुहोस्, हाम्रो टिमले चाँडै सम्पर्क गरेर सबै सेटअप गरिदिनेछ।" } },
    { id: "data-privacy",
      keywords: ["privacy", "private", "data", "secure", "security", "safe", "डेटा", "सुरक्षित", "गोप्य", "निजी"],
      q: { en: "Is my shop's data private?", ne: "मेरो पसलको डेटा सुरक्षित छ?" },
      a: { en: "Yes, your shop's data stays private to your account only. It's not shared with or visible to other shops using Khatiwada POS.",
           ne: "हो, तपाईंको पसलको डेटा तपाईंको खातामा मात्र निजी रहन्छ। यो खटीवाडा POS प्रयोग गर्ने अरू पसलहरूसँग साझा हुँदैन।" } },
    { id: "language",
      keywords: ["nepali", "language", "english", "devanagari", "नेपाली", "भाषा", "अंग्रेजी"],
      q: { en: "Does it work in Nepali?", ne: "के यो नेपालीमा चल्छ?" },
      a: { en: "Yes, one tap switches the entire cashier screen between English and Nepali, so every staff member can use it comfortably.",
           ne: "हो, एउटा ट्यापले पूरै क्यासियर स्क्रिन अंग्रेजी र नेपाली बीच बदलिन्छ, ताकि हरेक स्टाफले सजिलै प्रयोग गर्न सकून्।" } },
    { id: "qr-payment",
      keywords: ["qr", "payment", "pay", "fonepay", "digital payment", "भुक्तानी", "तिर्न", "पेमेन्ट"],
      q: { en: "Can customers pay by QR code?", ne: "के ग्राहकले QR कोडबाट तिर्न सक्छन्?" },
      a: { en: "Yes, cash and QR payments already work side by side. Custom-branded QR codes like the big marts use are coming soon, that needs Fonepay Business registration and we're working on it.",
           ne: "हो, नगद र QR भुक्तानी दुवै अहिले नै एकसाथ चल्छ। ठूला मार्टहरूले जस्तै आफ्नै ब्रान्डेड QR कोड चाँडै आउँदैछ। त्यसको लागि Fonepay Business दर्ता चाहिन्छ, हामी त्यसमा काम गर्दैछौं।" } },
    { id: "support",
      keywords: ["support", "contact", "help", "reach you", "get in touch", "सहयोग", "सम्पर्क", "मद्दत"],
      q: { en: "How do I contact support?", ne: "सहयोगको लागि कसरी सम्पर्क गर्ने?" },
      a: { en: "Head to the Contact page and send us a message, we read every one.",
           ne: "Contact पेजमा गएर हामीलाई सन्देश पठाउनुहोस्, हामी सबै सन्देश पढ्छौं।" } }
  ];

  var FALLBACK_ANSWER = {
    en: "I'm not sure about that one. Try one of the questions below, or reach out via the Contact page.",
    ne: "त्यसको बारेमा म पक्का छैन। तलका प्रश्नहरूमध्ये एउटा प्रयास गर्नुहोस्, वा Contact पेजबाट सम्पर्क गर्नुहोस्।"
  };

  // Simple keyword matching, not real language understanding: normalizes
  // the typed text and scores each FAQ by how many of its keywords appear
  // as a substring. No AI, no backend, no cost -- see the Notion tracker
  // for why this was chosen over a paid API.
  function matchFaq(input) {
    var normalized = input.toLowerCase();
    var best = null;
    var bestScore = 0;
    FAQS.forEach(function (faq) {
      var score = 0;
      faq.keywords.forEach(function (kw) {
        if (normalized.indexOf(kw.toLowerCase()) !== -1) score++;
      });
      if (score > bestScore) {
        bestScore = score;
        best = faq;
      }
    });
    return best;
  }

  // Same Newari-dress character across all three appearances on the site
  // (chat launcher, About page, and peeking here) -- generated from one
  // locked character description so they read as the same mascot instead
  // of three different-looking illustrations.
  var MASCOT_SRC = "/mascot.png";
  var MASCOT_PEEKING_SRC = "/mascot-peeking.png";
  var MASCOT_IMG = '<img id="faq-bot-mascot-img" src="' + MASCOT_SRC + '" alt="" width="98" height="176">';

  // Same waving image, cropped via CSS (object-fit/object-position) to
  // just the head for the chat panel header avatar.
  var AVATAR_IMG = '<img src="' + MASCOT_SRC + '" alt="">';

  function lang() {
    return (window.KhatiwadaLang && window.KhatiwadaLang.getLang()) || "en";
  }

  // Three states, persisted site-wide (every page reads this on load), same
  // localStorage convention as script.js's language toggle:
  //   "full"    -- the standing/waving mascot + "Need help?" bubble
  //   "peeking" -- tucked at the screen edge, still one tap from the chat
  //   "hidden"  -- gone entirely; only the nav "Help" button brings her back
  // Commercial chat widgets (Intercom/Drift/Zendesk) deliberately don't offer
  // that last state -- the launcher always comes back. Offering a real "go
  // away" is a deliberate difference, asked for directly by a real user.
  var STATE_KEY = "khatiwada_mascot_state";
  var LEGACY_DISMISSED_KEY = "khatiwada_mascot_dismissed";
  var STATES = ["full", "peeking", "hidden"];

  function getState() {
    try {
      var stored = localStorage.getItem(STATE_KEY);
      if (STATES.indexOf(stored) !== -1) return stored;
      // Migrate anyone still carrying the old boolean key from before this
      // was a three-state thing -- they'd previously "dismissed" to peeking.
      if (localStorage.getItem(LEGACY_DISMISSED_KEY) === "1") return "peeking";
    } catch (e) {}
    return "full";
  }

  function saveState(state) {
    try {
      localStorage.setItem(STATE_KEY, state);
      localStorage.removeItem(LEGACY_DISMISSED_KEY);
    } catch (e) {}
  }

  // Brief reassurance bubble shown once, right at the moment she's
  // dismissed to peeking -- deliberately NOT re-shown on every later page
  // load/refresh while she's already peeking (that got repetitive fast),
  // and unlike .faq-bot-hint in the full state, this one isn't meant to
  // stay up, just a quick "still here" before it fades.
  var PEEK_MESSAGE = {
    en: "I'll be here if you need me!",
    ne: "चाहिएमा म यहीं हुनेछु!"
  };

  function showPeekMessage(launcher) {
    var existing = launcher.querySelector(".faq-bot-peek-msg");
    if (existing) existing.remove();
    var msg = document.createElement("span");
    msg.className = "faq-bot-peek-msg";
    msg.setAttribute("data-en", PEEK_MESSAGE.en);
    msg.setAttribute("data-ne", PEEK_MESSAGE.ne);
    msg.textContent = PEEK_MESSAGE[lang()];
    launcher.appendChild(msg);
    // Two rAFs so the browser commits the initial (invisible) state as its
    // own paint before the "visible" class is added -- otherwise the two
    // class changes can get batched into one frame and the fade never shows.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { msg.classList.add("visible"); });
    });
    setTimeout(function () {
      msg.classList.remove("visible");
      setTimeout(function () { msg.remove(); }, 400);
    }, 2800);
  }

  function build() {
    // A wrapper div, not a button itself -- it holds two separate real
    // buttons (open chat / dismiss), and a button can't validly contain
    // another button.
    var launcher = document.createElement("div");
    launcher.id = "faq-bot-launcher";

    var openBtn = document.createElement("button");
    openBtn.id = "faq-bot-open";
    openBtn.type = "button";
    openBtn.setAttribute("aria-label", "Chat with us");
    openBtn.innerHTML = MASCOT_IMG +
      '<span class="faq-bot-hint" data-en="Need help?" data-ne="सहयोग चाहियो?">Need help?</span>';

    // The visible circle is a nested span, so the button itself can be a
    // full 44x44 touch target (Apple HIG minimum; Material says 48) while
    // still *looking* small. The previous version was a 24x24 button sitting
    // on top of the mascot -- roughly half the minimum, and near-misses hit
    // her and opened the chat instead, which is exactly what got reported.
    var dismissBtn = document.createElement("button");
    dismissBtn.id = "faq-bot-dismiss";
    dismissBtn.type = "button";
    dismissBtn.innerHTML = '<span aria-hidden="true">&times;</span>';

    launcher.appendChild(openBtn);
    launcher.appendChild(dismissBtn);

    var panel = document.createElement("div");
    panel.id = "faq-bot-panel";
    panel.hidden = true;
    panel.innerHTML =
      '<div class="faq-bot-header">' +
        '<span class="faq-bot-avatar">' + AVATAR_IMG + "</span>" +
        '<span class="faq-bot-title" data-en="Khatiwada POS Help" data-ne="खटीवाडा POS सहयोग">Khatiwada POS Help' +
          '<span class="faq-bot-sub" data-en="Tap a question below" data-ne="तलबाट प्रश्न छान्नुहोस्">Tap a question below</span>' +
        "</span>" +
        '<button id="faq-bot-close" type="button" aria-label="Close">&times;</button>' +
      "</div>" +
      '<div id="faq-bot-messages"></div>' +
      '<div id="faq-bot-menu"></div>' +
      '<form id="faq-bot-input-form">' +
        '<input id="faq-bot-input" type="text" autocomplete="off" ' +
          'data-en-placeholder="Type your question…" data-ne-placeholder="आफ्नो प्रश्न लेख्नुहोस्…" placeholder="Type your question…">' +
        '<button type="submit" aria-label="Send" data-en="Send" data-ne="पठाउनुहोस्">Send</button>' +
      "</form>";

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    // "Help" buttons that only exist while she's fully hidden -- the only way
    // back. Injected here rather than hand-added to all 7 pages so there's
    // one source of truth. Two of them, because the nav is already tight on
    // phones (the language toggle had to be moved into the dropdown earlier
    // for exactly this reason) -- CSS shows the header one on desktop and the
    // dropdown one on mobile, never both.
    var navButtons = [];
    function makeNavButton(className, parent) {
      if (!parent) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "faq-bot-restore " + className;
      btn.setAttribute("data-en", "Help");
      btn.setAttribute("data-ne", "सहयोग");
      btn.textContent = lang() === "ne" ? "सहयोग" : "Help";
      parent.appendChild(btn);
      navButtons.push(btn);
    }
    makeNavButton("faq-bot-restore-desktop", document.querySelector(".nav-right"));
    makeNavButton("faq-bot-restore-mobile", document.querySelector(".mobile-menu"));

    var messagesEl = panel.querySelector("#faq-bot-messages");
    var menuEl = panel.querySelector("#faq-bot-menu");
    var inputForm = panel.querySelector("#faq-bot-input-form");
    var inputEl = panel.querySelector("#faq-bot-input");
    var greeted = false;

    // Accepts either a plain string, or a {en, ne} pair. A pair gets
    // data-en/data-ne attributes, so the site's existing language-toggle
    // mechanism (script.js's applyLang, which re-queries every [data-en]
    // element on each toggle) keeps it updated automatically -- including
    // messages already sent before the visitor switched languages.
    function addMessage(textOrPair, who) {
      var el = document.createElement("div");
      el.className = "faq-bot-msg " + who;
      if (typeof textOrPair === "object") {
        el.setAttribute("data-en", textOrPair.en);
        el.setAttribute("data-ne", textOrPair.ne);
        el.textContent = textOrPair[lang()];
      } else {
        el.textContent = textOrPair;
      }
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function renderMenu() {
      menuEl.innerHTML = "";
      FAQS.forEach(function (faq) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "faq-bot-chip";
        chip.setAttribute("data-en", faq.q.en);
        chip.setAttribute("data-ne", faq.q.ne);
        chip.textContent = faq.q[lang()];
        chip.addEventListener("click", function () {
          addMessage(faq.q, "user");
          addMessage(faq.a, "bot");
        });
        menuEl.appendChild(chip);
      });
    }

    var GREETING = {
      en: "Hi! I can help answer questions about Khatiwada POS. Pick one below.",
      ne: "नमस्ते! म खटीवाडा POS को बारेमा प्रश्नहरूमा सहयोग गर्न सक्छु। तलबाट एउटा छान्नुहोस्।"
    };

    var state = getState();
    var mascotImg = openBtn.querySelector("#faq-bot-mascot-img");

    // Single place that reconciles the DOM with the current state, so the
    // first paint on page load and every later transition go through exactly
    // the same code path -- no separate "set up initial state" branch to
    // drift out of sync with the transition handlers.
    function applyState(newState, opts) {
      state = newState;
      launcher.classList.toggle("peeking", state === "peeking");
      launcher.classList.toggle("hidden", state === "hidden");
      mascotImg.src = state === "peeking" ? MASCOT_PEEKING_SRC : MASCOT_SRC;
      dismissBtn.setAttribute(
        "aria-label", state === "peeking" ? "Hide the help assistant" : "Tuck the help assistant aside"
      );
      navButtons.forEach(function (btn) { btn.classList.toggle("visible", state === "hidden"); });
      if (opts && opts.persist) saveState(state);
      if (opts && opts.announce && state === "peeking") showPeekMessage(launcher);
    }

    applyState(state);

    function open() {
      panel.hidden = false;
      launcher.style.display = "none";
      if (!greeted) {
        addMessage(GREETING, "bot");
        greeted = true;
      }
      renderMenu();
    }

    function close() {
      panel.hidden = true;
      launcher.style.display = "";
    }

    openBtn.addEventListener("click", open);
    panel.querySelector("#faq-bot-close").addEventListener("click", close);

    // Same button, two meanings depending on where she currently is:
    // full -> tuck her to the edge, peeking -> hide her completely.
    dismissBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (state === "peeking") {
        applyState("hidden", { persist: true });
      } else {
        applyState("peeking", { persist: true, announce: true });
      }
    });

    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyState("full", { persist: true });
        // Coming back from hidden while the mobile dropdown is open would
        // otherwise leave the menu sitting over her -- close it so she's
        // actually visible again.
        var menu = document.querySelector(".mobile-menu");
        if (menu) menu.classList.remove("open");
      });
    });

    inputForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var typed = inputEl.value.trim();
      if (!typed) return;
      addMessage(typed, "user");
      inputEl.value = "";
      var match = matchFaq(typed);
      addMessage(match ? match.a : FALLBACK_ANSWER, "bot");
    });
  }

  document.addEventListener("DOMContentLoaded", build);
})();
