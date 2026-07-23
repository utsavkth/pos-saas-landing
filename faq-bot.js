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

  // A Newari girl in traditional haku patasi dress — designed in Claude
  // Design (see the "Khatiwada POS Chat Mascot" project) rather than
  // hand-coded here, since that tool renders live and this file's author
  // can't visually preview it directly. Black blouse, gold shawl, red skirt
  // with black bands, white sash + pink tassel, single front braid with a
  // gold tie, bangles, bindi, gold hoop earrings.
  var MASCOT_SVG =
    '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M66,70 Q62,20 100,14 Q138,20 134,70 L134,95 Q100,110 66,95 Z" fill="#1A1A1A"/>' +
    '<ellipse cx="100" cy="55" rx="27" ry="32" fill="#D9A066"/>' +
    '<circle cx="100" cy="42" r="3" fill="#C1272D"/>' +
    '<ellipse cx="87" cy="52" rx="3.5" ry="5" fill="#1A1A1A"/>' +
    '<ellipse cx="113" cy="52" rx="3.5" ry="5" fill="#1A1A1A"/>' +
    '<path d="M86,64 Q100,76 114,64" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="78" cy="62" rx="8" ry="5" fill="#B5502C" opacity="0.25"/>' +
    '<ellipse cx="122" cy="62" rx="8" ry="5" fill="#B5502C" opacity="0.25"/>' +
    '<circle cx="73" cy="68" r="7" fill="none" stroke="#F4C542" stroke-width="3"/>' +
    '<circle cx="127" cy="68" r="7" fill="none" stroke="#F4C542" stroke-width="3"/>' +
    '<rect x="90" y="82" width="20" height="14" rx="2" fill="#D9A066"/>' +
    '<path d="M62,150 L62,100 Q62,90 75,86 L125,86 Q138,90 138,100 L138,150 Z" fill="#1A1A1A"/>' +
    '<ellipse cx="58" cy="100" rx="14" ry="18" fill="#1A1A1A"/>' +
    '<ellipse cx="142" cy="100" rx="14" ry="18" fill="#1A1A1A"/>' +
    '<polygon points="78,88 92,88 100,152 90,152" fill="#F4C542"/>' +
    '<polygon points="122,88 108,88 100,152 110,152" fill="#F4C542"/>' +
    '<path d="M60,150 L140,150 L165,260 L35,260 Z" fill="#C1272D"/>' +
    '<polygon points="55.45,170 144.55,170 146.36,178 53.64,178" fill="#1A1A1A"/>' +
    '<polygon points="49.77,195 150.23,195 152.05,203 47.95,203" fill="#1A1A1A"/>' +
    '<polygon points="44.09,220 155.91,220 157.73,228 42.27,228" fill="#1A1A1A"/>' +
    '<polygon points="38.41,245 161.59,245 163.41,253 36.59,253" fill="#1A1A1A"/>' +
    '<path d="M55,146 L145,146 L148,160 L52,160 Z" fill="#FFFDF8"/>' +
    '<line x1="55" y1="146.5" x2="145" y2="146.5" stroke="#F4C542" stroke-width="1"/>' +
    '<polygon points="126,158 138,158 132,182" fill="#E58AA0"/>' +
    '<line x1="126" y1="158" x2="138" y2="158" stroke="#B5502C" stroke-width="2"/>' +
    '<path d="M94,88 L106,88 L104,235 Q100,242 96,235 Z" fill="#1A1A1A"/>' +
    '<line x1="97" y1="100" x2="103" y2="100" stroke="#3A3A3A" stroke-width="2"/>' +
    '<line x1="97" y1="130" x2="103" y2="130" stroke="#3A3A3A" stroke-width="2"/>' +
    '<line x1="96.5" y1="160" x2="103.5" y2="160" stroke="#3A3A3A" stroke-width="2"/>' +
    '<line x1="96" y1="190" x2="104" y2="190" stroke="#3A3A3A" stroke-width="2"/>' +
    '<line x1="96" y1="215" x2="104" y2="215" stroke="#3A3A3A" stroke-width="2"/>' +
    '<rect x="94" y="228" width="12" height="6" rx="3" fill="#F4C542"/>' +
    '<path d="M64,105 L84,140 L92,146 L70,110 Z" fill="#D9A066"/>' +
    '<path d="M136,105 L116,140 L108,146 L130,110 Z" fill="#D9A066"/>' +
    '<path d="M100,126 Q86,130 84,148 Q84,160 100,163 Q116,160 116,148 Q114,130 100,126 Z" fill="#D9A066"/>' +
    '<line x1="100" y1="128" x2="100" y2="161" stroke="#B8794A" stroke-width="1.5"/>' +
    '<path d="M90,132 Q88,124 92,120" stroke="#B8794A" stroke-width="2" fill="none" stroke-linecap="round"/>' +
    '<path d="M110,132 Q112,124 108,120" stroke="#B8794A" stroke-width="2" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="78" cy="132" rx="9" ry="3" fill="none" stroke="#FFFFFF" stroke-width="3"/>' +
    '<ellipse cx="78" cy="137" rx="9" ry="3" fill="none" stroke="#9FCBDB" stroke-width="3"/>' +
    '<ellipse cx="78" cy="142" rx="9" ry="3" fill="none" stroke="#B9A6DC" stroke-width="3"/>' +
    '<ellipse cx="122" cy="132" rx="9" ry="3" fill="none" stroke="#FFFFFF" stroke-width="3"/>' +
    '<ellipse cx="122" cy="137" rx="9" ry="3" fill="none" stroke="#9FCBDB" stroke-width="3"/>' +
    '<ellipse cx="122" cy="142" rx="9" ry="3" fill="none" stroke="#B9A6DC" stroke-width="3"/>' +
    "</svg>";

  // Tighter head-only crop of the same character (hair, face, bindi, eyes,
  // smile, blush, earrings, neck), for the chat panel header.
  var AVATAR_SVG =
    '<svg viewBox="55 8 90 92" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M66,70 Q62,20 100,14 Q138,20 134,70 L134,95 Q100,110 66,95 Z" fill="#1A1A1A"/>' +
    '<ellipse cx="100" cy="55" rx="27" ry="32" fill="#D9A066"/>' +
    '<circle cx="100" cy="42" r="3" fill="#C1272D"/>' +
    '<ellipse cx="87" cy="52" rx="3.5" ry="5" fill="#1A1A1A"/>' +
    '<ellipse cx="113" cy="52" rx="3.5" ry="5" fill="#1A1A1A"/>' +
    '<path d="M86,64 Q100,76 114,64" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="78" cy="62" rx="8" ry="5" fill="#B5502C" opacity="0.25"/>' +
    '<ellipse cx="122" cy="62" rx="8" ry="5" fill="#B5502C" opacity="0.25"/>' +
    '<circle cx="73" cy="68" r="7" fill="none" stroke="#F4C542" stroke-width="3"/>' +
    '<circle cx="127" cy="68" r="7" fill="none" stroke="#F4C542" stroke-width="3"/>' +
    '<rect x="90" y="82" width="20" height="14" rx="2" fill="#D9A066"/>' +
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
