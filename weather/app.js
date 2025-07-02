import { geocode } from './utils/geocode.js';
import { forecast } from './utils/weather.js';

const address = process.argv[2];

if (!address) {
    console.log('Please provide an address');
} else {
    geocode({ address }, (data, error) => {
        if (error) {
            return console.log(`Error: ${error}`);
        }

        const { latitude, longitude, location } = data;
        
        forecast(latitude, longitude, location, (forecastData, error) => {
            if (error) {
                return console.log(`Error: ${error}`);
            }
            
            console.log(forecastData);
        });
    });
}