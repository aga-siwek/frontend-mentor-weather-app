import {useState, useEffect} from 'react'
import './App.css'
import Header from "./components/header/Header.tsx"
import Main from "./components/main/Main.tsx"

type MeasureType = "IMPERIAL" | "METRIC"
type TempUnit = "CELCIUS" | "FAHRENHEIT";
type SpeedUnit = "KM/H" | "MPH";
type PrecipitationUnit = "MILLIMETERS" | "INCHES";
type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
import OnSearchOpenMeteoWeather, {type OpenMeteoWeatherApiUtils} from "./api/OpenMeteoWeatherApi.ts"
import onSearchOpenMeteoGeo, {type OpenMeteoGeoApiUtils} from "./api/OpenMeteoGeoApi.ts";

function App() {

    const weekDays: Record<number, string> = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
    };

    const today = new Date();
    const dayNumber = today.getDay();

    const [measureType, setMeasureType] = useState<MeasureType>("METRIC");
    const [tempMeasure, setTempMeasure] = useState<TempUnit>("CELCIUS");
    const [windSpeedMeasure, setWindSpeedMeasure] = useState<SpeedUnit>("KM/H");
    const [precipitation, setPrecipitation] = useState<PrecipitationUnit>("MILLIMETERS");
    const [searchPlace, setSearchPlace] = useState<string>("");
    const [hourlyForecast, setHourlyForecast] = useState<PrecipitationUnit>("MILLIMETERS");
    const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(dayNumber);
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const [daysAreOpen, setDaysAreOpen] = useState<boolean>(false);
    const [apiWeatherInfo, setApiWeatherInfo] = useState<OpenMeteoWeatherApiUtils>()
    const [apiGeoInfo, setApiGeoInfo] = useState<OpenMeteoGeoApiUtils>()
    const [failStatus, setFailStatus] = useState<boolean>(false);



    const onFailStatusChange = (status: boolean) => {
        setFailStatus(status);
    }

    const onDaysClick = (): void => {
        setDaysAreOpen(!daysAreOpen)
    }

    const onDayOfWeekChange = (day: DayOfWeek): void => {
        const weekDays = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
            Sunday: 7
        }

        setDayOfWeek(weekDays[day])
    }
    const onMenuClick = (): void => {
        setMenuIsOpen(!menuIsOpen)
    }

    const onMenuClose = (): void => {
        setMenuIsOpen(false)
    }


    const onSearchPlace = async (place: string): Promise<void> => {
        setSearchPlace(place);
        const dataOpenMeteoGeo = await onSearchOpenMeteoGeo({searchPlace, onFailStatusChange})
        if (!Object.keys(dataOpenMeteoGeo).includes("results")) {
            setFailStatus(true)
            return
        }
        setApiGeoInfo(dataOpenMeteoGeo)
        const lat: string = dataOpenMeteoGeo.results[0].latitude.toString();
        const lon: string = dataOpenMeteoGeo.results[0].longitude.toString();
        const dataOpenMeteoWeather = await OnSearchOpenMeteoWeather({onFailStatusChange, lat, lon})
        await setApiWeatherInfo(dataOpenMeteoWeather)
        console.log(dataOpenMeteoWeather)
    }

    const onSwitchMeasure = (measure: MeasureType): void => {
        if (measure === "IMPERIAL") {
            setMeasureType("METRIC");
            setTempMeasure("FAHRENHEIT");
            setWindSpeedMeasure("MPH")
            setPrecipitation("INCHES");
        } else if (measure === "METRIC") {
            setMeasureType("IMPERIAL");
            setTempMeasure("CELCIUS");
            setWindSpeedMeasure("KM/H")
            setPrecipitation("MILLIMETERS");
        }
        onSearchPlace(searchPlace)
    }

    return (
        <div className="container">
            <Header
                menuIsOpen={menuIsOpen}
                onMenuClick={onMenuClick}
                onSwitchMeasure={onSwitchMeasure}
                measureType={measureType}
                onMenuClose = {onMenuClose}
            />
            <Main
                onSearchPlace={onSearchPlace}
                searchPlace={searchPlace}
                openMeteoWeatherInfo={apiWeatherInfo}
                openMeteoGeoInfo={apiGeoInfo}
                measureType = {measureType}
                onMenuClose = {onMenuClose}
                dayOfWeek = {dayOfWeek}
                onDayOfWeekChange = {onDayOfWeekChange}
                onDaysClick = {onDaysClick}

            />
        </div>
    )
}

export default App
