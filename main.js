/*
    OpenWeather API - Usage
    Project for ALBBW - FIAN19-1
    Developer: Altar#8020, AltariasMainAccount
*/

// Load Module for weather usage
// Custom Module - Cannot be downloaded
const weather = require('./modules/weatherdata');
// Axios
const axios = require('axios');

// Setup dotenv module to read API Key from environment file
const dotenv = require('dotenv');
dotenv.config();

// Set Constant for time
const interval_time = 5000;

// Constant for the format of the data
let data = {
    "tn": "ph",
    "sensorOrt": "ph",
    "sensorTemp": "ph",
    "sensorTimestamp": 0,
    "postTimestamp": 0
}
   
// Setup weather module for usage
weather.setLocation("Berlin");
weather.setLang("de")
weather.setUnits("metric");

// Set the API Key using dotenv
weather.setKey(process.env.API_KEY);

// Start getting temperatures
console.log('\"Zeitstempel\", \"Standort\", \"Temperatur in [°C]\"')
setInterval(() => {
    (async () => {
        // Set the variables for the data
        let wData;
        let unixStamp = Date.now();
        let fullJSON = data;
        let url = "https://us-central1-mytestapp-eb6c7.cloudfunctions.net/wetterdaten"

        // Get the data from the internet
        wData = await weather.g_getObj();
        console.log(`"${wData.dt}", "${wData.name}", "${wData.main.temp}"`);

        // Prepare to send it to the API
        fullJSON.postTimestamp = unixStamp;
        fullJSON.sensorOrt = wData.name;
        fullJSON.sensorTimestamp = wData.dt;
        fullJSON.sensorTemp = wData.main.temp;
        fullJSON.tn = "NP";

        // Send it to the API using Axios
        axios.post(url, fullJSON)
        // Return the Response as a console log
            .then(function (response) {
                // handle success
                console.log(response.data.message);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    })()
}, interval_time);
