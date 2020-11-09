let http = require('http');
let axios = require('axios');

let config = {
    location: "Berlin",
    units: "metric",
    lang: "de",
    key: "placeholder",
}

module.exports = {
    // setter
    setLocation: function (str) {
        config.location = str;
    },
    setUnits: function (str) {
        config.units = str;
    },
    setLang: function (str) {
        config.lang = str;
    },
    setKey: function (str) {
        config.key = str;
    },
    // Global Getter
    g_getObj: async function () {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${config.location}&units=${config.units}&lang=${config.lang}&appid=${config.key}`;
        const resp = await axios.get(url);
        let data = resp.data;
        return data;
    }
}