export function saveUserSession(user) {
  localStorage.setItem("session", JSON.stringify(user));
}

export function loadUserSession() {
  return JSON.parse(localStorage.getItem("session"));
}

export function getFavorites(username) {
  return JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
}

export function saveFavorites(username, favorites) {
  localStorage.setItem(`favorites_${username}`, JSON.stringify(favorites));
}
