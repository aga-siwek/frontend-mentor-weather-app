import styles from "./HourlyForecastBox.module.css"
import sunnyIcon from "../../../../assets/icon-sunny.webp"
import fogIcon from "../../../../assets/icon-fog.webp"
import drizzleIcon from "../../../../assets/icon-drizzle.webp"
import overcastIcon from "../../../../assets/icon-overcast.webp"
import partlyCloudyIcon from "../../../../assets/icon-partly-cloudy.webp"
import rainIcon from "../../../../assets/icon-sunny.webp"
import snowIcon from "../../../../assets/icon-snow.webp"
import stormIcon from "../../../../assets/icon-storm.webp"


function HourlyForecastBox ({hourlyTemp, time, weatherCode, isDay: isDays}) {
    console.log("time", time)
    console.log("isday", isDays)
    console.log("hourlyweathercode", weatherCode)
    const getIcon = () => {
        if (weatherCode == null) return null;

        switch (true) {
            case weatherCode === 0:
                return <img src={isDays?sunnyIcon:overcastIcon} className={styles.icon_svg} alt="clear sky" />;

            case weatherCode === 1 || weatherCode === 2:
                return <img src={isDays?partlyCloudyIcon:overcastIcon} className={styles.icon_svg} alt="partly cloudy" />;

            case weatherCode === 3:
                return <img src={overcastIcon} className={styles.icon_svg} alt="overcast" />;

            case weatherCode >= 45 && weatherCode <= 48:
                return <img src={fogIcon} className={styles.icon_svg} alt="fog" />;

            case weatherCode >= 51 && weatherCode <= 57:
                return <img src={drizzleIcon} className={styles.icon_svg} alt="drizzle" />;

            case weatherCode >= 61 && weatherCode <= 67:
                return <img src={rainIcon} className={styles.icon_svg} alt="rain" />;

            case weatherCode >= 71 && weatherCode <= 77:
                return <img src={snowIcon} className={styles.icon_svg} alt="snow" />;

            case weatherCode >= 80 && weatherCode <= 82:
                return <img src={rainIcon} className={styles.icon_svg} alt="rain showers" />;

            case weatherCode >= 85 && weatherCode <= 86:
                return <img src={snowIcon} className={styles.icon_svg} alt="snow showers" />;

            case weatherCode >= 95:
                return <img src={stormIcon} className={styles.icon_svg} alt="thunderstorm" />;

            default:
                return <img src={overcastIcon} className={styles.icon_svg} alt="unknown weather" />;
        }
    };


    return (
    <div className={styles.hourly_forecast_box_container}>
        <div className={styles.hourly_forecast_box_left}>
            {getIcon()}
            <p>{time}</p>
        </div>
        <div className={styles.hourly_forecast_box_right}>
            <p>{Math.round(hourlyTemp).toString()}°</p>
            <p>{hourlyTemp.toString()}°</p>
            <p>{weatherCode} weather code</p>
        </div>
    </div>)
}
export default HourlyForecastBox