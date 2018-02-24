require('dotenv').config();

const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

const argv = yargs
.options({//argument options
    address: {
        demand: true,
        alias: 'a',
        'describe': 'Address to fetch weather for',
        string: true//always parse this option as string instead of number or boolean
    }
})
.help()//adding help flag
.alias('help', 'h')//setting up alias for help
.argv;

console.log(argv);

geocode.geocodeAddress(argv.address, (error, results) => {
    if(error) {
        console.log(error);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        forecast.getTemprature(results.lng, results.lat, (tempErr, tempRes) => {
            if(tempErr) {
                console.log(tempErr);
            } else {
                console.log("Temprature: ", tempRes.temprature);
            }
        });
    }
});