export function initSearchHandler() {
  const btn = document.getElementById("search-btn");
  btn.addEventListener("click", () => {
    const query = document.getElementById("search-input").value;
    alert(`Tu cherches : ${query} — API pas encore connectée`);
  });
}
