/* =========================================
   BOOSTPRO - MAIN JAVASCRIPT
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

        const cardText =
          card.textContent.toLowerCase();

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

    if (!platform || !service || !quantity || !priceDisplay) {
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
     4. PASSWORD CONFIRMATION
  ========================================= */

  const signupForm = document.querySelector(
    'form[action="dashboard.html"]'
  );

  const password =
    document.getElementById("password");

  const confirmPassword =
    document.getElementById("confirmPassword");

  if (
    signupForm &&
    password &&
    confirmPassword
  ) {

    signupForm.addEventListener("submit", function (event) {

      if (
        password.value !==
        confirmPassword.value
      ) {

        event.preventDefault();

        alert("Passwords do not match. Please try again.");

        confirmPassword.focus();
      }

    });

  }


  /* =========================================
     5. SMOOTH SCROLLING
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      if (
        targetId &&
        targetId !== "#"
      ) {

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
     6. ORDER BUTTON FEEDBACK
  ========================================= */

  const orderButtons =
    document.querySelectorAll(".order-btn");

  orderButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      if (
        this.getAttribute("href") === "#"
      ) {

        alert(
          "Please select a service and place your order."
        );

      }

    });

  });


  /* =========================================
     7. SAVE PROFILE FEEDBACK
  ========================================= */

  const profileForms =
    document.querySelectorAll(
      'form[action="#"]'
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
     8. WELCOME MESSAGE
  ========================================= */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop();

  if (
    currentPage === "dashboard.html"
  ) {

    console.log(
      "Welcome to your BoostPro Dashboard 🚀"
    );

  }


  /* =========================================
     9. CURRENT YEAR
  ========================================= */

  const yearElements =
    document.querySelectorAll(".current-year");

  yearElements.forEach(function (element) {

    element.textContent =
      new Date().getFullYear();

  });


  /* =========================================
     10. BUTTON LOADING EFFECT
  ========================================= */

  document.querySelectorAll(
    ".login-btn, .signup-btn, .submit-btn"
  ).forEach(function (button) {

    button.addEventListener("click", function () {

      const form =
        this.closest("form");

      if (
        form &&
        form.checkValidity()
      ) {

        this.textContent = "Processing...";

        this.style.opacity = "0.8";

      }

    });

  });

});
