import DynamicFormInput from "components/Common/DynamicFormInput";
import { FieldArray, Formik } from "formik";
import React from "react";
import { BiTrashAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
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
import { addItems } from "stores/Survyes/surveySlice";
import Swal from "sweetalert2";

const AddItems = () => {
  const dispatch = useDispatch();
  const params = useParams();
  return (
    <div className="content">
      <Formik
        initialValues={{
          items: [],
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
              dispatch(addItems({ ...values, id: params.id }));
            }
          });
        }}
      >
        {({ values, handleSubmit, handleChange }) => {
          return (
            <Card>
              <CardHeader tag={"h2"}>Add Items</CardHeader>
              <CardBody>
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => {
                    return (
                      <div>
                        {values.items.map((item, index) => {
                          return (
                            <Row className="align-items-center mx-2">
                              <Col>
                                <FieldArray
                                  render={(arrayHelpers) => {
                                    return (
                                      <Input
                                        name={`items.${index}.Name`}
                                        onChange={handleChange}
                                        placeholder="Type Item Name..."
                                      />
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
                            onClick={() => arrayHelpers.push({ Name: "" })}
                          >
                            Add Item
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

export default AddItems;
