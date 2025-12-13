import styles from "./MenuWindow.module.css"
import {ReactSVG} from "react-svg";
import iconCheckMark from "../../../assets/icon-checkmark.svg"

type MenuWindowProps = {
    menuIsOpen: boolean
    measureType: "IMPERIAL"|"METRIC"
    onSwitchMeasure: (measure:"IMPERIAL"|"METRIC") => void;
}
function MenuWindow({menuIsOpen, onSwitchMeasure, measureType}: MenuWindowProps) {
    const showMenu = () => {
        if (menuIsOpen) {
            return styles.menu_show
        }
        else if (!menuIsOpen) {
            return styles.menu_hidden
        }
    }

    const showMetricSelected = () => {
        if (measureType === "METRIC") {
            return styles.metric_select
        }
        else if (measureType === "IMPERIAL") {
            return styles.metric_not_select
        }
    }

    const showMetricCheck = () => {
        if (measureType === "METRIC") {
            return styles.metric_check_show
        }
        else if (measureType === "IMPERIAL") {
            return styles.metric_check_not_show
        }
    }

    const showImperialSelected = () => {
        if (measureType === "IMPERIAL") {
            return styles.imperial_select
        }
        else if (measureType === "METRIC") {
            return styles.imperial_not_select
        }
    }

    const showImperialCheck = () => {
        if (measureType === "IMPERIAL") {
            return styles.imperial_check_show
        }
        else if (measureType === "METRIC") {
            return styles.imperial_check_not_show
        }
    }

    const showSwitchContent = () => {
        if (measureType === "IMPERIAL") {
            return "Switch to Metric"
        }
        else if (measureType === "METRIC") {
            return "Switch to Imperial"
        }
    }

    return (
        <div className={styles.menu_window}>
            <div className={`${styles.menu_window_container} ${showMenu()}`}>
                <button className={styles.switch_button} onClick={()=> onSwitchMeasure(measureType)}>{showSwitchContent()}</button>
                <div className={styles.result}>
                    <div className={styles.result_container}>
                        <div className={styles.result_header}>Temperature</div>
                        <div className={styles.result_box}>
                            <div className={`${styles.result_option} ${showMetricSelected()}`}>
                                <p className={`${styles.result_text}`}>Celsius(&deg;C)</p>
                                <ReactSVG src={iconCheckMark} className={`${styles.result_check} ${showMetricCheck()}`}/>
                            </div>
                            <div className={`${styles.result_option} ${showImperialSelected()}`}>
                                <p className={`${styles.result_text}`}>Fahrenheit(&deg;F)</p>
                                <ReactSVG src={iconCheckMark} className={`${styles.result_check} ${showImperialCheck()}`}/>
                            </div>
                        </div>
                    </div>
                    <hr className={styles.result_line} />
                    <div className={styles.result_container}>
                        <div className={styles.result_header}>Wind Speed</div>
                        <div className={styles.result_box}>
                            <div className={`${styles.result_option} ${showMetricSelected()}`}>
                                <p className={`${styles.result_text}`}>km/h</p>
                                <ReactSVG src={iconCheckMark} className={`${styles.result_check} ${showMetricCheck()}`}/>
                            </div>
                            <div className={`${styles.result_option} ${showImperialSelected()}`}>
                                <p className={`${styles.result_text}`}>mph</p>
                                <ReactSVG src={iconCheckMark} className={`${styles.result_check} ${showImperialCheck()}`}/>
                            </div>
                        </div>
                    </div>
                    <hr className={styles.result_line} />
                    <div className={styles.result_container}>
                        <div className={styles.result_header}>Precipitation</div>
                        <div className={styles.result_box}>
                            <div className={`${styles.result_option} ${showMetricSelected()}`}>
                                <p className={`${styles.result_text}`}>Millimeters (mm)</p>
                                <ReactSVG src={iconCheckMark} className={`${styles.result_check} ${showMetricCheck()}`}/>
                            </div>
                            <div className={`${styles.result_option} ${showImperialSelected()}`}>
                                <p className={`${styles.result_text}`}>Inches (in)</p>
                                <ReactSVG src={iconCheckMark} className={`${styles.result_check} ${showImperialCheck()}`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default MenuWindow