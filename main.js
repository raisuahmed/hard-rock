
// Active search button
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener('click', function () {
    getResults(searchArea.value);
})



// Active search area
const searchArea = document.getElementById("searchArea");
searchArea.addEventListener('keypress', function search(press) {
    if(press.keyCode == 13){
        getResults(searchArea.value);
    }
    }
)

//  data from api
function getResults(value) {
    fetch(`https://api.lyrics.ovh/suggest/${value}`)
    .then(response => response.json())
    .then(songs => displayResult(songs))
}
// Display  function
function displayResult(songs) {
    const allSongs = songs.data;
    const search = document.getElementById("search-result");
    for (let i = 0; i < 10; i++) {
        const title = allSongs[i].title;
        const artist = allSongs[i].artist.name;
        const album = allSongs[i].album.title;
        const albumCover = allSongs[i].album.cover;
        search.innerHTML += `<div class="single-result row my-3 p-3 d-flex justify-content-between align-items-center">
                                    <div class="col-md-9">
                                        <h2 id="title">${title}</h2>
                                        <p class="author lead">Album: <span>${album}</span></p>
                                        <p>Artist: <span id="artist">${artist}</span></p>
                                    </div>
                                    
                                    <div class="col-md-3 text-md-right text-center">
                                        <button class="get-lyrics btn btn-success" onclick="getLyrics(this)">Get Lyrics</button>
                                    </div>
                                </div>`
    }
}

// hide lyrics
function hide() {
    const displayArea = document.getElementById("lyrics-area");
    displayArea.remove();
}


// get lyrics
function getLyrics(btn) {
const getLyrics = document.getElementsByClassName("get-lyrics");
for (let i = 0; i < getLyrics.length; i++) {
    if (btn == getLyrics[i]) {
    const artist = document.getElementById("artist").innerHTML;
    const title = document.getElementById("title").innerHTML;
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(function displayResult(lyric) {
        const currentLyric = lyric.lyrics;
        const displayArea = document.getElementById("lyrics-area");
        displayArea.innerHTML = `<button class="btn go-back btn-success" onclick="hide()">Go-Back</button>
                                <h2 class="text-success mb-4">${title}</h2>
                                <pre class="lyric text-white">${currentLyric}</pre>`
      })
    .catch(error => console.log(error))
    }
}
}

