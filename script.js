/* =========================================
   DANNY HUB - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     1. MOBILE MENU
  ========================================= */

  const menuButton = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }


  /* =========================================
     2. SERVICE CATEGORY FILTER
  ========================================= */

  const categories = document.querySelectorAll(".category");
  const serviceCards = document.querySelectorAll(".service-card");

  categories.forEach(function (category) {

    category.addEventListener("click", function () {

      categories.forEach(function (item) {
        item.classList.remove("active");
      });

      category.classList.add("active");

      const selectedCategory =
        category.textContent.trim().toLowerCase();

      serviceCards.forEach(function (card) {

        const cardText = card.textContent.toLowerCase();

        if (
          selectedCategory === "all services" ||
          cardText.includes(selectedCategory)
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }

      });

    });

  });


  /* =========================================
     3. ORDER PRICE ESTIMATOR
  ========================================= */

  const platform = document.getElementById("platform");
  const service = document.getElementById("service");
  const quantity = document.getElementById("quantity");
  const priceDisplay = document.querySelector(".price");

  function calculatePrice() {

    if (!service || !quantity || !priceDisplay) {
      return;
    }

    const selectedService = service.value;
    const amount = Number(quantity.value);

    if (!selectedService || !amount || amount < 1) {
      priceDisplay.textContent = "₦0.00";
      return;
    }

    let pricePerUnit = 0;

    switch (selectedService) {

      case "followers":
        pricePerUnit = 0.75;
        break;

      case "likes":
        pricePerUnit = 0.25;
        break;

      case "views":
        pricePerUnit = 0.10;
        break;

      case "subscribers":
        pricePerUnit = 4.00;
        break;

      case "engagement":
        pricePerUnit = 1.20;
        break;

      default:
        pricePerUnit = 0;
    }

    const total = amount * pricePerUnit;

    priceDisplay.textContent =
      "₦" +
      total.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
  }

  if (service) {
    service.addEventListener("change", calculatePrice);
  }

  if (quantity) {
    quantity.addEventListener("input", calculatePrice);
  }


  /* =========================================
     4. SIGNUP / CREATE ACCOUNT
  ========================================= */

  const signupForm =
    document.getElementById("signupForm");

  if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const nameInput =
        document.getElementById("name");

      const emailInput =
        document.getElementById("email");

      const passwordInput =
        document.getElementById("password");

      const confirmPasswordInput =
        document.getElementById("confirmPassword");

      if (
        !nameInput ||
        !emailInput ||
        !passwordInput ||
        !confirmPasswordInput
      ) {
        alert("Please check your signup form fields.");
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        confirmPasswordInput.focus();
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        passwordInput.focus();
        return;
      }

      /* Save account */

      const account = {
        name: name,
        email: email,
        password: password
      };

      localStorage.setItem(
        "boostproAccount",
        JSON.stringify(account)
      );

      /* Save login status */

      localStorage.setItem(
        "boostproLoggedIn",
        "true"
      );

      alert(
        "Account created successfully! Welcome to BoostPro 🚀"
      );

      /* Go to dashboard */

      window.location.href = "dashboard.html";

    });

  }


  /* =========================================
     5. LOGIN
  ========================================= */

  const loginForm =
    document.getElementById("loginForm");

  if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const emailInput =
        document.getElementById("email");

      const passwordInput =
        document.getElementById("password");

      if (!emailInput || !passwordInput) {
        alert("Login form is missing required fields.");
        return;
      }

      const email =
        emailInput.value.trim().toLowerCase();

      const password =
        passwordInput.value;

      const savedAccount =
        localStorage.getItem("boostproAccount");

      if (!savedAccount) {
        alert("No BoostPro account found. Please create an account first.");
        return;
      }

      const account =
        JSON.parse(savedAccount);

      if (
        email === account.email &&
        password === account.password
      ) {

        localStorage.setItem(
          "boostproLoggedIn",
          "true"
        );

        alert("Login successful! 🚀");

        window.location.href =
          "dashboard.html";

      } else {

        alert(
          "Incorrect email or password."
        );

      }

    });

  }


  /* =========================================
     6. DASHBOARD USER NAME
  ========================================= */

  const savedAccount =
    localStorage.getItem("boostproAccount");

  if (savedAccount) {

    try {

      const account =
        JSON.parse(savedAccount);

      document.querySelectorAll(
        ".user-name, .profile-name"
      ).forEach(function (element) {

        element.textContent =
          account.name;

      });

    } catch (error) {

      console.log(
        "Unable to load account information."
      );

    }

  }


  /* =========================================
     7. SMOOTH SCROLLING
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      if (targetId && targetId !== "#") {

        const target =
          document.querySelector(targetId);

        if (target) {

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth"
          });

        }

      }

    });

  });


  /* =========================================
     8. ORDER BUTTON FEEDBACK
  ========================================= */

  document.querySelectorAll(".order-btn")
    .forEach(function (button) {

      button.addEventListener("click", function () {

        if (this.getAttribute("href") === "#") {

          alert(
            "Please select a service and place your order."
          );

        }

      });

    });


  /* =========================================
     9. PROFILE SAVE
  ========================================= */

  const profileForms =
    document.querySelectorAll(
      ".profile-form"
    );

  profileForms.forEach(function (form) {

    form.addEventListener("submit", function (event) {

      event.preventDefault();

      alert(
        "Your profile information has been saved successfully."
      );

    });

  });


  /* =========================================
     10. CURRENT YEAR
  ========================================= */

  document.querySelectorAll(".current-year")
    .forEach(function (element) {

      element.textContent =
        new Date().getFullYear();

    });


  /* =========================================
     11. LOGOUT
  ========================================= */

  const logoutButtons =
    document.querySelectorAll(".logout-btn");

  logoutButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      localStorage.removeItem(
        "boostproLoggedIn"
      );

      window.location.href =
        "login.html";

    });

  });

});
