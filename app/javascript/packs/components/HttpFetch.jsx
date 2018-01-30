export default function fetchJSON(url, func){
    fetch(url)
        .then(response => response.json())
        .then(func);
}
