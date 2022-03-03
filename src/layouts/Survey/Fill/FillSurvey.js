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
import { getQuestions } from "stores/Survyes/fillSurveySlice";
import Loading from "../../../components/Common/Loading";

const FillSurvey = () => {
  // const {id} = useParams()
  const isLoading = useSelector((state) => state.fillSurvey.isLoading);
  const questions = useSelector((state) => state.fillSurvey.questions);
  const criterias = useSelector((state) => state.fillSurvey.criteria);
  const dispatch = useDispatch();

  const getData = async () => {
    await dispatch(getQuestions());
    await dispatch(getCriterias());
  };

  const criteriaFinder = (criteriaId) => {
    return criterias.find((criteria) => criteria.Id === criteriaId);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!isLoading && questions && criterias) {
    console.log(questions);
    return (
      <div className="content">
        <Card>
          <CardHeader tag={"h2"}>Fill Survey</CardHeader>
          <CardBody>
            {questions.map((question) => {
              return (
                <Card className="card-chart">
                  <CardBody>
                    <h2 className="text-center">{question.Text}</h2>
                    <Row>
                      <Col className="row justify-content-center no-gutters">
                        <Button>
                          {criteriaFinder(question.Criteria1Id).Name}
                        </Button>
                      </Col>

                      <Col className="row justify-content-center no-gutters">
                        <Button>
                          {criteriaFinder(question.Criteria2Id).Name}
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="row justify-content-center no-gutters">
                        <Button color="danger">Eşit</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              );
            })}
          </CardBody>
          <CardFooter className="row justify-content-center">
            <Button color="success">Finish Survey</Button>
          </CardFooter>
        </Card>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default FillSurvey;
