// Points at the pos-saas-accounts backend. On localhost (dev), that's a
// separate port; everywhere else, a relative path. Caddy reverse-proxies
// /contact on the same origin to that backend, so no CORS is needed live.
var ACCOUNTS_API_BASE =
  (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "http://127.0.0.1:5090"
    : "";

var contactForm = document.getElementById("contact-form");
var contactErrorEl = document.getElementById("contact-error");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  contactErrorEl.style.display = "none";
  var submitBtn = contactForm.querySelector("button[type=submit]");
  var originalText = submitBtn.textContent;
  submitBtn.disabled = true;

  var body = new FormData(contactForm);
  fetch(ACCOUNTS_API_BASE + "/contact", { method: "POST", body: body })
    .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
    .then(function (result) {
      if (!result.ok) { throw new Error(result.data.error || "request failed"); }
      contactForm.style.display = "none";
      document.getElementById("contact-success").style.display = "flex";
    })
    .catch(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      contactErrorEl.style.display = "block";
    });
});
