import styles from "./HourlyForecast.module.css";
import HourlyDaysWindow from "./HourlyDaysWindow.tsx";
import HourlyForecastBox from "./HourlyForecastBox.tsx";
import dropDownIcon from "../../../../assets/icon-dropdown.svg";
import { useMainContext } from "../../../../hooks/useMainContext.ts";

function HourlyForecast() {
  const { apiWeatherInfo, dayOfWeek, closeWindow, onWindowClick } =
    useMainContext();
  const weekDays: Record<number, string> = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };

  const weeklyHourlyTemp = (): number[] | undefined => {
    return apiWeatherInfo?.hourly?.temperature_2m;
  };

  const weeklyHourlyPrecipitation = (): number[] | undefined => {
    return apiWeatherInfo?.hourly?.precipitation_probability;
  };

  const weeklyHourlyWeatherCode = (): number[] | undefined => {
    return apiWeatherInfo?.hourly?.weather_code;
  };

  const weeklyHourlyIsDay = (): number[] | undefined => {
    return apiWeatherInfo?.hourly?.is_day;
  };

  const weeklyHourlyTime = (): string[] | undefined => {
    return apiWeatherInfo?.hourly?.time;
  };

  const checkCurrentTime = () => {
    if (apiWeatherInfo?.current) {
      return new Date(apiWeatherInfo.current.time).getHours();
    } else {
      return 0;
    }
  };

  const allHourlyTemp = weeklyHourlyTemp();
  const allHourlyPrecipitation = weeklyHourlyPrecipitation();
  const allHourlyWeatherCode = weeklyHourlyWeatherCode();
  const allHourlyIsDay = weeklyHourlyIsDay();
  const allHourlyTime = weeklyHourlyTime();
  const today = new Date();
  const currentDayNumber = today.getDay();
  const currentTime = checkCurrentTime();

  const daysDifference = () => {
    // Examples
    // if we have Monday (1) and Wednesday (3)  = 2  => 3-1
    // if we have Saturday (6) and  Wednesday (3) = 4 => 7-6+4
    // if we have Sunday (7) and Friday (5) = 5 => 7-7+5
    // if we have Saturday (6) and Tuesday (2) = 3 => 7-6+2
    // if we have Tuesday (2) and Wednesday (3) = 1 => 3-2

    if (dayOfWeek >= currentDayNumber) {
      return dayOfWeek - currentDayNumber;
    } else {
      return 7 - currentDayNumber + dayOfWeek;
    }
  };

  const hours: number = 24;
  const dailyTempList: number[][] = [];
  const dailyPrecipitationList: number[][] = [];
  const dailyWeatherCodeList: number[][] = [];
  const dailyIsDayList: number[][] = [];
  const dailyTimeList: string[][] = [];

  const seperateIntoDays = <T,>(myCurrentList: T[], newList: T[][]): void => {
    if (myCurrentList && myCurrentList.length > 0) {
      for (let i = 0; i < myCurrentList.length; i += hours) {
        newList.push(myCurrentList.slice(i, i + hours));
      }
    }
  };

  seperateIntoDays(allHourlyTemp, dailyTempList);
  seperateIntoDays(allHourlyPrecipitation, dailyPrecipitationList);
  seperateIntoDays(allHourlyWeatherCode, dailyWeatherCodeList);
  seperateIntoDays(allHourlyIsDay, dailyIsDayList);
  seperateIntoDays(allHourlyTime, dailyTimeList);

  const showHourlyResult = () => {
    const dayIndex = daysDifference();
    const temps = dailyTempList[dayIndex];
    const weatherCodes = dailyWeatherCodeList[dayIndex];
    const isDays = dailyIsDayList[dayIndex];
    const times = dailyTimeList[dayIndex];
    let showTodayTime = currentTime - 1;

    if (!Array.isArray(temps)) return null;
    if (dayIndex === 0) {
      const todayTemps: number[] = temps.slice(currentTime);

      return todayTemps.map((temp, i) => {
        const index = i + currentTime;
        showTodayTime += 1;
        return (
          <HourlyForecastBox
            key={`Hourly Forecast Box ${index}`}
            hourlyTemp={temp}
            time={showTodayTime}
            weatherCode={weatherCodes?.[index] ?? 0}
            isDay={isDays?.[index] ?? 0}
          />
        );
      });
    }

    return temps.map((temp: number, i: number) => {
      const time = times?.[i] ? new Date(times[i]).getHours() : 0;
      return (
        <HourlyForecastBox
          key={`Hourly Forecast Box ${i}`}
          hourlyTemp={temp}
          time={time}
          weatherCode={weatherCodes?.[i] ?? 0}
          isDay={isDays?.[i] ?? 0}
        />
      );
    });
  };

  return (
    <div className={styles.hourly_forecast_container}>
      <div className={styles.hourly_forecast_header}>
        <h3 className={styles.hourly_forecast_header_text}>Hourly forecast</h3>
        <div
          className={styles.hourly_forecast_header_day}
          onClick={() => onWindowClick()}
        >
          <div className={styles.hourly_forecast_day_name}>
            {weekDays[dayOfWeek]}
          </div>
          <img
            src={dropDownIcon}
            alt="dropDownIcon"
            className={styles.hourly_forecast_day_icon}
          />
        </div>
      </div>
      <div
        className={styles.hourly_forecast_boxes}
        onClick={() => closeWindow()}
      >
        {showHourlyResult()}
      </div>
      <HourlyDaysWindow />
    </div>
  );
}

export default HourlyForecast;
