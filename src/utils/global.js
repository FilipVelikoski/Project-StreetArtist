let currentArtist = localStorage.getItem("currentArtist") ?? "";

export function getArtist() {
  return localStorage.getItem("currentArtist") ?? currentArtist;
}

export function setArtist(artist) {
  currentArtist = artist;
  localStorage.setItem("currentArtist", currentArtist);
}
