import styles from "./ButtonPrimary.module.css";

type buttonProps = {
  text: string;
  onClick: () => void;
  size: "LARGE" | "SMALL";
};

function ButtonPrimary({
  text = "Click me",
  onClick,
  size = "LARGE",
}: buttonProps) {
  const buttonStyle = () => {
    if (size === "LARGE") {
      return styles.button_large_size;
    } else if (size === "SMALL") {
      return styles.button_small_size;
    }
  };

  return (
    <button
      className={`${styles.button_container} ${buttonStyle()}`}
      onClick={(e) => onClick(e)}
    >
      {text}
    </button>
  );
}

export default ButtonPrimary;
