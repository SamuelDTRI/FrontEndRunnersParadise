import React from "react";
import UserCard from "./UserCard";
import styles from "./UserList.module.css";

const UserList = ({ users }) => {
  return (
    <div className={styles.userListContainer}>
      <h2>Records Created</h2>
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default UserList;
