import * as Constants from '../components/Constants';

export function fetchJSON(url) {
  return fetch(url)
    .then(response => response.json()).catch((err) => {
      console.log('OOPS! Something went wrong :( Error:' + err);
    });
}

export function fetchGeoCache(address) {
  require('dotenv').config();
  console.log(process.env.GMAPS_GEOCODE_API_KEY);
  console.log(process.env.ZOMATO_API_URL);
  return fetch(Constants.GMAPS_GEOCODE_URL + address + process.env.GMAPS_GEOCODE_API_KEY)
    .then(response => response.json()).catch((err) => {
      console.log('OOPS! Something went wrong :( Error:' + err);
    });
}
