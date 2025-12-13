import styles from "./Navigation.module.css"
import Logo from "../common/logo/Logo.tsx";
import Menu from "./menu/Menu.tsx";

function Navigation({menuIsOpen, onMenuClick, onSwitchMeasure, measureType}) {

    return(
    <div className={styles.navigation_container}>
        <Logo />
        <Menu menuIsOpen={menuIsOpen} onMenuClick={onMenuClick} onSwitchMeasure={onSwitchMeasure} measureType={measureType} />
    </div>)
}

export default Navigation;