import styles from "./HourlyDaysWindow.module.css";
import { useMainContext } from "../../../../hooks/useMainContext.ts";

function HourlyDaysWindows() {
  const { onDayOfWeekChange, windowIsOpen } = useMainContext();
  const weekDays: Record<number, string> = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };

  const today = new Date();
  const dayNumber = today.getDay();

  const daysOnWeek = (i: number) => {
    const dailyDayNumber = dayNumber + i;
    if (dailyDayNumber <= 7) {
      return dailyDayNumber;
    }
    return dailyDayNumber - 7;
  };

  const windowStyle = () => {
    if (windowIsOpen) {
      return styles.window_show;
    } else if (!windowIsOpen) {
      return styles.window_hidden;
    }
  };

  const showDays = () =>
    Object.keys(weekDays).map((_, i) => (
      <div
        className={styles.hourly_forecast_box_day}
        onClick={() => onDayOfWeekChange(weekDays[daysOnWeek(i)])}
      >
        <p
          key={`day on week ${i}`}
          className={styles.hourly_forecast_box_day_text}
        >
          {weekDays[daysOnWeek(i)]}
        </p>
      </div>
    ));

  return (
    <div className={`${styles.hourly_forecast_box_container} ${windowStyle()}`}>
      {showDays()}
    </div>
  );
}

export default HourlyDaysWindows;
