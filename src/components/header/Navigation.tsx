import styles from "./Navigation.module.css"
import Logo from "../common/logo/Logo.tsx";
import Menu from "./menu/Menu.tsx";
function Navigation() {
    return(
    <div className={styles.navigation_container}>
        <Logo />
        <Menu />
    </div>)
}

export default Navigation;