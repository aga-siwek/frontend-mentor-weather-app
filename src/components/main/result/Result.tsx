import styles from "./Result.module.css"
import DailyForecast from "./DailyForecast/DailyForecast.tsx";
import Today from "./Today/Today.tsx";
import HourlyForecast from "./HourlyForecast/HourlyForecast.tsx";

function Result() {
    return (
        <div className={styles.result_container}>
            <Today/>
            <DailyForecast/>
            <HourlyForecast/>
        </div>)
}

export default Result;