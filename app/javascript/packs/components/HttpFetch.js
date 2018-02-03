import * as Constants from './Constants'

export function fetchJSON(url, func){
    fetch(url)
        .then(response => response.json())
        .then(func);
    //TODO: return fetch directly + catch + move to lib folder
}

export function fetchGeoCache(address){
    return fetch(Constants.GMAPS_GEOCODE_URL + address + Constants.GMAPS_GEOCODE_API_KEY)
        .then(response => response.json());
}
