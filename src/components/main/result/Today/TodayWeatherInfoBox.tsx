import styles from "./TodayWeatherInfoBox.module.css";
type TypeOfParams = {
  boxHeader?: string;
  boxResult?: string;
};
function TodayWeatherInfoBox({ boxHeader, boxResult }: TypeOfParams) {
  return (
    <div className={styles.today_weather_info_box_container}>
      <h3 className={styles.box_header_text}>{boxHeader}</h3>
      <p className={styles.box_result_text}>{boxResult}</p>
    </div>
  );
}

export default TodayWeatherInfoBox;
