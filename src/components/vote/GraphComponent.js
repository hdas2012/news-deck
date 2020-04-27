import React from "react";
import { Line } from "react-chartjs-2";

export default class GraphComponent extends React.Component {
  render() {
    const data_label = this.props.news.map(obj => obj.objectID);
    const vote_data = this.props.news.map(obj => obj.points);
    const data = {
      labels: data_label,
      datasets: [
        {
          label: "Votes",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: vote_data
        }
      ]
    };

    return (
      <div>
        <Line data={data} />
      </div>
    );
  }
}
