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

  // A Newari girl in traditional haku patasi dress — the actual image the
  // user picked (Gemini-generated, saved as mascot.png), not a hand-coded
  // or Claude-Design SVG recreation. Its "transparent" background was
  // actually a baked-in checkerboard (fully opaque pixels), so it was
  // flood-filled to real alpha transparency and cropped to content before
  // being added here — see the commit message for the processing steps.
  var MASCOT_IMG = '<img src="/mascot.png" alt="" width="98" height="181">';

  // Same image, cropped via CSS (object-fit/object-position) to just the
  // head for the chat panel header avatar.
  var AVATAR_IMG = '<img src="/mascot.png" alt="">';

  function lang() {
    return (window.KhatiwadaLang && window.KhatiwadaLang.getLang()) || "en";
  }

  function build() {
    var launcher = document.createElement("button");
    launcher.id = "faq-bot-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-label", "Chat with us");
    launcher.innerHTML = MASCOT_IMG +
      '<span class="faq-bot-hint" data-en="Need help?" data-ne="सहयोग चाहियो?">Need help?</span>';

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

    launcher.addEventListener("click", open);
    panel.querySelector("#faq-bot-close").addEventListener("click", close);

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
