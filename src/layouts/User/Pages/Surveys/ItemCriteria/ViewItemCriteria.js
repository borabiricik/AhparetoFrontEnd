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

const ViewItemCriteria = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const items = useSelector((state) => state.surveys.items);
  const criterias = useSelector((state) => state.surveys.criterias);
  const itemCriterias = useSelector((state) => state.surveys.itemCriterias);
  const history = useHistory();
  if (items && criterias) {
    return (
      <div className="content">
        <Formik
          initialValues={{}}
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
              }
            });
          }}
        >
          {({ values, handleSubmit, handleChange, setFieldValue }) => {
            console.log(itemCriterias);
            return (
              <Card>
                <CardHeader tag={"h2"}>View Item Criteria</CardHeader>
                <CardBody>
                  <FieldArray
                    name="criterias"
                    render={(arrayHelpers) => {
                      return (
                        <div>
                          {items &&
                            items.map((item, index) => {
                              return (
                                <Card>
                                  <h2 className="text-center">{item.Name}</h2>
                                  <Row>
                                    {criterias.map((criteria, i) => {
                                      return (
                                        <Col md={4}>
                                          <Label>{criteria.Name}</Label>
                                          <Input
                                          style={{color: "white"}}
                                            disabled
                                            type="number"
                                            name={`itemCriterias.[0][${index}][${i}].Value`}
                                            onChange={handleChange}
                                            value={
                                              itemCriterias.find(
                                                (ic) =>
                                                  ic.ItemId === item.Id &&
                                                  ic.CriteriaId === criteria.Id
                                              ).Value
                                            }
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

export default ViewItemCriteria;
