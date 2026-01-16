import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export function useMainContext() {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("useMainContext must be used within MainProvider");
  }

  return context;
}
