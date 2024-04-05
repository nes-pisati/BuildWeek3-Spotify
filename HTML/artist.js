const ARTIST_ENDPOINT_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/13"
const searchParams = new URLSearchParams(location.search)
const artistId = searchParams.get('id')
let songs = [];

console.table({ artistId })

window.onload = async () => {
    const url = ARTIST_ENDPOINT_URL + String(artistId)

    const response = await fetch(url)
    const data = await response.json()

    console.log(data);

    showArtistData(data);
    showTrackArtist(data);


}

function showArtistData(data) {
    const artistName = document.querySelector("h1");
    artistName.innerText = data.name;
}

function showTrackArtist(data) {
    let container = document.querySelector('.container-track-artist'); 

    for (let i = 0; i < 5; i++) 
    {
        let song = data[i];

        let songElement = document.createElement('div');
        songElement.className = 'd-flex justify-content-between align-items-center text-white p-2';

        let leftDiv = document.createElement('div');
        leftDiv.className = 'd-flex align-items-center';

        let songNumber = document.createElement('span');
        songNumber.className = 'me-2';
        songNumber.textContent = i + 1;

        let coverImage = document.createElement('img');
        coverImage.src = data.picture_small;
        coverImage.alt = 'Cover';
        coverImage.className = 'img-fluid me-2';
        coverImage.style.width = '40px';
        coverImage.style.height = '40px';

        let songTitle = document.createElement('span');
        songTitle.className = 'flex-grow-1 text-white';
        songTitle.innerHTML = data.title_short;

        leftDiv.append(songNumber, coverImage, songTitle);

        let rightDiv = document.createElement('div');
        rightDiv.className = 'd-flex align-items-center';

        let songPlays = document.createElement('span');
        songPlays.className = 'mx-2';
        songPlays.innerHTML = data.rank;

        let songDuration = document.createElement('span');
        songDuration.innerHTML = data.duration;

        rightDiv.append(songPlays, songDuration);

        songElement.append(leftDiv, rightDiv);

        container.append(songElement);
    }
}
