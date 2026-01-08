import styles from "./Header.module.css"
import Navigation from "./Navigation.tsx";
import {useMainContext} from "../../hooks/useMainContext.ts";

function Header()
{
    const {onMenuClose} = useMainContext()
    return (
        <header className={styles.header_container}>
            <Navigation />
            <div className={styles.header_title} onClick={onMenuClose}>
                <h1 className={styles.header_title_text}>How’s the sky looking today?</h1>
            </div>
        </header>)
}

export default Header