import React, { useState } from "react";
import styles from "./UserCard.module.css";

const UserCard = ({ user }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.userCard}>
      <h3>
        {user.name} {user.surName}
      </h3>
      <p>Email: {user.email}</p>
      <p>
        Password: {showPassword ? user.password : "********"}
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"} Password
        </button>
      </p>
    </div>
  );
};

export default UserCard;
