import styles from "./HourlyForecastBox.module.css"
import sunnyIcon from "../../../../assets/icon-sunny.webp"
import fogIcon from "../../../../assets/icon-fog.webp"
import drizzleIcon from "../../../../assets/icon-drizzle.webp"
import overcastIcon from "../../../../assets/icon-overcast.webp"
import partlyCloudyIcon from "../../../../assets/icon-partly-cloudy.webp"
import rainIcon from "../../../../assets/icon-sunny.webp"
import snowIcon from "../../../../assets/icon-snow.webp"
import stormIcon from "../../../../assets/icon-storm.webp"
import {useMainContext} from "../../../../hooks/useMainContext.ts";

function HourlyForecastBox({hourlyTemp, time, weatherCode, isDay}) {
    const {measureType} = useMainContext()
    const getIcon = () => {
        if (weatherCode == null) return null;

        switch (true) {
            case weatherCode === 0:
                return <img src={isDay ? sunnyIcon : overcastIcon} className={styles.icon_img} alt="clear sky"/>;

            case weatherCode === 1 || weatherCode === 2:
                return <img src={isDay ? partlyCloudyIcon : overcastIcon} className={styles.icon_img}
                            alt="partly cloudy"/>;

            case weatherCode === 3:
                return <img src={overcastIcon} className={styles.icon_img} alt="overcast"/>;

            case weatherCode >= 45 && weatherCode <= 48:
                return <img src={fogIcon} className={styles.icon_img} alt="fog"/>;

            case weatherCode >= 51 && weatherCode <= 57:
                return <img src={drizzleIcon} className={styles.icon_img} alt="drizzle"/>;

            case weatherCode >= 61 && weatherCode <= 67:
                return <img src={rainIcon} className={styles.icon_img} alt="rain"/>;

            case weatherCode >= 71 && weatherCode <= 77:
                return <img src={snowIcon} className={styles.icon_img} alt="snow"/>;

            case weatherCode >= 80 && weatherCode <= 82:
                return <img src={rainIcon} className={styles.icon_img} alt="rain showers"/>;

            case weatherCode >= 85 && weatherCode <= 86:
                return <img src={snowIcon} className={styles.icon_img} alt="snow showers"/>;

            case weatherCode >= 95:
                return <img src={stormIcon} className={styles.icon_img} alt="thunderstorm"/>;

            default:
                return <img src={overcastIcon} className={styles.icon_img} alt="unknown weather"/>;
        }
    };

    const timeShow = () => {
        if (time === 0) {
            return `12 AM`
        }
        else if (time <= 12) {
            return `${time} AM`
        }
        else if (time > 12) {
            return `${time-12} PM`
        }
    }

    const hourlyTempCalculation = () => {
        if (measureType==="METRIC") {
            const metricMinTemp = Math.round(hourlyTemp)
            return metricMinTemp.toString()
        }
        else if (measureType==="IMPERIAL") {
            const imperialMinTemp = Math.round((hourlyTemp*1.8)+32)
            return imperialMinTemp.toString()

        }
    }

    return (
        <div className={styles.hourly_forecast_box_container}>
            <div className={styles.hourly_forecast_box_left}>
                {getIcon()}
                <p className={styles.hourly_forecast_box_time_text}>{timeShow()}</p>
            </div>
            <div className={styles.hourly_forecast_box_right}>
                <p className={styles.hourly_forecast_box_temp_text}>{hourlyTempCalculation()}°</p>
            </div>
        </div>)
}

export default HourlyForecastBox