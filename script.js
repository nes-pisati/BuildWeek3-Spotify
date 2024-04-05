const ENDPOINT = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let lastScrollPosisition = 0;

const search = async () => {
    const inputValue = document.querySelector("#searchField").value;
    console.log(inputValue);
     
    try {
        const response = await fetch(ENDPOINT + inputValue);
        const data = await response.json();
        console.log(data)
        const artistID = data.data[0].artist.id;

        window.location.href = `./artist.html?artistid=${artistID}`;

    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("scroll", () => {
    let currentScrollPosition = window.scrollY;
    const div = document.querySelector("#fixedDiv")
    if(currentScrollPosition > lastScrollPosisition && currentScrollPosition > 100) {
        div.classList.add("transition");
    } else {
        div.classList.remove("transition");
    } 
    console.log(currentScrollPosition)
})