import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi/index";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";
import Select from "react-select";
import { FieldArray, useFormikContext } from "formik";

const Step5 = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [questions, setquestions] = useState([]);
  const handleClick = () => {
    setquestions([...questions, { label: "Seçenek" }]);
  };
  /*eslint-disable-next-line*/
  const isValidated = () => {
    console.log(props.errors);
    return !Object.keys(props.errors).length;
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

  // if (localStorage.getItem("options")) {
  //   console.log(localStorage.getItem("options"));
  // }

  return (
    <div>
      <Row className="justify-content-between align-items-center mb-3 px-3">
        <h2 className="m-0">Sorular</h2>
        {Object.keys(props.errors).length > 0 && (
          <FormErrorMessage message="Lütfen Tüm Formlardaki Alanları Doldurun!" />
        )}
        <Button color="success" onClick={handleClick}>
          + Ekle
        </Button>
      </Row>
      <FieldArray
        render={(arrayHelpers) =>
          questions.map((q, index) => {
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
                      <label>
                        Soru {index > 0 ? index + 1 : index + 1 + "*"}
                      </label>
                      <Input
                        type="text"
                        name={`questions[${index}].question`}
                        onChange={(e)=> props.setFieldValue(`questions[${index}].question`,e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4" className="mb-3">
                      <label>
                        Seçenek {index > 0 ? index + 1 : index + 1 + "*"}
                      </label>
                      <Select
                        className="react-select info"
                        classNamePrefix="react-select"
                        name={`questions[${index}].optionA`}
                        onChange={(e) => {
                          props.setFieldValue(
                            `questions[${index}].optionA`,
                            e.value
                          );
                        }}
                        options={props.values.options.map((o, key) => {
                          return { label: o.description, value: o.id };
                        })}
                        placeholder="Seçenek Seçiniz..."
                      />
                    </Col>
                    <Col sm="4" className="mb-3">
                      <label>
                        Seçenek {index > 0 ? index + 1 : index + 1 + "*"}
                      </label>
                      <Select
                        className="react-select info"
                        classNamePrefix="react-select"
                        name={`questions[${index}].optionB`}
                        onChange={(e) => {
                          props.setFieldValue(
                            `questions[${index}].optionB`,
                            e.value
                          );
                        }}
                        options={props.values.options.map((o, key) => {
                          return { label: o.description, value: o.id };
                        })}
                        placeholder="Seçenek Seçiniz..."
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            );
          })
        }
      />
    </div>
  );
});

export default Step5;
