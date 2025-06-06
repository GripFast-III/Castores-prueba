import { saveUserSession } from "./storage.js";
import { showAppUI, showLoginUI, showRegisterUI } from "./dom.js";
import { showResetUI } from "./dom.js";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export function initAuthHandlers() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Connexion
  loginForm.addEventListener("submit", handleLogin);

  // Sign up
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Check the reCAPTCHA
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      alert("Please confirm you ar not a Terminator.");
      return;
    }

    // Get password
    const rawPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Check the validity
    if (rawPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(rawPassword);

    const user = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: hashedPassword,
    };

    // Save
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    grecaptcha.reset();
    alert("Inscription successful.");
    console.log(`[INSCRIPTION] User saved : ${user.username}`);

    showLoginUI();
  });

  // Show register
  document.getElementById("show-register").addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterUI();
  });

  document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault();
    showLoginUI();
  });

  // Link for forgotten password
  document
    .getElementById("forgot-password-link")
    .addEventListener("click", (e) => {
      e.preventDefault();
      showResetUI();
    });

  // Going back from 'Forgot password?'
  document.getElementById("back-to-login").addEventListener("click", (e) => {
    e.preventDefault();
    showLoginUI();
  });

  // Submit reset form
  document
    .getElementById("reset-form")
    .addEventListener("submit", handlePasswordReset);
}

async function handleLogin(e) {
  e.preventDefault();
  const identifier = document.getElementById("login-identifier").value;
  const rawPassword = document.getElementById("login-password").value;
  const hashedPassword = await hashPassword(rawPassword);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) =>
      (u.email === identifier || u.username === identifier) &&
      u.password === hashedPassword
  );

  if (user) {
    saveUserSession(user);
    showAppUI(user);
  } else {
    alert("Wrong login informations");
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
    alert("Passwords don't match");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Success");
  showLoginUI();
}

function handlePasswordReset(e) {
  e.preventDefault();

  const email = document.getElementById("reset-email").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-new-password").value;

  if (newPassword !== confirmPassword) {
    alert("Passwords don't match");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex === -1) {
    alert("No account found with this email");
    return;
  }

  users[userIndex].password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));

  alert("Password updated, you can now log in.");
  showLoginUI();
}
