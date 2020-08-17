//Search Area

const searchArea = document.getElementById("searchArea");
searchArea.addEventListener('keypress', function search(press){
    if(press.keyCode == 13){
        getResults(searchArea.value);
    }
    
})

//active search Button

const searchBtn = document.getElementById('search-Btn');
searchBtn.addEventListener('click', function(){
    getResults(searchArea.value);
    
})

//display none

const lyricsArea = document.getElementById("lyricsArea");
lyricsArea.style.display ="none";

//get data from API

function getResults(value){
    fetch(`https://api.lyrics.ovh/suggest/${value}`)
    .then(res => res.json())
    .then(songs => displayResult(songs))
}

//Display result

function displayResult(songs){
    const allSong = songs.data;
    const searchResult = document.getElementById("searchResult");

    for (let i = 0; i < 10; i++) {
        const title = allSong[i].title;
        const artist = allSong[i].album.title;
        searchResult.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${title}</h3>
            <p class="author lead">Album by <span>${artist}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button id="getLyrics" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>`
    }
}
    
