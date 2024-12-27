import { items } from "../../../data/db.js";
import { getArtist } from "../../utils/global.js";

const displayCapturedImage = document.querySelector("#displayCaptureImage");
const image = document.querySelector("#addImage");
const addItemBtn = document.querySelector("#addNewItemBtn");
const addImage = document.querySelector("#addImage");

const constrains = {
  video: {
    facingMode: {
      ideal: "environment",
    },
  },
};

export function initCaptureImagePage() {
  const selectedArtist = getArtist();
  document.querySelector(".artistCaptureImage-name").textContent =
    selectedArtist;

  const liveStreamVideo = document.querySelector("video");
  const snapshotCanvas = document.querySelector("canvas");
  const captureSnapshotBtn = document.querySelector("#captureSnapshot");

  const savedImage = localStorage.getItem("capturedImage");
  if (savedImage) {
    displayCapturedImage.src = savedImage;
    displayCapturedImage.style.display = "block";
  }

  navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
    liveStreamVideo.srcObject = stream;
  });

  captureSnapshotBtn.addEventListener("click", function () {
    snapshotCanvas.width = liveStreamVideo.videoWidth;
    snapshotCanvas.height = liveStreamVideo.videoHeight;

    const ctx = snapshotCanvas.getContext("2d");
    ctx.drawImage(liveStreamVideo, 0, 0);

    const imgData = snapshotCanvas.toDataURL("image/png");
    localStorage.setItem("capturedImage", imgData);

    image.value = imgData;

    displayCapturedImage.src = imgData;
    displayCapturedImage.style.display = "block";

    location.hash = "#artistItemsPage";
  });

  addItemBtn.addEventListener("click", function () {
    image.value = "";
    displayCapturedImage.style.display = "none";
    const savedImage = localStorage.getItem("capturedImage");

    if (savedImage) {
      displayCapturedImage.src = savedImage;
      addImage.value = savedImage;
      displayCapturedImage.style.display = "block";
    } else {
      displayCapturedImage.style.display = "none";
      addImage.value = "";
    }
  });
}
