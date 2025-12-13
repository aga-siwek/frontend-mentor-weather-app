import styles from "./HourlyForecast.module.css"
import HourlyDaysWindow from "./HourlyDaysWindow.tsx";
import HourlyForecastBox from "./HourlyForecastBox.tsx";

function HourlyForecast({openMeteoWeatherInfo, measureType, dayOfWeek, onDaysClick, onDayOfWeekChange}) {

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
            return "None"
        }
    }

    const weeklyHourlyTemp
        = () => {
        if (openMeteoWeatherInfo) {
            return (openMeteoWeatherInfo.hourly.temperature_2m
            )
        } else {
            return "None"
        }
    }

    const allHourlyPrecipitation: number[] = weeklyHourlyPrecipitation()
    const allHourlyTemp: number[] = weeklyHourlyTemp()


    const today = new Date();
    const currentDayNumber = today.getDay();


    const daysDifference = () => {
        // if we have monday 1 and wednesday 3  = 2  => 3-1
        // if we have saturday 6 and we have wednesday [3] = 4 => 7-6+4
        // if we have sunday 7 and we have friday 5 = 5 => 7-7+5
        // if we have Saturday 6 and we have Tuesday[2] = 3 => 7-6+2
        // if we have Tuesday 2 and wendesday 3 = 1 => 3-2

        if (dayOfWeek>=currentDayNumber) {
            return dayOfWeek-currentDayNumber
        }
        else {
            return ((7-currentDayNumber)+dayOfWeek)
        }
    }

    const daysTemp = {}
    const hours: number = 24
    const dailyTempList: number[] = []
    const dailyPrecipitationList: number[] = []


    const seperateToDays = (myCurrentList, newList) => {
        if (myCurrentList && myCurrentList.length > 0) {
            for (let i = 0; i < myCurrentList.length; i += hours) {
                newList.push(myCurrentList.slice(i, i + hours));
            }
        }
    }

    seperateToDays(allHourlyTemp, dailyTempList)
    seperateToDays(allHourlyPrecipitation, dailyPrecipitationList)

    const showHourlyResult = () => {
        const dayIndex = daysDifference(); // policz raz
        const temps = dailyTempList[dayIndex];
        const precs = dailyPrecipitationList[dayIndex];

        if (!Array.isArray(temps)) return null;

        return temps.map((temp, i) => {
            const precipitation = precs?.[i] ?? 0;
            return (
                <HourlyForecastBox
                    key={i}
                    hourlyTemp={temp}
                    hourlyPrecipitation={precipitation}
                    time = {i}
                />
            );
        });
    };

    return (
        <div className={styles.hourly_forecast_container}>
            <div className={styles.hourly_forecast_header}>
                <h3 className={styles.hourly_forecast_header_text}>Hourly forecast</h3>
                <div className={styles.hourly_forecast_header_day}>
                    {weekDays[dayOfWeek]}
                </div>
            </div>
            <div className={styles.hourly_forecast_boxes}>{showHourlyResult()}</div>
            <HourlyDaysWindow onDaysClick={onDaysClick} onDayOfWeekChange={onDayOfWeekChange}/>
        </div>)
}

export default HourlyForecast