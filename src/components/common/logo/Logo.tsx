import styles from "./Logo.module.css"
import LogoIcon from "../../../assets/logo.svg"
import {ReactSVG} from "react-svg";
function Logo () {
    return (
    <div className={styles.logo_container}>
    <ReactSVG src={LogoIcon} className={styles.logo_svg}/>
    </div>)
}

export default Logo