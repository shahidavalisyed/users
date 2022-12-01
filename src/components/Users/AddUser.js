import React from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState, useRef } from "react";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputref =useRef()
  const ageInputref =useRef()

  const [error, setError] = useState();

  const addUserHanler = (event) => {
    event.preventDefault();

    const  enteredInputName=nameInputref.current.value
    const  enteredUserAge=ageInputref.current.value
    if (enteredInputName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please Enter a valid name and age (non-empty values)",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid age(> 0)",
      });
      return;
    }
    props.onAddUser(enteredInputName, enteredUserAge);
    nameInputref.current.value='';
    ageInputref.current.value='';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHanler}>
          <label htmlFor="UserName">UserName</label>
          <input
            id="username"
            type="text"
            ref={nameInputref}
          />
          <label htmlFor="age">Age(Years)</label>
          <input
            id="age"
            type="number"
            ref={ageInputref}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
