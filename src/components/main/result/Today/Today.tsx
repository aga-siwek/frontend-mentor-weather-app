import styles from "./Today.module.css";
import TodayMainInfo from "./TodayMainInfo.tsx";
import TodayWeatherInfo from "./TodayWeatherInfo.tsx";
function Today() {
  return (
    <div className={styles.today_container}>
      <TodayMainInfo />
      <TodayWeatherInfo />
    </div>
  );
}
export default Today;
