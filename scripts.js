async function searchAnime() {
    const query = document.getElementById('anime-search').value;
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
        const anime = data.data[0];
        displayAnime(anime);
    } else {
        document.getElementById('anime-details').innerHTML = '<p>No results found.</p>';
    }
}

function displayAnime(anime) {
    const details = `
        <div class="anime-details">
            <div class="anime-card">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            </div>
            <div class="anime-info">
                <h2>${anime.title}</h2>
                <p><strong>Release Date:</strong> ${anime.aired.string}</p>
                <p><strong>Rating:</strong> ${anime.score}</p>
                <p>${anime.synopsis}</p>
                <div class="stream-links">
                    <a href="https://www.crunchyroll.com/search?q=${anime.title}" class="crunchyroll-icon" target="_blank"></a>
                    <a href="https://www.funimation.com/shows/?q=${anime.title}" class="funimation-icon" target="_blank"></a>
                    <a href="https://www.netflix.com/search?q=${anime.title}" class="netflix-icon" target="_blank"></a>
                </div>
                <button onclick="scheduleAnime('${anime.title}')">Schedule for Later</button>
            </div>
        </div>
    `;
    document.getElementById('anime-details').innerHTML = details;
}

function scheduleAnime(title) {
    alert(`${title} has been added to your watch list!`);
}
