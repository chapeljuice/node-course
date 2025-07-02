import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { geocode } from './utils/geocode.js';
import { forecast } from './utils/weather.js';
import express from 'express';
import hbs from 'hbs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine, views & partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// main entry point (index.hbs)
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        description: 'The weather outside is weather...',
        name: 'Ryan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ryan'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'This is some helpful text.',
        name: 'Ryan'
    });
});

app.get('/help/{*any}', (req, res) => {
    res.render('404', {
        title: 'The Help Error Page',
        text: 'This is some error text.',
        name: 'Ryan'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    } else {
        geocode({ address: req.query.address }, (data, error) => {
            if (error) {
                return res.send({
                    error: `Error getting geocode: ${error}`
                });
            }
            
            const { latitude, longitude, location } = data;
            
            forecast(latitude, longitude, location, (forecastData, error) => {
                if (error) {
                    return res.send({
                        error: `Error getting forecast: ${error}`
                    });
                }
                
                res.send({
                    forecast: forecastData,
                    location: location,
                    query: req.query.address
                });
            });
        });
    }
});

// 404 page
app.get('/{*any}', (req, res) => {
    res.render('404', {
        title: 'Error! 404',
        errorMessage: 'Page not found.',
        name: 'Ryan'
    });
});

// start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});