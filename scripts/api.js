import { YT_API_KEY, YT_API_BASE } from "./config.js";

export async function searchYouTube(query) {
  const url = `${YT_API_BASE}/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${YT_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error?.message || "Erreur API");

  return data.items;
}

export function initSearchHandler() {
  const btn = document.getElementById("search-btn");
  btn.addEventListener("click", async () => {
    const query = document.getElementById("search-input").value.trim();
    if (!query) return;

    try {
      const results = await searchYouTube(query);
      import("./dom.js").then(({ renderVideoResults }) => {
        renderVideoResults(results);
      });
    } catch (err) {
      alert("Erreur lors de la recherche : " + err.message);
    }
  });
}
