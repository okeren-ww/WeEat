
export const SERVER_URL = 'http://localhost';
export const SERVER_PORT = '3000';
export const RESTAURANTS_URL = SERVER_URL + ':' + SERVER_PORT + '/restaurants.json';
export const CUISINES_URL = SERVER_URL + ':' + SERVER_PORT + '/cuisines.json';
export const GMAPS_API_KEY = 'AIzaSyAbWsYd03RL-T_1VZW5wU7Zod2u9H3QIXM';
export const GMAPS_URL_MISC = '&v=3.exp&libraries=geometry,drawing,places';
export const GMAPS_URL = 'https://maps.googleapis.com/maps/api/js?key=' + GMAPS_API_KEY + GMAPS_URL_MISC;
export const GMAPS_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
export const GMAPS_GEOCODE_API_KEY = '&key=AIzaSyCfRqlxOlUbqTFVK41mkcD60JcLOGVv4X8';
export const NEW_YORK_LAT = 40.734;
export const NEW_YORK_LON = -74;
export const DEFAULT_MAP_ZOOM = 13;
export const DEFAULT_DELIVERY_TIME = 15;