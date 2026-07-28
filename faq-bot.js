/* Khatiwada POS FAQ chat widget. No AI, no backend, no cost: a curated
   list of question/answer pairs the visitor taps through. Bilingual via the
   same data-en/data-ne + KhatiwadaLang convention as the rest of the site
   (see script.js), and every string here follows that pattern so the existing
   language toggle updates this widget too, with no special-casing needed. */
(function () {
  "use strict";

  var FAQS = [
    { id: "what-is",
      keywords: ["what is this", "what is khatiwada", "khatiwada pos", "what's this", "explain", "what does it do", "के हो", "बारेमा", "भनेको के हो"],
      q: { en: "What is Khatiwada POS?", ne: "खटीवाडा POS के हो?" },
      a: { en: "It's a point-of-sale app that runs right on the phone or tablet you already have. No special hardware, no big installation. Scan barcodes with your camera, ring up sales, keep track of stock, and check your reports, all from one place.",
           ne: "यो एउटा बिक्री एप हो, तपाईंसँग भइरहेको फोन वा ट्याब्लेटमै चल्छ। छुट्टै हार्डवेयर वा ठूलो इन्स्टलेसन झन्झट छैन। क्यामेराले बारकोड स्क्यान गर्नुहोस्, बिक्री गर्नुहोस्, स्टक हेर्नुहोस्, र रिपोर्ट पनि उतैबाट हेर्नुहोस्।" } },
    { id: "cost",
      keywords: ["cost", "price", "pricing", "how much", "expensive", "afford", "मूल्य", "पैसा", "कति पर्छ", "कति हो"],
      q: { en: "How much does it cost?", ne: "यसको मूल्य कति हो?" },
      a: { en: "Honestly, we haven't locked in exact numbers yet. We're still figuring out Starter and Growth pricing. Message us on the Contact page and we'll walk you through what makes sense for your shop.",
           ne: "साँच्चै भन्दा, अहिलेसम्म ठ्याक्कै मूल्य तय भएको छैन। Starter र Growth को मूल्यमा हामी अझै काम गर्दैछौं। Contact पेजबाट सन्देश पठाउनुहोस्, तपाईंको पसललाई के मिल्छ भनेर हामी कुरा गर्छौं।" } },
    { id: "hardware",
      keywords: ["hardware", "device", "scanner", "equipment", "buy anything", "special phone", "हार्डवेयर", "उपकरण", "किन्नु"],
      q: { en: "Do I need to buy any special hardware?", ne: "के मैले कुनै विशेष हार्डवेयर किन्नु पर्छ?" },
      a: { en: "Nope, any phone, tablet, or laptop with a camera works fine. Got a barcode scanner already? You can plug that in too, but it's not something you need to go buy.",
           ne: "पर्दैन, क्यामेरा भएको जुनसुकै फोन, ट्याब्लेट, वा ल्यापटपले काम गर्छ। पहिल्यै बारकोड स्क्यानर छ भने त्यो पनि जोड्न सकिन्छ, तर त्यो किन्नैपर्ने केही होइन।" } },
    { id: "features",
      keywords: ["feature", "features", "what can it do", "capabilities", "फिचर", "सुविधा"],
      q: { en: "What features are included?", ne: "यसमा कस्ता फिचरहरू छन्?" },
      a: { en: "Camera-based barcode scanning, support for stuff sold by weight like rice and lentils, a cashier screen that works in English or Nepali, cash and QR payments, sales reports. Check the Features page if you want the full rundown.",
           ne: "क्यामेराबाट बारकोड स्क्यान, चामल-दाल जस्ता तौलेर बेच्ने सामानको सपोर्ट, अंग्रेजी वा नेपालीमा चल्ने क्यासियर स्क्रिन, नगद र QR भुक्तानी, बिक्री रिपोर्ट। पूरै सूचीको लागि Features पेज हेर्नुहोस्।" } },
    { id: "starter-vs-growth",
      keywords: ["starter", "growth", "difference", "which plan", "compare", "फरक", "प्लान"],
      q: { en: "What's the difference between Starter and Growth?", ne: "Starter र Growth बीच के फरक छ?" },
      a: { en: "Growth has everything Starter does, plus CSV import/export, product photos, room for more staff logins, deeper sales reports, and you get bumped to the front of the line for support.",
           ne: "Growth मा Starter का सबै सुविधाका साथै CSV import/export, प्रोडक्टका फोटो, थप स्टाफ लगइन, गहिरो बिक्री रिपोर्ट, र सहयोगमा पहिलो प्राथमिकता पनि पाइन्छ।" } },
    { id: "get-started",
      keywords: ["get started", "sign up", "signup", "join", "how do i start", "begin", "सुरु", "दर्ता", "कसरी"],
      q: { en: "How do I get started?", ne: "कसरी सुरु गर्ने?" },
      a: { en: "Hit “Get Started” or “Log In” from any page, then “Create your account.” Tell us a bit about your shop and someone from our side will follow up to get you set up.",
           ne: "जुनसुकै पेजमा “Get Started” वा “Log In” थिच्नुहोस्, अनि “Create your account.” आफ्नो पसलको बारे अलिकति लेख्नुहोस्, हाम्रोतर्फबाट कोही सम्पर्कमा आएर बाँकी सेटअप गरिदिन्छ।" } },
    { id: "data-privacy",
      keywords: ["privacy", "private", "data", "secure", "security", "safe", "डेटा", "सुरक्षित", "गोप्य", "निजी"],
      q: { en: "Is my shop's data private?", ne: "मेरो पसलको डेटा सुरक्षित छ?" },
      a: { en: "Yep, it's just for your shop. Nobody else using Khatiwada POS can see it.",
           ne: "हो, यो तपाईंको पसलको मात्र हो। खटीवाडा POS प्रयोग गर्ने अरू कसैले देख्न सक्दैन।" } },
    { id: "language",
      keywords: ["nepali", "language", "english", "devanagari", "नेपाली", "भाषा", "अंग्रेजी"],
      q: { en: "Does it work in Nepali?", ne: "के यो नेपालीमा चल्छ?" },
      a: { en: "Yes, one tap flips the whole cashier screen between English and Nepali, so whoever's working the counter can use whichever they're comfortable with.",
           ne: "हो, एउटा ट्यापले पूरै क्यासियर स्क्रिन अंग्रेजी र नेपाली बीच बदलिन्छ, काउन्टरमा जो बसे पनि आफूलाई सजिलो हुने भाषा प्रयोग गर्न सक्छन्।" } },
    { id: "qr-payment",
      keywords: ["qr", "payment", "pay", "fonepay", "digital payment", "भुक्तानी", "तिर्न", "पेमेन्ट"],
      q: { en: "Can customers pay by QR code?", ne: "के ग्राहकले QR कोडबाट तिर्न सक्छन्?" },
      a: { en: "Cash and QR both work today. Your own branded QR code (like the bigger marts use) is on the way. That needs Fonepay Business registration first, which we're sorting out.",
           ne: "नगद र QR दुवै अहिले नै चल्छ। ठूला मार्टहरूले जस्तै आफ्नै ब्रान्डेड QR चाँडै आउँदैछ। त्यसको लागि पहिले Fonepay Business दर्ता चाहिन्छ, त्यो मिलाउँदैछौं।" } },
    { id: "support",
      keywords: ["support", "contact", "help", "reach you", "get in touch", "सहयोग", "सम्पर्क", "मद्दत"],
      q: { en: "How do I contact support?", ne: "सहयोगको लागि कसरी सम्पर्क गर्ने?" },
      a: { en: "Just use the Contact page. Every message actually gets read, it's not going into a void.",
           ne: "Contact पेज नै प्रयोग गर्नुहोस्। हरेक सन्देश साँच्चै पढिन्छ, हावामा हराउँदैन।" } },
    { id: "offline",
      keywords: ["internet", "offline", "wifi", "connection", "no internet", "इन्टरनेट", "वाइफाइ", "नेटवर्क"],
      q: { en: "Does it work without internet?", ne: "के यो इन्टरनेट बिना पनि चल्छ?" },
      a: { en: "It needs an internet connection to keep everything synced. Most shops already have wifi or a mobile data connection running anyway. It's not built for fully offline use yet.",
           ne: "सबै कुरा सिंक राख्न यसलाई इन्टरनेट कनेक्सन चाहिन्छ। धेरैजसो पसलमा पहिल्यै वाइफाइ वा मोबाइल डाटा चलिरहेको हुन्छ। पूर्ण रूपमा अफलाइन चल्ने गरी अझै बनाइएको छैन।" } },
    { id: "multi-device",
      keywords: ["multiple devices", "more than one", "two counters", "many staff", "at the same time", "एकैसाथ", "धेरै स्टाफ", "दुई काउन्टर"],
      q: { en: "Can more than one person use it at the same time?", ne: "के एकभन्दा बढी मानिसले एकैसाथ प्रयोग गर्न सक्छन्?" },
      a: { en: "On Starter, it's one login at a time. If you've got more than one counter or staff member ringing up sales together, Growth gives everyone their own login so nobody's waiting on anyone else.",
           ne: "Starter मा एकपटकमा एउटै लगइन चल्छ। एकभन्दा बढी काउन्टर वा स्टाफले सँगै बिक्री गर्नुपर्छ भने, Growth ले सबैलाई आफ्नै लगइन दिन्छ, कसैले कसैको पालो पर्खनु पर्दैन।" } },
    { id: "switching",
      keywords: ["switching", "existing data", "old system", "bring my data", "notebook", "already using", "सारिने", "पुरानो डेटा", "अर्को सिस्टम"],
      q: { en: "I already track things in a notebook or another system. Can I bring that over?", ne: "मैले पहिल्यै कापी वा अर्को सिस्टममा राखेको छु। त्यो सार्न मिल्छ?" },
      a: { en: "Yes, your product list can be brought in through CSV import, so you're not starting from zero. Anything only written in a notebook will need to be typed in once, there's no way around that part.",
           ne: "हुन्छ, तपाईंको प्रोडक्ट सूची CSV import मार्फत ल्याउन सकिन्छ, सुरुदेखि नै टाइप गर्नु पर्दैन। कापीमा मात्र लेखिएको कुरा भने एकपटक टाइप गर्नैपर्छ, त्यसको उपाय छैन।" } },
    { id: "setup-help",
      keywords: ["set up", "setup", "training", "help me start", "onboarding", "teach my staff", "सेटअप", "तालिम", "सिकाउने"],
      q: { en: "Will someone help me set it up?", ne: "सेटअपमा कसैले सहयोग गर्छ?" },
      a: { en: "Yes, when you sign up, our team sets your shop's account up and walks you through it. You're not left to figure it out alone with a manual.",
           ne: "हो, साइन अप गरेपछि हाम्रो टिमले तपाईंको पसलको खाता सेटअप गरेर प्रयोग गर्ने तरिका देखाउँछ। म्यानुअल छोडेर तपाईंलाई एक्लै छोडिँदैन।" } },
    { id: "trial",
      keywords: ["free trial", "demo", "try before", "test it first", "trial period", "ट्राइल", "डेमो", "जाँच्ने"],
      q: { en: "Can I try it before deciding?", ne: "निर्णय गर्नुअघि जाँच्न मिल्छ?" },
      a: { en: "We haven't set a formal trial period yet, pricing itself is still being worked out. Message us on the Contact page and we'll figure out a fair way for you to see it in action first.",
           ne: "अहिलेसम्म औपचारिक ट्राइल अवधि तय गरेको छैन, मूल्य नै अझै टुंगिएको छैन। Contact पेजबाट सन्देश पठाउनुहोस्, पहिले चलाएर हेर्ने उचित तरिका हामी मिलाउँछौं।" } }
  ];

  var FALLBACK_ANSWER = {
    en: "I'm not sure about that one. Try one of the questions below, or reach out via the Contact page.",
    ne: "त्यसको बारेमा म पक्का छैन। तलका प्रश्नहरूमध्ये एउटा प्रयास गर्नुहोस्, वा Contact पेजबाट सम्पर्क गर्नुहोस्।"
  };

  // Still no AI, no backend, no cost -- see the Notion tracker for why that
  // was chosen over a paid API. But plain substring matching on the whole
  // typed sentence had real gaps: a multi-word keyword like "bring my data"
  // only matched if the visitor typed those exact words adjacent and in that
  // order, and single-word keywords like "cost" wouldn't match "costs" or a
  // simple typo like "cots". This tokenizes the input into actual words
  // (Unicode-aware, so Devanagari works the same as Latin script), matches
  // each keyword word against whole input tokens with light typo/plural
  // tolerance (prefix match + edit-distance-1), and for multi-word keywords
  // requires every one of its words to appear SOMEWHERE in the input rather
  // than as a rigid contiguous phrase -- weighted by word count, so a
  // specific multi-word match outweighs one generic single-word overlap.
  function tokenize(text) {
    return text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
  }

  // Cheap Levenshtein, capped at distance 1 (bails out fast once two chars
  // have differed) -- a full edit-distance table would be overkill for
  // catching "recipt"/"receipt"-style single-letter typos.
  function withinEditDistanceOne(a, b) {
    if (a === b) return true;
    var lenDiff = a.length - b.length;
    if (lenDiff < -1 || lenDiff > 1) return false;
    var i = 0, j = 0, mismatches = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      mismatches++;
      if (mismatches > 1) return false;
      if (a.length === b.length) { i++; j++; }       // substitution
      else if (a.length > b.length) i++;              // extra char in a
      else j++;                                       // extra char in b
    }
    return true;
  }

  function wordMatches(token, keyword) {
    if (token === keyword) return true;
    if (keyword.length >= 4 && token.indexOf(keyword) === 0) return true; // "costs" ~ "cost"
    if (token.length >= 4 && keyword.indexOf(token) === 0) return true;
    if (keyword.length >= 5 && withinEditDistanceOne(token, keyword)) return true; // typo tolerance
    return false;
  }

  function matchFaq(input) {
    var tokens = tokenize(input);
    var best = null;
    var bestScore = 0;
    FAQS.forEach(function (faq) {
      var score = 0;
      faq.keywords.forEach(function (kw) {
        var kwWords = tokenize(kw);
        // Every word of the keyword has to show up SOMEWHERE among the
        // input's tokens (each still via wordMatches' typo/plural
        // tolerance), not as a rigid contiguous substring. A phrase keyword
        // like "bring my data" only matched literal-adjacent typing before;
        // real typed phrasing ("bring my OLD data over") drops words in
        // between constantly, and this still counts it. Weight = word count,
        // so a genuinely specific multi-word phrase outweighs one generic
        // single-word overlap, but only when every one of its words is
        // actually present, not a coincidental substring of the sentence.
        var allWordsPresent = kwWords.every(function (kwWord) {
          return tokens.some(function (t) { return wordMatches(t, kwWord); });
        });
        if (allWordsPresent) score += kwWords.length;
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
  // Two separate peeking illustrations rather than one CSS-mirrored image:
  // her saree is asymmetric (the red pallu drapes over one shoulder), as is
  // the hair parting, so transform: scaleX(-1) would put the pallu on the
  // wrong shoulder and quietly stop matching the waving/basket poses.
  var MASCOT_PEEKING_SRC = { right: "/mascot-peeking.png", left: "/mascot-peeking-left.png" };
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

  // Which edge she lives on. Right is the default and stays the default --
  // moving her is an opt-in the visitor performs by dragging, not something
  // that ever happens on its own.
  var SIDE_KEY = "khatiwada_mascot_side";

  function getSide() {
    try { return localStorage.getItem(SIDE_KEY) === "left" ? "left" : "right"; }
    catch (e) { return "right"; }
  }

  function saveSide(side) {
    try { localStorage.setItem(SIDE_KEY, side); } catch (e) {}
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
    var side = getSide();
    var mascotImg = openBtn.querySelector("#faq-bot-mascot-img");

    // Single place that reconciles the DOM with the current state, so the
    // first paint on page load and every later transition go through exactly
    // the same code path -- no separate "set up initial state" branch to
    // drift out of sync with the transition handlers.
    function applyState(newState, opts) {
      state = newState;
      launcher.classList.toggle("peeking", state === "peeking");
      launcher.classList.toggle("hidden", state === "hidden");
      launcher.classList.toggle("side-left", side === "left");
      panel.classList.toggle("side-left", side === "left");
      mascotImg.src = state === "peeking" ? MASCOT_PEEKING_SRC[side] : MASCOT_SRC;
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

    // suppressNextClick is set by a real drag (see below) and checked here,
    // instead of dynamically adding/removing a one-time listener per drag --
    // that pattern left stray state behind when a drag was quickly followed
    // by a tap, the cause of a "need two taps after dragging" report.
    var suppressNextClick = false;
    openBtn.addEventListener("click", function () {
      if (suppressNextClick) {
        suppressNextClick = false;
        return;
      }
      open();
    });
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

    // ---- Drag her to the other edge ----------------------------------
    // She defaults to the right and only ever moves because the visitor
    // dragged her there. Pointer events rather than mouse+touch pairs so
    // one code path covers finger, mouse, and stylus.
    //
    // The fiddly part is that the thing you drag is also the button that
    // opens the chat: a tap must still open it, but a drag must not. So
    // movement is measured against a threshold, and only a real drag
    // suppresses the click that the browser fires afterwards.
    //
    // This threshold was originally 8px and broke plain clicking entirely
    // on real desktop mice/trackpads -- ordinary click jitter (a few px of
    // movement between mousedown and mouseup, common on trackpads) crossed
    // it almost every time, so nearly every click got classified as a drag
    // and swallowed. Automated testing during development used simulated
    // pointer events with zero jitter, so this never showed up until a real
    // user reported clicking not opening the chat at all. 32px stays far
    // below any real drag (which crosses a meaningful chunk of the screen)
    // while comfortably absorbing normal click jitter.
    var DRAG_THRESHOLD = 32;
    var drag = null;

    launcher.addEventListener("pointerdown", function (e) {
      if (state === "hidden" || e.target.closest("#faq-bot-dismiss")) return;
      // Defensive reset: a fresh gesture should never inherit suppression
      // state left over from an earlier one.
      suppressNextClick = false;
      drag = { startX: e.clientX, startY: e.clientY, moved: false, pointerId: e.pointerId };
      launcher.setPointerCapture(e.pointerId);
    });

    launcher.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.pointerId) return;
      var dx = e.clientX - drag.startX;
      var dy = e.clientY - drag.startY;
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) < DRAG_THRESHOLD) return;
      drag.moved = true;
      launcher.classList.add("dragging");
      // Follow the finger 1:1 while held. This is a transform on top of
      // whatever the current side/state CSS already positions, so nothing
      // here has to know about those offsets.
      launcher.style.transform = "translate(" + dx + "px, " + dy + "px)";
    });

    function endDrag(e) {
      if (!drag || e.pointerId !== drag.pointerId) return;
      var wasDrag = drag.moved;
      var dropX = e.clientX;
      drag = null;
      launcher.classList.remove("dragging");
      launcher.style.transform = "";
      if (!wasDrag) return;

      // Snap to whichever half of the screen she was let go in.
      var newSide = dropX < window.innerWidth / 2 ? "left" : "right";
      if (newSide !== side) {
        side = newSide;
        saveSide(side);
        applyState(state);
      }
      // A genuine pointerup fires a click right after this, even though the
      // visitor was dragging, not tapping -- flag it so that one click is
      // skipped instead of opening the chat. pointercancel (the browser
      // aborting the gesture, e.g. a touch scroll taking over mid-drag) does
      // NOT get a follow-up click at all, so arming the flag there left it
      // stuck forever with nothing to consume it -- silently swallowing the
      // visitor's next honest tap and making it look like "the first click
      // after moving her does nothing, the second one works." That was the
      // actual bug, not a timing fluke in the click handler itself.
      if (e.type === "pointerup") {
        suppressNextClick = true;
        // Belt and suspenders: if the anticipated click somehow never
        // arrives for any other reason we haven't thought of, don't leave
        // this armed forever either.
        setTimeout(function () { suppressNextClick = false; }, 400);
      }
    }

    launcher.addEventListener("pointerup", endDrag);
    launcher.addEventListener("pointercancel", endDrag);

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
