const ENDPOINT = "https://striveschool-api.herokuapp.com/api/deezer/album/74495"
//Al click sul link dell'album nella pagina di Samuele recupero ID e inserisco in variabile

//Nel campo Album title inserisco il dato preso dall'ID
//Nel campo Album cover inserisco immagine medium


const getAlbum = async() => {

    try {
        const response = await fetch(ENDPOINT);
        const data = await response.json();
    
        console.log(data);
        return data

    } catch (error) {
        console.error("Errore nel caricamento dei dati")
    }
}


const songContainer = document.getElementById("songContainer")

//console.log(albumTitle, songContainer);

function showSongs(data) {
    document.getElementById("albumTitle").textContent = data.title;
    document.getElementById("albumCover").src = data.cover_medium;
    document.getElementById("artistName").textContent = data.artist.name
    const songs = data.tracks.data

    console.log(songs);
    
    songs.forEach((song, i) => {
    
            songContainer.innerHTML += `
            <tr>
                <th scope="row" class="list-play-button">${i+1}</th>
                <td class="list-song-title">${song.title}<br><span class="list-artist-name">${song.artist.name}</span></td>
                <td class="list-play-button">
                    <audio controls>
                        <source src=${song.preview}>
                    </audio>
                </td>
                <td>${song.duration}</td>
            </tr>
            `
    });
}

window.onload = async() => {
    showSongs(await getAlbum())
}

/*function playSong(song) {
    document.getElementsByClassName("list-play-button").innerHTML = `
        <audio controls>
            <source src=${song}>
        </audio>
    `
}*/
