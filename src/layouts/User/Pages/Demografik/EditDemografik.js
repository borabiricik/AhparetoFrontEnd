import CustomDynamicInput from "components/CustomComponents/CustomDynamicInput";
import CustomSelect from "components/CustomComponents/CustomSelect";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";
import { Formik, useFormik } from "formik";
import { getLayoutName } from "Functions/Router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
} from "reactstrap";
import { editDemografik } from "stores/Demografik/demografikSlice";
import Swal from "sweetalert2";
import * as Yup from "yup";

const validationSchema = Yup.object({
  description: Yup.string().required("Zorunlu Alan").trim(),
  fieldTypeId: Yup.number().required().min(1, "Zorunlu Alan"),
});

const EditDemografik = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const demografikData = useSelector(
    (state) => state.demografik.demografikData
  );
 
  const options = [
    { value: 1, label: "Sayı" },
    { value: 2, label: "Metin" },
    { value: 3, label: "Tarih" },
  ];
if(demografikData){
  const editData = demografikData.find((data) => data.id == id);
  return (
    <div className="content">
      <Formik
        initialValues={{
          id: editData.id,
          description: editData.description,
          fieldTypeId: editData.fieldTypeId,
          demografikDetails: editData.demografikDetails,
          typeId: editData.typeId,
          userId: editData.userId,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          dispatch(editDemografik({...values,history}));
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
                      name={"description"}
                      type={"text"}
                      value={values.description}
                      placeholder="Açıklama Giriniz..."
                      onChange={handleChange}
                      className={errors.description && "validation-error"}
                    />
                    {errors.description && (
                      <FormErrorMessage message={errors.description} />
                    )}
                  </Col>
                  <Col sm="4">
                    <label>Data Type</label>
                    <CustomSelect
                      className={`react-select info`}
                      options={options}
                      value={values.fieldTypeId}
                      onChange={(inputValue) =>
                        setFieldValue("fieldTypeId", inputValue.value)
                      }
                    />
                    {errors.fieldTypeId && (
                      <FormErrorMessage message={errors.fieldTypeId} />
                    )}
                  </Col>
                  <Col sm="4">
                    <CustomDynamicInput
                      errors={errors}
                      handleChange={handleChange}
                    />
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button color="info" onClick={handleSubmit}>
                Kaydet
              </Button>
            </CardFooter>
          </Card>
        )}
      </Formik>
    </div>
  );
}
else{
  return <Redirect to={getLayoutName(history)+"/demografik"} />
}
  
};

export default EditDemografik;
