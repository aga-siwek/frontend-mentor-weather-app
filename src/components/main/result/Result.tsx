import styles from "./Result.module.css";
import DailyForecast from "./DailyForecast/DailyForecast.tsx";
import Today from "./Today/Today.tsx";
import HourlyForecast from "./HourlyForecast/HourlyForecast.tsx";

function Result() {
    return (
        <div className={styles.result_container}>
            <div className={styles.result_container_first}>
                <Today/>
                <DailyForecast/>
            </div>
            <div className={styles.result_container_second}>
                <HourlyForecast/>
            </div>
        </div>
    );
}

export default Result;
