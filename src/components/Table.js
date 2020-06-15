import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { TextField } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles({
  table: {
    width: 400
  },
});

const row = (
  x,
  i,
  header,
  handleRemove,
  startEditing,
  editId,
  handleChange,
  stopEditing
) => {
  const currEdit = editId === i;
  return (
    <TableRow key={i}>
      {header.map((y, k) => (
        <TableCell component="th" scope="row" key={k}>
          {currEdit ? (
            <TextField
              value={x[y.prop]}
              name={y.prop}
              onChange={(e) => handleChange(e, y.prop, i)}
            />
          ) : (
            x[y.prop]
          )}
        </TableCell>
      ))}
      <TableCell component="th" scope="row">
        {currEdit ? (
          <CheckIcon onClick={() => stopEditing()} />
        ) : (
          <EditIcon onClick={() => startEditing(i)} />
        )}{" "}
      </TableCell>
      <TableCell component="th" scope="row">
        <DeleteIcon onClick={() => handleRemove(i)} />
      </TableCell>
    </TableRow>
  );
};

export default function SimpleTable({
  data,
  header,
  handleRemove,
  startEditing,
  editId,
  handleChange,
  stopEditing,
}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((x, i) => (
              <TableCell key={i}>{x.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((x, i) =>
            row(
              x,
              i,
              header,
              handleRemove,
              startEditing,
              editId,
              handleChange,
              stopEditing
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
