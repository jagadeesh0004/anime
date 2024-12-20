document.addEventListener('DOMContentLoaded', function() {
    const animeList = document.getElementById('anime-list');
    const addButton = document.getElementById('add-anime-button');

    addButton.addEventListener('click', function() {
        const animeName = document.getElementById('anime-name').value.trim();

        if (animeName) {
            // Check if anime is already in the list
            if (isAnimeInList(animeName)) {
                alert('Anime is already in the list');
            } else {
                fetchAnimeData(animeName);
                document.getElementById('anime-name').value = ''; // Clear the input field
            }
        }
    });

    function fetchAnimeData(animeName) {
        const apiUrl = `https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(animeName)}&limit=1`;

        fetch(apiUrl, {
            headers: {
                'X-MAL-CLIENT-ID': 'YOUR_CLIENT_ID' // Replace with your MyAnimeList API client ID
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data && data.data.length > 0) {
                    const animeId = data.data[0].node.id;
                    fetchAnimeDetails(animeId);
                } else {
                    alert('Anime not found');
                }
            })
            .catch(error => {
                console.error('Error fetching anime data:', error);
                alert('Failed to fetch anime data. Please try again later.');
            });
    }

    function fetchAnimeDetails(animeId) {
        const apiUrl = `https://api.myanimelist.net/v2/anime/${animeId}`;

        fetch(apiUrl, {
            headers: {
                'X-MAL-CLIENT-ID': 'YOUR_CLIENT_ID' // Replace with your MyAnimeList API client ID
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(anime => {
                if (anime) {
                    addAnimeCard(anime);
                } else {
                    alert('Anime details not found');
                }
            })
            .catch(error => {
                console.error('Error fetching anime details:', error);
                alert('Failed to fetch anime details. Please try again later.');
            });
    }

    function addAnimeCard(anime) {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');

        const img = document.createElement('img');
        img.src = anime.main_picture.medium;
        img.alt = anime.title;

        const animeDetails = document.createElement('div');
        animeDetails.classList.add('anime-details');

        const animeTitle = document.createElement('h2');
        animeTitle.textContent = anime.title;

        const animeSynopsis = document.createElement('p');
        animeSynopsis.innerHTML = `<strong>Synopsis:</strong> ${anime.synopsis}`;

        const seenButton = document.createElement('button');
        seenButton.classList.add('seen-button');
        seenButton.textContent = 'Mark as Seen';
        seenButton.addEventListener('click', function() {
            if (this.textContent === 'Mark as Seen') {
                this.textContent = 'Seen';
                this.style.backgroundColor = '#32cd32';
            } else {
                this.textContent = 'Mark as Seen';
                this.style.backgroundColor = '#ff4500';
            }
        });

        animeDetails.appendChild(animeTitle);
        animeDetails.appendChild(animeSynopsis);
        animeDetails.appendChild(seenButton);

        animeCard.appendChild(img);
        animeCard.appendChild(animeDetails);

        animeList.appendChild(animeCard);
    }

    function isAnimeInList(animeName) {
        const animeCards = animeList.querySelectorAll('.anime-card');
        for (let animeCard of animeCards) {
            const titleElement = animeCard.querySelector('h2');
            if (titleElement.textContent.trim().toLowerCase() === animeName.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
});