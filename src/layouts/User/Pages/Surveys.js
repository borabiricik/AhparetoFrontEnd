import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import {FaRegUserCircle} from "@react-icons/all-files/fa/FaRegUserCircle"
import SurveysTable from "components/Common/Tables/SurveysTable";



const Surveys = () => {
  return (
    <div className="content">
      <Card className="p-3">
        <CardHeader>
          <Row className="justify-content-between align-items-center">
            <CardTitle className="m-0 p-0" tag={"h2"}>
              Anket Listesi
            </CardTitle>
            <Button color="info">Anket Oluştur</Button>
          </Row>
        </CardHeader>
        <CardBody className="p-0 my-5">
          <Col md="12"lg="4" className="p-0">
            <Card color="default">
              <Row className="m-4 justify-content-between align-items-center">
                <div>
                  <CardText tag={"h2"} className="m-0">0</CardText>
                  <p>Anket Sayısı</p>
                </div>

                <div className="bg-primary rounded-circle p-3">
                    <FaRegUserCircle style={{fontSize:"3rem", color:"white"}} />
                </div>
              </Row>
            </Card>
          </Col>

          <SurveysTable />
        </CardBody>
      </Card>
    </div>
  );
};

export default Surveys;
