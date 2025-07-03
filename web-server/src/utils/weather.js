import request from 'postman-request';

export const forecast = (lat, long, location, callbackFn) => {
    const baseUrl = 'http://api.weatherstack.com/current';
    const weatherstackApiKey = 'd6e443dc165c626a6e37b81dc7f2db98';
    const units = 'f';
    const query = `${long},${lat}`;
    const url = `${baseUrl}?access_key=${weatherstackApiKey}&query=${query}&units=${units}`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callbackFn(undefined, `Error: ${error} Unable to connect to the weatherstack service!`);
        } else if (response.body.error) {
            callbackFn(undefined, `Error: ${response.body.error.info} Unable to find that location!`);
        } else {
            const { current } = response.body;
            callbackFn(`It's ${current.weather_descriptions[0]} in ${location}. It's currently ${current.temperature}°F, but it feels like ${current.feelslike}°F outside. The sun will set at ${current.astro.sunset.replace(/^0+/, '')} tonight.`);
        }
    });
};