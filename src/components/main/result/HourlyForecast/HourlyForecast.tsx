import styles from "./HourlyForecast.module.css"
import HourlyDaysWindow from "./HourlyDaysWindow.tsx";
import HourlyForecastBox from "./HourlyForecastBox.tsx";
import dropDownIcon from "../../../../assets/icon-dropdown.svg"

function HourlyForecast({
                            openMeteoWeatherInfo,
                            measureType,
                            dayOfWeek,
                            onDaysClick,
                            onDayOfWeekChange,
                            windowIsOpen,
                            onWindowClick,
                            closeWindow
                        }) {

    const weekDays: Record<number, string> = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
    };

    const weeklyHourlyPrecipitation
        = () => {
        if (openMeteoWeatherInfo) {
            return (openMeteoWeatherInfo.hourly.precipitation_probability
            )
        } else {
            return "-"
        }
    }

    const weeklyHourlyWeatherCode
        = () => {
        if (openMeteoWeatherInfo) {
            return (openMeteoWeatherInfo.hourly.weather_code

            )
        } else {
            return "-"
        }
    }

    const weeklyHourlyIsDay
        = () => {
        if (openMeteoWeatherInfo) {
            return (openMeteoWeatherInfo.hourly.is_day

            )
        } else {
            return "-"
        }
    }

    const weeklyHourlyTemp
        = () => {
        if (openMeteoWeatherInfo) {
            return (openMeteoWeatherInfo.hourly.temperature_2m
            )
        } else {
            return "-"
        }
    }

    const weeklyHourlyTime
        = () => {
        if (openMeteoWeatherInfo) {
            return (openMeteoWeatherInfo.hourly.time
            )
        } else {
            return "-"
        }
    }

    const checkCurrentTime
        = () => {
        if (openMeteoWeatherInfo) {
            return (new Date(openMeteoWeatherInfo.current.time).getHours()
            )
        } else {
            return 0
        }
    }

    const allHourlyPrecipitation: number[] = weeklyHourlyPrecipitation()
    const allHourlyTemp: number[] = weeklyHourlyTemp()
    const allHourlyWeatherCode: number[] = weeklyHourlyWeatherCode()
    const allHourlyIsDay: number[] = weeklyHourlyIsDay()
    const allHourlyTime: string = weeklyHourlyTime()
    const today = new Date();
    const currentDayNumber = today.getDay();
    const currentTime = checkCurrentTime()
    console.log("current time from hourly", currentTime)


    const daysDifference = () => {
        // if we have monday 1 and wednesday 3  = 2  => 3-1
        // if we have saturday 6 and we have wednesday [3] = 4 => 7-6+4
        // if we have sunday 7 and we have friday 5 = 5 => 7-7+5
        // if we have Saturday 6 and we have Tuesday[2] = 3 => 7-6+2
        // if we have Tuesday 2 and wendesday 3 = 1 => 3-2

        if (dayOfWeek >= currentDayNumber) {
            return dayOfWeek - currentDayNumber
        } else {
            return ((7 - currentDayNumber) + dayOfWeek)
        }
    }

    const hours: number = 24
    const dailyTempList: number[] = []
    const dailyPrecipitationList: number[] = []
    const dailyWeatherCodeList: number[] = []
    const dailyIsDayList: number[] = []
    const dailyTimeList: string = []


    const seperateToDays = (myCurrentList, newList) => {
        if (myCurrentList && myCurrentList.length > 0) {
            for (let i = 0; i < myCurrentList.length; i += hours) {
                newList.push(myCurrentList.slice(i, i + hours));
            }
        }
    }

    seperateToDays(allHourlyTemp, dailyTempList)
    seperateToDays(allHourlyPrecipitation, dailyPrecipitationList)
    seperateToDays(allHourlyWeatherCode, dailyWeatherCodeList)
    seperateToDays(allHourlyIsDay, dailyIsDayList)
    seperateToDays(allHourlyTime, dailyTimeList)

    const showHourlyResult = () => {
        const dayIndex = daysDifference();
        const temps = dailyTempList[dayIndex];
        const precs = dailyPrecipitationList[dayIndex];
        const weatherCodes = dailyWeatherCodeList[dayIndex];
        const isDays = dailyIsDayList[dayIndex];
        const times = dailyTimeList[dayIndex];
        // const currentTime = new Date(openMeteoWeatherInfo.current.time).getHours();

        let showTodayTime = currentTime -1


        if (!Array.isArray(temps)) return null;
        if (dayIndex === 0) {
            const todayTemps = temps.slice(currentTime)

            return todayTemps.map((temp, i) => {
                const precipitation: number = precs?.[i] ?? 0;
                const weatherCode: number = weatherCodes?.[i] ?? 0;
                const isDay: number = isDays?.[i] ?? 0
                showTodayTime += 1
                return (
                    <HourlyForecastBox
                        key={i}
                        hourlyTemp={temp}
                        hourlyPrecipitation={precipitation}
                        time={showTodayTime}
                        weatherCode={weatherCode}
                        isDay={isDay}
                        measureType={measureType}
                    />
                );
            });
        }

        return temps.map((temp, i) => {
            const precipitation: number = precs?.[i] ?? 0;
            const weatherCode: number = weatherCodes?.[i] ?? 0;
            const isDay: number = isDays?.[i] ?? 0
            const time = new Date(times[i]).getHours()
            return (
                <HourlyForecastBox
                    key={i}
                    hourlyTemp={temp}
                    hourlyPrecipitation={precipitation}
                    time={time}
                    weatherCode={weatherCode}
                    isDay={isDay}
                    measureType={measureType}
                />
            );
        });
    };

    return (
        <div className={styles.hourly_forecast_container}>
            <div className={styles.hourly_forecast_header}>
                <h3 className={styles.hourly_forecast_header_text}>Hourly forecast</h3>
                <div className={styles.hourly_forecast_header_day} onClick={()=> onWindowClick()}>
                    <div className={styles.hourly_forecast_day_name}>{weekDays[dayOfWeek]}</div>
                    <img src={dropDownIcon} alt="dropDownIcon" className={styles.hourly_forecast_day_icon}/>
                </div>
            </div>
            <div className={styles.hourly_forecast_boxes} onClick={()=> closeWindow()}>{showHourlyResult()}</div>
            <HourlyDaysWindow onDaysClick={onDaysClick} onDayOfWeekChange={onDayOfWeekChange}
                              windowIsOpen={windowIsOpen} closeWindow={closeWindow}/>
        </div>)
}

export default HourlyForecast