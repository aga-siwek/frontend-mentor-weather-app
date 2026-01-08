import {useState, useEffect} from 'react'
import './App.css'
import Header from "./components/header/Header.tsx"
import Main from "./components/main/Main.tsx"
import {MainContext, type MainContextType} from "./context/MainContext.ts"

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
    const [searchPlace, setSearchPlace] = useState<string>();
    const [hourlyForecast, setHourlyForecast] = useState<PrecipitationUnit>("MILLIMETERS");
    const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(dayNumber);
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const [daysAreOpen, setDaysAreOpen] = useState<boolean>(false);
    const [apiWeatherInfo, setApiWeatherInfo] = useState<OpenMeteoWeatherApiUtils>()
    const [apiGeoInfo, setApiGeoInfo] = useState<OpenMeteoGeoApiUtils>()
    const [failStatus, setFailStatus] = useState<boolean>(false);
    const [windowIsOpen, setWindowIsOpen] = useState<boolean>(false);

    const onFailStatusChange = (status: boolean) => {
        setFailStatus(status);
    }

    const onWindowClick = () => {
        console.log("Window clicked");
        setWindowIsOpen(!windowIsOpen)
    }

    const closeWindow = () => {
        console.log("on window close", windowIsOpen)
        setWindowIsOpen(false)
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
        closeWindow()
    }
    const onMenuClick = (): void => {
        setMenuIsOpen(!menuIsOpen)
    }

    const onMenuClose = (): void => {
        setMenuIsOpen(false)
    }

    const onSearchPlace = async (place: string): Promise<void> => {
        setSearchPlace(place);
    }

    const getApiData = async () => {
        const dataOpenMeteoGeo = await onSearchOpenMeteoGeo({searchPlace, onFailStatusChange})
        if (!Object.keys(dataOpenMeteoGeo).includes("results")) {
            setFailStatus(true)
            setApiWeatherInfo(undefined)
            setApiGeoInfo(undefined)
            return
        }
        setApiGeoInfo(dataOpenMeteoGeo)
        const lat: string = dataOpenMeteoGeo.results[0].latitude.toString();
        const lon: string = dataOpenMeteoGeo.results[0].longitude.toString();
        const dataOpenMeteoWeather = await OnSearchOpenMeteoWeather({onFailStatusChange, lat, lon})
        await setApiWeatherInfo(dataOpenMeteoWeather)
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

    const contextValue: MainContextType = {
        menuIsOpen, onMenuClick, onSwitchMeasure, measureType, onMenuClose,
        onSearchPlace, apiWeatherInfo, apiGeoInfo, onMenuClose, dayOfWeek,
        onDayOfWeekChange, onDayOfWeekChange, onDaysClick, windowIsOpen,
        onWindowClick, closeWindow}


    useEffect(() => {
        getApiData()
    }, [searchPlace])
    useEffect(() => {
    }, [dayOfWeek])

    console.log("window is open from app", windowIsOpen)

    return (
        <MainContext.Provider value={contextValue}>
        <div className="container">
            <Header/>
            <Main/>
        </div>
        </MainContext.Provider>
    )
}

export default App
