(function () {
  "use strict";
  var modes = {
    login: document.getElementById("mode-login"),
    signup: document.getElementById("mode-signup"),
    forgot: document.getElementById("mode-forgot"),
    forceReset: document.getElementById("mode-force-reset")
  };

  function showMode(name) {
    Object.keys(modes).forEach(function (k) { modes[k].style.display = k === name ? "block" : "none"; });
  }

  function resetForgotMode() {
    document.getElementById("forgot-step1-wrap").style.display = "block";
    document.getElementById("forgot-step2-wrap").style.display = "none";
    document.getElementById("forgot-done-wrap").style.display = "none";
    document.getElementById("forgot-step1-form").reset();
    document.getElementById("forgot-step2-form").reset();
    pendingForgotEmail = null;
  }

  document.getElementById("go-signup").addEventListener("click", function () { showMode("signup"); });
  document.getElementById("go-forgot").addEventListener("click", function () { resetForgotMode(); showMode("forgot"); });
  document.getElementById("go-login-from-signup").addEventListener("click", function () { showMode("login"); });
  document.getElementById("back-from-forgot").addEventListener("click", function () { showMode("login"); });
  document.getElementById("back-from-forgot-step2").addEventListener("click", function () { showMode("login"); });
  document.getElementById("back-from-forgot-done").addEventListener("click", function () {
    resetForgotMode();
    showMode("login");
  });
  document.getElementById("back-from-signup-sent").addEventListener("click", function () {
    document.getElementById("signup-form-wrap").style.display = "block";
    document.getElementById("signup-sent-wrap").style.display = "none";
    showMode("login");
  });

  // Points at the pos-saas-accounts backend. On localhost (dev), that's a
  // separate port; everywhere else, a relative path. Caddy reverse-proxies
  // /login on the same origin to that backend, so no CORS is needed live.
  var ACCOUNTS_API_BASE =
    (location.hostname === "localhost" || location.hostname === "127.0.0.1")
      ? "http://127.0.0.1:5090"
      : "";

  var loginErrorEls = {
    invalid: document.getElementById("login-error-invalid"),
    suspended: document.getElementById("login-error-suspended"),
    network: document.getElementById("login-error-network")
  };

  function showLoginError(kind) {
    Object.keys(loginErrorEls).forEach(function (k) {
      loginErrorEls[k].style.display = k === kind ? "block" : "none";
    });
  }

  // Held only in memory, only long enough to call /change-password if the
  // account turns out to still be on a temp password, never stored, never
  // sent anywhere except that one follow-up request.
  var pendingReset = { username: null, currentPassword: null };

  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = e.target;
    var submitBtn = form.querySelector("button[type=submit]");
    showLoginError(null);
    submitBtn.disabled = true;

    var username = form.elements["store"].value;
    var password = form.elements["password"].value;
    var body = new FormData();
    body.append("username", username);
    body.append("password", password);

    fetch(ACCOUNTS_API_BASE + "/login", { method: "POST", body: body })
      .then(function (res) {
        return res.json().then(function (data) { return { status: res.status, data: data }; });
      })
      .then(function (result) {
        submitBtn.disabled = false;
        if (result.status !== 200) {
          showLoginError(result.status === 403 ? "suspended" : "invalid");
          return;
        }
        if (result.data.must_change_password) {
          pendingReset.username = username;
          pendingReset.currentPassword = password;
          showMode("forceReset");
          return;
        }
        window.location.href = result.data.redirect_url;
      })
      .catch(function () {
        submitBtn.disabled = false;
        showLoginError("network");
      });
  });

  var forceResetErrorEls = {
    mismatch: document.getElementById("force-reset-error-mismatch"),
    short: document.getElementById("force-reset-error-short"),
    network: document.getElementById("force-reset-error-network")
  };

  function showForceResetError(kind) {
    Object.keys(forceResetErrorEls).forEach(function (k) {
      forceResetErrorEls[k].style.display = k === kind ? "block" : "none";
    });
  }

  document.getElementById("force-reset-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = e.target;
    var submitBtn = form.querySelector("button[type=submit]");
    showForceResetError(null);

    var newPassword = form.elements["new_password"].value;
    var confirmPassword = form.elements["confirm_password"].value;
    if (newPassword.length < 8) {
      showForceResetError("short");
      return;
    }
    if (newPassword !== confirmPassword) {
      showForceResetError("mismatch");
      return;
    }

    submitBtn.disabled = true;
    var body = new FormData();
    body.append("username", pendingReset.username);
    body.append("current_password", pendingReset.currentPassword);
    body.append("new_password", newPassword);

    fetch(ACCOUNTS_API_BASE + "/change-password", { method: "POST", body: body })
      .then(function (res) {
        return res.json().then(function (data) { return { status: res.status, data: data }; });
      })
      .then(function (result) {
        submitBtn.disabled = false;
        if (result.status !== 200) {
          showForceResetError("network");
          return;
        }
        pendingReset.username = null;
        pendingReset.currentPassword = null;
        window.location.href = result.data.redirect_url;
      })
      .catch(function () {
        submitBtn.disabled = false;
        showForceResetError("network");
      });
  });

  // Held only in memory so step 2 can submit it alongside the code, never
  // stored, never sent anywhere except the one /reset-password request.
  var pendingForgotEmail = null;

  var forgotStep1ErrorEls = {
    network: document.getElementById("forgot-step1-error-network")
  };
  function showForgotStep1Error(kind) {
    Object.keys(forgotStep1ErrorEls).forEach(function (k) {
      forgotStep1ErrorEls[k].style.display = k === kind ? "block" : "none";
    });
  }

  document.getElementById("forgot-step1-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = e.target;
    var submitBtn = form.querySelector("button[type=submit]");
    showForgotStep1Error(null);
    submitBtn.disabled = true;

    var email = form.elements["email"].value;
    var body = new FormData();
    body.append("email", email);

    fetch(ACCOUNTS_API_BASE + "/forgot-password", { method: "POST", body: body })
      .then(function (res) {
        return res.json().then(function (data) { return { status: res.status, data: data }; });
      })
      .then(function (result) {
        submitBtn.disabled = false;
        if (result.status !== 200) {
          showForgotStep1Error("network");
          return;
        }
        pendingForgotEmail = email;
        document.getElementById("forgot-step1-wrap").style.display = "none";
        document.getElementById("forgot-step2-wrap").style.display = "block";
      })
      .catch(function () {
        submitBtn.disabled = false;
        showForgotStep1Error("network");
      });
  });

  var forgotStep2ErrorEls = {
    invalid: document.getElementById("forgot-step2-error-invalid"),
    suspended: document.getElementById("forgot-step2-error-suspended"),
    short: document.getElementById("forgot-step2-error-short"),
    network: document.getElementById("forgot-step2-error-network")
  };
  function showForgotStep2Error(kind) {
    Object.keys(forgotStep2ErrorEls).forEach(function (k) {
      forgotStep2ErrorEls[k].style.display = k === kind ? "block" : "none";
    });
  }

  document.getElementById("forgot-step2-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = e.target;
    var submitBtn = form.querySelector("button[type=submit]");
    showForgotStep2Error(null);

    var code = form.elements["code"].value;
    var newPassword = form.elements["new_password"].value;
    if (newPassword.length < 8) {
      showForgotStep2Error("short");
      return;
    }

    submitBtn.disabled = true;
    var body = new FormData();
    body.append("email", pendingForgotEmail);
    body.append("code", code);
    body.append("new_password", newPassword);

    fetch(ACCOUNTS_API_BASE + "/reset-password", { method: "POST", body: body })
      .then(function (res) {
        return res.json().then(function (data) { return { status: res.status, data: data }; });
      })
      .then(function (result) {
        submitBtn.disabled = false;
        if (result.status !== 200) {
          showForgotStep2Error(result.status === 403 ? "suspended" : "invalid");
          return;
        }
        pendingForgotEmail = null;
        document.getElementById("forgot-step2-wrap").style.display = "none";
        document.getElementById("forgot-done-wrap").style.display = "flex";
      })
      .catch(function () {
        submitBtn.disabled = false;
        showForgotStep2Error("network");
      });
  });

  var planOptions = document.querySelectorAll(".plan-option");
  var planInput = document.getElementById("signup-plan");
  planOptions.forEach(function (btn) {
    btn.addEventListener("click", function () {
      planOptions.forEach(function (b) { b.classList.remove("selected"); });
      btn.classList.add("selected");
      planInput.value = btn.getAttribute("data-plan");
    });
  });

  var slugPreview = document.getElementById("slug-preview");
  var slugValue = document.getElementById("slug-value");
  var storeInput = document.getElementById("signup-store");
  var contactNameInput = document.getElementById("signup-contact-name");
  var emailInput = document.getElementById("signup-email");
  var phoneInput = document.getElementById("signup-phone");
  var cityInput = document.getElementById("signup-city");
  var shopTypeInput = document.getElementById("signup-shop-type");
  var staffCountInput = document.getElementById("signup-staff-count");
  var posFamiliarityInput = document.getElementById("signup-pos-familiarity");
  var submitBtn = document.getElementById("signup-submit");
  var signupErrorEl = document.getElementById("signup-error");

  function updateSignupState() {
    var slug = window.slugify(storeInput.value);
    if (slug) {
      slugPreview.style.display = "block";
      slugValue.textContent = slug + ".khatiwadapos.com";
    } else {
      slugPreview.style.display = "none";
    }
    var disabled = !slug || !emailInput.value || !phoneInput.value;
    submitBtn.disabled = disabled;
    submitBtn.style.opacity = disabled ? "0.6" : "1";
  }

  [storeInput, emailInput, phoneInput].forEach(function (el) {
    el.addEventListener("input", updateSignupState);
  });
  updateSignupState();

  document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
    signupErrorEl.style.display = "none";
    submitBtn.disabled = true;
    var originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "...";

    var signupBody = new FormData();
    signupBody.append("store_name", storeInput.value);
    signupBody.append("requested_subdomain", window.slugify(storeInput.value) + ".khatiwadapos.com");
    signupBody.append("contact_name", contactNameInput.value);
    signupBody.append("phone", phoneInput.value);
    signupBody.append("email", emailInput.value);
    signupBody.append("city", cityInput.value);
    signupBody.append("shop_type", shopTypeInput.value);
    signupBody.append("staff_count", staffCountInput.value);
    signupBody.append("pos_familiarity", posFamiliarityInput.value);
    signupBody.append("plan", planInput.value);

    fetch(ACCOUNTS_API_BASE + "/signup-request", { method: "POST", body: signupBody })
      .then(function (res) {
        if (!res.ok) { throw new Error("request failed"); }
        document.getElementById("signup-form-wrap").style.display = "none";
        document.getElementById("signup-sent-wrap").style.display = "flex";
      }).catch(function () {
        submitBtn.textContent = originalBtnText;
        signupErrorEl.style.display = "block";
        updateSignupState();
      });
  });
})();
