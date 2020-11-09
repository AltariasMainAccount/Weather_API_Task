/*
    OpenWeather API - Usage
    Project for ALBBW - FIAN19-1
    Developer: Altar#8020, AltariasMainAccount
*/

// Load Module for weather usage
// Custom Module - Cannot be downloaded
const weather = require('./modules/weatherdata');

// Setup dotenv module to read API Key from environment file
const dotenv = require('dotenv');
dotenv.config();

// Set Constant for time
const interval_time = 60000;

// Setup weather module for usage
weather.setLocation("Berlin");
weather.setLang("de")
weather.setUnits("metric");

// Set the API Key using dotenv
weather.setKey(process.env.API_KEY);

// Start getting temperatures
console.log('\"Zeitstempel\", \"Standort\", \"Temperatur in [°C]\"')
setInterval(() => {
    let wData;
    (async () => {
        wData = await weather.g_getObj();
        console.log(`"${wData.dt}", "${wData.name}", "${wData.main.temp}"`);
    })()
}, interval_time);