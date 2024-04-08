
//const ALBUMS_ENDPOINT_URL = 
const searchParams = new URLSearchParams(location.search)
const artistId = searchParams.get('artistid')
const ARTIST_ENDPOINT_URL = `https://striveschool-api.herokuapp.com/api/deezer/artist/13`;
let songs = [];

console.table({ artistId })

window.onload = async () => {
    //if (!artistId){
      //  console.error('No artist id provided')
      //  return;
    //}

    const artistData = await getArtistDataById();
    const trackListData = await getTrakListFromId(artistData.tracklist);

    showArtistData(artistData);
    console.log(trackListData);
    trackListData.data.slice(0,5).map((track) => {
    showTrackArtist(track);
   })
    showAlbums(albumData);
    //console.log(trackListData);
    
}

async function getArtistDataById(){
    const artistUrl = ARTIST_ENDPOINT_URL;
    const artistResponse = await fetch(artistUrl);
    const artistData = await artistResponse.json();
    //console.log(artistData);
    return artistData;
}

async function getTrakListFromId(trackListUrl){
    const trackListResponse = await fetch(trackListUrl);
    const trackListData = await trackListResponse.json();
    //console.log(trackListData);
    return trackListData;
}

function showArtistData(data) {
    const artistName = document.querySelector("h1");
    artistName.innerText = data.name;
    const artisrImage = documenti.querySelector("img-artist");
    artisrImage.src = data.picture_big;
}

function showTrackArtist(data) {
    let container = document.querySelector('.container-track-artist'); 
   
        let song = data;

        let songElement = document.createElement('div');
        songElement.className = 'd-flex justify-content-between align-items-center text-white p-2';

        let leftDiv = document.createElement('div');
        leftDiv.className = 'd-flex align-items-center';

        let songNumber = document.createElement('span');
        songNumber.className = 'me-2';
        //songNumber.textContent = i + 1;

        let coverImage = document.createElement('img');
        coverImage.src = song.picture_small;
        coverImage.alt = 'Cover';
        coverImage.className = 'img-fluid me-2';
        coverImage.style.width = '40px';
        coverImage.style.height = '40px';

        let songTitle = document.createElement('span');
        songTitle.className = 'flex-grow-1 text-white';
        songTitle.innerHTML = song.title_short;

        leftDiv.append(songNumber, coverImage, songTitle);

        let rightDiv = document.createElement('div');
        rightDiv.className = 'd-flex align-items-center';

        let songPlays = document.createElement('span');
        songPlays.className = 'mx-2';
        songPlays.innerHTML = song.rank;

        let songDuration = document.createElement('span');
        songDuration.innerHTML = song.duration;

        rightDiv.append(songPlays, songDuration);

        songElement.append(leftDiv, rightDiv);

        container.append(songElement);
    
    
}


function showAlbums(albumData) {
    // qui devo sviluppare la logicca della funziona che crea la card album 
    document.querySelector('.album-container').innerHTML =  '';
    document.querySelector('.card-title').textContent = albumData.title;
    document.querySelector('.card-img-top').src = albumData.cover_medium;
    document.querySelector('.card-text').textContent = albumData.year;
    document.querySelector('.type-of-album').textContent = albumData.record_type;

    //console.log(albumData);

    const albumContainer = document.querySelector('.album-container');
    albumData.data.map((album) => {
        let albumCard = document.createElement('div');
        albumCard.className = 'card';
        albumCard.style.width = '18rem';
        albumCard.style.margin = '10px';

        albumCard.innerHTML = `
        <img src="${album.cover_medium}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${album.title}</h5>
            <p class="card-text">${album.release_date}</p>
            <a href="album.html?albumid=${album.id}" class="btn btn-primary">Go to Album</a>
        </div>
        `;

        albumContainer.appendChild(albumCard);
    });
}
