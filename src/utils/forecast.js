const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=fcc5eb5487a1c41162a6bea74c7ec84e&query=" + latitude + "," + longitude + "&units=f";

// destuctured url: url -> url/ response -> {body}
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        }else if (body.error) {
            callback("Sorry, cannot find location. Please try again", undefined);
        }else  {
            callback (undefined, "Its " + body.current.weather_descriptions[0] + " out. It is currently " 
                    + body.current.temperature + " degrees out. It feels like " + 
                    body.current.feelslike + " degrees with a humidity of " + body.current.humidity + ".")
        }    
    })
}





module.exports = forecast;