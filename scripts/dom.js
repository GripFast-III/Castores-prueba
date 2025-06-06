export function showAppUI(user) {
  toggleSection("app");
  document.getElementById(
    "username-display"
  ).textContent = `Bienvenue, ${user.username}`;
  document.getElementById("logout-btn").style.display = "inline-block";

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("session");
    location.reload();
  });

  renderFavorites();
}

export function showLoginUI() {
  toggleSection("auth");
}

export function showRegisterUI() {
  toggleSection("register");
}

function toggleSection(section) {
  const auth = document.getElementById("auth-section");
  const reg = document.getElementById("register-section");
  const app = document.getElementById("app-section");
  const reset = document.getElementById("reset-section");

  auth.style.display = section === "auth" ? "block" : "none";
  reg.style.display = section === "register" ? "block" : "none";
  app.style.display = section === "app" ? "block" : "none";
  reset.style.display = section === "reset" ? "block" : "none";
}

import { getFavorites, saveFavorites, loadUserSession } from "./storage.js";

export function renderVideoResults(videos) {
  const container = document.getElementById("video-results");
  container.innerHTML = "";
  const user = loadUserSession();
  const favorites = getFavorites(user.username);

  videos.forEach((video) => {
    const { title, thumbnails } = video.snippet;
    const videoId = video.id.videoId;

    const isFavorite = favorites.some((fav) => fav.id.videoId === videoId);

    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <img src="${thumbnails.medium.url}" alt="${title}" />
      <p>${title}</p>
      <button data-id="${videoId}" class="fav-btn">
        ${isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>
    `;

    const btn = card.querySelector(".fav-btn");
    btn.addEventListener("click", () => {
      if (isFavorite) {
        const newFavs = favorites.filter((v) => v.id.videoId !== videoId);
        saveFavorites(user.username, newFavs);
      } else {
        favorites.push(video);
        saveFavorites(user.username, favorites);
      }
      renderVideoResults(videos); // refresh
      renderFavorites(); // update favorites section
    });

    container.appendChild(card);
  });
}

export function renderFavorites() {
  const user = loadUserSession();
  const container = document.getElementById("favorites");
  const favorites = getFavorites(user.username);
  container.innerHTML = "";

  favorites.forEach((video) => {
    const { title, thumbnails } = video.snippet;
    const videoId = video.id.videoId;

    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <img src="${thumbnails.medium.url}" alt="${title}" />
      <p>${title}</p>
      <button data-id="${videoId}" class="remove-fav-btn">Retirer</button>
    `;

    card.querySelector(".remove-fav-btn").addEventListener("click", () => {
      const updated = favorites.filter((v) => v.id.videoId !== videoId);
      saveFavorites(user.username, updated);
      renderFavorites();
      renderVideoResults([]); // facultatif : vider les résultats
    });

    container.appendChild(card);
  });
}

export function showResetUI() {
  toggleSection("reset");
}
