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
import { v4 as uuidv4 } from "uuid";

const Step4 = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { getFieldHelpers } = useFormikContext();
  const [options, setoptions] = useState([{ description: "", id: 0 }]);
  const handleClick = () => {
    setoptions([...options, { description: "", id: options.length }]);
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
    const tempArr = [...options];
    tempArr.splice(tempArr[index], 1);
    setoptions(tempArr);
  };
  return (
    <div>
      <Row className="justify-content-between align-items-center mb-3 px-3">
        <h2 className="m-0">Sorular (En Az 2 Seçenek Olmalıdır)</h2>
        <Button color="success" onClick={handleClick}>
          + Ekle
        </Button>
      </Row>
      <FieldArray
        validateOnChange
        name="options"
        render={(arrayHelpers) => (
          <>
            {options.map((q, index) => {
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
                      onChange={(e) => {
                        var value = e.target.value
                        props.setFieldValue(`options[${index}].description`,value)
                        props.setFieldValue(`options[${index}].id`,index)
                        props.setFieldValue(`options[${index}].scor`,0)
                      }}
                    />
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
