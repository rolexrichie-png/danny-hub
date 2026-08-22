/* =========================================
   BOOSTPRO - MAIN JAVASCRIPT
   Version: 2.0
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     1. CONFIGURATION
  ========================================= */

  /*
    CHANGE THIS to the email you want to use
    as the BoostPro administrator.
  */
  const ADMIN_EMAIL = "pennyyise@gmail.com";

  /*
    Pages that require a normal user to be logged in.
  */
  const protectedPages = [
    "dashboard.html",
    "profile.html",
    "orders.html",
    "order.html"
  ];

  /*
    Change this filename if your admin page
    has a different name.
  */
  const adminPage = "admin.html";


  /* =========================================
     2. HELPER FUNCTIONS
  ========================================= */

  function getAccount() {

    const savedAccount =
      localStorage.getItem("boostproAccount");

    if (!savedAccount) {
      return null;
    }

    try {
      return JSON.parse(savedAccount);
    } catch (error) {
      console.error("Invalid account data.");
      return null;
    }
  }


  function isLoggedIn() {

    return (
      localStorage.getItem("boostproLoggedIn") === "true"
    );

  }


  function isAdmin() {

    const account = getAccount();

    if (!account || !account.email) {
      return false;
    }

    return (
      account.email.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase()
    );

  }


  function getCurrentPage() {

    return (
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase()
    );

  }


  /* =========================================
     3. PAGE SECURITY
  ========================================= */

  const currentPage = getCurrentPage();


  /*
    Protect normal user pages.
  */

  if (protectedPages.includes(currentPage)) {

    if (!isLoggedIn()) {

      alert(
        "Please log in to access your BoostPro account."
      );

      window.location.href = "login.html";

      return;
    }

  }


  /*
    Protect admin dashboard.
  */

  if (currentPage === adminPage) {

    if (!isLoggedIn()) {

      alert(
        "Admin login required."
      );

      window.location.href = "login.html";

      return;
    }


    if (!isAdmin()) {

      alert(
        "Access denied. You are not an administrator."
      );

      window.location.href = "dashboard.html";

      return;
    }

  }


  /* =========================================
     4. MOBILE MENU
  ========================================= */

  const menuButton =
    document.querySelector(".menu-btn");

  const navLinks =
    document.querySelector(".nav-links");


  if (menuButton && navLinks) {

    menuButton.addEventListener(
      "click",
      function () {

        navLinks.classList.toggle("active");

      }
    );

  }


  /* =========================================
     5. SERVICE CATEGORY FILTER
  ========================================= */

  const categories =
    document.querySelectorAll(".category");

  const serviceCards =
    document.querySelectorAll(".service-card");


  categories.forEach(function (category) {

    category.addEventListener(
      "click",
      function () {

        categories.forEach(function (item) {

          item.classList.remove("active");

        });


        category.classList.add("active");


        const selectedCategory =
          category.textContent
            .trim()
            .toLowerCase();


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

      }
    );

  });


  /* =========================================
     6. ORDER PRICE ESTIMATOR
  ========================================= */

  const platform =
    document.getElementById("platform");

  const service =
    document.getElementById("service");

  const quantity =
    document.getElementById("quantity");

  const priceDisplay =
    document.querySelector(".price");


  function calculatePrice() {

    if (
      !service ||
      !quantity ||
      !priceDisplay
    ) {
      return;
    }


    const selectedService =
      service.value;

    const amount =
      Number(quantity.value);


    if (
      !selectedService ||
      !amount ||
      amount < 1
    ) {

      priceDisplay.textContent =
        "₦0.00";

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


    const total =
      amount * pricePerUnit;


    priceDisplay.textContent =
      "₦" +
      total.toLocaleString(
        "en-NG",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      );

  }


  if (platform) {
    platform.addEventListener(
      "change",
      calculatePrice
    );
  }


  if (service) {
    service.addEventListener(
      "change",
      calculatePrice
    );
  }


  if (quantity) {
    quantity.addEventListener(
      "input",
      calculatePrice
    );
  }


  /* =========================================
     7. SIGNUP / CREATE ACCOUNT
  ========================================= */

  const signupForm =
    document.getElementById("signupForm");


  if (signupForm) {

    signupForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const nameInput =
          document.getElementById("name");

        const emailInput =
          document.getElementById("email");

        const passwordInput =
          document.getElementById("password");

        const confirmPasswordInput =
          document.getElementById(
            "confirmPassword"
          );


        if (
          !nameInput ||
          !emailInput ||
          !passwordInput ||
          !confirmPasswordInput
        ) {

          alert(
            "Please check your signup form."
          );

          return;
        }


        const name =
          nameInput.value.trim();

        const email =
          emailInput.value
            .trim()
            .toLowerCase();

        const password =
          passwordInput.value;

        const confirmPassword =
          confirmPasswordInput.value;


        if (
          !name ||
          !email ||
          !password ||
          !confirmPassword
        ) {

          alert(
            "Please fill in all fields."
          );

          return;
        }


        if (
          password !== confirmPassword
        ) {

          alert(
            "Passwords do not match."
          );

          confirmPasswordInput.focus();

          return;
        }


        if (password.length < 6) {

          alert(
            "Password must be at least 6 characters."
          );

          passwordInput.focus();

          return;
        }


        /*
          Check if account already exists.
        */

        const existingAccount =
          getAccount();


        if (
          existingAccount &&
          existingAccount.email &&
          existingAccount.email.toLowerCase() === email
        ) {

          alert(
            "An account with this email already exists."
          );

          return;
        }


        /*
          Create account.
        */

        const account = {

          name: name,

          email: email,

          password: password,

          role:
            email === ADMIN_EMAIL.toLowerCase()
              ? "admin"
              : "user"

        };


        localStorage.setItem(
          "boostproAccount",
          JSON.stringify(account)
        );


        localStorage.setItem(
          "boostproLoggedIn",
          "true"
        );


        alert(
          "Account created successfully! Welcome to BoostPro 🚀"
        );


        window.location.href =
          "dashboard.html";

      }
    );

  }


  /* =========================================
     8. LOGIN
  ========================================= */

  const loginForm =
    document.getElementById("loginForm");


  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const emailInput =
          document.getElementById("email");

        const passwordInput =
          document.getElementById("password");


        if (
          !emailInput ||
          !passwordInput
        ) {

          alert(
            "Login form is missing required fields."
          );

          return;
        }


        const email =
          emailInput.value
            .trim()
            .toLowerCase();

        const password =
          passwordInput.value;


        const account =
          getAccount();


        if (!account) {

          alert(
            "No BoostPro account found. Please create an account first."
          );

          return;
        }


        if (
          email === account.email.toLowerCase() &&
          password === account.password
        ) {

          localStorage.setItem(
            "boostproLoggedIn",
            "true"
          );


          /*
            Decide where to send the user.
          */

          if (
            email ===
            ADMIN_EMAIL.toLowerCase()
          ) {

            alert(
              "Admin login successful! 👑"
            );

            window.location.href =
              adminPage;

          } else {

            alert(
              "Login successful! 🚀"
            );

            window.location.href =
              "dashboard.html";

          }

        } else {

          alert(
            "Incorrect email or password."
          );

        }

      }
    );

  }


  /* =========================================
     9. DASHBOARD USER NAME
  ========================================= */

  const account =
    getAccount();


  if (account) {

    document.querySelectorAll(
      ".user-name, .profile-name"
    ).forEach(function (element) {

      element.textContent =
        account.name;

    });


    /*
      Display admin badge if applicable.
    */

    if (isAdmin()) {

      document.querySelectorAll(
        ".admin-name"
      ).forEach(function (element) {

        element.textContent =
          account.name;

      });

    }

  }


  /* =========================================
     10. SMOOTH SCROLLING
  ========================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          this.getAttribute("href");


        if (
          targetId &&
          targetId !== "#"
        ) {

          const target =
            document.querySelector(
              targetId
            );


          if (target) {

            event.preventDefault();


            target.scrollIntoView({
              behavior: "smooth"
            });

          }

        }

      }
    );

  });


  /* =========================================
     11. ORDER BUTTON FEEDBACK
  ========================================= */

  document.querySelectorAll(
    ".order-btn"
  ).forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        if (
          this.getAttribute("href") === "#"
        ) {

          alert(
            "Please select a service and place your order."
          );

        }

      }
    );

  });


  /* =========================================
     12. PROFILE SAVE
  ========================================= */

  const profileForms =
    document.querySelectorAll(
      ".profile-form"
    );


  profileForms.forEach(function (form) {

    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        alert(
          "Your profile information has been saved successfully."
        );

      }
    );

  });


  /* =========================================
     13. CURRENT YEAR
  ========================================= */

  document.querySelectorAll(
    ".current-year"
  ).forEach(function (element) {

    element.textContent =
      new Date().getFullYear();

  });


  /* =========================================
     14. LOGOUT
  ========================================= */

  const logoutButtons =
    document.querySelectorAll(
      ".logout-btn"
    );


  logoutButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function (event) {

        event.preventDefault();


        localStorage.removeItem(
          "boostproLoggedIn"
        );


        /*
          Keep account information saved
          so the user can log in again.
        */


        window.location.href =
          "login.html";

      }
    );

  });


  /* =========================================
     15. ADMIN-ONLY ELEMENTS
  ========================================= */

  /*
    Hide admin links from normal users.
  */

  document.querySelectorAll(
    ".admin-only"
  ).forEach(function (element) {

    if (!isAdmin()) {

      element.style.display =
        "none";

    }

  });


  /* =========================================
     16. ADMIN LOGOUT
  ========================================= */

  document.querySelectorAll(
    ".admin-logout"
  ).forEach(function (button) {

    button.addEventListener(
      "click",
      function (event) {

        event.preventDefault();


        localStorage.removeItem(
          "boostproLoggedIn"
        );


        window.location.href =
          "login.html";

      }
    );

  });

});    return (
      localStorage.getItem("boostproLoggedIn") === "true"
    );

  }


  function isAdmin() {

    const account = getAccount();

    if (!account || !account.email) {
      return false;
    }

    return (
      account.email.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase()
    );

  }


  function getCurrentPage() {

    return (
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase()
    );

  }


  /* =========================================
     3. PAGE SECURITY
  ========================================= */

  const currentPage = getCurrentPage();


  /*
    Protect normal user pages.
  */

  if (protectedPages.includes(currentPage)) {

    if (!isLoggedIn()) {

      alert(
        "Please log in to access your BoostPro account."
      );

      window.location.href = "login.html";

      return;
    }

  }


  /*
    Protect admin dashboard.
  */

  if (currentPage === adminPage) {

    if (!isLoggedIn()) {

      alert(
        "Admin login required."
      );

      window.location.href = "login.html";

      return;
    }


    if (!isAdmin()) {

      alert(
        "Access denied. You are not an administrator."
      );

      window.location.href = "dashboard.html";

      return;
    }

  }


  /* =========================================
     4. MOBILE MENU
  ========================================= */

  const menuButton =
    document.querySelector(".menu-btn");

  const navLinks =
    document.querySelector(".nav-links");


  if (menuButton && navLinks) {

    menuButton.addEventListener(
      "click",
      function () {

        navLinks.classList.toggle("active");

      }
    );

  }


  /* =========================================
     5. SERVICE CATEGORY FILTER
  ========================================= */

  const categories =
    document.querySelectorAll(".category");

  const serviceCards =
    document.querySelectorAll(".service-card");


  categories.forEach(function (category) {

    category.addEventListener(
      "click",
      function () {

        categories.forEach(function (item) {

          item.classList.remove("active");

        });


        category.classList.add("active");


        const selectedCategory =
          category.textContent
            .trim()
            .toLowerCase();


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

      }
    );

  });


  /* =========================================
     6. ORDER PRICE ESTIMATOR
  ========================================= */

  const platform =
    document.getElementById("platform");

  const service =
    document.getElementById("service");

  const quantity =
    document.getElementById("quantity");

  const priceDisplay =
    document.querySelector(".price");


  function calculatePrice() {

    if (
      !service ||
      !quantity ||
      !priceDisplay
    ) {
      return;
    }


    const selectedService =
      service.value;

    const amount =
      Number(quantity.value);


    if (
      !selectedService ||
      !amount ||
      amount < 1
    ) {

      priceDisplay.textContent =
        "₦0.00";

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


    const total =
      amount * pricePerUnit;


    priceDisplay.textContent =
      "₦" +
      total.toLocaleString(
        "en-NG",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      );

  }


  if (platform) {
    platform.addEventListener(
      "change",
      calculatePrice
    );
  }


  if (service) {
    service.addEventListener(
      "change",
      calculatePrice
    );
  }


  if (quantity) {
    quantity.addEventListener(
      "input",
      calculatePrice
    );
  }


  /* =========================================
     7. SIGNUP / CREATE ACCOUNT
  ========================================= */

  const signupForm =
    document.getElementById("signupForm");


  if (signupForm) {

    signupForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const nameInput =
          document.getElementById("name");

        const emailInput =
          document.getElementById("email");

        const passwordInput =
          document.getElementById("password");

        const confirmPasswordInput =
          document.getElementById(
            "confirmPassword"
          );


        if (
          !nameInput ||
          !emailInput ||
          !passwordInput ||
          !confirmPasswordInput
        ) {

          alert(
            "Please check your signup form."
          );

          return;
        }


        const name =
          nameInput.value.trim();

        const email =
          emailInput.value
            .trim()
            .toLowerCase();

        const password =
          passwordInput.value;

        const confirmPassword =
          confirmPasswordInput.value;


        if (
          !name ||
          !email ||
          !password ||
          !confirmPassword
        ) {

          alert(
            "Please fill in all fields."
          );

          return;
        }


        if (
          password !== confirmPassword
        ) {

          alert(
            "Passwords do not match."
          );

          confirmPasswordInput.focus();

          return;
        }


        if (password.length < 6) {

          alert(
            "Password must be at least 6 characters."
          );

          passwordInput.focus();

          return;
        }


        /*
          Check if account already exists.
        */

        const existingAccount =
          getAccount();


        if (
          existingAccount &&
          existingAccount.email &&
          existingAccount.email.toLowerCase() === email
        ) {

          alert(
            "An account with this email already exists."
          );

          return;
        }


        /*
          Create account.
        */

        const account = {

          name: name,

          email: email,

          password: password,

          role:
            email === ADMIN_EMAIL.toLowerCase()
              ? "admin"
              : "user"

        };


        localStorage.setItem(
          "boostproAccount",
          JSON.stringify(account)
        );


        localStorage.setItem(
          "boostproLoggedIn",
          "true"
        );


        alert(
          "Account created successfully! Welcome to BoostPro 🚀"
        );


        window.location.href =
          "dashboard.html";

      }
    );

  }


  /* =========================================
     8. LOGIN
  ========================================= */

  const loginForm =
    document.getElementById("loginForm");


  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const emailInput =
          document.getElementById("email");

        const passwordInput =
          document.getElementById("password");


        if (
          !emailInput ||
          !passwordInput
        ) {

          alert(
            "Login form is missing required fields."
          );

          return;
        }


        const email =
          emailInput.value
            .trim()
            .toLowerCase();

        const password =
          passwordInput.value;


        const account =
          getAccount();


        if (!account) {

          alert(
            "No BoostPro account found. Please create an account first."
          );

          return;
        }


        if (
          email === account.email.toLowerCase() &&
          password === account.password
        ) {

          localStorage.setItem(
            "boostproLoggedIn",
            "true"
          );


          /*
            Decide where to send the user.
          */

          if (
            email ===
            ADMIN_EMAIL.toLowerCase()
          ) {

            alert(
              "Admin login successful! 👑"
            );

            window.location.href =
              adminPage;

          } else {

            alert(
              "Login successful! 🚀"
            );

            window.location.href =
              "dashboard.html";

          }

        } else {

          alert(
            "Incorrect email or password."
          );

        }

      }
    );

  }


  /* =========================================
     9. DASHBOARD USER NAME
  ========================================= */

  const account =
    getAccount();


  if (account) {

    document.querySelectorAll(
      ".user-name, .profile-name"
    ).forEach(function (element) {

      element.textContent =
        account.name;

    });


    /*
      Display admin badge if applicable.
    */

    if (isAdmin()) {

      document.querySelectorAll(
        ".admin-name"
      ).forEach(function (element) {

        element.textContent =
          account.name;

      });

    }

  }


  /* =========================================
     10. SMOOTH SCROLLING
  ========================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          this.getAttribute("href");


        if (
          targetId &&
          targetId !== "#"
        ) {

          const target =
            document.querySelector(
              targetId
            );


          if (target) {

            event.preventDefault();


            target.scrollIntoView({
              behavior: "smooth"
            });

          }

        }

      }
    );

  });


  /* =========================================
     11. ORDER BUTTON FEEDBACK
  ========================================= */

  document.querySelectorAll(
    ".order-btn"
  ).forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        if (
          this.getAttribute("href") === "#"
        ) {

          alert(
            "Please select a service and place your order."
          );

        }

      }
    );

  });


  /* =========================================
     12. PROFILE SAVE
  ========================================= */

  const profileForms =
    document.querySelectorAll(
      ".profile-form"
    );


  profileForms.forEach(function (form) {

    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        alert(
          "Your profile information has been saved successfully."
        );

      }
    );

  });


  /* =========================================
     13. CURRENT YEAR
  ========================================= */

  document.querySelectorAll(
    ".current-year"
  ).forEach(function (element) {

    element.textContent =
      new Date().getFullYear();

  });


  /* =========================================
     14. LOGOUT
  ========================================= */

  const logoutButtons =
    document.querySelectorAll(
      ".logout-btn"
    );


  logoutButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function (event) {

        event.preventDefault();


        localStorage.removeItem(
          "boostproLoggedIn"
        );


        /*
          Keep account information saved
          so the user can log in again.
        */


        window.location.href =
          "login.html";

      }
    );

  });


  /* =========================================
     15. ADMIN-ONLY ELEMENTS
  ========================================= */

  /*
    Hide admin links from normal users.
  */

  document.querySelectorAll(
    ".admin-only"
  ).forEach(function (element) {

    if (!isAdmin()) {

      element.style.display =
        "none";

    }

  });


  /* =========================================
     16. ADMIN LOGOUT
  ========================================= */

  document.querySelectorAll(
    ".admin-logout"
  ).forEach(function (button) {

    button.addEventListener(
      "click",
      function (event) {

        event.preventDefault();


        localStorage.removeItem(
          "boostproLoggedIn"
        );


        window.location.href =
          "login.html";

      }
    );

  });

});
