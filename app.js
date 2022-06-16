const API_KEY = "GTYHRu0tZQtHeRp1LrrvxI4xhXZOSRYY";
const LIMIT = 9;
const RATING = "pg";

let query = "";
let offset = 0;

async function executeRequest(query, offset) {
    const data = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${9}&offset=${offset}&rating=${RATING}&lang=en`);
    const result = await data.json();
    return result.data;
}

function updateImages(query, offset = 0) {
    executeRequest(query, offset).then((data) => {
        if (data.length === 0)
            hideBtn();
        else
            showBtn();
        
        data.forEach(({ url, title, images }) => {
            document.querySelector("#content").innerHTML += `
                <a href="${url}" target="_blank">
                    <img src="${images.original.url}" alt=${title}>
                </a>
            `;
        })
    })
}

function showBtn() {
    document.querySelector("#load-more-images-btn").classList.remove("hidden");
}

function hideBtn() {
    document.querySelector("#load-more-images-btn").classList.add("hidden");
}

function executeSearch(e) {
    e.preventDefault();
    const newQuery = document.querySelector("#search-box").value;
    if (newQuery.trim().length === 0) return;
    query = newQuery;
    document.querySelector("#content").innerHTML = "";
    updateImages(query, 0);
}

function loadMoreResults() {
    offset += 9;
    updateImages(query, offset);
}

window.onload = function() {
    document.querySelector("#search-form").addEventListener("submit", executeSearch);
}