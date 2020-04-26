const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app  = express()

// Define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handle bars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Willy Martinez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Willy Martinez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page for our weather report',
        title: 'Help Me',
        name: 'Willy Martinez'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address){
        return res.send({
            error: 'You must enter an address query'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error: 'Error getting geocode'
            })      
        }
    
        forecast(latitude, longitude, (error, { weather, temperature }) => {
            if (error){
                return res.send({
                    error: 'Error getting forecast'
                })
            }

            return res.send({
                address,
                location,
                longitude,
                latitude,
                weather,
                temperature
            })
        })    
    })        
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404: Page not Found',
        name: 'Willy Martinez',
        message: 'The page you are looking for in help is does not exist'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404: Page not Found',
        name: 'Willy Martinez',
        message: 'The page you are looking for everywhere does not exist'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
