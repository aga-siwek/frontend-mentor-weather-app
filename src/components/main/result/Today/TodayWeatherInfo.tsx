import styles from "./TodayWeatherInfo.module.css"
import TodayWeatherInfoBox from "./TodayWeatherInfoBox.tsx";
import {useMainContext} from "../../../../hooks/useMainContext.ts";

function TodayWeatherInfo() {

    const {apiWeatherInfo, measureType} = useMainContext()
    const feelsLikeCalculation = () => {
        if (apiWeatherInfo?.current) {
            if (measureType === "METRIC") {
                const metricFeelsLike = Math.round(apiWeatherInfo.current.apparent_temperature)
                return (`${metricFeelsLike.toString()}°`)
            } else if (measureType === "IMPERIAL") {
                const metricFeelsLike = apiWeatherInfo.current.apparent_temperature
                const imperialFeelsLike = Math.round((metricFeelsLike * 1.8) + 32)
                return (`${imperialFeelsLike.toString()}°`)
            }
        } else {
            return "-"
        }
    }

    const humidityCalculation = () => {
        if (apiWeatherInfo?.current) {
            return (`${apiWeatherInfo.current.relative_humidity_2m}%`
            )
        } else {
            return "-"
        }
    }

    const windSpeedCalculation = () => {
        if (apiWeatherInfo?.current) {
            if (measureType === "METRIC") {
                const metricWindSpeed = Math.round(apiWeatherInfo.current.wind_speed_10m)
                return (`${metricWindSpeed} km/h`)
            } else if (measureType === "IMPERIAL") {
                const metricWindSpeed = apiWeatherInfo.current.wind_speed_10m
                const imperialWindSpeed = Math.round(metricWindSpeed * 0.621371)
                return (`${imperialWindSpeed} mph`)
            }
        } else {
            return "-"
        }
    }

    const precipitationCalculation = () => {
        if (!apiWeatherInfo?.current) {
            return "-"
        }
        else if (measureType === "METRIC") {
            const metricPrecipitation = Math.round(apiWeatherInfo.current.precipitation)
            return (`${metricPrecipitation}  mm`
            )
        } else if (measureType === "IMPERIAL") {
            const metricPrecipitation = apiWeatherInfo.current.precipitation
            const imperialPrecipitation = Math.round(metricPrecipitation * 0.03937)
            return (`${imperialPrecipitation}  in`)
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