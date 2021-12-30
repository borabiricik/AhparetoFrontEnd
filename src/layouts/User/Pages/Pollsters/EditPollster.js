import CustomSelect from "components/CustomComponents/CustomSelect";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
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
import { getPollsterGroups } from "stores/PollsterGroups/pollsterGroupSlice";
import * as Yup from "yup";
import { CustomDatePicker } from "components/CustomComponents/CustomDatePicker";
import { createPollster } from "stores/Pollsters/pollsterSlice";
import { getPollsterGroupsById } from "stores/PollsterGroups/pollsterGroupSlice";
import CustomMultipleSelect from "components/CustomComponents/CustomMultipleSelect";

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Zorunlu Alan").trim(),
  surName: Yup.string().required("Zorunlu Alan").trim(),
  email: Yup.string().required("Zorunlu Alan").email(),
  // pollsterGroup: Yup.number().required().min(1, "Zorunlu Alan"),
  phone: Yup.string().matches(phoneRegExp, "Telefon Numarası Doğru Girilmedi"),
});

const EditPollster = ({
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const options = useSelector(
    (state) => state.pollsterGroups.pollsterGroupsData
  );
  const data = useSelector((state) => state.pollsters.pollstersData);

  const getPollsterGroupData = () => {
    dispatch(getPollsterGroups());
  };

  useEffect(() => {
    getPollsterGroupData();
  }, []);

  if (options && data) {
    const editData = data.find((d) => d.pollsterId == id);
    console.log(editData);
    // console.log(options);
    return (
      <div className="content">
        <Formik
          initialValues={{
            name: editData.name,
            surName: editData.surName,
            email: editData.email,
            pollsterGroup: editData.pollsterGroup,
            birthDate: editData.birthDate,
            identityNumber: editData.identityNumber,
            userId: localStorage.getItem("userId"),
            phone: editData.phone,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            // dispatch(editPollster({ ...values, history }));
          }}
        >
          {({ errors, setFieldValue, handleChange, handleSubmit, values }) => (
            <Card>
              <CardHeader tag={"h2"}>Add Demographic Info</CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm="4">
                      <label>Name</label>
                      <Input
                        className="m-0"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                      />
                      {errors.name && (
                        <FormErrorMessage message={errors.name} />
                      )}
                    </Col>
                    <Col sm="4">
                      <label>Surname</label>
                      <Input
                        type="text"
                        name="surName"
                        onChange={handleChange}
                        className="m-0"
                        value={values.surName}
                      />
                      <label>{errors.surName && errors.surName}</label>
                    </Col>
                    <Col sm="4">
                      <label>E-Mail</label>
                      <Input
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <label>{errors.email && errors.email}</label>
                    </Col>
                  </Row>
                  <Row>
                   {console.log(options)}
                    <Col sm="4">
                      <Field
                        className="custom-select"
                        name="pollsterGroup"
                        options={options.map(o=>{
                          return {label:o.name,value:o.id}
                        })}
                        component={CustomMultipleSelect}
                        placeholder="Select Pollster Group..."
                        isMulti={true}
                      />
                    </Col>
                    <Col sm="4">
                      <label>Birthday</label>
                      <CustomDatePicker
                        placeholder="Select Birthday..."
                        name="birthDate"
                        value={values.birthDate}
                      />
                    </Col>
                    <Col sm="4">
                      <label>Identity Number</label>
                      <Input
                        type="text"
                        name="identityNumber"
                        onChange={handleChange}
                        value={values.identityNumber}
                      />
                      <label>
                        {errors.identityNumber && errors.identityNumber}
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <label>Gender</label>
                      <CustomSelect
                        className={`react-select info`}
                        options={[
                          { value: 0, label: "Male" },
                          { value: 1, label: "Female" },
                        ]}
                        value={values.value}
                        onChange={(inputValue) =>
                          setFieldValue("genderId", inputValue.value)
                        }
                      />
                    </Col>
                    <Col sm="4">
                      <label>Phone Number (Örn: (+90) 5432123567)</label>
                      <Input
                        type="text"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      <label>
                        <FormErrorMessage message={errors.phone} />
                      </label>
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
  } else {
    return (
      <div className="content">
        <h2>Yükleniyor...</h2>
      </div>
    );
  }
};

export default EditPollster;
