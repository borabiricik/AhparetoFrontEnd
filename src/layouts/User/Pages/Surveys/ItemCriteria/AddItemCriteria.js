import DynamicFormInput from "components/Common/DynamicFormInput";
import { FieldArray, Formik } from "formik";
import React from "react";
import { BiTrashAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
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
  Input,
  Label,
  Row,
} from "reactstrap";
import { addCriterias } from "stores/Survyes/surveySlice";
import { addItems } from "stores/Survyes/surveySlice";
import Swal from "sweetalert2";
import Select from "react-select";
import { addItemCriterias } from "stores/Survyes/surveySlice";

const AddItemCriteria = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const items = useSelector((state) => state.surveys.items);
  const criterias = useSelector((state) => state.surveys.criterias);
  const history = useHistory();
  if (items && criterias) {
    return (
      <div className="content">
        <Formik
          initialValues={{
            itemCriterias: [
              items.map((item) => {
                return criterias.map((criteria) => {
                  return {
                    ItemId: item.Id,
                    CriteriaId: criteria.Id,
                    Value: 0,
                  };
                });
              }),
            ],
            items: items,
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
                dispatch(
                  addItemCriterias({ itemCriterias:values.itemCriterias[0], id: params.id, history })
                );
              }
            });
          }}
        >
          {({ values, handleSubmit, handleChange, setFieldValue }) => {
            return (
              <Card>
                <CardHeader tag={"h2"}>Add Item Criteria</CardHeader>
                <CardBody>
                  <FieldArray
                    name="criterias"
                    render={(arrayHelpers) => {
                      return (
                        <div>
                          {values.items &&
                            values.items.map((item, index) => {
                              return (
                                <Card>
                                  <h2 className="text-center">{item.Name}</h2>
                                  <Row>
                                    {criterias.map((criteria, i) => {
                                      return (
                                        <Col md={4}>
                                          <Label>{criteria.Name}</Label>
                                          <Input
                                            type="number"
                                            name={`itemCriterias.[0][${index}][${i}].Value`}
                                            onChange={handleChange}
                                          />
                                        </Col>
                                      );
                                    })}
                                  </Row>
                                </Card>
                              );
                            })}
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
  } else {
    return <h2>Yükleniyor...</h2>;
  }
};

export default AddItemCriteria;
