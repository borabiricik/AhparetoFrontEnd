import SettingsCard from "components/Common/Tables/SettingsCard";
import { Formik } from "formik";
import React, { createRef, useEffect } from "react";
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
import { getSurveyCriterias } from "stores/Survyes/surveySlice";
import { getSurveyQuestions } from "stores/Survyes/surveySlice";
import { getSurveyItemCriteria } from "stores/Survyes/surveySlice";
import { Bar } from "react-chartjs-2";
import SurveyResults from "components/Survey/SurveyResults";
import { getSurveyResults } from "stores/Survyes/surveySlice";
import Loading from "components/Common/Loading";
import { BiEdit } from "react-icons/bi";
import { getSurveyResultsByDemografik } from "stores/Survyes/surveySlice";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { getDemografik } from "stores/Survyes/surveySlice";
import { getSurveyParticipants } from "stores/Participants/participantsStore";

const SurveySettingsMain = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSurveyItems(id));
    dispatch(getSurveyCriterias(id));
    dispatch(getSurveyQuestions(id));
    dispatch(getSurveyItemCriteria(id));
    dispatch(getSurveyResults(id));
    dispatch(getSurveyResultsByDemografik(id));
    dispatch(getDemografik(id));
  }, []);

  const items = useSelector((state) => state.surveys.items);
  const criterias = useSelector((state) => state.surveys.criterias);
  const questions = useSelector((state) => state.surveys.questions);
  const itemCriterias = useSelector((state) => state.surveys.itemCriterias);
  const surveyResults = useSelector((state) => state.surveys.surveyResults);
  const demografikResults = useSelector((state) => state.surveys.demografik);
  const participants = useSelector((state) => state.participants.participants);
  if (items && criterias && questions && itemCriterias) {
    return (
      <CardBody>
        <Row>
          <Col sm={12} md={4}>
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
          <Col sm={12} md={4}>
            <SettingsCard>
              <CardHeader tag={"h4"}>Criterias</CardHeader>
              <CardBody></CardBody>
              <CardFooter className="row align-items-center justify-content-between px-5">
                {criterias.length > 0 ? <Approved /> : <Waiting />}

                <Row>
                  {criterias && (
                    <Button
                      className="btn-icon btn-round"
                      color="secondary"
                      onClick={() => {
                        history.push(
                          getLayoutName(history) +
                            "/settings/survey/" +
                            id +
                            "/viewCriterias"
                        );
                      }}
                    >
                      <AiOutlineEye size={24} />
                    </Button>
                  )}
                  {criterias.length < 1 && (
                    <Button
                      className="btn-icon btn-round"
                      color="success"
                      onClick={() => {
                        history.push(
                          getLayoutName(history) +
                            "/settings/survey/" +
                            id +
                            "/addCriterias"
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
          <Col sm={12} md={4}>
            <SettingsCard>
              <CardHeader tag={"h4"}>Survey Questions</CardHeader>
              <CardBody></CardBody>
              <CardFooter className="row align-items-center justify-content-between px-5">
                {questions.length > 0 ? <Approved /> : <Waiting />}

                <Row>
                  {questions && (
                    <Button
                      className="btn-icon btn-round"
                      color="secondary"
                      onClick={() => {
                        history.push(
                          getLayoutName(history) +
                            "/settings/survey/" +
                            id +
                            "/viewQuestions"
                        );
                      }}
                    >
                      <AiOutlineEye size={24} />
                    </Button>
                  )}
                  {questions.length < 1 && (
                    <Button
                      className="btn-icon btn-round"
                      color="success"
                      onClick={() => {
                        history.push(
                          getLayoutName(history) +
                            "/settings/survey/" +
                            id +
                            "/addQuestions"
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
          <Col sm={12} md={4}>
            <SettingsCard>
              <CardHeader tag={"h4"}>Item - Criteria</CardHeader>
              <CardBody></CardBody>
              <CardFooter className="row align-items-center justify-content-between px-5">
                {itemCriterias.length > 0 ? <Approved /> : <Waiting />}

                <Row>
                  {itemCriterias && (
                    <Button
                      className="btn-icon btn-round"
                      color="secondary"
                      onClick={() => {
                        history.push(
                          getLayoutName(history) +
                            "/settings/survey/" +
                            id +
                            "/viewItemCriterias"
                        );
                      }}
                    >
                      <AiOutlineEye size={24} />
                    </Button>
                  )}
                  {itemCriterias.length < 1 && (
                    <Button
                      className="btn-icon btn-round"
                      color="success"
                      onClick={() => {
                        history.push(
                          getLayoutName(history) +
                            "/settings/survey/" +
                            id +
                            "/addItemCriteria"
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
          <Col sm={12} md={4}>
            <SettingsCard>
              <CardHeader tag={"h4"}>
                Participant Info (SMS-Mail-Pollster)
              </CardHeader>
              <CardBody></CardBody>
              <CardFooter className="row align-items-center justify-content-between px-5">
                {itemCriterias.length > 0 ? <Approved /> : <Waiting />}

                <Row>
                  <Button
                    className="btn-icon btn-round"
                    color="secondary"
                    onClick={() => {
                      history.push(
                        getLayoutName(history) +
                          "/settings/survey/" +
                          id +
                          "/viewParticipants"
                      );
                    }}
                  >
                    <AiOutlineEye size={24} />
                  </Button>

                  {!participants && (
                    <Button
                      className="btn-icon btn-round"
                      color="success"
                      onClick={() => {
                        history.push(
                          getLayoutName(history) +
                            "/settings/survey/" +
                            id +
                            "/editParticipants"
                        );
                      }}
                    >
                      <BiEdit size={24} />
                    </Button>
                  )}
                </Row>
              </CardFooter>
            </SettingsCard>
          </Col>
          <Col sm={12} md={4}>
            <SettingsCard>
              <CardHeader tag={"h4"}>Demopraphic Questions</CardHeader>
              <CardBody></CardBody>
              <CardFooter className="row align-items-center justify-content-end px-5">
                <Row className="justify-content-end">
                  <Button
                    className="btn-icon btn-round"
                    color="secondary"
                    onClick={() => {
                      history.push(
                        getLayoutName(history) +
                          "/settings/survey/" +
                          id +
                          "/viewDemografik"
                      );
                    }}
                  >
                    <AiOutlineEye size={24} />
                  </Button>

                  <Button
                    className="btn-icon btn-round"
                    color="success"
                    onClick={() => {
                      history.push(
                        getLayoutName(history) +
                          "/settings/survey/" +
                          id +
                          "/addDemografik"
                      );
                    }}
                  >
                    <HiPlus size={24} />
                  </Button>
                </Row>
              </CardFooter>
            </SettingsCard>
          </Col>
        </Row>
        {surveyResults && surveyResults.length > 0 ? (
          <Row className="w-100">
            <Col sm={6}>
              <SurveyResults data={surveyResults} />
            </Col>
            <Col sm={6}>
              <h2>Results Based On Demographic Options</h2>
              <Row>
                {demografikResults &&
                  demografikResults.map((result) => {
                    // const itemName = result.Result.map((r) => `${r.ItemName}`);
                    if (result) {
                      return (
                        <Col>
                          <h3>{result.Name}</h3>
                          {result.Result.map((r) => (
                            <>
                              <h5>
                                {r.ItemName} : {parseInt(r.Value * 100)} %
                              </h5>
                            </>
                          ))}
                        </Col>
                      );
                    }
                    return null;
                  })}
              </Row>
            </Col>
          </Row>
        ) : (
          <div>
            <h1>No Results</h1>
          </div>
        )}
      </CardBody>
    );
  } else {
    return <Loading />;
  }
};

export default SurveySettingsMain;
