const weatherInfo = document.querySelector('#weatherInfo');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    weatherInfo.textContent = 'Loading...';
    const location = search.value;

    fetch(`/weather?address=${location}`)
        .then(response => response.json())
        .then((data) => {
            if (data.error) {
                weatherInfo.textContent = data.error;
            } else {
                weatherInfo.textContent = data.forecast;
            }
        });
});