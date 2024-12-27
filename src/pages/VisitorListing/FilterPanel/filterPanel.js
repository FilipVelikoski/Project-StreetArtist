export function initFilterPage(
  publishedItems,
  renderCards,
  itemTypes,
  setArtist
) {
  let selectedArtist = "";

  // filter Panel
  // buttons
  const openFilter = document.querySelector("#openFilterPanel");
  const filterPanel = document.querySelector("#filterPanel");
  const closePanelBtn = document.querySelector("#closePanelBtn");
  const applyIconBtn = document.querySelector("#applyIconBtn");

  // inputs
  const titleInput = document.querySelector("#title");
  const artistInput = document.querySelector("#artist");
  const minPriceInput = document.querySelector("#minPrice");
  const maxPriceInput = document.querySelector("#maxPrice");
  const typeInput = document.querySelector("#type");

  function onApplyFilter() {
    const titleValue = titleInput.value.toLowerCase();
    const minPriceValue = parseFloat(minPriceInput.value);
    const maxPriceValue = parseFloat(maxPriceInput.value);
    const typeValue = typeInput.value;

    const filteredItems = publishedItems.filter((item) => {
      const matchesTitle = item.title.toLowerCase().includes(titleValue);
      const matchesArtist = selectedArtist
        ? item.artist === selectedArtist
        : true;
      const matchesPrice =
        (!isNaN(minPriceValue) ? item.price >= minPriceValue : true) &&
        (!isNaN(maxPriceValue) ? item.price <= maxPriceValue : true);
      const matchesType = typeValue === "Choose" || item.type === typeValue;
      return matchesTitle && matchesArtist && matchesPrice && matchesType;
    });

    renderCards(filteredItems);
  }

  function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => {
        const userNames = users.map((user) => user.name);
        artistInput.innerHTML = `<option value="Choose">Choose</option>`;
        userNames.forEach((userName) => {
          const option = document.createElement("option");

          option.value = userName;
          option.textContent = userName;

          artistInput.appendChild(option);
        });
      });
  }

  fetchUsers();

  function populateTypeSelect() {
    typeInput.innerHTML = `<option value="Choose">Choose</option>`;
    itemTypes.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      typeInput.appendChild(option);
    });
  }

  populateTypeSelect();

  // event listeners
  openFilter.addEventListener("click", () => {
    filterPanel.classList.add("active");
  });

  closePanelBtn.addEventListener("click", () => {
    filterPanel.classList.remove("active");

    titleInput.value = "";
    artistInput.value = "Choose";
    minPriceInput.value = "";
    maxPriceInput.value = "";
    typeInput.value = "Choose";
  });

  artistInput.addEventListener("change", function () {
    selectedArtist = artistInput.value === "Choose" ? "" : artistInput.value;
    setArtist(selectedArtist);
  });

  applyIconBtn.addEventListener("click", () => {
    onApplyFilter();
    filterPanel.classList.remove("active");
  });
}
