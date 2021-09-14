const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');



// console.log('__dirname', __dirname);
// console.log('__filename', path.join(__dirname, '../public'));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // if we change name of views directory to templates
const partialsPath = path.join(__dirname, '../templates/partials'); // if we change name of partials directory to templates



// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        about: 'We provides a daily weather',
        name: 'Omar Owaini'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
      return res.send({
        error: 'Please enter address'
    })
    }
     geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error: error
      })
    } 
    forecast(latitude, longitude, (err, forecastData) => {
        if(err) {
           return res.send({
        error: error
      })
        }
    console.log(`Tempreture in ${req.query.address}`, forecastData)
    console.log(location)

    res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
    })
})
})
    
   
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Omar',
        job: 'Web Developer',
        email: 'owainiomar@gmail.com'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page for any service',
        services: 'any help'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/ar', (req, res) => {
    res.render('ar', {
        title: 'مرحبا بك في تطبيق الطقس',
        services: 'الطقس هذا اليوم',
        name: 'عمر العويني'
    })
})

app.get('*', (req, res) => {
    res.render('404')
})

// app.get('/', (req, res) => {
//     res.send('Hello Express')
// });

// app.get('/help', (req, res) => {
//     res.send([
//         {
//         name: 'Omar'
//     }, {
//         name: 'Yzn'
//     }
//     ])
// })

// const city = process.argv[2];

// app.get('/weather', (req, res) => {
//     geocode(city, (error, {latitude, longitude, location}) => {
//     if (error) {
//       return  console.log('Error', error)
//     } 
//     forecast(latitude, longitude, (err, forecastData) => {
//         if(err) {
//            return console.log('Error', err)
//         }
//         res.send({
//         temp: `Tempreture in ${city}`,
//         loc: location,
//     })
  
// })
// })
  
// })
app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})