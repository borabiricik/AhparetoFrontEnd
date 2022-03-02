import DynamicFormInput from "components/Common/DynamicFormInput";
import { FieldArray, Formik } from "formik";
import React from "react";
import { BiTrashAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
import { addCriterias } from "stores/Survyes/surveySlice";
import { addItems } from "stores/Survyes/surveySlice";
import Swal from "sweetalert2";
import Select from "react-select";
import CustomSelect from "components/CustomComponents/CustomSelect";
import { addQuestions } from "stores/Survyes/surveySlice";

const AddQuestions = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const criterias = useSelector((state) => state.surveys.criterias);
  return (
    <div className="content">
      <Formik
        initialValues={{
          questions: [],
        }}
        onSubmit={(values) => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
          }).then((res) => {
            if (res.isConfirmed) {
              console.log(values);
                dispatch(addQuestions({ ...values, Id: params.id }));
            }
          });
        }}
      >
        {({ values, handleSubmit, handleChange, setFieldValue }) => {
          return (
            <Card>
              <CardHeader tag={"h2"}>Add Questions</CardHeader>
              <CardBody>
                <FieldArray
                  name="questions"
                  render={(arrayHelpers) => {
                    return (
                      <div>
                        {values.questions.map((item, index) => {
                          return (
                            <Row className="align-items-center mx-2">
                              <Col>
                                <FieldArray
                                  render={(arrayHelpers) => {
                                    return (
                                      <Card>
                                        <CardBody>
                                          <Row className="justify-content-center">
                                            <Input
                                              name={`questions.${index}.Text`}
                                              onChange={handleChange}
                                              placeholder="Type Question Title..."
                                              className="text-center"
                                            />
                                            <Col sm={4} className="mt-4">
                                              <Select
                                                className={`react-select info`}
                                                classNamePrefix="react-select"
                                                name={`questions.${index}.Criteria1Id`}
                                                options={criterias.map(
                                                  (criteria) => {
                                                    return {
                                                      label: criteria.Name,
                                                      value: criteria.Id,
                                                    };
                                                  }
                                                )}
                                                onChange={(value) => {
                                                  setFieldValue(
                                                    `questions.${index}.Criteria1Id`,
                                                    value.value
                                                  );
                                                }}
                                              />
                                            </Col>
                                            <Col sm={4} className="mt-4">
                                              <Select
                                                className={`react-select info`}
                                                classNamePrefix="react-select"
                                                name={`questions.${index}.Criteria2Id`}
                                                options={criterias.map(
                                                  (criteria) => {
                                                    return {
                                                      label: criteria.Name,
                                                      value: criteria.Id,
                                                    };
                                                  }
                                                )}
                                                onChange={(value) => {
                                                  setFieldValue(
                                                    `questions.${index}.Criteria2Id`,
                                                    value.value
                                                  );
                                                }}
                                              />
                                            </Col>
                                          </Row>
                                        </CardBody>
                                      </Card>
                                    );
                                  }}
                                />
                              </Col>
                              <Button
                                onClick={() => arrayHelpers.remove(index)}
                                className="btn-icon btn-danger btn-round"
                              >
                                <BiTrashAlt />
                              </Button>
                            </Row>
                          );
                        })}
                        <Row className="justify-content-center">
                          <Button
                            onClick={() =>
                              arrayHelpers.push({
                                Text: "",
                                Criteria1Id: 0,
                                Criteria2Id: 0,
                              })
                            }
                          >
                            Add Question
                          </Button>
                        </Row>
                      </div>
                    );
                  }}
                />
              </CardBody>
              <CardFooter className="row justify-content-center">
                <Button className="btn-success" onClick={handleSubmit}>
                  Save
                </Button>
              </CardFooter>
            </Card>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddQuestions;
