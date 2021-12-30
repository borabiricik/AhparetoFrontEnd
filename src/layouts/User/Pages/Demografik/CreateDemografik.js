import CustomDynamicInput from "components/CustomComponents/CustomDynamicInput";
import CustomSelect from "components/CustomComponents/CustomSelect";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";
import { Formik } from "formik";
import { getLayoutName } from "Functions/Router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
import { createDemografik } from "stores/Demografik/demografikSlice";
import Swal from "sweetalert2";
import * as Yup from "yup";

const validationSchema = Yup.object({
  description: Yup.string().required("Zorunlu Alan").trim(),
  fieldTypeId: Yup.number().required().min(1, "Zorunlu Alan"),
});

const CreateDemografik = () => {
  const successData = useSelector(state=>state.demografik.success)
  const [success, setsuccess] = useState(successData)
  const history = useHistory();
  const dispatch = useDispatch();
  const options = [
    { value: 1, label: "Number" },
    { value: 2, label: "Text" },
    { value: 3, label: "Date" },
  ];
  return (
    <div className="content">
      <Formik
        initialValues={{
          description: "",
          fieldTypeId: 0,
          demografikDetails: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(createDemografik({ ...values, history }));
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
                Save
              </Button>
            </CardFooter>
          </Card>
        )}
      </Formik>
    </div>
  );
};

export default CreateDemografik;
