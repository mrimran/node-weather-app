const request = require('request');

var geocodeAddress = (address, callback) => {
    var address = encodeURI(address);
    console.log(address);
    
    var reqUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}&address=${address}`;
    console.log(reqUrl);
    request({
        url: reqUrl,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback("Unable to reach google servers.");
        } else if(body.status === "OK") {
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
        } else if(body.status === "ZERO_RESULTS") {
            callback("Unable to find that address");
        }
        //console.log(JSON.stringify(body, undefined, 2));
    })
};

module.exports.geocodeAddress = geocodeAddress;

//https://api.darksky.net/forecast/262dc1321bf413c7a0f6f9728d931ff8/37.8267,-122.4233