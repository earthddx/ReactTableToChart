import React, { useState } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Form from "./components/Form";
import Table from "./components/Table";
import Chart from "./components/Chart";

import theme from "./theme";


const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  input: {
    // display:'flex',
    // flexDirection:'column',
    // justifyContent:'',
    position:'absolute',
    left:'10vw',
    top:400,
    //marginTop:400,
    maxWidth:"40%"
  }
}));

function App() {
  const [state, setState] = useState({
    data: [],
  });
  const classes = useStyles();
  const [editId, setEditId] = useState(-1);
  const handleRemove = (i) => {
    setState((state) => ({
      data: state.data.filter((row, j) => j !== i),
    }));
  };

  const startEditing = (i) => {
    setEditId(i);
    console.log(i);
  };

  const stopEditing = () => {
    setEditId(-1);
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    setState((state) => ({
      data: state.data.map((row, j) =>
        j === i ? { ...row, [name]: value } : row
      ),
    }));
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.input}>
          <Form onSubmit={(entry) => setState({ data: [...state.data, entry] })} />
          <Table
            handleRemove={handleRemove}
            startEditing={startEditing}
            editId={editId}
            handleChange={handleChange}
            stopEditing={stopEditing}
            header={[
              { name: "Item", prop: "item" },
              { name: "Quantity", prop: "quantity" },
            ]}
            data={state.data}
          />
        </div>
        <div>
          <Chart data={state.data} />
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
