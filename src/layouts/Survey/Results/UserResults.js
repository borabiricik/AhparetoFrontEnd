import Loading from "components/Common/Loading";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { getSurveyResultsByVerificationCode } from "stores/Survyes/surveyResultsSlice";
import ResultsChart from "./ResultsChart";

const UserResults = () => {
  const results = useSelector((state) => state.surveyResults.results);
  const resultsByDemografik = useSelector(
    (state) => state.surveyResults.resultsByDemografik
  );
  const params = useParams();
  const dispatch = useDispatch();
  const getData = async () => {
    await dispatch(
      getSurveyResultsByVerificationCode({
        VerificationCode: params.verificationCode,
        SurveyId: params.id,
      })
    );
  };
  useEffect(() => {
    getData();
  }, []);

  if (!results) {
    return <Loading />;
  } else {
    return (
      <div className="content">
        <Container>
          <Card>
            <CardHeader tag={"h1"}>Survey Results</CardHeader>
            <CardBody>
              <ResultsChart chartData={results} />
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
};

export default UserResults;
