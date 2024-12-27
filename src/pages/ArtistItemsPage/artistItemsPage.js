// Select Elements
const artistItemsCards = document.querySelector("#artistItems-cards");
const addPublished = document.querySelector("#addPublished");
const addTitle = document.querySelector("#addTitle");
const addDescription = document.querySelector("#addDescription");
const addType = document.querySelector("#addType");
const addPrice = document.querySelector("#addPrice");
const addImage = document.querySelector("#addImage");
const openAddNewItem = document.querySelector("#openAddNewItem");
const addNewItemPanel = document.querySelector("#addNewItemPanel");
const closeBtn = document.querySelector("#closeBtn");
const addItemBtn = document.querySelector("#addNewItemBtn");
const confirmRemoveBtn = document.querySelector("#confirmRemoveBtn");
const saveEditBtn = document.querySelector(".saveEditBtn");
const addOrEditTitle = document.querySelector(".add-edit-title");
const confirmRemoveModal = new bootstrap.Modal(
  document.getElementById("removeConfirmation")
);
const displayCaptureImage = document.querySelector("#displayCaptureImage");

export function initArtistItemsPage() {
  loadItems();
  populateTypeSelect();
  const selectedArtist = getArtist();
  document.querySelector(".artistadd-name").textContent = selectedArtist;
  artistItemsCards.innerHTML = "";

  localItems
    .filter((item) => item.artist === selectedArtist)
    .forEach((item, index) => {
      displayArtistItems(item, index);
    });
}
// Display cards
function displayArtistItems(item) {
  const date = new Date(item.dateCreated);
  const formattedDate = formatDate(date);

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "row-cols-1", "row-cols-md-3");

  const colDiv = document.createElement("div");
  colDiv.classList.add("col", "item-card");

  const publishButtonClass = item.isPublished
    ? "btn-published"
    : "btn-unpublished";

  colDiv.innerHTML = `
  <div class="card w-100 my-3">
      <img src="${item.image}" class="card-img-top" alt="${item.title}">
      <div class="card-body">
<div class="d-flex justify-content-between align-items-center ">
   <div>
       <p class="card-title fw-bold mb-0">${item.title}</p>
      <span class="card-date">${formattedDate}</span>
    </div>
     <div><p class="price">$${item.price}</p></div>
 </div>
        <p class="card-text mt-3">${item.description}</p>
      </div>
      <div class="buttons-inner">
        <button class="card-link btn-auction" disabled>Send to Auction</button>
        <button 
         <button class="${publishButtonClass}" data-id="${
    item.id
  }" data-published="${item.isPublished}">
          ${item.isPublished ? "Unpublish" : "Publish"}
        </button>
        <button class="card-link btn-remove" data-id="${
          item.id
        }">Remove</button>
        <button class="card-link btn-edit" data-id="${item.id}">Edit</button>
      </div>
    </div>
      `;

  rowDiv.appendChild(colDiv);

  artistItemsCards.appendChild(rowDiv);
}

artistItemsCards.addEventListener("click", function (event) {
  const itemId = event.target.getAttribute("data-id");

  if (event.target.matches(".btn-remove")) {
    confirmRemoveBtn.setAttribute("data-id", itemId);
    confirmRemoveModal.show();
  } else if (event.target.matches(".btn-edit")) {
    editItem(itemId);
  } else if (event.target.matches(".btn-published, .btn-unpublished")) {
    togglePublish(itemId);
  }
});

// Remove item
function removeItem(id) {
  const index = localItems.findIndex((item) => item.id === parseInt(id));
  if (index !== -1) {
    localItems.splice(index, 1);
  }

  saveItems();
  initArtistItemsPage();
}

// Toggle published
function togglePublish(id) {
  const item = localItems.find((item) => item.id === parseInt(id));
  if (item) {
    item.isPublished = !item.isPublished;
    saveItems();
    initArtistItemsPage();
  }
}

