import React, { useEffect } from "react";
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
import { FaRegUserCircle } from "@react-icons/all-files/fa/FaRegUserCircle";
import CustomTable from "components/Common/Tables/CustomTable";
import { useDispatch } from "react-redux";
import { getSurveys } from "stores/Survyes/surveySlice";
import { useSelector } from "react-redux";
import CommonTable from "components/Common/Tables/CommonTable";
import { getLayoutName } from "Functions/Router";
import { useHistory } from "react-router-dom";

const Surveys = () => {
  const history = useHistory()
  const surveys = useSelector((state) => state.surveys.surveysData);
  const loading = useSelector((state) => state.surveys.loading);
  const dispatch = useDispatch();
  const getData = async () => {
    await dispatch(await getSurveys());
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading === false) {
    return (
      <div className="content">
        <Card className="p-3">
          <CardHeader>
            <Row className="justify-content-between align-items-center">
              <CardTitle className="m-0 p-0" tag={"h2"}>
                Anket Listesi
              </CardTitle>
              <Button color="info" onClick={()=>history.push(getLayoutName(history)+"/create/survey")}>Anket Oluştur</Button>
            </Row>
          </CardHeader>
          <CardBody className="p-0 my-5">
            <Col md="12" lg="4" className="p-0">
              <Card color="default">
                <Row className="m-4 justify-content-between align-items-center">
                  <div>
                    <CardText tag={"h2"} className="m-0">
                      {surveys.length}
                    </CardText>
                    <p>Anket Sayısı</p>
                  </div>

                  <div className="bg-primary rounded-circle p-3">
                    <FaRegUserCircle
                      style={{ fontSize: "3rem", color: "white" }}
                    />
                  </div>
                </Row>
              </Card>
            </Col>

            <CommonTable
              title={"Anket Listesi"}
              columns={[
                { name: "Anket Adı" },
                { startDate: "Başlangıç Tarihi", date: true },
                { endDate: "Bitiş Tarihi", date: true },
                { pollsterAnswerCount: "Katılım Sayısı" },
              ]}
              tableData={surveys}
              actionPageNames={{
                edit: getLayoutName(history) + "/edit/survey/",
              }}
              // deleteAction={}
              idKey = "id"
            />
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="content">
        <h2>Yükleniyor...</h2>
      </div>
    );
  }
};

export default Surveys;
