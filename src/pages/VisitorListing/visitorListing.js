import { items } from "../../../data/db.js";
import { setArtist } from "../../utils/global.js";
import { itemTypes } from "../../../data/db.js";
import { initFilterPage } from "../VisitorListing/FilterPanel/filterPanel.js";

export function initVisitorListingPage() {
  const cardsContainer = document.querySelector("#cards-container");

  const storedItems = localStorage.getItem("items");
  const localItems = storedItems ? JSON.parse(storedItems) : items;

  const publishedItems = localItems.filter((item) => item.isPublished);

  function renderCards(itemsToRender) {
    cardsContainer.innerHTML = "";

    const row = document.createElement("div");
    row.classList.add("row");

    itemsToRender.forEach((item, idx) => {
      const col = document.createElement("div");
      col.classList.add("col-12", "col-md-6", "col-lg-4", "mt-5");

      const card = document.createElement("div");
      card.classList.add("card", "w-100");

      const priceParagraph = document.createElement("p");
      priceParagraph.textContent = `$${item.price}`;
      priceParagraph.classList.add("price");

      if (idx % 2 === 0) {
        card.classList.add("even-card");
        priceParagraph.classList.add("price-even");
      } else {
        card.classList.add("odd-card");
        priceParagraph.classList.add("price-odd");
      }

      card.innerHTML += `<img
            src="${item.image}"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body title" >
             <div class="d-flex justify-content-between ">
            <h5 class="card-title">${item.artist}</h5>
            <p class="price-tag"></p>
              </div>
            <p class="card-title">${item.title}</p>
            <p class="card-text ">
              ${item.description}
            </p>
          </div`;

      const priceTag = card.querySelector(".price-tag");
      priceTag.appendChild(priceParagraph);

      col.appendChild(card);

      row.appendChild(col);
    });

    cardsContainer.appendChild(row);
  }
  renderCards(publishedItems);

  initFilterPage(publishedItems, renderCards, itemTypes, setArtist);
}
