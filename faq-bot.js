/* Khatiwada POS — FAQ chat widget. No AI, no backend, no cost: a curated
   list of question/answer pairs the visitor taps through. Bilingual via the
   same data-en/data-ne + KhatiwadaLang convention as the rest of the site
   (see script.js) — every string here follows that pattern so the existing
   language toggle updates this widget too, with no special-casing needed. */
(function () {
  "use strict";

  var FAQS = [
    { id: "what-is",
      q: { en: "What is Khatiwada POS?", ne: "खटीवाडा POS के हो?" },
      a: { en: "Khatiwada POS is a simple point-of-sale system that runs on the phone or tablet you already have. No special hardware to buy — scan barcodes with your camera, and manage sales, stock, and reports from one place.",
           ne: "खटीवाडा POS एउटा सजिलो पसल बिक्री प्रणाली हो, जुन तपाईंसँग भइरहेको फोन वा ट्याब्लेटमा नै चल्छ। छुट्टै हार्डवेयर किन्नु पर्दैन — क्यामेराले बारकोड स्क्यान गर्नुहोस्, र बिक्री, स्टक, रिपोर्ट सबै एकै ठाउँबाट व्यवस्थापन गर्नुहोस्।" } },
    { id: "cost",
      q: { en: "How much does it cost?", ne: "यसको मूल्य कति हो?" },
      a: { en: "We have Starter and Growth plans, but pricing isn't finalized yet — we're still working that out. Reach out via the Contact page and we'll talk you through it.",
           ne: "हामीसँग Starter र Growth दुई प्लान छन्, तर मूल्य अझै टुंगिएको छैन — हामी त्यसमा काम गरिरहेका छौं। Contact पेजबाट सम्पर्क गर्नुहोस्, हामी विस्तारमा कुरा गर्छौं।" } },
    { id: "hardware",
      q: { en: "Do I need to buy any special hardware?", ne: "के मैले कुनै विशेष हार्डवेयर किन्नु पर्छ?" },
      a: { en: "No. Any phone, tablet, or laptop with a camera and a browser is enough. You can pair a dedicated barcode scanner if you already have one, but it's never required.",
           ne: "पर्दैन। क्यामेरा र ब्राउजर भएको फोन, ट्याब्लेट, वा ल्यापटप भए पुग्छ। तपाईंसँग पहिल्यै बारकोड स्क्यानर छ भने त्यो पनि जोड्न सकिन्छ, तर त्यो कहिल्यै आवश्यक छैन।" } },
    { id: "features",
      q: { en: "What features are included?", ne: "यसमा कस्ता फिचरहरू छन्?" },
      a: { en: "Camera barcode scanning, support for weighed items like rice and lentils, a bilingual English/Nepali cashier screen, cash and QR payments, sales reports, and more — see the Features page for the full list.",
           ne: "क्यामेरा बारकोड स्क्यानिङ, चामल-दाल जस्ता तौलिने सामानको लागि सपोर्ट, अंग्रेजी/नेपाली दुवैमा चल्ने क्यासियर स्क्रिन, नगद र QR भुक्तानी, बिक्री रिपोर्ट, र थप धेरै — पूरा सूचीको लागि Features पेज हेर्नुहोस्।" } },
    { id: "starter-vs-growth",
      q: { en: "What's the difference between Starter and Growth?", ne: "Starter र Growth बीच के फरक छ?" },
      a: { en: "Growth includes everything in Starter, plus CSV import/export, product photos, multiple staff logins, advanced sales reports, and priority support.",
           ne: "Growth मा Starter का सबै सुविधा छन्, त्यसमाथि CSV import/export, प्रोडक्टका फोटो, धेरै स्टाफ लगइन, उन्नत बिक्री रिपोर्ट, र प्राथमिकता सहयोग थपिन्छ।" } },
    { id: "get-started",
      q: { en: "How do I get started?", ne: "कसरी सुरु गर्ने?" },
      a: { en: "Tap “Get Started” or “Log In” on any page, then “Create your account.” Fill in a few details about your shop and one of our team will reach out to set everything up.",
           ne: "जुनसुकै पेजमा “Get Started” वा “Log In” थिच्नुहोस्, त्यसपछि “Create your account.” आफ्नो पसलको बारेमा केही जानकारी भर्नुहोस्, हाम्रो टिमले चाँडै सम्पर्क गरेर सबै सेटअप गरिदिनेछ।" } },
    { id: "data-privacy",
      q: { en: "Is my shop's data private?", ne: "मेरो पसलको डेटा सुरक्षित छ?" },
      a: { en: "Yes — your shop's data stays private to your account only. It's not shared with or visible to other shops using Khatiwada POS.",
           ne: "हो, तपाईंको पसलको डेटा तपाईंको खातामा मात्र निजी रहन्छ — यो खटीवाडा POS प्रयोग गर्ने अरू पसलहरूसँग साझा हुँदैन।" } },
    { id: "language",
      q: { en: "Does it work in Nepali?", ne: "के यो नेपालीमा चल्छ?" },
      a: { en: "Yes — one tap switches the entire cashier screen between English and Nepali, so every staff member can use it comfortably.",
           ne: "हो, एउटा ट्यापले पूरै क्यासियर स्क्रिन अंग्रेजी र नेपाली बीच बदलिन्छ, ताकि हरेक स्टाफले सजिलै प्रयोग गर्न सकून्।" } },
    { id: "qr-payment",
      q: { en: "Can customers pay by QR code?", ne: "के ग्राहकले QR कोडबाट तिर्न सक्छन्?" },
      a: { en: "Yes — cash and QR payments already work side by side. Custom-branded QR codes like the big marts use are coming soon, that needs Fonepay Business registration and we're working on it.",
           ne: "हो, नगद र QR भुक्तानी दुवै अहिले नै एकसाथ चल्छ। ठूला मार्टहरूले जस्तै आफ्नै ब्रान्डेड QR कोड चाँडै आउँदैछ — त्यसको लागि Fonepay Business दर्ता चाहिन्छ, हामी त्यसमा काम गर्दैछौं।" } },
    { id: "support",
      q: { en: "How do I contact support?", ne: "सहयोगको लागि कसरी सम्पर्क गर्ने?" },
      a: { en: "Head to the Contact page and send us a message — we read every one.",
           ne: "Contact पेजमा गएर हामीलाई सन्देश पठाउनुहोस् — हामी सबै सन्देश पढ्छौं।" } }
  ];

  // A Newari girl in traditional haku patasi dress: black blouse, gold
  // shawl, joined hands in greeting, bangles, red/black patterned skirt
  // with a white sash, single front braid, bindi, and gold hoop earrings.
  var MASCOT_SVG =
    '<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">' +
    // skirt (patasi)
    '<path d="M55 210 Q40 262 30 320 L170 320 Q160 262 145 210 Z" fill="#B5202A"/>' +
    '<path d="M62 230 Q100 240 138 230 L133 250 Q100 258 67 250 Z" fill="#17140f"/>' +
    '<path d="M50 275 Q100 286 150 275 L146 292 Q100 300 54 292 Z" fill="#17140f"/>' +
    '<circle cx="78" cy="262" r="4.5" fill="#7EC8E3"/><circle cx="122" cy="262" r="4.5" fill="#E27CA0"/>' +
    '<circle cx="65" cy="305" r="4.5" fill="#E27CA0"/><circle cx="135" cy="305" r="4.5" fill="#7EC8E3"/>' +
    // sash + tassel
    '<path d="M50 196 Q100 208 150 196 L150 214 Q100 224 50 214 Z" fill="#F8F3E8"/>' +
    '<circle cx="57" cy="210" r="5" fill="#B5202A"/>' +
    '<path d="M55 214 Q49 236 44 258" stroke="#E56B78" stroke-width="6" fill="none" stroke-linecap="round"/>' +
    // blouse + sleeves
    '<path d="M65 110 Q100 100 135 110 L145 140 Q150 170 145 200 L55 200 Q50 170 55 140 Z" fill="#17140f"/>' +
    '<path d="M56 118 Q40 124 37 146 Q45 152 59 141 Z" fill="#17140f"/>' +
    '<path d="M144 118 Q160 124 163 146 Q155 152 141 141 Z" fill="#17140f"/>' +
    // neck (drawn before the shawl/hands that sit in front of it)
    '<path d="M90 95 L110 95 L112 112 L88 112 Z" fill="#F0C39E"/>' +
    // gold shawl
    '<path d="M78 107 Q100 120 122 107 Q108 100 100 100 Q92 100 78 107 Z" fill="#F4C542"/>' +
    '<path d="M86 109 L100 158 L114 109 Z" fill="#F4C542"/>' +
    // braid (in front, over blouse and skirt)
    '<path d="M70 96 Q58 160 63 222 Q66 262 74 300 L86 298 Q80 262 78 222 Q75 160 84 98 Z" fill="#1A1410"/>' +
    '<line x1="68" y1="140" x2="82" y2="138" stroke="#000" stroke-width="1.4" opacity="0.35"/>' +
    '<line x1="67" y1="180" x2="81" y2="179" stroke="#000" stroke-width="1.4" opacity="0.35"/>' +
    '<line x1="68" y1="222" x2="80" y2="222" stroke="#000" stroke-width="1.4" opacity="0.35"/>' +
    // forearms + bangles + joined hands (namaste)
    '<path d="M45 130 Q55 145 71 151 L76 145 Q61 135 51 124 Z" fill="#F0C39E"/>' +
    '<path d="M155 130 Q145 145 129 151 L124 145 Q139 135 149 124 Z" fill="#F0C39E"/>' +
    '<ellipse cx="72" cy="148" rx="10" ry="4" fill="#FFFFFF"/><ellipse cx="72" cy="154" rx="10" ry="4" fill="#7EC8E3"/><ellipse cx="72" cy="160" rx="10" ry="4" fill="#B39DDB"/>' +
    '<ellipse cx="128" cy="148" rx="10" ry="4" fill="#FFFFFF"/><ellipse cx="128" cy="154" rx="10" ry="4" fill="#7EC8E3"/><ellipse cx="128" cy="160" rx="10" ry="4" fill="#B39DDB"/>' +
    '<path d="M85 130 Q90 110 100 108 Q95 130 92 156 Q88 156 85 145 Z" fill="#F0C39E"/>' +
    '<path d="M115 130 Q110 110 100 108 Q105 130 108 156 Q112 156 115 145 Z" fill="#F0C39E"/>' +
    '<line x1="100" y1="112" x2="100" y2="152" stroke="#D9A87A" stroke-width="1.5"/>' +
    // side hair framing face
    '<path d="M68 55 Q64 90 70 116 L80 116 Q75 85 76 58 Z" fill="#1A1410"/>' +
    '<path d="M132 55 Q136 90 130 116 L120 116 Q125 85 124 58 Z" fill="#1A1410"/>' +
    // face
    '<ellipse cx="100" cy="65" rx="32" ry="36" fill="#F0C39E"/>' +
    // hair cap
    '<path d="M68 60 Q65 20 100 15 Q135 20 132 60 Q132 45 100 40 Q68 45 68 60 Z" fill="#1A1410"/>' +
    // bindi, brows, eyes, lips
    '<circle cx="100" cy="48" r="3" fill="#C0392B"/>' +
    '<path d="M82 60 Q88 56 94 60" fill="none" stroke="#1A1410" stroke-width="2.5" stroke-linecap="round"/>' +
    '<path d="M106 60 Q112 56 118 60" fill="none" stroke="#1A1410" stroke-width="2.5" stroke-linecap="round"/>' +
    '<ellipse cx="88" cy="66" rx="3.2" ry="4" fill="#1A1410"/><ellipse cx="112" cy="66" rx="3.2" ry="4" fill="#1A1410"/>' +
    '<path d="M89 81 Q100 89 111 81 Q100 85 89 81 Z" fill="#7B2D3E"/>' +
    // gold hoop earrings
    '<circle cx="68" cy="78" r="6" fill="none" stroke="#E8B84B" stroke-width="3"/>' +
    '<circle cx="132" cy="78" r="6" fill="none" stroke="#E8B84B" stroke-width="3"/>' +
    "</svg>";

  // Tighter head-only crop of the same character, for the chat panel header.
  var AVATAR_SVG =
    '<svg viewBox="60 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M68 55 Q64 90 70 116 L80 116 Q75 85 76 58 Z" fill="#1A1410"/>' +
    '<path d="M132 55 Q136 90 130 116 L120 116 Q125 85 124 58 Z" fill="#1A1410"/>' +
    '<ellipse cx="100" cy="65" rx="32" ry="36" fill="#F0C39E"/>' +
    '<path d="M68 60 Q65 20 100 15 Q135 20 132 60 Q132 45 100 40 Q68 45 68 60 Z" fill="#1A1410"/>' +
    '<circle cx="100" cy="48" r="3" fill="#C0392B"/>' +
    '<path d="M82 60 Q88 56 94 60" fill="none" stroke="#1A1410" stroke-width="2.5" stroke-linecap="round"/>' +
    '<path d="M106 60 Q112 56 118 60" fill="none" stroke="#1A1410" stroke-width="2.5" stroke-linecap="round"/>' +
    '<ellipse cx="88" cy="66" rx="3.2" ry="4" fill="#1A1410"/><ellipse cx="112" cy="66" rx="3.2" ry="4" fill="#1A1410"/>' +
    '<path d="M89 81 Q100 89 111 81 Q100 85 89 81 Z" fill="#7B2D3E"/>' +
    '<circle cx="68" cy="78" r="6" fill="none" stroke="#E8B84B" stroke-width="3"/>' +
    '<circle cx="132" cy="78" r="6" fill="none" stroke="#E8B84B" stroke-width="3"/>' +
    "</svg>";

  function lang() {
    return (window.KhatiwadaLang && window.KhatiwadaLang.getLang()) || "en";
  }

  function build() {
    var launcher = document.createElement("button");
    launcher.id = "faq-bot-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-label", "Chat with us");
    launcher.innerHTML = MASCOT_SVG +
      '<span class="faq-bot-hint" data-en="Need help?" data-ne="सहयोग चाहियो?">Need help?</span>';

    var panel = document.createElement("div");
    panel.id = "faq-bot-panel";
    panel.hidden = true;
    panel.innerHTML =
      '<div class="faq-bot-header">' +
        '<span class="faq-bot-avatar">' + AVATAR_SVG + "</span>" +
        '<span class="faq-bot-title" data-en="Khatiwada POS Help" data-ne="खटीवाडा POS सहयोग">Khatiwada POS Help' +
          '<span class="faq-bot-sub" data-en="Tap a question below" data-ne="तलबाट प्रश्न छान्नुहोस्">Tap a question below</span>' +
        "</span>" +
        '<button id="faq-bot-close" type="button" aria-label="Close">&times;</button>' +
      "</div>" +
      '<div id="faq-bot-messages"></div>' +
      '<div id="faq-bot-menu"></div>';

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    var messagesEl = panel.querySelector("#faq-bot-messages");
    var menuEl = panel.querySelector("#faq-bot-menu");
    var greeted = false;

    function addMessage(text, who) {
      var el = document.createElement("div");
      el.className = "faq-bot-msg " + who;
      el.textContent = text;
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function renderMenu() {
      menuEl.innerHTML = "";
      FAQS.forEach(function (faq) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "faq-bot-chip";
        chip.textContent = faq.q[lang()];
        chip.addEventListener("click", function () {
          addMessage(faq.q[lang()], "user");
          addMessage(faq.a[lang()], "bot");
        });
        menuEl.appendChild(chip);
      });
    }

    function open() {
      panel.hidden = false;
      launcher.style.display = "none";
      if (!greeted) {
        addMessage(
          lang() === "ne"
            ? "नमस्ते! म खटीवाडा POS को बारेमा प्रश्नहरूमा सहयोग गर्न सक्छु। तलबाट एउटा छान्नुहोस्।"
            : "Hi! I can help answer questions about Khatiwada POS. Pick one below.",
          "bot"
        );
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

    // Menu labels re-render in the new language on toggle; already-sent
    // messages stay in whichever language they were asked in.
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!panel.hidden) renderMenu();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", build);
})();
