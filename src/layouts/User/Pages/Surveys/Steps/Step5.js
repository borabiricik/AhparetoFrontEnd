import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
import Select from "react-select";
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi/index";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";

const Step5 = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  console.log(props.errors)
  const [questions, setquestions] = useState([
    {
      label: "Seçenek",
    },
  ]);
  const handleClick = () => {
    setquestions([...questions, { label: "Seçenek" }]);
  };
  /*eslint-disable-next-line*/
  const isValidated = () => {
    return true;
  };
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
  }));
  const handleRemove = (index) => {
    const tempArr = [...questions];
    tempArr.splice(tempArr[index], 1);
    setquestions(tempArr);
  };
  return (
    <div>
      <Row className="justify-content-between align-items-center mb-3 px-3">
        <h2 className="m-0">Sorular</h2>
        <Button color="success" onClick={handleClick}>
          + Ekle
        </Button>
      </Row>
      {questions.map((q, index) => {
        return (
          <Card className="bg-dark" key={index}>
            <CardHeader className="bg-dark row align-items-center justify-content-between mx-3">
              <h4>Soru {index + 1}</h4>
              {index > 0 && (
                <Button
                  color="danger"
                  onClick={() => handleRemove(index)}
                  className="btn-icon btn-round"
                >
                  <BiTrashAlt size={"20"} color="white" />
                </Button>
              )}
            </CardHeader>
            <CardBody className="bg-dark">
              <Row>
                <Col sm="4" className="mb-3">
                  <label>Soru {index > 0 ? index + 1 : index + 1 + "*"}</label>
                  <Input type="text" />
                </Col>
              </Row>
              <Row>
                <Col sm="4" className="mb-3">
                  <label>Seçenek {index > 0 ? index + 1 : index + 1 + "*"}</label>
                  <Input type="text" />
                </Col>
                <Col sm="4" className="mb-3">
                  <label>Seçenek {index > 0 ? index + 1 : index + 1 + "*"}</label>
                  <Input type="text" />
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
      })}
      {Object.keys(props.errors).length >0 && <FormErrorMessage message={"Eksik Alanlar Var ! "} />}
    </div>
  );
});

export default Step5;
