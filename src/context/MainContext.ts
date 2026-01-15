import { createContext } from "react";
import {type OpenMeteoGeoApiUtils} from '../api/OpenMeteoGeoApi.ts'
import {type OpenMeteoWeatherApiUtils} from '../api/OpenMeteoWeatherApi.ts'

export type MainContextType = {
    menuIsOpen: boolean;
    onMenuClick: () => void;
    measureType: "IMPERIAL" | "METRIC";
    onSwitchMeasure: (measure: string) => void;
    onSearchPlace:   (place: string) => Promise<void>;
    apiWeatherInfo?: OpenMeteoWeatherApiUtils | undefined;
    apiGeoInfo?: OpenMeteoGeoApiUtils | undefined;
    onMenuClose: () => void;
    dayOfWeek:  1 | 2 | 3 | 4 | 5 | 6 | 7;
    onDayOfWeekChange: (arg:string) => void;
    onDaysClick: () => void;
    windowIsOpen: boolean
    onWindowClick: () => void;
    closeWindow: () => void;
}

export const MainContext = createContext<MainContextType|null>(null);