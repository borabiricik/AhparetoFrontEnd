import SettingsCard from "components/Common/Tables/SettingsCard";
import randomColor from "randomcolor";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
const chartColor = "#FFFFFF";

const SurveyResults = ({ demografik }) => {
  const surveyResults = useSelector((state) => state.surveys.surveyResults);

  if (surveyResults) {
    const data = (canvas) => {
      const items = surveyResults.map((item) => item.Name);
      const values = surveyResults.map((item) => item.TotalValue);
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)");

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
      <div className="">
        <Col>
          <Card className="card-chart">
            <CardHeader tag={"h4"}>
              Survey Results {demografik && "(Demographic)"}
            </CardHeader>
            <CardBody>
              <Bar data={data} options={options} />
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  } else {
    return <h2>Anket Sonucu Yok</h2>;
  }
};

export default SurveyResults;
