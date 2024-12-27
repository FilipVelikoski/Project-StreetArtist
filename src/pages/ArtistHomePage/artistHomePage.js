import { getArtist } from "../../utils/global.js";
import { items } from "../../../data/db.js";
import { generateDateLabels, formatDate } from "../../utils/dates.js";

let chartInstance;
let localItems = [...items];

export function initArtistHomePage() {
  loadItems();
  const selectedArtist = getArtist();
  document.querySelector(".artist-name").textContent = selectedArtist;

  const itemSold = document.querySelector("#itemSold");
  const totalIncome = document.querySelector("#totalIncome");
  const auctionContainer = document.querySelector("#auctionContainer");

  function displayTotalItemsAndIncome() {
    const soldItems = localItems.filter(
      (item) => item.artist === selectedArtist && item.dateSold
    );
    const allItems = localItems.filter(
      (item) => item.artist === selectedArtist
    );

    const totalIncomeValue = soldItems.reduce(
      (sum, item) => sum + item.priceSold,
      0
    );

    totalIncome.textContent = `$${totalIncomeValue}`;
    itemSold.textContent = `${soldItems.length}/${allItems.length}`;
  }

  function displayAuction() {
    auctionContainer.textContent = "Not Available";
  }

  displayTotalItemsAndIncome();
  displayAuction();

  // Event listeners for chart buttons
  const last7 = document.querySelector("#last7");
  const last14 = document.querySelector("#last14");
  const last30 = document.querySelector("#last30");

  last7.addEventListener("click", function () {
    setActiveButton(last7);
    drawChart(7);
  });
  last14.addEventListener("click", function () {
    drawChart(14);
    setActiveButton(last14);
  });
  last30.addEventListener("click", function () {
    drawChart(30);
    setActiveButton(last30);
  });

  drawChart(14);
}

function setActiveButton(selectedButton) {
  [last7, last14, last30].forEach((btn) => btn.classList.remove("active"));
  selectedButton.classList.add("active");
}

function drawChart(daysAgo) {
  const labels = generateDateLabels(daysAgo);
  const selectedArtist = getArtist();

  const artistItems = localItems.filter(
    (item) => item.artist === selectedArtist && !!item.priceSold
  );

  const data = getChartData(artistItems, labels);

  if (chartInstance) {
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = data;
    chartInstance.update();
  } else {
    chartInstance = initChart({
      labels: labels,
      data: data,
    });
  }
}

function getChartData(items = [], labels = []) {
  const chartData = [];

  labels.forEach((label) => {
    let sum = 0;

    items.forEach((item) => {
      if (formatDate(item.dateSold) === label) {
        sum += item.priceSold;
      }
    });

    chartData.push(sum);
  });

  return chartData;
}

function initChart(config) {
  const ctx = document.getElementById("myChart");

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: config.labels,
      datasets: [
        {
          label: "Amount",
          data: config.data,
          borderWidth: 1,
          backgroundColor: "#a16a5e",
          hoverBackgroundColor: "#d44c2e",
        },
      ],
    },
    options: {
      indexAxis: "y",
    },
  });

  return myChart;
}

//  localStorage
function loadItems() {
  const storedItems = localStorage.getItem("items");
  if (storedItems) {
    localItems = JSON.parse(storedItems);
  }
}

function saveItems() {
  localStorage.setItem("items", JSON.stringify(localItems));
}
