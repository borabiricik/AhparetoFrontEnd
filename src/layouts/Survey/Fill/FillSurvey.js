import Logo from "components/Common/Logo";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import { getCriterias } from "stores/Survyes/fillSurveySlice";
import { finishSurvey } from "stores/Survyes/fillSurveySlice";
import { getQuestions } from "stores/Survyes/fillSurveySlice";
import Swal from "sweetalert2";
import Loading from "../../../components/Common/Loading";
import Question from "./Question";

const FillSurvey = () => {
  // const {id} = useParams()
  const isLoading = useSelector((state) => state.fillSurvey.isLoading);
  const questions = useSelector((state) => state.fillSurvey.questions);
  const criterias = useSelector((state) => state.fillSurvey.criteria);
  const dispatch = useDispatch();
  const { id, verificationCode } = useParams();
  const history = useHistory();

  const getData = async () => {
    await dispatch(getQuestions(id));
    await dispatch(getCriterias(id));
  };

  useEffect(() => {
    getData();
  }, []);

  if (!isLoading && questions && criterias) {
    return (
      <div className="container">
        <Logo />
        <Formik
          initialValues={{
            Results: [],
          }}
          onSubmit={(values) => {
            console.log(values);
            if (values.Results.length < questions.length) {
              Swal.fire({
                text: "Please fill all the questions",
                timer: 2000,
                showConfirmButton: false,
              });
            } else {
              dispatch(
                finishSurvey({
                  Results: values.Results,
                  VerificationCode: verificationCode,
                  SurveyId: id,
                  history,
                })
              );
            }
          }}
        >
          {({ values, handleSubmit }) => {
            return (
              <Card>
                <CardHeader tag={"h2"}>Fill Survey</CardHeader>
                <CardBody>
                  <Accordion defaultActiveKey={questions[0].Id}>
                    {questions.map((question, index) => {
  
                      return (
                        <div className="border-bottom border-dark">
                          <CardHeader className="row justify-content-center">
                            <Accordion.Toggle
                              as={"h2"}
                              className="btn-link btn-success "
                              style={{ cursor: "pointer" }}
                              eventKey={question.Id}
                            >
                              Question #{index + 1}
                            </Accordion.Toggle>
                          </CardHeader>
                          <Question
                            question={question}
                            values={values}
                            criterias={criterias}
                            eventKey={question.Id}
                          />
                        </div>
                      );
                    })}
                  </Accordion>
                </CardBody>
                <CardFooter className="row justify-content-center">
                  <Button color="success" onClick={handleSubmit}>
                    Finish Survey
                  </Button>
                </CardFooter>
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

export default FillSurvey;
