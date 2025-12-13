import styles from "./Main.module.css"
import Search from "./search/Search.tsx";
import Result from "./result/Result.tsx";


function Main({onSearchPlace, searchPlace, openMeteoWeatherInfo, openMeteoGeoInfo, measureType, onMenuClose, dayOfWeek, onDayOfWeekChange, onDaysClick}) {
    return (
        <main className={styles.main_container} onClick={onMenuClose}>
            <Search onSearchPlace={onSearchPlace}
                    searchPlace={searchPlace}/>
            <Result onSearchPlace={onSearchPlace}
                    searchPlace={searchPlace}
                    openMeteoWeatherInfo={openMeteoWeatherInfo}
                    openMeteoGeoInfo={openMeteoGeoInfo}
                    measureType={measureType}
                    dayOfWeek = {dayOfWeek}
                    onDayOfWeekChange = {onDayOfWeekChange}
                    onDaysClick = {onDaysClick}
            />
        </main>)
}

export default Main