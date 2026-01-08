import styles from "./Menu.module.css"
import MenuWindow from "./MenuWindow.tsx";
import menuIcon from "../../../assets/icon-units.svg"
import {ReactSVG} from "react-svg";
import {useMainContext} from "../../../hooks/useMainContext.ts";


function Menu() {
    const {onMenuClick} = useMainContext()
    return (
        <div className={styles.menu_container}>
            <button className={styles.menu_button} onClick={() => onMenuClick()}>
                <ReactSVG src={menuIcon}  className={styles.menu_icon}/>
                <p className={styles.menu_text}>Utils</p>
                <p className={styles.menu_text}>&#9013;</p>
            </button>
            <MenuWindow/>
        </div>)
}

export default Menu