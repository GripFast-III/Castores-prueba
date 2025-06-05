import { saveUserSession } from "./storage.js";
import { showAppUI, showLoginUI, showRegisterUI } from "./dom.js";

export function initAuthHandlers() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  loginForm.addEventListener("submit", handleLogin);
  registerForm.addEventListener("submit", handleRegister);

  document.getElementById("show-register").addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterUI();
  });

  document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault();
    showLoginUI();
  });
}

function handleLogin(e) {
  e.preventDefault();
  const identifier = document.getElementById("login-identifier").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
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
}

function handleRegister(e) {
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

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Inscription réussie ! Connecte-toi.");
  showLoginUI();
}
