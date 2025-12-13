import styles from "./Menu.module.css"
import MenuWindow from "./MenuWindow.tsx";
import menuIcon from "../../../assets/icon-units.svg"
import {ReactSVG} from "react-svg";

type MenuProps = {
    menuIsOpen: boolean;
    onMenuClick: () => void;
    onSwitchMeasure: () => void;
    measureType: "IMPERIAL" | "METRIC"
};

function Menu({menuIsOpen, onMenuClick, onSwitchMeasure, measureType}: MenuProps) {

    return (
        <div className={styles.menu_container}>
            <button className={styles.menu_button} onClick={() => onMenuClick()}>
                <ReactSVG src={menuIcon}  className={styles.menu_icon}/>
                <p className={styles.menu_text}>Utils</p>
                <p className={styles.menu_text}>&#9013;</p>
            </button>
            <MenuWindow menuIsOpen={menuIsOpen} onSwitchMeasure={onSwitchMeasure} measureType={measureType} />
        </div>)
}

export default Menu