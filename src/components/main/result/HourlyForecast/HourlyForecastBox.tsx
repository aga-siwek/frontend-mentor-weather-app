import styles from "./HourlyForecastBox.module.css"
import sunnyIcon from "../../../../assets/icon-sunny.webp"
import fogIcon from "../../../../assets/icon-fog.webp"
import drizzleIcon from "../../../../assets/icon-drizzle.webp"
import overcastIcon from "../../../../assets/icon-overcast.webp"
import partlyCloudyIcon from "../../../../assets/icon-partly-cloudy.webp"
import rainIcon from "../../../../assets/icon-sunny.webp"
import snowIcon from "../../../../assets/icon-snow.webp"
import stormIcon from "../../../../assets/icon-storm.webp"


function HourlyForecastBox ({hourlyTemp, hourlyPrecipitation, time}) {
    const getIcon = () => {
        if (hourlyPrecipitation == null) return "undefined";

        if (hourlyPrecipitation === 0) return <img src={sunnyIcon} className={styles.icon_svg} alt="sunny icon"/>;
        else if (hourlyPrecipitation >= 1 && hourlyPrecipitation <= 2) return <img src={partlyCloudyIcon}
                                                                                 className={styles.icon_svg}
                                                                                 alt="partly cloudy icon"/>;
        else if (hourlyPrecipitation === 3) return <img src={overcastIcon} className={styles.icon_svg}
                                                       alt="overcast icon"/>;
        else if (hourlyPrecipitation >= 4 && hourlyPrecipitation <= 9) return <img src={fogIcon}
                                                                                 className={styles.icon_svg}
                                                                                 alt="fog icon"/>;
        else if (hourlyPrecipitation >= 10 && hourlyPrecipitation <= 39) return <img src={fogIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="fog icon"/>;
        else if (hourlyPrecipitation >= 40 && hourlyPrecipitation <= 49) return <img src={drizzleIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="drizzle icon"/>;
        else if (hourlyPrecipitation >= 50 && hourlyPrecipitation <= 59) return <img src={rainIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="rain icon"/>;
        else if (hourlyPrecipitation >= 60 && hourlyPrecipitation <= 67) return <img src={snowIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="snow icon"/>;
        else if (hourlyPrecipitation >= 68 && hourlyPrecipitation <= 79) return <img src={rainIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="rain icon"/>;
        else if (hourlyPrecipitation >= 80 && hourlyPrecipitation <= 84) return <img src={snowIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="snow icon"/>;
        else if (hourlyPrecipitation >= 85 && hourlyPrecipitation <= 89) return <img src={rainIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="rain icon"/>;
        else if (hourlyPrecipitation >= 90) return <img src={stormIcon} className={styles.icon_svg} alt="storm icon"/>;
        else return <img src={overcastIcon} className={styles.icon_svg} alt="overcast icon"/>;
    };


    return (
    <div className={styles.hourly_forecast_box_container}>
        <div className={styles.hourly_forecast_box_left}>
            <p>{getIcon()}</p>
            <p>{time}</p>
        </div>
        <div className={styles.hourly_forecast_box_right}>
            <p>{Math.round(hourlyTemp).toString()}°</p>
            <p>{hourlyTemp.toString()}°</p>
        </div>
    </div>)
}
export default HourlyForecastBox