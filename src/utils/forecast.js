const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b2f54b41faf3cd13b03abca2519afad6&query=' 
                + latitude + "," + longitude

    request({url: url}, (error, { body }) => {
        if (error){
            callback('Could not connect to ' + url, undefined)
        }else{
            const data = JSON.parse(body)
            if (data.error){
                callback('Could not obtain weather service', undefined)
            }else{
                callback(undefined, {
                    weather: data.current.weather_descriptions,
                    temperature: data.current.temperature
                })
            }
        }
    })
}

module.exports = forecast
