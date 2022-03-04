import SettingsCard from "components/Common/Tables/SettingsCard";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
const chartColor = "#FFFFFF";

const ResultsChart = ({chartData,title}) => {
  if (chartData) {
    const data = (canvas) => {
      const items = chartData.map((item) => item.Name);
      const values = chartData.map((item) => item.TotalValue);
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

      return {
        labels: items,
        datasets: [
          {
            label: "%",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: values,
          },
        ],
      };
    };
    const options = {
      maintainAspectRatio: true,
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
          
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    };
    return (
      <Row className="justify-content-center">
        <Col sm={6}>
          <Card className="card-chart">
            <CardHeader>{title && title}</CardHeader>
            <CardBody>
              <Bar data={data} options={options} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  } else {
    return <h2>Anket Sonucu Yok</h2>;
  }
};

export default ResultsChart;
