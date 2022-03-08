import React, { useState } from "react";
import { Accordion, useAccordionToggle } from "react-bootstrap";
import { FcApproval } from "react-icons/fc";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { criteriaFinder } from "utils/criteriaFinder";

const Question = ({ question, values, criterias, eventKey }) => {
  const [isActive, setisActive] = useState(true);
  const [isNextQuestion, setisNextQuestion] = useState(false);
  const [selectedCriteria, setselectedCriteria] = useState("");
  const [unselectedCriteria, setunselectedCriteria] = useState("");
  const accordionNextQuestion = useAccordionToggle(
    eventKey+1,
    () => {
      console.log(eventKey)
    }
  );
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
    accordionNextQuestion()
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

  const changeAnswer = (question) => {
    const foundItem = values.Results.find((value) => {
      if (
        value.Criteria1Id === question.Criteria1Id &&
        value.Criteria2Id === question.Criteria2Id
      ) {
        return value;
      }
    });

    values.Results.pop(foundItem);
    setisNextQuestion(false);
    setisActive(true);
  };
  return (
    <Accordion.Collapse eventKey={question.Id} className={`card-chart`}>
      <div className="p-4">
        <h2 className="text-center">
          {isNextQuestion
            ? `${selectedCriteria}, ${unselectedCriteria} göre ne kadar önemli ? `
            : question.Text}
        </h2>
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
                  <Button
                    onClick={() => {
                      setselectedCriteria(
                        criteriaFinder(criterias, question.Criteria1Id).Name
                      );
                      setunselectedCriteria(
                        criteriaFinder(criterias, question.Criteria2Id).Name
                      );
                      setisNextQuestion(true);
                    }}
                  >
                    {criteriaFinder(criterias, question.Criteria1Id).Name}
                  </Button>
                </Col>

                <Col className="row justify-content-center no-gutters">
                  <Button
                    onClick={() => {
                      setselectedCriteria(
                        criteriaFinder(criterias, question.Criteria2Id).Name
                      );
                      setunselectedCriteria(
                        criteriaFinder(criterias, question.Criteria1Id).Name
                      );
                      setisNextQuestion(true);
                    }}
                  >
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
          <Row className="justify-content-center">
            <div>
              <Row className="text-center py-3">
                <FcApproval color="#5CECC0" className="mx-2" size={24} />
                <p>Question Answered</p>
              </Row>

              <div>
                <Button
                  className="btn-simple"
                  color="twitter"
                  onClick={() => changeAnswer(question)}
                >
                  Yanıtı Değiştir
                </Button>
              </div>
            </div>
          </Row>
        )}
      </div>
    </Accordion.Collapse>
  );
};

export default Question;
