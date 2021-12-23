import { Field, FieldArray, Formik } from "formik";
import React from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";
import { BiTrashAlt } from "react-icons/bi";
import FormErrorMessage from "./FormErrorMessage";

const CustomDynamicInput = ({errors}) => {
  return (
    <FieldArray
      name="demografikDetails"
      validateOnChange
      render={(arrayHelpers) => {
        const {
          form: { values: {demografikDetails} },
        } = arrayHelpers;
        return (
          <div>
            {demografikDetails && demografikDetails.length > 0
              ? demografikDetails.map((field, index) => {
                  return (
                    <Row key={index}>
                      <Col sm="10">
                        <label>Seçenek {index + 1}</label>
                        <Field
                          name={`demografikDetails[${index}].description`}
                          className="form-control"
                        />
                      </Col>
                      <Col>
                        <Button
                          className="btn-icon"
                          onClick={(e) => {
                            e.preventDefault();
                            arrayHelpers.remove(index);
                          }}
                        >
                          <BiTrashAlt color="white" size={20} />
                        </Button>
                      </Col>
                    </Row>
                  );
                })
              : null}
              <div>
              {/* {errors.demografikDetails && <FormErrorMessage message={"Boş Alanlar Var"} />} */}
              </div>
            <Button
              color="info"
              onClick={() => arrayHelpers.push({ description: "" })}
            >
              + Ekle
            </Button>
          </div>
        );
      }}
    />
  );
};

export default CustomDynamicInput;
