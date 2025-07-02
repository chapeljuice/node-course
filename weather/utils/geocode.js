import request from 'postman-request';

export const geocode = (data, callbackFn) => {
    const { address, latQuery, longQuery } = data;

    const encodedAddress = encodeURIComponent(address);
    const mapboxToken = 'pk.eyJ1IjoiY2hhcGVsanVpY2UiLCJhIjoiY21jOWFxMmF0MWlpZDJtcHhzbG9qMWU2MiJ9.erPzXPHadt4EnmOJd1pDMw';
    const mapboxUrl = `https://api.mapbox.com/search/geocode/v6/forward?limit=1&access_token=${mapboxToken}&q=${encodedAddress}`;

    request({ url: mapboxUrl, json: true }, (error, response) => {
        if (error) {
           return callbackFn('Unable to connect to the mapbox service!');
        }
        
        if (response?.body?.features?.length === 0) {
           return callbackFn('Unable to find location!');
        }
         
        const { features } = response.body;
        const latLong = features[0]?.geometry?.coordinates || [latQuery, longQuery];
        const loc = features[0]?.properties?.name_preferred || address;
        const data = {
            latitude: latLong[0],
            longitude: latLong[1],
            location: loc,
        }
        callbackFn(data);
    });
};