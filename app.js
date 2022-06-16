const API_KEY = "YOUR_API_KEY";
const LIMIT = 9;
const RATING = "pg";

let query = "";
let offset = 0;
let hasSearched = false;

async function executeRequest(request) {
    const data = await fetch(`https://api.giphy.com/v1/gifs${request}`);
    const result = await data.json();
    return result.data;
}

function updateImages(data) {
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
    });
}

function executeSearchRequest(query, offset = 0) {
    executeRequest(`/search?api_key=${API_KEY}&q=${query}&limit=${9}&offset=${offset}&rating=${RATING}&lang=en`).then(updateImages);
}

function executeTrendingRequest(offset = 0) {
    executeRequest(`/trending?api_key=${API_KEY}&limit=${9}&offset=${offset}&rating=${RATING}&lang=en`).then(updateImages);
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
    offset = 0;
    hasSearched = true;
    query = newQuery;
    document.querySelector("#content").innerHTML = "";
    executeSearchRequest(query, offset);
}

function loadMoreResults() {
    offset += 9;
    if (hasSearched) {
        executeSearchRequest(query, offset);
    } else {
        executeTrendingRequest(offset);
    }
}

window.onload = function() {
    executeTrendingRequest();
    document.querySelector("#search-form").addEventListener("submit", executeSearch);
}