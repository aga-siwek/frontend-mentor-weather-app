import styles from "./TodayWeatherInfo.module.css"
import TodayWeatherInfoBox from "./TodayWeatherInfoBox.tsx";

function TodayWeatherInfo({openMeteoWeatherInfo, measureType}) {

    const feelsLikeCalculation = () => {
        if (openMeteoWeatherInfo) {
            if (measureType === "METRIC") {
                const metricFeelsLike = Math.round(openMeteoWeatherInfo.current.apparent_temperature)
                return (`${metricFeelsLike.toString()}°`)
            } else if (measureType === "IMPERIAL") {
                const metricFeelsLike = openMeteoWeatherInfo.current.apparent_temperature
                const imperialFeelsLike = Math.round((metricFeelsLike * 1.8) + 32)
                return (`${imperialFeelsLike.toString()}°`)
            }
        } else {
            return "-"
        }
    }

    const humidityCalculation = () => {
        if (openMeteoWeatherInfo) {
            return (`${openMeteoWeatherInfo.current.relative_humidity_2m}%`
            )
        } else {
            return "-"
        }
    }

    const windSpeedCalculation = () => {
        if (openMeteoWeatherInfo) {
            if (measureType === "METRIC") {
                const metricWindSpeed = Math.round(openMeteoWeatherInfo.current.wind_speed_10m)
                return (`${metricWindSpeed} km/h`)
            } else if (measureType === "IMPERIAL") {
                const metricWindSpeed = openMeteoWeatherInfo.current.wind_speed_10m
                const imperialWindSpeed = Math.round(metricWindSpeed * 0.621371)
                return (`${imperialWindSpeed} mph`)
            }
        } else {
            return "-"
        }
    }

    const precipitationCalculation = () => {
        if (openMeteoWeatherInfo) {
            if (measureType === "METRIC") {
                const metricPrecipitation = Math.round(openMeteoWeatherInfo.current.precipitation)
                return (`${metricPrecipitation}  mm`
                )
            } else if (measureType === "IMPERIAL") {
                const metricPrecipitation = openMeteoWeatherInfo.current.precipitation
                const imperialPrecipitation = Math.round(metricPrecipitation * 0.03937)
                return (`${imperialPrecipitation}  in`)
            }
        } else {
            return "-"
        }
    }

    const feelsLike = feelsLikeCalculation()
    const humidity = humidityCalculation()
    const windSpeed = windSpeedCalculation()
    const precipitation = precipitationCalculation()


    return (
        <div className={styles.today_weather_info_container}>
            <TodayWeatherInfoBox boxHeader="Feels Like" boxResult={feelsLike}/>
            <TodayWeatherInfoBox boxHeader="Humidity" boxResult={humidity}/>
            <TodayWeatherInfoBox boxHeader="Wind" boxResult={windSpeed}/>
            <TodayWeatherInfoBox boxHeader="Precipitation" boxResult={precipitation}/>
        </div>)
}

export default TodayWeatherInfo