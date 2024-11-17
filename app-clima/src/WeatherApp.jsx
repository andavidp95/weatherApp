import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

      const [city,setCity] = useState('')
      const [weatherData, setWeatherData] = useState(null)

      const url = 'https://api.openweathermap.org/data/2.5/weather'
      const API_KEY = 'YOUR_API_KEY'
      const diffKelvin = 273.15

      const fetchWeatherData = async () => {
            try {
                  const response = await fetch(`${url}?q=${city}&appid=${API_KEY}&lang=en`)
                  const data = await response.json()
                  setWeatherData(data)
            } catch (error) {
                  console.error('Error',error)
            }
      }

      const handleCityChange = (evemt) => {
            setCity(evemt.target.value)
      }

      const handleSubmit = (event) =>{
            event.preventDefault()
            fetchWeatherData()
      }


return (
      <div className="container">
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                  <input 
                  type="text" 
                  placeholder="Enter a city"
                  value={city}
                  onChange={handleCityChange}
                  />
                  <button type="submit">Find</button>
            </form>

            {weatherData && (
                  <div>
                        <h2>
                              {weatherData.name},{weatherData.sys.country}
                        </h2>
                        <p>
                              The temperature is {Math.floor(weatherData.main.temp-diffKelvin)}  °C 
                        </p>
                        <p>
                              Weather condition: {weatherData.weather[0].description}
                        </p>
                        <img
                              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                              alt={weatherData.weather[0].description}
                        />
                  </div>




            )
            }
      </div>
)
}
