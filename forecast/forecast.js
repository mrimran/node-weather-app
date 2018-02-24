const request = require('request');

var getTemprature = (lng, lat, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback(error);
        } else {
            callback(undefined, {
                temprature: body.currently.temperature
            });
        }
    });
}

module.exports.getTemprature = getTemprature;