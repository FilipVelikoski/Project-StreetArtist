export function initVisitorsHomePage() {
  // select elements
  const btnVisitor = document.querySelector("#btnVisitor");
  const clickableImages = document.querySelectorAll(".clickable-image");

  // event liseners
  btnVisitor.addEventListener("click", function () {
    window.location.hash = "#visitorListingPage";
  });

  clickableImages.forEach((image) => {
    image.addEventListener("click", function () {
      window.location.hash = "#visitorListingPage";
    });
  });
}
