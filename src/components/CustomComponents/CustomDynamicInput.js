import { Field, FieldArray } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";
import { BiTrashAlt } from "react-icons/bi";
import { useRouteMatch } from "react-router-dom";

const CustomDynamicInput = ({errors}) => {
  const match = useRouteMatch()
  useEffect(() => {
   console.log()
  }, [])
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
                    <Row key={index} className="align-items-center">
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
              onClick={() => {
                if(match.params.id){
                  arrayHelpers.push({demografikId:parseInt(match.params.id), description: "" })
                }
                else{
                  arrayHelpers.push({description:""})
                }
              }}
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
