import Loading from "components/Common/Loading";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
import { getSurveyCriterias } from "stores/Survyes/surveySlice";
import { getSurveyQuestions } from "stores/Survyes/surveySlice";
import { combinations } from "utils/combinations";

const ViewQuestions = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.surveys.questions);
  const criterias = useSelector((state) => state.surveys.criterias);
  const items = useSelector((state) => state.surveys.items);
  const isLoading = useSelector((state) => state.surveys.questionsLoading);
  useEffect(() => {
    dispatch(getSurveyCriterias(params.id));
    dispatch(getSurveyQuestions(params.id));

    return () => {};
  }, []);

  if (!isLoading && questions && criterias) {
    return (
      <div className="content">
        <Formik>
          {() => {
            return (
              <Card>
                <CardHeader tag="h2">Questions</CardHeader>
                <CardBody>
                  {items && criterias && (
                    <h4 className="text-info text-right">
                      Recommended Question Count:{" "}
                      {combinations(criterias.length,2)}
                    </h4>
                  )}
                  {questions.map((question) => {
                    return (
                      <Card>
                        <CardBody>
                          <h2 className="questionText">{question.Text}</h2>
                          <Row className="justify-content-center  mx-auto">
                            <Col className="row justify-content-center">
                              <Button className="btn-simple" color="twitter">
                                {
                                  criterias.find((criteria) => {
                                    return criteria.Id === question.Criteria1Id;
                                  }).Name
                                }
                              </Button>
                            </Col>

                            <Col className="row justify-content-center">
                              <Button className="btn-simple" color="twitter">
                                {
                                  criterias.find((criteria) => {
                                    return criteria.Id === question.Criteria2Id;
                                  }).Name
                                }
                              </Button>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="row justify-content-center">
                              <Button color="danger">E??it</Button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    );
                  })}
                </CardBody>
              </Card>
            );
          }}
        </Formik>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default ViewQuestions;
