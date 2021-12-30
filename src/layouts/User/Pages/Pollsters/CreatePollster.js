import CustomDynamicInput from "components/CustomComponents/CustomDynamicInput";
import CustomSelect from "components/CustomComponents/CustomSelect";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";
import { Field, Formik, useField } from "formik";
import { getLayoutName } from "Functions/Router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import Datetime from "react-datetime";
import { CustomDatePicker } from "components/CustomComponents/CustomDatePicker";
import { createPollster } from "stores/Pollsters/pollsterSlice";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Zorunlu Alan").trim(),
  surName: Yup.string().required("Zorunlu Alan").trim(),
  email: Yup.string().required("Zorunlu Alan").email(),
  pollsterGroup: Yup.number().required().min(1,"Zorunlu Alan"),
  phone: Yup.string().matches(phoneRegExp,"Telefon Numarası Doğru Girilmedi")

});

const CreatePollster = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const options = useSelector(
    (state) => state.pollsterGroups.pollsterGroupsData
  );

  const getPollsterGroupData = () => {
    dispatch(getPollsterGroups());
  };

  useEffect(() => {
    getPollsterGroupData();
  }, []);

  if (options) {
    // console.log(options.pollsterGroup)
    console.log(options);
    return (
      <div className="content">
        <Formik
          initialValues={{
            name: "",
            surName: "",
            email: "",
            pollsterGroup: 0,
            birthDate: "",
            identityNumber: 0,
            userId: localStorage.getItem("userId"),
            phone:0
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(createPollster({...values,history}))
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
                      <Input className="m-0" type="text" name="name" onChange={handleChange} />
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
                      />
                      <label>{errors.surName && errors.surName}</label>
                    </Col>
                    <Col sm="4">
                      <label>E-Mail</label>
                      <Input type="text" name="email" onChange={handleChange} />
                      <label>{errors.email && errors.email}</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <label>Pollster Group</label>
                      <CustomSelect
                        className={`react-select info m-0 `}
                        options={options}
                        value={values.name}
                        onChange={(inputValue) =>
                          setFieldValue("pollsterGroup", inputValue.value)
                        }
                        fromApi={true}
                        labelKey={"name"}
                        valueKey={"id"}
                      />
                      {errors.pollsterGroup && (
                        <FormErrorMessage message={errors.pollsterGroup} />
                      )}
                    </Col>
                    <Col sm="4">
                      <label>Birthday</label>
                      <CustomDatePicker
                        placeholder="Select Birthday..."
                        name="birthDate"
                      />
                    </Col>
                    <Col sm="4">
                      <label>Identity Number</label>
                      <Input
                        type="text"
                        name="identityNumber"
                        onChange={handleChange}
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
                          { value: 0, label: "Erkek" },
                          { value: 1, label: "Kadın" },
                        ]}
                        value={values.value}
                        onChange={(inputValue) =>
                          setFieldValue("genderId", inputValue.value)
                        }
                      />
                    </Col>
                    <Col sm="4">
                      <label>Phone Number. (Örn: (+90) 5432123567)</label>
                      <Input
                        type="text"
                        name="phone"
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

export default CreatePollster;
