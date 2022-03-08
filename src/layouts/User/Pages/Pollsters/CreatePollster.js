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
import Loading from "components/Common/Loading";

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
            Name: "",
            SurName: "",
            Email: "",
            PollsterGroupId: 0,
            BirthDate: "",
            IdentityNumber: 0,
            UserId: localStorage.getItem("userId"),
            Phone:0
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
                      <Input className="m-0" type="text" name="Name" onChange={handleChange} />
                      {errors.Name && (
                        <FormErrorMessage message={errors.Name} />
                      )}
                    </Col>
                    <Col sm="4">
                      <label>Surname</label>
                      <Input
                        type="text"
                        name="SurName"
                        onChange={handleChange}
                        className="m-0"
                      />
                      <label>{errors.SurName && errors.SurName}</label>
                    </Col>
                    <Col sm="4">
                      <label>E-Mail</label>
                      <Input type="text" name="Email" onChange={handleChange} />
                      <label>{errors.Email && errors.Email}</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <label>Pollster Group</label>
                      <CustomSelect
                        className={`react-select info m-0 `}
                        options={options}
                        value={values.Name}
                        onChange={(inputValue) =>
                          setFieldValue("PollsterGroupId", inputValue.value)
                        }
                        fromApi={true}
                        labelKey={"name"}
                        valueKey={"id"}
                      />
                      {errors.PollsterGroupId && (
                        <FormErrorMessage message={errors.PollsterGroupId} />
                      )}
                    </Col>
                    <Col sm="4">
                      <label>Birthday</label>
                      <CustomDatePicker
                        placeholder="Select Birthday..."
                        name="BirthDate"
                      />
                    </Col>
                    <Col sm="4">
                      <label>Identity Number</label>
                      <Input
                        type="text"
                        name="IdentityNumber"
                        onChange={handleChange}
                      />
                      <label>
                        {errors.IdentityNumber && errors.IdentityNumber}
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
                          setFieldValue("GenderId", inputValue.value)
                        }
                      />
                    </Col>
                    <Col sm="4">
                      <label>Phone Number. (Örn: (+90) 5432123567)</label>
                      <Input
                        type="text"
                        name="Phone"
                        onChange={handleChange}
                      />
                      <label>
                      <FormErrorMessage message={errors.Phone} />
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
      <Loading />
    );
  }
};

export default CreatePollster;
