import { initLandingPage } from "./src/pages/LandingPage/landingPage.js";
import { initVisitorsHomePage } from "./src/pages/VisitorsHomePage/visitorsHomePage.js";
import { initVisitorListingPage } from "./src/pages/VisitorListing/visitorListing.js";
import { initArtistHomePage } from "./src/pages/ArtistHomePage/artistHomePage.js";
import { initArtistItemsPage } from "./src/pages/ArtistItemsPage/artistItemsPage.js";
import { initCaptureImagePage } from "./src/pages/CaptureImagePage/captureImagePage.js";

// // select elements
const joinAsVisitor = document.querySelector("#joinAsVisitor");

function closeNavbarDropdown() {
  const navbarCollapse = document.getElementById("navbarSupportedContent");

  if (navbarCollapse && navbarCollapse.classList.contains("show")) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false,
    });
    bsCollapse.hide();
  }
}

// handle Route
function handleRoute() {
  const hash = location.hash ? location.hash : "#landingPage";

  const allPages = document.querySelectorAll(".page");

  allPages.forEach((page) => (page.style.display = "none"));

  document.querySelector(hash).style.display = "block";

  closeNavbarDropdown();

  switch (hash) {
    case "#landingPage":
      initLandingPage();
      break;

    case "#visitorHomePage":
      initVisitorsHomePage();
      break;

    case "#visitorListingPage":
      initVisitorListingPage();
      break;

    case "#artistHomePage":
      initArtistHomePage();
      break;

    case "#artistItemsPage":
      initArtistItemsPage();
      break;

    case "#captureImagePage":
      initCaptureImagePage();
      break;

    default:
      break;
  }
}

function navigationMenu() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeNavbarDropdown();
    });
  });
}

// // event liseners
joinAsVisitor.addEventListener("click", function () {
  window.location.hash = "#visitorHomePage";
  handleRoute();
});

window.addEventListener("hashchange", handleRoute);

window.addEventListener("load", () => {
  handleRoute();
  navigationMenu();
});
