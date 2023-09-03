import React, { useRef, useState } from "react";
import classes from "./AddUser.module.css";
import { Card } from "../UI/Card";
import { Button } from "../UI/Button";
import { ErrorModal } from "../UI/ErrorModal";

export const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (e) => {
    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    e.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        msg: "Please enter a non-empty values",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        msg: "Please enter a valid age",
      });
      return;
    }
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    props.onAddUser(enteredUsername, enteredAge);
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          msg={error.msg}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </div>
  );
};
