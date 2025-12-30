import styles from "./Result.module.css"
import DailyForecast from "./DailyForecast/DailyForecast.tsx";
import Today from "./Today/Today.tsx";
import HourlyForecast from "./HourlyForecast/HourlyForecast.tsx";

function Result({openMeteoWeatherInfo, openMeteoGeoInfo, onSearchPlace, measureType, dayOfWeek, onDayOfWeekChange, onDaysClick, windowIsOpen, onWindowClick, closeWindow}) {
    return (
        <div className={styles.result_container}>
            <Today openMeteoWeatherInfo={openMeteoWeatherInfo}
                   openMeteoGeoInfo={openMeteoGeoInfo}
                   onSearchPlace={onSearchPlace}
                   measureType = {measureType}
            />
            <DailyForecast openMeteoWeatherInfo={openMeteoWeatherInfo} measureType = {measureType}/>
            <HourlyForecast
                openMeteoWeatherInfo={openMeteoWeatherInfo}
                measureType = {measureType}
                dayOfWeek={dayOfWeek}
                onDaysClick={onDaysClick}
                onDayOfWeekChange={onDayOfWeekChange}
                windowIsOpen={windowIsOpen}
                onWindowClick={onWindowClick}
                closeWindow={closeWindow}/>
        </div>)
}

export default Result;