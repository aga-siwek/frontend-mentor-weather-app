import styles from "./Main.module.css";
import Search from "./search/Search.tsx";
import Result from "./result/Result.tsx";
import { useMainContext } from "../../hooks/useMainContext.ts";

function Main() {
  const { onMenuClose } = useMainContext();
  return (
    <main className={styles.main_container} onClick={onMenuClose}>
      <Search />
      <Result />
    </main>
  );
}

export default Main;
