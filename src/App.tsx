import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header.tsx";
import Main from "./components/main/Main.tsx";
import { MainContext, type MainContextType } from "./context/MainContext.ts";

type MeasureType = "IMPERIAL" | "METRIC";
// type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
import OnSearchOpenMeteoWeather, {
  type OpenMeteoWeatherApiUtils,
} from "./api/OpenMeteoWeatherApi.ts";
import onSearchOpenMeteoGeo, {
  type OpenMeteoGeoApiUtils,
} from "./api/OpenMeteoGeoApi.ts";

function App() {
  const today = new Date();
  const dayNumber = today.getDay();
  const [measureType, setMeasureType] = useState<MeasureType>("METRIC");
  const [searchPlace, setSearchPlace] = useState<string>();
  const [dayOfWeek, setDayOfWeek] = useState<number>(dayNumber);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [daysAreOpen, setDaysAreOpen] = useState<boolean>(false);
  const [apiWeatherInfo, setApiWeatherInfo] = useState<
    OpenMeteoWeatherApiUtils | null | undefined
  >();
  const [apiGeoInfo, setApiGeoInfo] = useState<
    OpenMeteoGeoApiUtils | null | undefined
  >();
  const [windowIsOpen, setWindowIsOpen] = useState<boolean>(false);

  const onFailStatusChange = () => {
  };

  const onWindowClick = () => {
    console.log("Window clicked");
    setWindowIsOpen(!windowIsOpen);
  };

  const closeWindow = () => {
    console.log("on window close", windowIsOpen);
    setWindowIsOpen(false);
  };

  const onDaysClick = (): void => {
    setDaysAreOpen(!daysAreOpen);
  };

  const onDayOfWeekChange = (day: string): void => {
    const weekDays: { [key: string]: number } = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };

    setDayOfWeek(weekDays[day]);
    closeWindow();
  };
  const onMenuClick = (): void => {
    setMenuIsOpen(!menuIsOpen);
  };

  const onMenuClose = (): void => {
    setMenuIsOpen(false);
  };

  const onSearchPlace = async (place?: string | undefined): Promise<void> => {
    setSearchPlace(place);
  };

  const getApiData = async () => {
    const dataOpenMeteoGeo = await onSearchOpenMeteoGeo({
      searchPlace,
      onFailStatusChange,
    });
    if (!Object.keys(dataOpenMeteoGeo).includes("results")) {
      setApiWeatherInfo(undefined);
      setApiGeoInfo(undefined);
      return;
    }
    setApiGeoInfo(dataOpenMeteoGeo);
    const lat: string | undefined =
      dataOpenMeteoGeo.results[0].latitude.toString();
    const lon: string | undefined =
      dataOpenMeteoGeo.results[0].longitude.toString();
    const dataOpenMeteoWeather = await OnSearchOpenMeteoWeather({ lat, lon });
    await setApiWeatherInfo(dataOpenMeteoWeather);
  };

  const onSwitchMeasure = (measure: MeasureType): void => {
    if (measure === "IMPERIAL") {
      setMeasureType("METRIC");
    } else if (measure === "METRIC") {
      setMeasureType("IMPERIAL");
    }
    onSearchPlace(searchPlace);
  };

  const contextValue: MainContextType = {
    menuIsOpen,
    onMenuClick,
    onSwitchMeasure,
    measureType,
    onMenuClose,
    onSearchPlace,
    apiWeatherInfo,
    apiGeoInfo,
    onMenuClose,
    dayOfWeek,
    onDayOfWeekChange,
    onDayOfWeekChange,
    onDaysClick,
    windowIsOpen,
    onWindowClick,
    closeWindow,
  };

  useEffect(() => {
      const fetchData = async () => {
          await getApiData();
      };
      fetchData()
  }, [searchPlace]);
  useEffect(() => {}, [dayOfWeek]);


  return (
    <MainContext.Provider value={contextValue}>
      <div className="container">
        <Header />
        <Main />
      </div>
    </MainContext.Provider>
  );
}

export default App;