// Populate Type Select
function populateTypeSelect() {
  if (addType.options.length === 0) {
    addType.innerHTML = "";
    addType.appendChild(new Option("Choose", "", true, true));

    itemTypes.forEach((type) => {
      const option = new Option(type, type);
      addType.appendChild(option);
    });
  }
}
// edit item
function editItem(id) {
  const selectedArtist = getArtist();
  document.querySelector(".artistaddnew-name").textContent = selectedArtist;
  const item = localItems.find((item) => item.id === parseInt(id));
  if (item) {
    addPublished.checked = item.isPublished;
    addTitle.value = item.title;
    addDescription.value = item.description;
    addType.value = item.type;
    addPrice.value = item.price;
    addImage.value = item.image;

    displayCaptureImage.src = item.image;
    displayCaptureImage.style.display = "block";

    addOrEditTitle.textContent = "Edit Item";
    addNewItemPanel.classList.add("active");

    addItemBtn.classList.add("d-none");
    document.querySelector(".saveEditBtn").classList.remove("d-none");

    document.querySelector(".saveEditBtn").setAttribute("data-id", id);
  }
}

// event listener
openAddNewItem.addEventListener("click", function () {
  resetForm();
  const selectedArtist = getArtist();
  document.querySelector(".artistaddnew-name").textContent = selectedArtist;
  addNewItemPanel.classList.add("active");
  addOrEditTitle.textContent = "Add New Item";
  addItemBtn.classList.remove("d-none");
  document.querySelector(".saveEditBtn").classList.add("d-none");
});

closeBtn.addEventListener("click", function () {
  addNewItemPanel.classList.remove("active");

  resetForm();
});

addItemBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const published = addPublished.checked;
  const title = addTitle.value;
  const description = addDescription.value;
  const type = addType.value;
  const image = addImage.value;
  const price = addPrice.value;

  if (!title || !description || !type || !image || !price) {
    alert("Please fill in all the fields!");
    return;
  }

  const newItem = {
    id: new Date().valueOf(),
    title: title,
    description: description,
    type: type,
    price: parseFloat(price),
    image: image,
    isPublished: published,
    artist: getArtist(),
    dateCreated: new Date().toISOString(),
    priceSold: 0,
    isAuctioning: false,
  };

  localItems.unshift(newItem);
  saveItems();
  initArtistItemsPage();

  addNewItemPanel.classList.remove("active");

  resetForm();
});

saveEditBtn.addEventListener("click", function () {
  const itemId = parseInt(this.getAttribute("data-id"));
  const item = localItems.find((item) => item.id === itemId);

  if (item) {
    item.title = addTitle.value;
    item.description = addDescription.value;
    item.price = parseFloat(addPrice.value);
    item.image = addImage.value;
    item.type = addType.value;
    item.isPublished = addPublished.checked;

    saveItems();
    initArtistItemsPage();

    addNewItemPanel.classList.remove("active");
    resetForm();
    addItemBtn.classList.remove("d-none");
    document.querySelector(".saveEditBtn").classList.add("d-none");
  }
});

confirmRemoveBtn.addEventListener("click", function () {
  const itemId = confirmRemoveBtn.getAttribute("data-id");
  removeItem(itemId);
  confirmRemoveModal.hide();
});

addImage.addEventListener("input", function () {
  const imageUrl = addImage.value.trim();
  if (imageUrl) {
    displayCaptureImage.src = imageUrl;
    displayCaptureImage.style.display = "block";
  } else {
    displayCaptureImage.style.display = "none";
  }
});

// Reset Form
function resetForm() {
  addTitle.value = "";
  addDescription.value = "";
  addPrice.value = "";
  addImage.value = "";
  addType.selectedIndex = 0;
  addPublished.checked = false;

  displayCaptureImage.src = "./images/snapshot/Vector.png";
}

// Local storage
function saveItems() {
  localStorage.setItem("items", JSON.stringify(localItems));
}

function loadItems() {
  const storedItems = localStorage.getItem("items");
  if (storedItems) {
    localItems = JSON.parse(storedItems);
  }
}
