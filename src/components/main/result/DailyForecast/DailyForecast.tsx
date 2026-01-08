import styles from "./DailyForecast.module.css"
import DailyForecastBox from "./DailyForecastBox.tsx";
import {useMainContext} from "../../../../hooks/useMainContext.ts";

function DailyForecast() {

    const {apiWeatherInfo, measureType} = useMainContext()
    const today = new Date();
    const dayNumber = today.getDay();

    const weeklyMinTempCalculation = () => {
        if (apiWeatherInfo) {
            return (apiWeatherInfo.daily.temperature_2m_min
            )
        } else {
            return "-"
        }
    }

    const weeklyMaxTempCalculation = () => {
        if (apiWeatherInfo) {
            return (apiWeatherInfo.daily.temperature_2m_max
            )
        } else {
            return "-"
        }
    }

    const weeklyPrecipitationCalculation
        = () => {
        if (apiWeatherInfo) {
            return (apiWeatherInfo.daily.precipitation_sum
            )
        } else {
            return "-"
        }
    }

    const weeklyWeatherCodeCalculation = () => {
        if (apiWeatherInfo) {
            return (apiWeatherInfo.daily.weather_code)
        } else {
            return "-"
        }
    }



    const daysOnWeek = (i:number) => {
        const dailyDayNumber = dayNumber + i
        if (dailyDayNumber <= 7) {
            return dailyDayNumber
        }
        return dailyDayNumber - 7
    }

    const weeklyMinTemp = weeklyMinTempCalculation()
    const weeklyMaxTemp = weeklyMaxTempCalculation()
    const weeklyPrecipitation = weeklyPrecipitationCalculation()
    const weeklyWeatherCode = weeklyWeatherCodeCalculation()



    const showBoxes = () => {
        if (weeklyMinTemp !== "-" && weeklyMaxTemp !== "-" && weeklyPrecipitation !== "-" && weeklyWeatherCode !== "-") {
            const indices = Array.from({ length: 7 }, (_, i) => i); // [0, 1, 2, 3, 4, 5, 6]

            return indices.map(i => (
                <DailyForecastBox
                    key={i}
                    minTemp={weeklyMinTemp[i]}
                    maxTemp={weeklyMaxTemp[i]}
                    day={daysOnWeek(i)}
                    measureType={measureType}
                    weatherCode = {weeklyWeatherCode[i]}
                />
            ));
        }
        return null;
    };
    return (
        <div className={styles.daily_forecast_container}>
            <h3 className={styles.daily_forecast_header_text}>Daily forecast</h3>
            <div className={styles.daily_forecast_boxes}>{showBoxes()}</div>
        </div>)
}

export default DailyForecast