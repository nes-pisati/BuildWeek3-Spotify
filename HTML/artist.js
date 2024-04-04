const ENDPOINT = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

const params = new URLSearchParams(window.location.search);
let id = params.get('id');

window.onload = async () => {
    const fetch = await fetch(`${ENDPOINT}${id}`);
    const artist = await fetch.json();
    console.log(artist);
}