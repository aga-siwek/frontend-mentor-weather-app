import styles from "./TodayMainInfo.module.css"
import sunnyIcon from "../../../../assets/icon-sunny.webp"
import fogIcon from "../../../../assets/icon-fog.webp"
import drizzleIcon from "../../../../assets/icon-drizzle.webp"
import overcastIcon from "../../../../assets/icon-overcast.webp"
import partlyCloudyIcon from "../../../../assets/icon-partly-cloudy.webp"
import rainIcon from "../../../../assets/icon-sunny.webp"
import snowIcon from "../../../../assets/icon-snow.webp"
import stormIcon from "../../../../assets/icon-storm.webp"

const monthsName = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
};

function TodayMainInfo({openMeteoWeatherInfo, openMeteoGeoInfo, onSearchPlace, measureType}) {
    const today = new Date()
    const dayName = today.toLocaleDateString('en-EN', {weekday: 'long'});
    const todayDay = today.getDate()
    const todayMonth = today.getMonth()
    const todayYear = today.getFullYear();
    const todayPrecipitationCalculation = () => {
        if (openMeteoWeatherInfo) {
            return (openMeteoWeatherInfo.current.precipitation)
        } else {
            return 1000
        }
    }
    const todayTemperatureCalculation = () => {
        if (openMeteoWeatherInfo) {
            if(measureType==="METRIC") {
                const metricTemp = Math.round(openMeteoWeatherInfo.current.temperature_2m)
                return (metricTemp.toString()
            )}
            else if(measureType==="IMPERIAL") {
                const metricTemp = openMeteoWeatherInfo.current.temperature_2m
                const imperialTemp = Math.round((metricTemp*1.8) + 32)
                return imperialTemp.toString()

            }
        } else {
            return "None"
        }
    }
    const todayPrecipitation = todayPrecipitationCalculation()
    const todayTemperature = todayTemperatureCalculation()

    const getIcon = () => {
        if (todayPrecipitation == null) return "undefined";


        if (todayPrecipitation === 0) return <img src={sunnyIcon} className={styles.icon_svg} alt="sunny icon"/>;
        else if (todayPrecipitation >= 1 && todayPrecipitation <= 2) return <img src={partlyCloudyIcon}
                                                                                 className={styles.icon_svg}
                                                                                 alt="partly cloudy icon"/>;
        else if (todayPrecipitation === 3) return <img src={overcastIcon} className={styles.icon_svg}
                                                       alt="overcast icon"/>;
        else if (todayPrecipitation >= 4 && todayPrecipitation <= 9) return <img src={fogIcon}
                                                                                 className={styles.icon_svg}
                                                                                 alt="fog icon"/>;
        else if (todayPrecipitation >= 10 && todayPrecipitation <= 39) return <img src={fogIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="fog icon"/>;
        else if (todayPrecipitation >= 40 && todayPrecipitation <= 49) return <img src={drizzleIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="drizzle icon"/>;
        else if (todayPrecipitation >= 50 && todayPrecipitation <= 59) return <img src={rainIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="rain icon"/>;
        else if (todayPrecipitation >= 60 && todayPrecipitation <= 67) return <img src={snowIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="snow icon"/>;
        else if (todayPrecipitation >= 68 && todayPrecipitation <= 79) return <img src={rainIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="rain icon"/>;
        else if (todayPrecipitation >= 80 && todayPrecipitation <= 84) return <img src={snowIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="snow icon"/>;
        else if (todayPrecipitation >= 85 && todayPrecipitation <= 89) return <img src={rainIcon}
                                                                                   className={styles.icon_svg}
                                                                                   alt="rain icon"/>;
        else if (todayPrecipitation >= 90) return <img src={stormIcon} className={styles.icon_svg} alt="storm icon"/>;
        else return <img src={overcastIcon} className={styles.icon_svg} alt="overcast icon"/>;
    };
    const firstResult = openMeteoGeoInfo?.results?.[0];
    const checkResult = () => {
        if (!firstResult) {
            onSearchPlace("Warsaw")
        }
    }
    checkResult()

    return (
        <div className={styles.today_temp_container}>
            <div className={styles.main_info}>
                <div className={styles.main_info_localisation}>
                    <p className={styles.main_info_localisation_text}>{firstResult && `${firstResult.country}, ${firstResult.name}`}</p>
                </div>
                <div className={styles.main_info_date}>
                    <p className={styles.main_info_date_text}>{`${dayName}, ${todayDay} ${monthsName[todayMonth]} ${todayYear} `}</p>
                </div>
            </div>
            <div className={styles.temperature}>
                <div className={styles.temperature_icon}>
                    {getIcon()}
                </div>
                <div className={styles.temperature_info}>
                    <p className={styles.temperature_info_text}> {todayTemperature} &#176;
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TodayMainInfo