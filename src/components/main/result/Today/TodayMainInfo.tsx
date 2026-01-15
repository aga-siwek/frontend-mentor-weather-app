import styles from "./TodayMainInfo.module.css"
import sunnyIcon from "../../../../assets/icon-sunny.webp"
import fogIcon from "../../../../assets/icon-fog.webp"
import drizzleIcon from "../../../../assets/icon-drizzle.webp"
import overcastIcon from "../../../../assets/icon-overcast.webp"
import partlyCloudyIcon from "../../../../assets/icon-partly-cloudy.webp"
import rainIcon from "../../../../assets/icon-sunny.webp"
import snowIcon from "../../../../assets/icon-snow.webp"
import stormIcon from "../../../../assets/icon-storm.webp"
import {useMainContext} from "../../../../hooks/useMainContext.ts";

const monthsName: { [key: number]: string } = {
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

function TodayMainInfo() {
    const {apiWeatherInfo, apiGeoInfo, measureType} = useMainContext()
    console.log("api w info from main info", apiWeatherInfo)
    if (apiWeatherInfo) {
        console.log("Weather info", apiWeatherInfo, true)
    }
    else {console.log("Weather info", apiWeatherInfo, false)}


    const today = new Date()
    const dayName = today.toLocaleDateString('en-EN', {weekday: 'long'});
    const todayDay = today.getDate()
    const todayMonth = today.getMonth()
    const todayYear = today.getFullYear();


    const todayWeatherCodeCalculation = () => {
        if (apiWeatherInfo?.current) {
            return (apiWeatherInfo.current.weather_code)
        } else {
            return 1000
        }
    }

    const todayIsDayCalculation = () => {
        if (apiWeatherInfo?.current) {
            return (apiWeatherInfo.current.is_day)
        } else {
            return 0
        }
    }

    const todayTemperatureCalculation = () => {
        if (apiWeatherInfo?.current) {
            if(measureType==="METRIC") {
                const metricTemp = Math.round(apiWeatherInfo.current.temperature_2m)
                return (metricTemp.toString()
                )}
            else if(measureType==="IMPERIAL") {
                const metricTemp = apiWeatherInfo.current.temperature_2m
                const imperialTemp = Math.round((metricTemp*1.8) + 32)
                return imperialTemp.toString()
            }
        } else {
            return "- "
        }
    }

    const todayTemperature = todayTemperatureCalculation()
    const todayWeatherCode = todayWeatherCodeCalculation()
    const todayIsDay = todayIsDayCalculation()

    const getIcon = () => {
        if (todayWeatherCode == null) return null;

        // Clear / Clouds
        if (todayWeatherCode === 0)
            return <img src={todayIsDay?sunnyIcon:overcastIcon} className={styles.icon_svg} alt="clear sky" />;

        if (todayWeatherCode === 1 || todayWeatherCode === 2)
            return <img src={todayIsDay?partlyCloudyIcon:overcastIcon} className={styles.icon_svg} alt="partly cloudy" />;

        if (todayWeatherCode === 3)
            return <img src={overcastIcon} className={styles.icon_svg} alt="overcast" />;

        // Fog
        if (todayWeatherCode >= 45 && todayWeatherCode <= 48)
            return <img src={fogIcon} className={styles.icon_svg} alt="fog" />;

        // Drizzle
        if (todayWeatherCode >= 51 && todayWeatherCode <= 57)
            return <img src={drizzleIcon} className={styles.icon_svg} alt="drizzle" />;

        // Rain
        if (todayWeatherCode >= 61 && todayWeatherCode <= 67)
            return <img src={rainIcon} className={styles.icon_svg} alt="rain" />;

        // Snow
        if (todayWeatherCode >= 71 && todayWeatherCode <= 77)
            return <img src={snowIcon} className={styles.icon_svg} alt="snow" />;

        // Rain showers
        if (todayWeatherCode >= 80 && todayWeatherCode <= 82)
            return <img src={rainIcon} className={styles.icon_svg} alt="rain showers" />;

        // Snow showers
        if (todayWeatherCode >= 85 && todayWeatherCode <= 86)
            return <img src={snowIcon} className={styles.icon_svg} alt="snow showers" />;

        // Thunderstorm
        if (todayWeatherCode >= 95)
            return <img src={stormIcon} className={styles.icon_svg} alt="thunderstorm" />;

        return <img src={overcastIcon} className={styles.icon_svg} alt="unknown weather" />;
    };
    const cityCalculation = () => {
        if (apiGeoInfo?.results?.[0].name) {
            return (apiGeoInfo?.results?.[0].name
            )
        } else {
            return "-"
        }
    }

    const countryCalculation = () => {
        if (apiGeoInfo?.results?.[0].country) {
            return (apiGeoInfo?.results?.[0].country
            )
        } else {
            return "-"
        }
    }

    return (
        <div className={styles.today_temp_container}>
            <div className={styles.main_info}>
                <div className={styles.main_info_localization}>
                    <p className={styles.main_info_localization_text}>{countryCalculation()}, {cityCalculation()}</p>
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