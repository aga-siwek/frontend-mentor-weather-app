import styles from "./DailyForecastBox.module.css";
import sunnyIcon from "../../../../assets/icon-sunny.webp";
import partlyCloudyIcon from "../../../../assets/icon-partly-cloudy.webp";
import overcastIcon from "../../../../assets/icon-overcast.webp";
import fogIcon from "../../../../assets/icon-fog.webp";
import drizzleIcon from "../../../../assets/icon-drizzle.webp";
import rainIcon from "../../../../assets/icon-sunny.webp";
import snowIcon from "../../../../assets/icon-snow.webp";
import stormIcon from "../../../../assets/icon-storm.webp";

function DailyForecastBox({
  minTemp,
  maxTemp,
  day,
  measureType,
  weatherCode,
}: {
  minTemp: number;
  maxTemp: number;
  day: number;
  measureType: string;
  weatherCode: number;
}) {
  const getIcon = () => {
    if (weatherCode == null) return null;

    switch (true) {
      case weatherCode === 0:
        return (
          <img src={sunnyIcon} className={styles.icon_svg} alt="clear sky" />
        );

      case weatherCode === 1 || weatherCode === 2:
        return (
          <img
            src={partlyCloudyIcon}
            className={styles.icon_svg}
            alt="partly cloudy"
          />
        );

      case weatherCode === 3:
        return (
          <img src={overcastIcon} className={styles.icon_svg} alt="overcast" />
        );

      case weatherCode >= 45 && weatherCode <= 48:
        return <img src={fogIcon} className={styles.icon_svg} alt="fog" />;

      case weatherCode >= 51 && weatherCode <= 57:
        return (
          <img src={drizzleIcon} className={styles.icon_svg} alt="drizzle" />
        );

      case weatherCode >= 61 && weatherCode <= 67:
        return <img src={rainIcon} className={styles.icon_svg} alt="rain" />;

      case weatherCode >= 71 && weatherCode <= 77:
        return <img src={snowIcon} className={styles.icon_svg} alt="snow" />;

      case weatherCode >= 80 && weatherCode <= 82:
        return (
          <img src={rainIcon} className={styles.icon_svg} alt="rain showers" />
        );

      case weatherCode >= 85 && weatherCode <= 86:
        return (
          <img src={snowIcon} className={styles.icon_svg} alt="snow showers" />
        );

      case weatherCode >= 95:
        return (
          <img src={stormIcon} className={styles.icon_svg} alt="thunderstorm" />
        );

      default:
        return (
          <img
            src={overcastIcon}
            className={styles.icon_svg}
            alt="unknown weather"
          />
        );
    }
  };

  const weekDays: Record<number, string> = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    7: "Sun",
  };

  const minTempCalculation = () => {
    if (measureType === "METRIC") {
      const metricMinTemp = Math.round(minTemp);
      return metricMinTemp.toString();
    } else if (measureType === "IMPERIAL") {
      const imperialMinTemp = Math.round(minTemp * 1.8 + 32);
      return imperialMinTemp.toString();
    }
  };

  const maxTempCalculation = () => {
    if (measureType === "METRIC") {
      const metricMaxTemp = Math.round(maxTemp);
      return metricMaxTemp.toString();
    } else if (measureType === "IMPERIAL") {
      const imperialMaxTemp = Math.round(maxTemp * 1.8 + 32);
      return imperialMaxTemp.toString();
    }
  };

  return (
    <div className={styles.daily_forecast_box_container}>
      <div className={styles.daily_forecast_box_day}>{weekDays[day]}</div>
      <div className={styles.daily_forecast_box_precipitation}>{getIcon()}</div>
      <div className={styles.daily_forecast_box_temp}>
        <div
          className={styles.daily_forecast_box_temp_minmax}
        >{`${minTempCalculation()}°`}</div>
        <div
          className={styles.daily_forecast_box_temp_minmax}
        >{`${maxTempCalculation()}°`}</div>
      </div>
    </div>
  );
}

export default DailyForecastBox;
