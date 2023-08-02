/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <Tanimul Islam>
 *      Student ID: <129414223>
 *      Date:       <07/15/2023>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

function createArtistButton() {
  const menu = document.getElementById("menu");

  artists.forEach((artist) => {
    const button = document.createElement("button");
    button.textContent = artist.name;
    button.addEventListener("click", () => showArtistSongs(artist));
    menu.appendChild(button);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createArtistButton();
  showArtistSongs(artists[0]);
});

// Show songs for the chosen artist
function showArtistSongs(artist) {
  const musicCardsContainer = document.querySelector(".music-cards");
  musicCardsContainer.innerHTML = "";

  const filteredSongs = songs.filter((song) => song.artistID === artist.id && !song.flagged);

  filteredSongs.forEach((song) => {
    const songCard = createSongCard(song);
    musicCardsContainer.appendChild(songCard);
  });
}

function createSongCard(song) {
  // Create a <div> to hold the card
  const card = document.createElement("div");
  // Add the .card class to the <div>
  card.classList.add("card");

  // Create a song image, use the .card-image class
  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.classList.add("card-image");
  songImg.alt = song.title;
  card.appendChild(songImg);

  const article = document.createElement("article");
  const header = document.createElement("header");
  const h2 = document.createElement("h2");
  h2.textContent = song.title;
  header.appendChild(h2);
  article.appendChild(header);

  const content = document.createElement("div");
  content.classList.add("content");

  if (song.tags && Array.isArray(song.tags)) {
    song.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.classList.add("tag");
      tagSpan.textContent = tag;
      content.appendChild(tagSpan);
    });
  }

  const yearTime = document.createElement("span");
  yearTime.classList.add("year");
  yearTime.textContent = `Year: ${song.year}`;
  content.appendChild(yearTime);

  const durationSpan = document.createElement("span");
  durationSpan.classList.add("duration");
  const minutes = Math.floor(song.duration / 60);
  const seconds = song.duration % 60;
  durationSpan.textContent = `Duration: ${minutes}:${seconds.toString().padStart(2, "0")}`;
  content.appendChild(durationSpan);

  article.appendChild(content);
  card.appendChild(article);

  return card;
}
