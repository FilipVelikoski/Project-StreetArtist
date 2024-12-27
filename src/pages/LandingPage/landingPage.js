import { setArtist } from "../../utils/global.js";

const artistSelect = document.getElementById("artistsSelect");

export function initLandingPage() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((users) => {
      const userNames = users.map((user) => user.name);
      artistSelect.innerHTML = `<option value="Choose">Choose</option>`;
      userNames.forEach((userName) => {
        const option = document.createElement("option");

        option.value = userName;
        option.textContent = userName;

        artistSelect.appendChild(option);

        artistSelect.addEventListener("change", function () {
          const selectedArtist = artistSelect.value;

          setArtist(selectedArtist);
          window.location.hash = "#artistHomePage";
        });
      });
    });
}
