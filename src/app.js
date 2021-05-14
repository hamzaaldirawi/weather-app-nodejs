const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/gecode')
const forecast = require('./utils/forecast')
// when we want to let express watch js, and hbs files 
// we use: nodemon src/app.js -e js,hbs 
// use nodemon from main dir and point to subdir from terminal

// const hbs used when we want to create partial (header, footer) in pages 
// so we need to config hbs
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000 

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // change hbs direm views for templatesctory fro or whatever you want
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebar enginge and views location
app.set('view engine', 'hbs') // dynamic template
// hbs is easy way to integrate handlebars with express
app.set('views', viewsPath) // to let express know where hbs views folder you changed
// config partials hbs 
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath)) // put imgs, css, and js here 

app.get('', (req, res) => {
    res.render('index', {
        // all value want to get access between node and hbs
        title: 'Weather App',
        name: 'Hamza'

    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Hamza'
    }) // as same as static but can dynamic by entering object.value
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: "Don't worry we'll be in touch soon",
        title: 'Help',
        name: 'Hamza'
    })
})
//to render page for spefic path after path 
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help msg not found',
        title: 'Page Not Found',
        name: 'Hamza'
    })
})

// Config endpoint to accept value (address)
app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'No address provided'
        })
    } 
    geocode(address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } 
    
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
    
            res.send({
                Address: address,
                Location: location,
                Forecast: forecastData
            })
        })
    })
})


// For 404 page
app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page not found',
        title: 'Page Not Found',
        name: 'Hamza'
    })
})

app.listen(port, () => {
    console.log(`Server start on ${port}`)
})

// to access page dm.com/about.html for example
// if you want dm.com/about/ you have to use path.join with folder

/*
// Currently didn't work because I used app.use instead to serve static
app.get('', (req, res) => {
    // for root/Home page
    res.send()
})

app.get('/help', (req, res) => {
    // for url/help 
    res.send({
        name: 'Hamza',
        age: 30
    })
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: '30 degree',
        location: 'Istanbul'
    })
})
*/
