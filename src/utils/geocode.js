const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2dtYXJ0aW5leiIsImEiOiJjazlleWxiN3kwN2huM3JwZjh1eHBxcTV3In0.NRFaWRruIsk2FkMCF9ztSg&limit=1'

    request({ url: url}, (error, response) => {
        if (error) {
            callback('Unable to connect to geo service!', undefined)
        } else {
            const data = JSON.parse(response.body)
            const features = data.features
            if (features.length === 0) {
                callback('Unable to locate geo!', undefined)
            } else {
                callback(undefined, {
                    location: features[0].place_name,
                    latitude: features[0].center[1],
                    longitude: features[0].center[0]
                })
            }
        }
    })
}

module.exports = geocode