import styles from "./Search.module.css";
import { ReactSVG } from "react-svg";
import searchIcon from "../../../assets/icon-search.svg";
import Button from "../../common/buttons/ButtonPrimary.tsx";
import { useState } from "react";
import { useMainContext } from "../../../hooks/useMainContext.ts";

function Search() {
  const { onSearchPlace } = useMainContext();
  const [tempPlace, setTempPlace] = useState<string>("");

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTempPlace(e.target.value);
  };
  const handleSearch = (): void => {
    onSearchPlace(tempPlace);
  };

  return (
    <div className={styles.search_container}>
      <div className={styles.search_typing}>
        <ReactSVG src={searchIcon} className={styles.search_icon} />
        <label>
          <input
            placeholder="Search for a place..."
            className={styles.search_input}
            value={tempPlace}
            onChange={handlePlaceChange}
          ></input>
        </label>
      </div>
      <Button text="Search" onClick={handleSearch} size="LARGE" />
    </div>
  );
}

export default Search;
