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

  auth.style.display = section === "auth" ? "block" : "none";
  reg.style.display = section === "register" ? "block" : "none";
  app.style.display = section === "app" ? "block" : "none";
}

export function renderVideoResults(videos) {
  const container = document.getElementById("video-results");
  container.innerHTML = "";

  videos.forEach((video) => {
    const { title, thumbnails } = video.snippet;
    const videoId = video.id.videoId;

    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <img src="${thumbnails.medium.url}" alt="${title}" />
      <p>${title}</p>
      <button data-id="${videoId}" class="fav-btn">Ajouter aux favoris</button>
    `;

    container.appendChild(card);
  });
}
