import styles from "./Today.module.css"
import TodayMainInfo from "./TodayMainInfo.tsx";
import TodayWeatherInfo from "./TodayWeatherInfo.tsx";
function Today ({openMeteoWeatherInfo, openMeteoGeoInfo, onSearchPlace, measureType}) {
    return (
    <div className={styles.today_container}>
        <TodayMainInfo openMeteoWeatherInfo={openMeteoWeatherInfo} openMeteoGeoInfo={openMeteoGeoInfo} onSearchPlace={onSearchPlace} measureType={measureType} />
        <TodayWeatherInfo openMeteoWeatherInfo={openMeteoWeatherInfo} measureType={measureType}/>
    </div>)
}
export default Today