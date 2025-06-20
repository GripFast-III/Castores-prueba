export function showAppUI(user) {
  toggleSection("app");
  document.getElementById(
    "username-display"
  ).textContent = `Hello, ${user.username}`;
  document.getElementById("logout-btn").style.display = "inline-block";

  document.getElementById("logout-btn").addEventListener("click", () => {
    console.log(`[LOGOUT] ${user.username} disconnected`);
    localStorage.removeItem("session");
    location.reload();
  });

  renderFavorites();

  const favSearchInput = document.getElementById("favorites-search-input");
  favSearchInput.addEventListener("input", () => {
    renderFavorites();
  });
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
        ${isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    `;

    const btn = card.querySelector(".fav-btn");
    btn.addEventListener("click", () => {
      if (isFavorite) {
        const newFavs = favorites.filter((v) => v.id.videoId !== videoId);
        saveFavorites(user.username, newFavs);
        console.log(`[FAVORTE] Removed : "${title}"`);
      } else {
        favorites.push(video);
        saveFavorites(user.username, favorites);
        console.log(`[FAVORITE] Added : "${title}"`);
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
  const searchInput = document.getElementById("favorites-search-input");
  const searchTerm = searchInput?.value?.trim().toLowerCase() || "";

  const allFavorites = getFavorites(user.username);
  const filteredFavorites = allFavorites.filter((video) =>
    video.snippet.title.toLowerCase().includes(searchTerm)
  );

  container.innerHTML = "";

  filteredFavorites.forEach((video) => {
    const { title, thumbnails } = video.snippet;
    const videoId = video.id.videoId;

    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <img src="${thumbnails.medium.url}" alt="${title}" />
      <p>${title}</p>
      <button data-id="${videoId}" class="remove-fav-btn">Remove</button>
    `;

    card.querySelector(".remove-fav-btn").addEventListener("click", () => {
      const updated = allFavorites.filter((v) => v.id.videoId !== videoId);
      saveFavorites(user.username, updated);
      console.log(`[FAVORITE] Removed from favorite : "${title}"`);
      renderFavorites();
    });

    container.appendChild(card);
  });
}

export function showResetUI() {
  toggleSection("reset");
}
