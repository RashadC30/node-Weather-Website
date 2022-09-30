const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()
const port = process.env.PORT || 3000
const address = process.argv[2]

// Define path
const publicPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, '../partials')

// Setup for handlebars(hbs) engine
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup for static directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'How is the Weather',
        name: 'Rashad Clement',
        starting_point: "Where Are We Searching?"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rashad Clement',
        about_me: 'Guess who...',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need HELP?',
        name: 'Rashad Clement',
        contact_me: ' email:',
    })
})


app.get('/weather', (req, res) => { 
    if(!req.query.address) {
        return res.send({
            Error: "Please provide an address"
        })
    
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
    
        forecast( latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log(error);
            }
    
            res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
        })
    })
    console.log(req.query.address);

})

app.get('/help/*', (req, res) => {
    res.render("error", {
        title:'404 Page',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render("error", {
        title:'404 page',
        errorMessage: "Page Not Found"
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})