import styles from "./DailyForecastBox.module.css"
import sunnyIcon from "../../../../assets/icon-sunny.webp";
import partlyCloudyIcon from "../../../../assets/icon-partly-cloudy.webp";
import overcastIcon from "../../../../assets/icon-overcast.webp";
import fogIcon from "../../../../assets/icon-fog.webp";
import drizzleIcon from "../../../../assets/icon-drizzle.webp";
import rainIcon from "../../../../assets/icon-sunny.webp";
import snowIcon from "../../../../assets/icon-snow.webp";
import stormIcon from "../../../../assets/icon-storm.webp";

function DailyForecastBox({minTemp, maxTemp, precipitation, day, measureType}: {
    minTemp: number,
    maxTemp: number,
    precipitation: number,
    day: number,
    measureType: string
}) {
    const getIcon = () => {
        if (precipitation == null) return "undefined";
        if (precipitation === 0) return <img src={sunnyIcon} className={styles.icon_svg} alt="sunny icon"/>;
        else if (precipitation >= 1 && precipitation <= 2) return <img src={partlyCloudyIcon}
                                                                       className={styles.icon_svg}
                                                                       alt="partly cloudy icon"/>;
        else if (precipitation === 3) return <img src={overcastIcon} className={styles.icon_svg} alt="overcast icon"/>;
        else if (precipitation >= 4 && precipitation <= 9) return <img src={fogIcon} className={styles.icon_svg}
                                                                       alt="fog icon"/>;
        else if (precipitation >= 10 && precipitation <= 39) return <img src={fogIcon} className={styles.icon_svg}
                                                                         alt="fog icon"/>;
        else if (precipitation >= 40 && precipitation <= 49) return <img src={drizzleIcon} className={styles.icon_svg}
                                                                         alt="drizzle icon"/>;
        else if (precipitation >= 50 && precipitation <= 59) return <img src={rainIcon} className={styles.icon_svg}
                                                                         alt="rain icon"/>;
        else if (precipitation >= 60 && precipitation <= 67) return <img src={snowIcon} className={styles.icon_svg}
                                                                         alt="snow icon"/>;
        else if (precipitation >= 68 && precipitation <= 79) return <img src={rainIcon} className={styles.icon_svg}
                                                                         alt="rain icon"/>;
        else if (precipitation >= 80 && precipitation <= 84) return <img src={snowIcon} className={styles.icon_svg}
                                                                         alt="snow icon"/>;
        else if (precipitation >= 85 && precipitation <= 89) return <img src={rainIcon} className={styles.icon_svg}
                                                                         alt="rain icon"/>;
        else if (precipitation >= 90) return <img src={stormIcon} className={styles.icon_svg} alt="storm icon"/>;
        else return <img src={overcastIcon} className={styles.icon_svg} alt="overcast icon"/>;
    };

    const weekDays: Record<number, string> = {
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat",
        7: "Sun"
    };

    const minTempCalculation = () => {
        if (measureType==="METRIC") {
           const metricMinTemp = Math.round(minTemp)
            return metricMinTemp.toString()
        }
        else if (measureType==="IMPERIAL") {
            const imperialMinTemp = Math.round((minTemp*1.8)+32)
            return imperialMinTemp.toString()

        }
    }

    const maxTempCalculation = () => {
        if (measureType==="METRIC") {
            const metricMaxTemp = Math.round(maxTemp)
            return metricMaxTemp.toString()
        }
        else if (measureType==="IMPERIAL") {
            const imperialMaxTemp = Math.round((maxTemp*1.8)+32)
            return imperialMaxTemp.toString()
        }
    }

    return (
        <div className={styles.daily_forecast_box_container}>
            <div className={styles.daily_forecast_box_day}>{weekDays[day]}</div>
            <div className={styles.daily_forecast_box_precipitation}>{getIcon()}</div>
            <div className={styles.daily_forecast_box_temp}>
                <div className={styles.daily_forecast_box_temp_minmax}>{`${minTempCalculation()}°`}</div>
                <div className={styles.daily_forecast_box_temp_minmax}>{`${maxTempCalculation()}°`}</div>
            </div>
        </div>)
}

export default DailyForecastBox