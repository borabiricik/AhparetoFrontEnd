import React, { useState } from "react";
import { FcApproval } from "react-icons/fc";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { criteriaFinder } from "utils/criteriaFinder";

const Question = ({ question, values, criterias }) => {
  const [isActive, setisActive] = useState(true);
  const [isNextQuestion, setisNextQuestion] = useState(false);
  const onEqual = (Criteria1Id, Criteria2Id) => {
    values.Results.push({
      Criteria1Id,
      Criteria2Id,
      Criteria1Weight: 1,
      Criteria2Weight: 1,
    });
  };
  const disableQuestion = () => {
    setisActive(false);
  };
  const criteriaWeightSet = (value) => {
    values.Results.push({
      Criteria1Id: question.Criteria1Id,
      Criteria2Id: question.Criteria1Id,
      Criteria1Weight: `${value}`,
      Criteria2Weight: `"1/${value}"`,
    });
    disableQuestion();
  };
  return (
    <Card className={`card-chart `}>
      <CardBody>
        <h2 className="text-center">{question.Text}</h2>
        {isActive === true ? (
          isNextQuestion ? (
            <div>
              <Row className="justify-content-around">
                <Button onClick={() => criteriaWeightSet(3)}>Az Önemli</Button>
                <Button onClick={() => criteriaWeightSet(5)}>Önemli</Button>
                <Button onClick={() => criteriaWeightSet(7)}>Çok Önemli</Button>
                <Button onClick={() => criteriaWeightSet(9)}>
                  Son Derece Önemli
                </Button>
              </Row>
            </div>
          ) : (
            <div>
              <Row>
                <Col className="row justify-content-center no-gutters">
                  <Button onClick={() => setisNextQuestion(true)}>
                    {criteriaFinder(criterias, question.Criteria1Id).Name}
                  </Button>
                </Col>

                <Col className="row justify-content-center no-gutters">
                  <Button onClick={() => setisNextQuestion(true)}>
                    {criteriaFinder(criterias, question.Criteria2Id).Name}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="row justify-content-center no-gutters">
                  <Button
                    color="danger"
                    onClick={() => {
                      onEqual(question.Criteria1Id, question.Criteria2Id);
                      disableQuestion();
                    }}
                  >
                    Eşit
                  </Button>
                </Col>
              </Row>
            </div>
          )
        ) : (
          <h2 className="text-center">
            <FcApproval color="#5CECC0" size={24} />
          </h2>
        )}
      </CardBody>
    </Card>
  );
};

export default Question;
