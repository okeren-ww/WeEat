import * as Constants from './Constants'

export default function fetchJSON(url, func){
    fetch(url)
        .then(response => response.json())
        .then(func);
    //TODO: return fetch directly + catch + move to lib folder
}

export function fetchGeoCache(address){
    console.log("HIIII");
    //const address = restaurant.address;
    return fetch(Constants.GMAPS_GEOCODE_URL + address + Constants.GMAPS_GEOCODE_API_KEY)
        .then(response => response.json());
}
