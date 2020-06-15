import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent:'space-between',
    marginBottom:20
  }
}));


export default function Form(fields) {
  const [state, setState] = useState({ item: "", quantity: ""});
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    fields.onSubmit(state);

    setState({ item: "", quantity: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
    <h3>Data</h3>
    <form className={classes.form}>
      
      <Input
        name="item"
        value={state.item}
        placeholder="Enter item..."
        onChange={handleChange}
      />
      <Input
        name="quantity"
        value={state.quantity}
        placeholder="Enter quantity..."
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => handleSubmit(e)}
      >
        <span role="img" aria-label="emoji">✔️</span>
      </Button>
    </form>
    </>
  );
}
