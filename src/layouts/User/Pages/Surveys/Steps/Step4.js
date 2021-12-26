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
import { FieldArray, useFormikContext } from "formik";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";

const Step4 = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { getFieldHelpers } = useFormikContext();
  const [questions, setquestions] = useState([{ description: "" }]);
  const handleClick = (arrayHelper) => {
    setquestions([...questions, { description: "" }]);
  };
  /*eslint-disable-next-line*/
  const isValidated = () => {
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
  return (
    <div>
      <Row className="justify-content-between align-items-center mb-3 px-3">
        <h2 className="m-0">Sorular</h2>
        <Button color="success" onClick={handleClick}>
          + Ekle
        </Button>
      </Row>
      <FieldArray
        validateOnChange
        name="options"
        render={(arrayHelpers) => (
          <>
            {questions.map((q, index) => {
              return (
                <Card className="bg-dark">
                  <CardHeader
                    tag={"div"}
                    className="bg-dark row align-items-center justify-content-between mx-3"
                  >
                    <h3 className="mb-0">Seçenek {index + 1}*:</h3>
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
                    <Input
                      type="text"
                      name={`options[${index}].description`}
                      onChange={props.handleChange}
                    />
                    {/* {props.errors && console.log(props.errors)} */}
                    {props.errors.options && props.errors.options[index] ?  <FormErrorMessage message={props.errors.options[0].description}  /> : null}
                  </CardBody>
                </Card>
              );
            })}
          </>
        )}
      />
    </div>
  );
});

export default Step4;
