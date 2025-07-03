# Weather App

A real-time weather application built with Node.js, Express, and Handlebars that provides current weather information for any location worldwide.

## 🌟 Features

- **Real-time Weather Data**: Get current temperature, weather conditions, and "feels like" temperature
- **Geocoding**: Convert addresses to coordinates using Mapbox API
- **Weather Forecasting**: Retrieve weather data using Weatherstack API
- **Responsive Web Interface**: Clean, modern UI built with Handlebars templates
- **Error Handling**: Comprehensive error handling for API failures and invalid locations
- **Live Deployment**: Deployed on Heroku for public access

## 🚀 Live Demo

Visit the live application: [Weather App on Heroku](https://chapel-weather-app-fe5d57a4a7f7.herokuapp.com/)

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Handlebars (HBS), HTML5, CSS3, JavaScript
- **APIs**: 
  - [Weatherstack API](https://weatherstack.com/) - Weather data
  - [Mapbox Geocoding API](https://www.mapbox.com/) - Address to coordinates conversion
- **Deployment**: Heroku
- **Development**: Nodemon for auto-restart

## 📁 Project Structure

```
web-server/
├── src/
│   ├── app.js              # Main Express server
│   └── utils/
│       ├── geocode.js      # Geocoding functionality
│       └── weather.js      # Weather API integration
├── templates/
│   ├── views/              # Handlebars templates
│   │   ├── index.hbs       # Main weather page
│   │   ├── about.hbs       # About page
│   │   ├── help.hbs        # Help page
│   │   └── 404.hbs         # Error page
│   └── partials/           # Reusable template parts
│       ├── header.hbs      # Site header
│       └── footer.hbs      # Site footer
├── public/                 # Static assets
│   ├── css/
│   │   └── styles.css      # Application styles
│   ├── js/
│   │   └── scripts.js      # Frontend JavaScript
│   └── images/             # Site images
├── package.json            # Dependencies and scripts
└── package-lock.json       # Locked dependency versions
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chapeljuice/node-course.git
   cd node-course/web-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API keys**
   
   You'll need to obtain API keys for the following services:
   
   - **Weatherstack API**: Sign up at [weatherstack.com](https://weatherstack.com/)
   - **Mapbox API**: Sign up at [mapbox.com](https://www.mapbox.com/)
   
   Update the API keys in the respective utility files:
   - `src/utils/weather.js` - Replace `weatherstackApiKey`
   - `src/utils/geocode.js` - Replace `mapboxToken`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## 📖 Usage

### Web Interface

1. Open the application in your browser
2. Enter a location (city, address, or landmark) in the search box
3. Click "Search" to get current weather information
4. View the weather details including temperature, conditions, and sunset time

### API Endpoints

#### GET `/weather`
Get weather information for a specific location.

**Query Parameters:**
- `address` (required): The location to get weather for

**Example Request:**
```
GET /weather?address=New York
```

**Example Response:**
```json
{
  "forecast": "It's Partly cloudy in New York, NY. It's currently 72°F, but feels a bit cooler (68°F) outside. The sun will set at 8:15 PM tonight.",
  "location": "New York, NY",
  "query": "New York"
}
```

**Error Response:**
```json
{
  "error": "You must provide an address."
}
```

#### Other Endpoints
- `GET /` - Main weather page
- `GET /about` - About page
- `GET /help` - Help page
- `GET /*` - 404 error page

## 🔧 Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

### Environment Variables

For production deployment, set the following environment variables:
- `PORT` - Server port (defaults to 3000)

## 🌐 Deployment

This application is deployed on Heroku. The deployment process includes:

1. **Automatic builds** from the main branch
2. **Node.js buildpack** for runtime environment
3. **Production optimizations** including dependency pruning

### Deployment URL
https://chapel-weather-app-fe5d57a4a7f7.herokuapp.com/

## 🔒 API Keys and Security

⚠️ **Important**: The current implementation includes hardcoded API keys for demonstration purposes. In a production environment, you should:

1. Store API keys as environment variables
2. Use environment-specific configuration
3. Implement proper API key rotation
4. Add rate limiting and request validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Ryan Chapel** - Weather App Developer

## 🙏 Acknowledgments

- [Weatherstack](https://weatherstack.com/) for weather data API
- [Mapbox](https://www.mapbox.com/) for geocoding services
- [Express.js](https://expressjs.com/) for the web framework
- [Handlebars](https://handlebarsjs.com/) for templating
- [Heroku](https://heroku.com/) for hosting

---

**Note**: This is a learning project built as part of a Node.js course. The application demonstrates real-world web development concepts including API integration, error handling, and deployment. 