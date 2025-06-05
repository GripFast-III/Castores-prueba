import { saveUserSession } from "./storage.js";
import { showAppUI, showLoginUI } from "./dom.js";

export function initAuthHandlers() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const identifier = document.getElementById("login-identifier").value;
    const password = document.getElementById("login-password").value;

    // Mock login
    const user = JSON.parse(localStorage.getItem("users"))?.find(
      (u) =>
        (u.email === identifier || u.username === identifier) &&
        u.password === password
    );

    if (user) {
      saveUserSession(user);
      showAppUI(user);
    } else {
      alert("Identifiants invalides");
    }
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    const confirmPassword = document.getElementById("confirm-password").value;

    if (user.password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Inscription réussie ! Connecte-toi.");
    showLoginUI();
  });

  document.getElementById("show-register").addEventListener("click", () => {
    showRegisterUI();
  });

  document.getElementById("show-login").addEventListener("click", () => {
    showLoginUI();
  });
}

function showRegisterUI() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("register-section").style.display = "block";
}

function showLoginUI() {
  document.getElementById("register-section").style.display = "none";
  document.getElementById("auth-section").style.display = "block";
}
