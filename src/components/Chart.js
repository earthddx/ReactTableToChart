import React, { useState, useEffect } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Paper } from "@material-ui/core";

import theme from "../theme";

//TODO: components base structure
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  chartTypeSelect: {
    position: "absolute",
    left: "10vw",
    top: "0",
  },
  buttons: {
    margin: "auto",
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  chart: {
    //display: "flex",
    justifyContent: "center",
    marginTop: 50,
    marginLeft: '40vw',
    paddingRight: 50,
    paddingLeft: 50,
    maxHeight: 450,
    minHeight: 300,
    minWidth: 300,
  },
  savedCharts: {
    //margin: 50,
  },
  paperChart: {
    paddingRight: 50,
    paddingLeft: 50,
    maxHeight: 450,
    minHeight: 300,
    minWidth: 300,
    marginTop: 50,
  },
}));

export default function Chart(chartData) {
  const chartItems = chartData.data.map((entry) => entry.item);
  const chartNumbers = chartData.data.map((entry) =>
    parseInt(entry.quantity, 10)
  );

  const obj = {
    labels: chartItems,
    datasets: [
      {
        label: "Dataset", //TODO: make it dynamic
        data: chartNumbers,
        backgroundColor: [
          //TODO: make colors infinite
          "rgba(255,99,132,0.6)",
          "rgba(54,99,235,0.6)",
          "rgba(255,159,64,0.6)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(199,31,31,0.6)",
          "rgba(156,156,244,0.6)",
          "rgba(3,7,132,0.6)",
          "rgba(124,233,1,0.6)",
          "rgba(255,99,132,0.6)",
          "rgba(54,99,235,0.6)",
          "rgba(255,159,64,0.6)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(199,31,31,0.6)",
          "rgba(156,156,244,0.6)",
          "rgba(3,7,132,0.6)",
          "rgba(124,233,1,0.6)",
        ],
      },
    ],
  };
  const [value, setValue] = useState("pie");
  const [copy, setCopy] = useState(false);
  const [info, setInfo] = useState([]);
  const [copyValue, setCopyValue] = useState("");
  const [allSavedCharts, setAllSavedCharts] = useState([]);
  const classes = useStyles();

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleButtonSubmit = (event) => {
    event.preventDefault();
    const savedData = chartData;
    const copyChartItems = savedData.data.map((entry) => entry.item);
    const copyChartNumbers = savedData.data.map((entry) =>
      parseInt(entry.quantity, 10)
    );

    setCopyValue(value);
    const savedObject = {
      chartType: value,
      labels: copyChartItems,
      datasets: [
        {
          label: obj.datasets[0].label,
          data: copyChartNumbers,
          backgroundColor: obj.datasets[0].backgroundColor,
        },
      ],
    };

    setCopy(true);

    
      setAllSavedCharts([...allSavedCharts, savedObject]);

      //allSavedCharts.datasets.data.meta.type - chart type
      //          ex :[0].datasets[0]._meta[1].type
      //console.logging it gives Undefined
      //console.log(savedObject.chartType);
    // }
  };

  console.log("allSavedCharts:", allSavedCharts);

  useEffect(() => {}, [allSavedCharts]);

  return (
    <div className={classes.root}>
      <div className={classes.chartTypeSelect}>
        <h1 style={{ color: theme.palette.secondary.main }}>
          Datakwip Frontend Test
        </h1>
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset">
            <h3>Select chart template</h3>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
              onChange={handleRadioChange}
              value={value}
            >
              <FormControlLabel
                value="pie"
                control={<Radio color="primary" />}
                label="Pie"
                labelPlacement="bottom"
              />
              <FormControlLabel
                //value={<ChartLine/>}
                value="line"
                control={<Radio color="primary" />}
                label="Line"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="bar"
                control={<Radio color="primary" />}
                label="Bar"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="doughnut"
                control={<Radio color="primary" />}
                label="Doughnut"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </form>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
            onClick={handleButtonSubmit}
          >
            Save chart
          </Button>
        </div>
      </div>

      {/* CHART */}
      <div className={classes.chart}>
        {/* <value.type {...value.props} data={obj}/>  */}
        {value === "pie" ? (
          <div className={classes.paperChart}>
            <Pie
              data={obj}
              width={100}
              height={150}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        ) : value === "bar" ? (
          <div className={classes.paperChart}>
            <Bar
              data={obj}
              width={100}
              height={150}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        ) : value === "line" ? (
          <div className={classes.paperChart}>
            <Line
              data={obj}
              width={100}
              height={150}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        ) : (
          <div className={classes.paperChart}>
            <Doughnut
              data={obj}
              width={100}
              height={150}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        )}
        {/*CHARTS DASHBOARD*/}
        
        <div className={classes.savedCharts}>
          {copy
            ? allSavedCharts.map((item, i) =>
                item.chartType === "pie" ? (
                  <Paper className={classes.paperChart} key={i}>
                    <Pie
                      data={item}
                      width={100}
                      height={150}
                      options={{ maintainAspectRatio: false }}
                    />
                  </Paper>
                ) : item.chartType === "bar" ? (
                  <Paper className={classes.paperChart} key={i}>
                    <Bar
                      data={item}
                      width={100}
                      height={100}
                      options={{ maintainAspectRatio: false }}
                    />
                  </Paper>
                ) : item.chartType === "line" ? (
                  <Paper className={classes.paperChart} key={i}>
                    <Line
                      data={item}
                      width={100}
                      height={100}
                      options={{ maintainAspectRatio: false }}
                    />
                  </Paper>
                ) : (
                  <Paper className={classes.paperChart} key={i}>
                    <Doughnut
                      data={item}
                      width={100}
                      height={100}
                      options={{ maintainAspectRatio: false }}
                    />
                  </Paper>
                )
              )
            : null}
        </div>
      </div>
    </div>
  );
}
