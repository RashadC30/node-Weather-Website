const request = require("request");

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicmFzaGFkYzMwIiwiYSI6ImNsOGplbGJteTAwbmwzdW8zYmVmMDhvajUifQ._meDvsUGsjRpnqO6AFr-Tw&limit=3"

// destuctured url: url -> url/ response -> {body}    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Sorry, there is a connection problem", undefined)
        }else if (body.features.length === 0) {
            callback("Error, no macthes found. Please try again", undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;