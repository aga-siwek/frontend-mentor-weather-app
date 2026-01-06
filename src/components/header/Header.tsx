import styles from "./Header.module.css"
import Navigation from "./Navigation.tsx";

function Header({menuIsOpen, onMenuClick, onSwitchMeasure, measureType, onMenuClose})
{
    return (
        <header className={styles.header_container}>
            <Navigation menuIsOpen={menuIsOpen} onMenuClick={onMenuClick} onSwitchMeasure={onSwitchMeasure} measureType={measureType}/>
            <div className={styles.header_title} onClick={onMenuClose}>
                <h1 className={styles.header_title_text}>How’s the sky looking today?</h1>
            </div>
        </header>)
}

export default Header