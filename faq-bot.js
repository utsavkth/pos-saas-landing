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

  /* ---- Matching engine ---------------------------------------------------
     Still no AI, no backend, no cost -- see the Notion tracker for why that
     was chosen over a paid API. Everything below runs in the visitor's own
     browser off the FAQ list above. The aim is to get as close to "it
     actually understood me" as plain JS honestly can.

     Four things it does that keyword matching alone didn't:

     1. It searches the FULL text of every entry -- keywords, question and
        answer, weighted in that order -- not just the hand-written keyword
        list. So "lentils" or "camera" finds the features entry even though
        nobody thought to list them as keywords. Rare words count for more
        than common ones (standard IDF weighting): "offline" appears in one
        entry and is highly diagnostic, "shop" appears in half of them and
        tells us nothing, and the scoring reflects that on its own without
        anyone maintaining a list of which words matter.

     2. It normalises how people actually type. Romanised Nepali ("kati
        parcha", "kasari", "chalcha") folds onto the same canonical term as
        the English and Devanagari equivalents, along with ordinary synonyms
        (rate/charge/fee -> cost, esewa/khalti/fonepay -> qr), filler words
        are dropped from both sides, and the old prefix/one-typo tolerance is
        kept for everything else.

     3. It knows when it doesn't know. Scores come out as a 0-1 confidence,
        so there are three outcomes instead of one: confident -> answer;
        unsure -> answer but say so and offer alternatives; lost -> stop
        guessing, apologise, and show the closest questions as tappable
        chips. The old version always answered its single best guess no
        matter how weak the evidence was, which is how you get a confident
        answer about pricing to someone asking about receipt printers.

     4. It handles more than one question at a time ("how much is it and does
        it work offline?") by scoring each clause separately, and follows
        every answer with the most related questions -- computed from term
        overlap between entries, not a hand-maintained list, so a new FAQ
        added above wires itself into the suggestions with no extra work.
  */

  // Filler that carries no signal for choosing between 15 entries. Stripped
  // from the query and the index alike. Nepali particles included both in
  // Devanagari and in the Romanised form people type on a phone keyboard.
  var STOPWORDS = {};
  ("a an and any are as at be been but by can could did do does doing for from " +
   "give go had has have how i if in into is it just like me my need no not of on " +
   "one or our out own please should so some tell that the their them then there " +
   "than these they this to too us use used using want was we well what when where " +
   "which who why will with would you your " +
   "cha chha ho hola hos huncha hunchha ka ki ko kura lai le ma mero na ni pani " +
   "ra ta tapai tapain timi yo tyo " +
   "छ छन् हो हुन् को का की मा मेरो ले लाई र नि पनि यो त्यो के कुरा गर्न गर्ने हुन्छ म तपाईं")
    .split(/\s+/).forEach(function (w) { if (w) STOPWORDS[w] = true; });

  // Multi-word forms collapsed before tokenizing, so "how much" becomes the
  // same single term as "price" rather than two throwaway stopwords.
  var PHRASES = [
    [/\bhow much\b/g, " cost "],
    [/\bpoint of sale\b/g, " pos "],
    [/\bsign ?up\b/g, " signup "],
    [/\bset ?up\b/g, " setup "],
    [/\blog ?in\b/g, " login "],
    [/\bbar ?code\b/g, " barcode "],
    [/\bwi ?-? ?fi\b/g, " wifi "],
    [/\bfree trial\b/g, " trial "],
    [/\bcredit card\b/g, " payment "],
    [/\bkati (parcha|parxa|padcha|paisa)\b/g, " cost "],
    [/\b(kasari|kasary)\b/g, " how "],
    [/\b(chalcha|chalxa|chalchha)\b/g, " work "],
    [/\b(milcha|milxa|milchha)\b/g, " work "]
  ];

  // Words that mean the same thing to this bot, collapsed onto one canonical
  // term. Both the query and the index run through this, so a Devanagari
  // question can match an English-only answer and vice versa -- which matters
  // here, because the answers are written in both languages but visitors
  // routinely mix scripts in a single sentence.
  var SYNONYM_GROUPS = {
    cost: ["price", "prices", "pricing", "costs", "much", "rate", "rates", "charge", "charges", "fee",
           "fees", "expensive", "cheap", "afford", "affordable", "budget", "paisa", "mulya",
           "mullya", "dam", "kati", "मूल्य", "पैसा", "कति", "दाम", "शुल्क"],
    hardware: ["device", "devices", "machine", "machines", "equipment", "gadget", "phone",
               "phones", "mobile", "tablet", "tablets", "laptop", "computer", "ipad", "iphone",
               "android", "हार्डवेयर", "उपकरण", "फोन", "मोबाइल", "ट्याब्लेट", "ल्यापटप"],
    scanner: ["scan", "scans", "scanning", "scanner", "scanners", "barcode", "barcodes",
              "camera", "स्क्यान", "बारकोड", "क्यामेरा"],
    internet: ["offline", "online", "wifi", "net", "network", "connection", "connectivity",
               "इन्टरनेट", "अनलाइन", "अफलाइन", "वाइफाइ", "नेटवर्क", "कनेक्सन"],
    privacy: ["private", "secure", "security", "safe", "safety", "confidential", "hack",
              "hacked", "leak", "surakshit", "gopya", "सुरक्षित", "गोप्य", "निजी"],
    data: ["डेटा", "डाटा"],
    staff: ["employee", "employees", "worker", "workers", "cashier", "cashiers", "counter",
            "counters", "स्टाफ", "कर्मचारी", "क्यासियर", "काउन्टर"],
    support: ["help", "helps", "assistance", "assist", "contact", "reach", "सहयोग", "सम्पर्क", "मद्दत"],
    language: ["nepali", "english", "devanagari", "bilingual", "bhasa", "bhasha", "भाषा",
               "नेपाली", "अंग्रेजी", "द्विभाषी"],
    setup: ["install", "installation", "installing", "onboarding", "training", "train",
            "teach", "configure", "सेटअप", "तालिम", "इन्स्टलेसन", "सिकाउने"],
    trial: ["demo", "try", "trying", "test", "testing", "sample", "ट्राइल", "डेमो", "परीक्षण", "जाँच्ने"],
    transfer: ["import", "export", "csv", "excel", "spreadsheet", "migrate", "migration",
               "upload", "notebook", "इम्पोर्ट", "सार्न", "सारिने", "कापी"],
    stock: ["inventory", "goods", "item", "items", "product", "products", "samaan", "स्टक",
            "सामान", "प्रोडक्ट", "मौज्दात"],
    report: ["reports", "reporting", "analytics", "रिपोर्ट", "हिसाब"],
    feature: ["features", "capability", "capabilities", "functionality", "function",
              "functions", "फिचर", "सुविधा"],
    qr: ["fonepay", "esewa", "khalti", "wallet", "upi", "क्यूआर", "फोनपे", "इसेवा", "खल्ती"],
    payment: ["payments", "pay", "paying", "paid", "cash", "भुक्तानी", "तिर्न", "पेमेन्ट", "नगद"],
    plan: ["plans", "package", "packages", "tier", "tiers", "subscription", "प्लान", "योजना"],
    shop: ["shops", "store", "stores", "business", "dukan", "pasal", "mart", "kirana",
           "grocery", "पसल", "व्यवसाय", "किराना"],
    signup: ["register", "registration", "join", "enroll", "start", "started", "begin", "दर्ता", "सुरु"],
    sale: ["sales", "selling", "sell", "bill", "billing", "invoice", "receipt", "बिक्री", "बिल", "रसिद"],
    weight: ["weighing", "weighed", "kg", "kilo", "kilogram", "loose", "bulk", "तौल", "किलो", "खुद्रा"],
    account: ["accounts", "login", "logins", "password", "खाता", "लगइन"]
  };

  var CANONICAL = {};
  Object.keys(SYNONYM_GROUPS).forEach(function (canon) {
    CANONICAL[canon] = canon;
    SYNONYM_GROUPS[canon].forEach(function (variant) { CANONICAL[variant] = canon; });
  });

  // \p{M} matters here: Devanagari vowel signs and the virama are combining
  // MARKS, not letters, so a letters-only class chopped "नमस्ते" into "नमस"
  // + "त" and "चल्छ" into "चल" + "छ". Matching still mostly worked because
  // both sides of the comparison were mangled the same way, but the pieces
  // were meaningless as terms -- and anything matching a whole Nepali word
  // (the small-talk list below) never fired at all.
  function tokenize(text) {
    return text.toLowerCase().match(/[\p{L}\p{N}\p{M}]+/gu) || [];
  }

  // Query text and indexed text both go through this, so the two sides always
  // agree on what a word "is". Returns canonical, de-duplicated terms.
  function normalize(text) {
    var lowered = " " + String(text).toLowerCase() + " ";
    PHRASES.forEach(function (p) { lowered = lowered.replace(p[0], p[1]); });
    var out = [];
    var seen = {};
    tokenize(lowered).forEach(function (raw) {
      if (STOPWORDS[raw]) return;
      var term = CANONICAL[raw] || raw;
      if (STOPWORDS[term] || term.length < 2 || seen[term]) return;
      seen[term] = true;
      out.push(term);
    });
    return out;
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

  // Levenshtein doesn't see a swapped pair of letters as one mistake -- "cots"
  // for "cost" scores 2 and gets rejected, even though it's a single slip of
  // the fingers and about the most likely typo anyone will make on this site.
  // Checking transposition separately is cheaper than a full Damerau table.
  function withinOneTransposition(a, b) {
    if (a.length !== b.length) return false;
    var diff = [];
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        diff.push(i);
        if (diff.length > 2) return false;
      }
    }
    return diff.length === 2 && diff[1] === diff[0] + 1 &&
      a[diff[0]] === b[diff[1]] && a[diff[1]] === b[diff[0]];
  }

  function isNearMiss(a, b) {
    return withinEditDistanceOne(a, b) || withinOneTransposition(a, b);
  }

  // ---- Index -------------------------------------------------------------
  // Built once at load from the FAQ list itself. Every entry becomes a bag of
  // canonical terms with the weight of the strongest field each appeared in,
  // so a word the author deliberately listed as a keyword outranks the same
  // word happening to occur in prose.
  var FIELD_WEIGHT = { keyword: 3, question: 2, answer: 1 };
  var MAX_FIELD_WEIGHT = 3;
  var DOC_COUNT = FAQS.length;
  var DF = {};   // term -> number of entries containing it

  FAQS.forEach(function (faq) {
    var terms = {};
    function add(text, weight) {
      normalize(text).forEach(function (t) {
        if (!terms[t] || terms[t] < weight) terms[t] = weight;
      });
    }
    faq.keywords.forEach(function (kw) { add(kw, FIELD_WEIGHT.keyword); });
    add(faq.q.en, FIELD_WEIGHT.question);
    add(faq.q.ne, FIELD_WEIGHT.question);
    add(faq.a.en, FIELD_WEIGHT.answer);
    add(faq.a.ne, FIELD_WEIGHT.answer);
    faq.terms = terms;
    // Multi-word keywords kept as term lists for the phrase bonus below.
    // Ones that reduce to nothing (e.g. "के हो", all particles) are dropped --
    // an empty list would otherwise vacuously "match" every single query.
    faq.phrases = faq.keywords.map(normalize).filter(function (w) { return w.length > 1; });
    Object.keys(terms).forEach(function (t) { DF[t] = (DF[t] || 0) + 1; });
  });

  // Everything a typed word is allowed to be a near-miss of: the indexed
  // terms themselves, plus every synonym spelling that leads to one. Without
  // the second half, a typo in a word that only exists as a synonym ("pricce",
  // "offlien") resolves to nothing -- the canonical form it would have mapped
  // to is the only thing in the index, and it looks nothing like what was
  // typed. Each entry carries the term it ultimately resolves to.
  var VOCAB = Object.keys(DF);
  var FUZZY_VOCAB = (function () {
    var resolvesTo = {};
    VOCAB.forEach(function (term) { resolvesTo[term] = term; });
    Object.keys(CANONICAL).forEach(function (variant) {
      var canon = CANONICAL[variant];
      if (DF[canon] && !resolvesTo[variant]) resolvesTo[variant] = canon;
    });
    return Object.keys(resolvesTo).map(function (word) {
      return { word: word, term: resolvesTo[word] };
    });
  })();

  function idf(term) {
    var df = DF[term] || 0;
    return df ? Math.log(1 + DOC_COUNT / df) : 0;
  }

  // A typed word that isn't in the vocabulary verbatim gets one chance to be
  // recognised as a plural/prefix form or a single-letter typo of something
  // that is. Confidence is discounted accordingly rather than treated as an
  // exact hit, so a fuzzy match can't outrank a real one.
  function resolveTerm(token) {
    if (DF[token]) return { term: token, quality: 1 };
    var best = null;
    FUZZY_VOCAB.forEach(function (entry) {
      var word = entry.word;
      var quality = 0;
      if (word.length >= 4 && token.indexOf(word) === 0) quality = 0.75;
      else if (token.length >= 4 && word.indexOf(token) === 0) quality = 0.75;
      // 4 rather than 5, so a one-letter slip in a short but load-bearing
      // word still lands: "cots" -> "cost" is the single most likely typo on
      // this whole site and the old 5-character floor missed it.
      else if (word.length >= 4 && isNearMiss(token, word)) quality = 0.6;
      if (!quality) return;
      if (!best || quality > best.quality ||
          (quality === best.quality && idf(entry.term) > idf(best.term))) {
        best = { term: entry.term, quality: quality };
      }
    });
    return best;
  }

  // Scores every entry against one piece of typed text, best first. The score
  // is normalised against the best any entry could possibly have done on this
  // particular query, which is what makes it comparable across questions --
  // a raw sum isn't, because a long query naturally accumulates more of it.
  function scoreAll(text) {
    var resolved = [];
    normalize(text).forEach(function (token) {
      var r = resolveTerm(token);
      if (r) resolved.push(r);
    });
    if (!resolved.length) return [];

    var ceiling = 0;
    resolved.forEach(function (r) { ceiling += idf(r.term) * MAX_FIELD_WEIGHT; });
    if (ceiling <= 0) return [];

    var scored = [];
    FAQS.forEach(function (faq) {
      var raw = 0, hits = 0;
      resolved.forEach(function (r) {
        var weight = faq.terms[r.term];
        if (!weight) return;
        hits++;
        raw += idf(r.term) * weight * r.quality;
      });
      if (!hits) return;
      // Same idea as the old phrase rule: every word of a multi-word keyword
      // present somewhere in the query (not necessarily adjacent) is strong
      // evidence, so it tops the score up. Capped, so an entry with lots of
      // long keywords can't win on bonus alone.
      var bonus = 0;
      faq.phrases.forEach(function (words) {
        var allPresent = words.every(function (w) {
          return resolved.some(function (r) { return r.term === w; });
        });
        if (allPresent) bonus += 0.1 * words.length;
      });
      scored.push({
        faq: faq,
        hits: hits,
        confidence: Math.min(1, raw / ceiling + Math.min(bonus, 0.3))
      });
    });
    return scored.sort(function (a, b) { return b.confidence - a.confidence; });
  }

  // Above CONFIDENT we answer flat out; between the two we answer but name
  // the question we think was asked and offer alternatives; below MAYBE we
  // stop guessing and just suggest. The gap between them is deliberately
  // wide -- a wrong answer delivered confidently costs more trust than an
  // honest "did you mean one of these?".
  var CONFIDENT = 0.5;
  var MAYBE = 0.22;

  function faqById(id) {
    var found = null;
    FAQS.forEach(function (faq) { if (faq.id === id) found = faq; });
    return found;
  }

  // Shown when there's nothing better to show. The three that come up first
  // in real conversations, in the order someone new to the product asks them.
  var POPULAR = ["what-is", "cost", "get-started"].map(faqById).filter(Boolean);

  // Not everything typed into a chat box is a question. Greeting someone back
  // costs nothing and is the difference between "this is a search box wearing
  // a costume" and something worth talking to. The identity answer is
  // deliberately honest -- it is not a person and shouldn't imply it is.
  var SMALLTALK = {
    greeting: {
      words: ["hi", "hello", "hey", "yo", "namaste", "namaskar", "नमस्ते", "नमस्कार", "greetings"],
      reply: { en: "Namaste! Ask me anything about Khatiwada POS, or tap one of these:",
               ne: "नमस्ते! खटीवाडा POS को बारेमा जे पनि सोध्नुहोस्, वा यीमध्ये एउटा छान्नुहोस्:" }
    },
    thanks: {
      words: ["thanks", "thank", "thankyou", "thx", "dhanyabad", "dhanyabaad", "धन्यवाद"],
      reply: { en: "Any time! Anything else you'd like to know?",
               ne: "स्वागत छ! अरू केही जान्न चाहनुहुन्छ?" }
    },
    identity: {
      words: ["robot", "bot", "ai", "human", "person", "machine"],
      reply: { en: "I'm a little helper on this page, not a person. I answer from a fixed list of questions. Anything I can't cover, the Contact page goes to a real human who reads every message.",
               ne: "म यो पेजको सानो सहयोगी हुँ, मान्छे होइन। तयार पारिएका प्रश्नहरूबाट जवाफ दिन्छु। मैले नभ्याएको कुरा Contact पेजबाट सोध्नुहोस्, त्यहाँ साँच्चैको मान्छेले हरेक सन्देश पढ्छ।" }
    }
  };

  // Only fires when the message is nothing BUT small talk -- "thanks, and how
  // much does it cost?" is a real question that happens to be polite, and
  // should be answered as one.
  function matchSmallTalk(input) {
    var terms = normalize(input);
    if (!terms.length) return null;
    var hit = null;
    var allSmallTalk = terms.every(function (term) {
      var found = null;
      Object.keys(SMALLTALK).forEach(function (kind) {
        if (SMALLTALK[kind].words.indexOf(term) !== -1) found = kind;
      });
      if (found) hit = hit || found;
      return !!found;
    });
    return allSmallTalk ? SMALLTALK[hit] : null;
  }

  // "how much is it and does it work offline?" is two questions. Splitting on
  // sentence and clause boundaries lets each half be scored on its own; the
  // whole string is still scored too, and the split only wins if it turns up
  // a second, different, genuinely confident answer.
  function splitClauses(text) {
    return text.split(/[?।;]+|\band\b|\balso\b|\bor\b|\bra\b|\bani\b| र | अनि |,/i)
      .map(function (part) { return part.trim(); })
      .filter(function (part) { return part.length > 2; });
  }

  // The one entry point the UI uses. Returns what to do, not just what
  // matched: { kind: "confident" | "maybe" | "none", faqs, alternatives }.
  function matchFaq(input) {
    var overall = scoreAll(input);
    var top = overall[0];

    var clauses = splitClauses(input);
    if (clauses.length > 1) {
      var picked = [];
      var pickedIds = {};
      clauses.forEach(function (clause) {
        var best = scoreAll(clause)[0];
        if (best && best.confidence >= CONFIDENT && !pickedIds[best.faq.id]) {
          pickedIds[best.faq.id] = true;
          picked.push(best.faq);
        }
      });
      if (picked.length > 1) {
        return { kind: "confident", faqs: picked.slice(0, 3), alternatives: [] };
      }
    }

    if (!top || top.confidence < MAYBE) {
      var closest = overall.slice(0, 3).map(function (s) { return s.faq; });
      return {
        kind: "none",
        faqs: [],
        // A question that overlapped with nothing at all ("do you deliver to
        // Pokhara?") leaves no closest matches to offer, and a bare "I don't
        // know" is a dead end. Fall back to the three questions most people
        // are actually here for.
        alternatives: closest.length ? closest : POPULAR
      };
    }

    return {
      kind: top.confidence >= CONFIDENT ? "confident" : "maybe",
      faqs: [top.faq],
      alternatives: overall.slice(1, 3)
        .filter(function (s) { return s.confidence >= MAYBE / 2; })
        .map(function (s) { return s.faq; })
    };
  }

  // ---- Related questions --------------------------------------------------
  // Cosine similarity over the same weighted term vectors, computed once at
  // load. This is what powers the follow-up chips after each answer, and it
  // maintains itself: add a FAQ to the list at the top of this file and it
  // starts appearing under the entries it actually relates to, with no
  // hand-written "see also" table to keep in sync.
  function vectorLength(terms) {
    var sum = 0;
    Object.keys(terms).forEach(function (t) {
      var v = idf(t) * terms[t];
      sum += v * v;
    });
    return Math.sqrt(sum) || 1;
  }

  FAQS.forEach(function (faq) { faq.norm = vectorLength(faq.terms); });

  FAQS.forEach(function (faq) {
    faq.related = FAQS
      .filter(function (other) { return other !== faq; })
      .map(function (other) {
        var dot = 0;
        Object.keys(faq.terms).forEach(function (t) {
          if (other.terms[t]) dot += idf(t) * faq.terms[t] * idf(t) * other.terms[t];
        });
        return { faq: other, score: dot / (faq.norm * other.norm) };
      })
      .filter(function (s) { return s.score > 0.04; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 3)
      .map(function (s) { return s.faq; });
  });

  // ---- Missed questions ---------------------------------------------------
  // Anything the matcher gave up on is kept locally (last 40, this browser
  // only, never sent anywhere) so the FAQ list can be grown from what people
  // genuinely asked instead of what we guessed they'd ask. Read it from the
  // console with KhatiwadaFaqBot.misses().
  var MISS_KEY = "khatiwada_faq_misses";

  function readMisses() {
    try { return JSON.parse(localStorage.getItem(MISS_KEY)) || []; }
    catch (e) { return []; }
  }

  function logMiss(question) {
    try {
      var misses = readMisses();
      misses.push({ q: question, at: new Date().toISOString() });
      localStorage.setItem(MISS_KEY, JSON.stringify(misses.slice(-40)));
    } catch (e) {}
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
          '<span class="faq-bot-sub" data-en="Tap a question, or type your own" data-ne="प्रश्न छान्नुहोस्, वा आफैं लेख्नुहोस्">Tap a question, or type your own</span>' +
        "</span>" +
        '<button id="faq-bot-close" type="button" aria-label="Close">&times;</button>' +
      "</div>" +
      '<div id="faq-bot-messages"></div>' +
      // The full question list is a disclosure now, not a permanent fixture.
      // It opens expanded (that's how a first-time visitor discovers what can
      // be asked) and folds away once the conversation starts, handing its
      // room back to the transcript -- see setMenuOpen below.
      '<button id="faq-bot-menu-toggle" type="button" aria-expanded="true" ' +
        'aria-controls="faq-bot-menu" data-en="All questions" data-ne="सबै प्रश्नहरू">All questions</button>' +
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
    var menuToggle = panel.querySelector("#faq-bot-menu-toggle");
    var inputForm = panel.querySelector("#faq-bot-input-form");
    var inputEl = panel.querySelector("#faq-bot-input");
    var greeted = false;

    // Accepts either a plain string, or a {en, ne} pair. A pair gets
    // data-en/data-ne attributes, so the site's existing language-toggle
    // mechanism (script.js's applyLang, which re-queries every [data-en]
    // element on each toggle) keeps it updated automatically -- including
    // messages already sent before the visitor switched languages.
    // forceLang answers in the language the visitor actually typed in, even
    // if the site is currently set to the other one -- someone typing
    // Devanagari into an English page wants a Nepali answer back. Both
    // data-en/data-ne are still set, so the next language toggle re-syncs
    // this message with the rest of the site as usual.
    function addMessage(textOrPair, who, forceLang) {
      var el = document.createElement("div");
      el.className = "faq-bot-msg " + who;
      if (typeof textOrPair === "object") {
        el.setAttribute("data-en", textOrPair.en);
        el.setAttribute("data-ne", textOrPair.ne);
        el.textContent = textOrPair[forceLang || lang()];
      } else {
        el.textContent = textOrPair;
      }
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return el;
    }

    function makeChip(faq, onPick) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "faq-bot-chip";
      chip.setAttribute("data-en", faq.q.en);
      chip.setAttribute("data-ne", faq.q.ne);
      chip.textContent = faq.q[lang()];
      chip.addEventListener("click", function () { onPick(faq); });
      return chip;
    }

    // A bot message that carries tappable questions with it. The intro text
    // goes in its own [data-en] span rather than on the message div, because
    // script.js's applyLang sets textContent on every [data-en] element it
    // finds -- putting it on the parent would wipe the chips on the first
    // language toggle.
    // alwaysShow keeps the intro line when there's nothing left to suggest --
    // right for a reply that has to say something back (small talk), wrong for
    // follow-ups, where an empty "people usually ask this next:" with no
    // questions under it is just noise.
    function addSuggestions(faqs, introPair, forceLang, alwaysShow) {
      if (!faqs.length && !alwaysShow) return;
      var el = document.createElement("div");
      el.className = "faq-bot-msg bot";

      var intro = document.createElement("span");
      intro.setAttribute("data-en", introPair.en);
      intro.setAttribute("data-ne", introPair.ne);
      intro.textContent = introPair[forceLang || lang()];
      el.appendChild(intro);

      var list = document.createElement("div");
      list.className = "faq-bot-suggest";
      faqs.forEach(function (faq) {
        list.appendChild(makeChip(faq, function (picked) {
          addMessage(picked.q, "user");
          answer(picked);
          collapseMenuOnFirstQuestion();
        }));
      });
      el.appendChild(list);

      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    // Every entry answered this session, so follow-up chips never offer
    // something the visitor has already been told, and every entry already
    // put forward as a suggestion, so they don't get offered on repeat.
    var answered = {};
    var suggested = {};

    var FOLLOW_UP = {
      en: "People usually ask this next:",
      ne: "यसपछि प्रायः यो सोधिन्छ:"
    };
    var TRY_THESE = {
      en: "Closest I've got:",
      ne: "मसँग भएका नजिकका प्रश्नहरू:"
    };
    var NOT_IT = {
      en: "Not what you meant? Try one of these:",
      ne: "यो होइन? यीमध्ये एउटा हेर्नुहोस्:"
    };

    // skipFollowUps is for the middle of a multi-part reply -- suggestions
    // sandwiched between two answers read as if the second answer belongs to
    // them. They come once, at the end.
    function answer(faq, forceLang, skipFollowUps) {
      addMessage(faq.a, "bot", forceLang);
      answered[faq.id] = true;
      if (skipFollowUps) return;
      var unanswered = (faq.related || []).filter(function (f) { return !answered[f.id]; });
      // Offering the same untaken suggestion after every answer reads like the
      // bot is nagging. Prefer ones not put forward yet, and only repeat when
      // there's nothing fresh left to offer.
      var fresh = unanswered.filter(function (f) { return !suggested[f.id]; });
      var follow = (fresh.length ? fresh : unanswered).slice(0, 2);
      follow.forEach(function (f) { suggested[f.id] = true; });
      addSuggestions(follow, FOLLOW_UP, forceLang);
    }

    function setMenuOpen(open) {
      panel.classList.toggle("menu-open", open);
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    // The full list is worth its space right up until the visitor has asked
    // something -- after that the transcript is the thing they're reading, and
    // a 15-item menu sitting under it was taking nearly half the panel to show
    // four questions behind a second scrollbar. Folding it away is what gives
    // the conversation room to breathe; the toggle brings it straight back.
    function collapseMenuOnFirstQuestion() {
      if (panel.classList.contains("menu-open")) setMenuOpen(false);
    }

    menuToggle.addEventListener("click", function () {
      setMenuOpen(!panel.classList.contains("menu-open"));
      if (panel.classList.contains("menu-open")) menuEl.scrollTop = 0;
    });

    setMenuOpen(true);

    function renderMenu() {
      menuEl.innerHTML = "";
      FAQS.forEach(function (faq) {
        menuEl.appendChild(makeChip(faq, function (picked) {
          addMessage(picked.q, "user");
          answer(picked);
          collapseMenuOnFirstQuestion();
        }));
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

      if (!wasDrag) {
        // A plain tap, not a drag: open directly from here rather than
        // waiting for the browser's own "click" event. Chrome retargets
        // that click to #faq-bot-launcher instead of #faq-bot-open once
        // setPointerCapture has been called (confirmed live: the pointerup
        // and click events both report faq-bot-launcher as e.target, not
        // the button the visitor actually tapped), so openBtn's click
        // listener silently never fires and the chat never opens on a real
        // mouse/trackpad click. That's the actual current bug, distinct
        // from the two fixed earlier. Calling open() here sidesteps the
        // browser's click targeting entirely for pointer-driven taps; the
        // click listener on openBtn stays only as the path keyboard
        // activation (Tab + Enter/Space, which has no pointer events at
        // all) still needs, and open() is idempotent so no harm if both
        // somehow fire for the same interaction.
        open();
        return;
      }

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
      // after moving her does nothing, the second one works." That was a
      // second, separate bug from the click-retargeting one above.
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
      collapseMenuOnFirstQuestion();

      // Any Devanagari at all in the question is taken as "answer me in
      // Nepali" regardless of the site's current toggle. Romanised Nepali is
      // deliberately not treated the same way -- it's genuinely ambiguous,
      // and guessing wrong there is more annoying than just following the
      // site setting.
      var replyLang = /[ऀ-ॿ]/.test(typed) ? "ne" : null;

      var chat = matchSmallTalk(typed);
      if (chat) {
        addSuggestions(
          POPULAR.filter(function (f) { return !answered[f.id]; }).slice(0, 3),
          chat.reply,
          replyLang,
          true
        );
        return;
      }

      var result = matchFaq(typed);

      if (result.kind === "confident") {
        result.faqs.forEach(function (faq, i) {
          // Second and third answers to a multi-part question get a lead-in,
          // otherwise two answers in a row read as one rambling reply.
          if (i > 0) {
            addMessage({
              en: "And on “" + faq.q.en + "”:",
              ne: "अनि “" + faq.q.ne + "” को बारेमा:"
            }, "bot", replyLang);
          }
          answer(faq, replyLang, i < result.faqs.length - 1);
        });
        return;
      }

      if (result.kind === "maybe") {
        var faq = result.faqs[0];
        // Naming the question we landed on is the whole point of this branch:
        // the visitor can see the guess and correct it in one tap instead of
        // being left wondering whether the answer was even about their
        // question.
        addMessage({
          en: "I think you're asking about “" + faq.q.en + "”:",
          ne: "मलाई लाग्छ तपाईं “" + faq.q.ne + "” सोध्दै हुनुहुन्छ:"
        }, "bot", replyLang);
        addMessage(faq.a, "bot", replyLang);
        answered[faq.id] = true;
        addSuggestions(result.alternatives, NOT_IT, replyLang);
        return;
      }

      logMiss(typed);
      addMessage(FALLBACK_ANSWER, "bot", replyLang);
      addSuggestions(result.alternatives, TRY_THESE, replyLang);
    });
  }

  // Console handle for tuning: KhatiwadaFaqBot.test("kati parcha") shows what
  // the matcher scored and why, and .misses() lists the questions it couldn't
  // answer on this browser -- the shortlist for which FAQ entry to write next.
  window.KhatiwadaFaqBot = {
    test: function (text) { return matchFaq(text); },
    score: function (text) {
      return scoreAll(text).slice(0, 5).map(function (s) {
        return { id: s.faq.id, confidence: Math.round(s.confidence * 100) / 100 };
      });
    },
    smalltalk: matchSmallTalk,
    misses: readMisses,
    faqs: FAQS
  };

  document.addEventListener("DOMContentLoaded", build);
})();
