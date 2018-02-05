const { environment } = require('@rails/webpacker');
const webpack = require('webpack');
const dotenv = require('dotenv');

const dotenvFiles = [
  '.env',
];
dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true });
});

environment.plugins.set('Environment', new webpack.EnvironmentPlugin(['GMAPS_API_KEY', 'GMAPS_GEOCODE_API_KEY',
  'SERVER_URL', 'SERVER_PORT', 'RESTAURANTS_URL', 'CUISINES_URL']));

module.exports = environment;
