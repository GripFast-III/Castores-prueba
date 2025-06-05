import { initAuthHandlers } from "./auth.js";
import { initSearchHandler } from "./api.js";
import { loadUserSession } from "./storage.js";
import { showAppUI, showLoginUI } from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = loadUserSession();

  if (user) {
    showAppUI(user);
  } else {
    showLoginUI();
  }

  initAuthHandlers();
  initSearchHandler();
});
