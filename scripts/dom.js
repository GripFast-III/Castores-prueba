export function showAppUI(user) {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("app-section").style.display = "block";
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
  document.getElementById("app-section").style.display = "none";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("auth-section").style.display = "block";
}
