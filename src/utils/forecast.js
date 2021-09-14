
const request = require('request');


const forecast = (latitude, longitude, callback) => {

const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +'&lon=' + longitude + '&units=metric&exclude=daily&appid=549317051a2cac3430ad7df652d3f716';

 request({url, json: true}, (err, {body}) => {
      if(err) {
        callback('Unable to connect to weather services', undefined)

    } else if (body.err) {
        callback('Unable to find location. Try another search', undefined)
    } else {
        callback(undefined, body.current.temp)
    }
 })
}


module.exports = forecast;