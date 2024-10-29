const genres = [
    { id: 1, title: 'Dogs', imageUrl: 'genre dog.jpg' },
    { id: 2, title: 'Food', imageUrl: 'genre food.jpg' },
    { id: 3, title: 'Travel', imageUrl: 'genre travel.jpg' },
    { id: 4, title: 'University', imageUrl: 'genre uni.jpg' },
    { id: 5, title: 'GYM', imageUrl: 'genre gym.jpg' },
    { id: 6, title: 'Drawings', imageUrl: 'genre doodle.jpg' },
    { id: 7, title: 'Cartoons', imageUrl: 'genre cartoon.jpg' },
    { id: 8, title: 'Wallpapers', imageUrl: 'genre wallpaper.jpg' },
    { id: 9, title: 'Scenery', imageUrl: 'sce.jpg' },
    { id: 10, title: 'Birds', imageUrl: 'genre birds.jpg' },
    { id: 11, title: 'Cats', imageUrl: 'genre cats.jpg' },
    { id: 12, title: 'Motivational', imageUrl: 'genre motivation.jpg' },
];
const genreGrid = document.getElementById('genreGrid');
genres.forEach(genre => {
    const genreCard = document.createElement('div');
    genreCard.className = 'genre-card';
    genreCard.innerHTML = `
        <img src="${genre.imageUrl}" alt="${genre.title}">
        <div class="genre-overlay">
            <h2>${genre.title}</h2>
        </div>
    `;
    genreGrid.appendChild(genreCard);
});