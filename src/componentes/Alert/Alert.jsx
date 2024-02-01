import React from "react";
import styles from "./Alert.module.css";

const Alert = ({ message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.alert}>
        <p>⛔ No results were found with the filters entered..</p>
      </div>
    </div>
  );
};

export default Alert;
