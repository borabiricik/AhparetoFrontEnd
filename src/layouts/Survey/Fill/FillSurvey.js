import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Loading from "../../../components/Common/Loading";
import Question from "./Question";

const FillSurvey = () => {
  // const {id} = useParams()
  const isLoading = useSelector((state) => state.fillSurvey.isLoading);
  const questions = useSelector((state) => state.fillSurvey.questions);
  const criterias = useSelector((state) => state.fillSurvey.criteria);
  const dispatch = useDispatch();
  const { id, verificationCode } = useParams();

  const getData = async () => {
    await dispatch(getQuestions());
    await dispatch(getCriterias());
  };

  useEffect(() => {
    getData();
  }, []);

  if (!isLoading && questions && criterias) {
    return (
      <div className="content">
        <Formik
          initialValues={{
            Results: [],
          }}
          onSubmit={(values) => {
            dispatch(
              finishSurvey({
                Results: values.Results,
                VerificationCode: verificationCode,
                SurveyId: id,
              })
            );
          }}
        >
          {({ values, handleSubmit }) => {
            return (
              <Card>
                <CardHeader tag={"h2"}>Fill Survey</CardHeader>
                <CardBody>
                  {questions.map((question) => {
                    return (
                      <Question
                        question={question}
                        values={values}
                        criterias={criterias}
                      />
                    );
                  })}
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
