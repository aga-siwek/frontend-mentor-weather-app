import { createContext } from "react";

export type MainContextType = {
    menuIsOpen: boolean;
    onMenuClick: () => void;
    measureType: "IMPERIAL" | "METRIC";
    onSwitchMeasure: (measure: string) => void;
    onSearchPlace:   () => Promise<void>;
    apiWeatherInfo?: Record<string, unknown>;
    apiGeoInfo?: Record<string, unknown>;
    onMenuClose: () => void;
    dayOfWeek:  1 | 2 | 3 | 4 | 5 | 6 | 7;
    onDayOfWeekChange: () => void;
    onDaysClick: () => void;
    windowIsOpen: boolean
    onWindowClick: () => void;
    closeWindow: () => void;
}

export const MainContext = createContext<MainContextType|null>(null);