document.getElementById("search-btn").addEventListener("click", function() {
    const query = document.getElementById("search-bar").value;
    searchAnime(query);
});

async function searchAnime(query) {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw`);
    if (response.ok) {
        const data = await response.json();
        displayResults(data.data);
    } else {
        document.getElementById("anime-results").innerHTML = "<p>No results found.</p>";
    }
}

function displayResults(animeList) {
    const resultsContainer = document.getElementById("anime-results");
    resultsContainer.innerHTML = "";
    
    animeList.forEach(anime => {
        const animeItem = document.createElement("div");
        animeItem.className = "anime-item";
        animeItem.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
        `;
        resultsContainer.appendChild(animeItem);
    });
}
