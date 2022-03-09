import CustomDynamicInput from "components/CustomComponents/CustomDynamicInput";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { createDemografik } from "stores/Demografik/demografikSlice";
import { addDemografik } from "stores/Survyes/surveySlice";
import Swal from "sweetalert2";
import * as Yup from "yup";

const validationSchema = Yup.object({
  Name: Yup.string().required("Zorunlu Alan").trim(),
  DemografikDetails: Yup.array().min(2),
});

const AddDemografik = () => {
  const successData = useSelector((state) => state.demografik.success);
  const dispatch = useDispatch();
  const params = useParams();
  return (
    <div className="content">
      <Formik
        initialValues={{
          Name: "",
          Options: [""],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          dispatch(
            addDemografik({ id: params.id, DemografikDetails: { ...values } })
          );
        }}
      >
        {({ errors, setFieldValue, handleChange, handleSubmit, values }) => (
          <Card>
            <CardHeader tag={"h2"}>Add Demographic Info</CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm="4">
                    <label>Description</label>
                    <Input
                      name={"Name"}
                      type={"text"}
                      value={values.Name}
                      placeholder="Açıklama Giriniz..."
                      onChange={handleChange}
                      className={errors.description && "validation-error"}
                    />
                    {errors.description && (
                      <FormErrorMessage message={errors.description} />
                    )}
                  </Col>
                  <Col sm="4">
                    <FieldArray
                      name="Options"
                      render={(arrayHelpers) => {
                        return (
                          <>
                            <Label>Options</Label>
                            {values.Options.map((item, index) => {
                              return (
                                <div className="d-flex">
                                  <Input
                                    name={`Options.${index}`}
                                    onChange={handleChange}
                                    placeholder="Type Option Title..."
                                  />
                                  <Button
                                    onClick={() => arrayHelpers.remove(item)}
                                    className="btn-icon btn-danger btn-round mx-2"
                                  >
                                    <BiTrashAlt />
                                  </Button>
                                </div>
                              );
                            })}
                            <Button onClick={() => arrayHelpers.push("")}>
                              Add Option
                            </Button>
                          </>
                        );
                      }}
                    />
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button color="info" onClick={handleSubmit}>
                Save
              </Button>
            </CardFooter>
          </Card>
        )}
      </Formik>
    </div>
  );
};

export default AddDemografik;
