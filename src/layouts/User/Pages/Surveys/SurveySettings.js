import SettingsCard from "components/Common/Tables/SettingsCard";
import { Formik } from "formik";
import React, { useEffect } from "react";
import ReactTable from "react-table-6";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import { HiPlus } from "react-icons/hi";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";
import { CgSandClock } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getLayoutName } from "Functions/Router";
import { useDispatch, useSelector } from "react-redux";
import Approved from "components/Common/Approved";
import Waiting from "components/Common/Waiting";
import { getSurveyItems } from "stores/Survyes/surveySlice";

const SurveySettings = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSurveyItems(id));
  }, []);

  const items = useSelector((state) => state.surveys.items);
  if (items) {
    return (
      <div className="content">
        <Card>
          <CardHeader tag={"h2"}>Survey Settings</CardHeader>
          <CardBody>
            <Row>
              <Col sm={4} md={12}>
                <SettingsCard onClick={() => console.log("first")}>
                  <CardHeader tag={"h4"}>Items</CardHeader>
                  <CardBody></CardBody>
                  <CardFooter className="row align-items-center justify-content-between px-5">
                    {items.length > 0 ? <Approved /> : <Waiting />}

                    <Row>
                      {items && (
                        <Button
                          className="btn-icon btn-round"
                          color="secondary"
                          onClick={() => {
                            history.push(
                              getLayoutName(history) +
                                "/settings/survey/" +
                                id +
                                "/viewItems"
                            );
                          }}
                        >
                          <AiOutlineEye size={24} />
                        </Button>
                      )}
                      {items.length < 1 && (
                        <Button
                          className="btn-icon btn-round"
                          color="success"
                          onClick={() => {
                            history.push(
                              getLayoutName(history) +
                                "/settings/survey/" +
                                id +
                                "/addItems"
                            );
                          }}
                        >
                          <HiPlus size={24} />
                        </Button>
                      )}
                    </Row>
                  </CardFooter>
                </SettingsCard>
              </Col>
              <Col sm={4} md={12}>
                <SettingsCard>
                  <CardHeader tag={"h4"}>Criterias</CardHeader>
                  <CardBody></CardBody>
                  <CardFooter className="row align-items-center justify-content-end">
                    <p className="m-0">Waiting for done</p>
                    <CgSandClock
                      color="#F9F871"
                      size={18}
                      style={{ margin: "5px" }}
                    />
                  </CardFooter>
                </SettingsCard>
              </Col>
              <Col sm={4} md={12}>
                <SettingsCard>
                  <CardHeader tag={"h4"}>Survey Questions</CardHeader>
                  <CardBody></CardBody>
                  <CardFooter className="row align-items-center justify-content-end">
                    <p className="m-0">Waiting for done</p>
                    <CgSandClock
                      color="#F9F871"
                      size={18}
                      style={{ margin: "5px" }}
                    />
                  </CardFooter>
                </SettingsCard>
              </Col>
            </Row>
            <SettingsCard>
              <CardHeader tag={"h4"}>Survey Results</CardHeader>
              <CardBody></CardBody>
            </SettingsCard>
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

export default SurveySettings;
