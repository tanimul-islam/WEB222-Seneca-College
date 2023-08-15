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

document.addEventListener("DOMContentLoaded", () => {
  createArtistButton();
  showArtistSongs(artists[0]);
});

// Show songs for the chosen artist
function showArtistSongs(artist) {
  const selectedArtist = document.getElementById("selected-artist");
  const tableBody = document.getElementById("songs");

  selectedArtist.textContent = artist.name;
  selectedArtist.appendChild(document.createTextNode(" "));
  artist.links.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.textContent = link.name;
    selectedArtist.appendChild(anchor);
    selectedArtist.appendChild(document.createTextNode(" "));
  });

  tableBody.innerHTML = "";

  const headerRow = document.createElement("tr");
  const headerName = ["Song Name", "Year Recorded", "Duration(mm::ss)"];

  headerName.forEach((hn) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = hn;
    headerRow.appendChild(headerCell);
  });
  tableBody.appendChild(headerRow);

  const filteredSongs = songs.filter((song) => song.artistID === artist.id && !song.flagged);

  filteredSongs.forEach((song) => {
    const row = document.createElement("tr");

    row.addEventListener("click", () => {
      console.log(song.title);
    });

    const nameCell = document.createElement("td");
    nameCell.textContent = song.title;

    const yearCell = document.createElement("td");
    yearCell.textContent = song.year;

    const durationCell = document.createElement("td");
    const minutes = Math.floor(song.duration / 60);
    const seconds = song.duration % 60;
    durationCell.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    row.appendChild(nameCell);
    row.appendChild(yearCell);
    row.appendChild(durationCell);

    tableBody.appendChild(row);
  });
}
