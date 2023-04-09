/*!
 * Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches("#contactFormBtn")) return;

    // Don't follow the link
    event.preventDefault();

    const payload = {
      name: document.getElementById("form-name")?.value,
      phone: document.getElementById("form-phone")?.value,
      email: document.getElementById("form-email")?.value,
      message: document.getElementById("form-message")?.value,
    };

    submitContactForm(payload);
  },
  false
);

async function submitContactForm(payload) {
  //   console.log("triggered");
  //   console.log("event", event);

  //   const payload = {
  //     name: "Marcello Costaaa",
  //     email: "marcelloborg0501@gmail.com",
  //     phone: "999111222",
  //     message: "IAew, quero um serviço",
  //   };

  console.log("submitContactForm.payload", payload);

  const validate = (payload) => {
    const requiredFields = ["email", "name", "phone"];

    requiredFields.forEach((field) => {
      if (!payload[field]) {
        throw new Error(`${field} was not provided`);
      }
    });

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email)) {
      throw new Error(`${payload.email} is not valid`);
    }
  };

  try {
    validate(payload);
    const response = await fetch("https://send-mail-app.fly.dev/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("response", await response.json());
  } catch (error) {
    console.log("errow", error);
  }
}
