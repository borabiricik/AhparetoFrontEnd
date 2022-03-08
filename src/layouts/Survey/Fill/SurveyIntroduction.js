import Loading from "components/Common/Loading";
import Logo from "components/Common/Logo";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
import { getSurvey } from "stores/Survyes/fillSurveySlice";

const SurveyIntroduction = () => {
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.fillSurvey.survey);
  const { id, verificationCode } = useParams();
  const history = useHistory();
  const getData = async () => {
    await dispatch(getSurvey(id));
  };
  useEffect(() => {
    getData();
  }, []);

  if (survey) {
    return (
      <>
       <Logo />

        <Container className="introduction-container">
          <Card className="p-4">
            <CardHeader className="text-center font-weight-bolder" tag={"h1"}>
              {survey.Name}
            </CardHeader>
            <CardBody className="my-3">
              <div className="text-center">
                <div className="p-2">
                  <p className="font-weight-bolder">Survey Description</p>
                  <p className="font-weight-light">{survey.FirstDescription}</p>
                </div>
                <div className="p-2">
                  <p className="font-weight-bolder">Survey Purpose</p>
                  <p className="font-weight-light">{survey.Purpose}</p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="row justify-content-center">
              <Button
                color="success"
                onClick={() =>
                  history.push(`/survey/fill/${id}/${verificationCode}`)
                }
              >
                Ankete Başla
              </Button>
            </CardFooter>
          </Card>
        </Container>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default SurveyIntroduction;
