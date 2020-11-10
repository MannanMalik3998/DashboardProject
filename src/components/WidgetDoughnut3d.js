import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function WidgetDoughnut3d(props) {
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: "doughnut3d", // The chart type
    width: "100%", // Width of the chart
    height: "125", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        // bgcolor: "#2a2a2a",
        bgcolor: "#0e3027",
        baseFontSize: "13"
        // theme: "fusion"
      },
      // Chart Data
      data: props.data
    }
  };
  return (
    <div className="Widget-Wrap">
      <div className="Widget-Title">{props.title}</div>
      <div className="Widget-Value">
        <ReactFC {...chartConfigs} />
      </div>
    </div>
  );
}

export default WidgetDoughnut3d;
