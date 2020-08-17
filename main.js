// Active search area
const searchArea = document.getElementById("searchArea");
searchArea.addEventListener('keypress', function search(press) {
    if(press.keyCode == 13){
        getResults(searchArea.value);
    }
    }
)
// Active search btn
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener('click', function () {
    getResults(searchArea.value);
})
// Get data from api
function getResults(value) {
    fetch(`https://api.lyrics.ovh/suggest/${value}`)
    .then(response => response.json())
    .then(songs => displayResult(songs))
}
// Display result function
function displayResult(songs) {
    const allSongs = songs.data;
    const searchResult = document.getElementById("searchResult");
    for (let i = 0; i < 10; i++) {
        const title = allSongs[i].title;
        const artist = allSongs[i].artist.name;
        const album = allSongs[i].album.title;
        const albumCover = allSongs[i].album.cover;
        searchResult.innerHTML += `<div class="single-result row my-3 p-3 d-flex justify-content-between align-items-center">
                                    <div class="col-md-9">
                                        <h3 id="title">${title}</h3>
                                        <p class="author lead">Album: <span>${album}</span></p>
                                        <p>Artist: <span id="author">${artist}</span></p>
                                    </div>
                                    
                                    <div class="col-md-3 text-md-right text-center">
                                        <button class="getLyrics btn btn-success" onclick="getLyrics(this)">Get Lyrics</button>
                                    </div>
                                </div>`
    }
}
