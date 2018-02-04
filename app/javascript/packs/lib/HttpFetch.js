import * as Constants from '../components/Constants'

export function fetchJSON(url){
    return fetch(url)
        .then(response => response.json()).catch((err) => {
            console.log("OOPS! Something went wrong :( Error:" + err);
        });
}

export function fetchGeoCache(address){
    return fetch(Constants.GMAPS_GEOCODE_URL + address + Constants.GMAPS_GEOCODE_API_KEY)
        .then(response => response.json()).catch((err) => {
            console.log("OOPS! Something went wrong :( Error:" + err);
        });
}
