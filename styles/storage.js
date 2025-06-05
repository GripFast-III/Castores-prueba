export function saveUserSession(user) {
  localStorage.setItem("session", JSON.stringify(user));
}

export function loadUserSession() {
  return JSON.parse(localStorage.getItem("session"));
}
