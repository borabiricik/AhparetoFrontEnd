import Loading from 'components/Common/Loading';
import ResultsChart from 'layouts/Survey/Results/ResultsChart';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, CardBody, CardHeader, Container } from 'reactstrap';
import { getPollsterSingleResult } from 'stores/Survyes/surveyResultsSlice';

const SurveyResults = () => {
  const results = useSelector(
    (state) => state.surveyResults.pollsterSingleResults
  );
  const params = useParams();
  const dispatch = useDispatch();
  const getData = async () => {
    await dispatch(
      getPollsterSingleResult({
        SurveyId: params.id,
        ResultId: params.resultId,
      })
    );
  };
  useEffect(() => {
    getData();
  }, []);

  if (results) {
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
  return <Loading />;
};

export default SurveyResults;
