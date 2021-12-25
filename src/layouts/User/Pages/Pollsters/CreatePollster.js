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

const validationSchema = Yup.object({
  name: Yup.string().required("Zorunlu Alan").trim(),
  surName: Yup.string().required("Zorunlu Alan").trim(),
  email: Yup.string().required("Zorunlu Alan").email(),
  pollsterGroup: Yup.number().required().min(1, "Zorunlu Alan"),
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
            identityNumber:0
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            //   const data = dispatch(createDemografik({ ...values, history }));
            alert(JSON.stringify(values));
            // history.push(getLayoutName(history) + "/demografik");
          }}
        >
          {({ errors, setFieldValue, handleChange, handleSubmit, values }) => (
            <Card>
              <CardHeader tag={"h2"}>Add Demographic Info</CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row className="my-2">
                    <Col sm="4">
                      <label>Ad</label>
                      <Input type="text" name="name" onChange={handleChange} />
                      <label>{errors.name && errors.name}</label>
                    </Col>
                    <Col sm="4">
                      <label>Soyad</label>
                      <Input
                        type="text"
                        name="surName"
                        onChange={handleChange}
                      />
                      <label>{errors.surName && errors.surName}</label>
                    </Col>
                    <Col sm="4">
                      <label>E-Mail</label>
                      <Input type="text" name="email" onChange={handleChange} />
                      <label>{errors.email && errors.email}</label>
                    </Col>
                  </Row>
                  <Row className="my-2">
                    <Col sm="4">
                      <label>Anketör Grubu</label>
                      <CustomSelect
                        className={`react-select info`}
                        options={options}
                        value={values.name}
                        onChange={(inputValue) =>
                          setFieldValue("pollsterGroup", inputValue.value)
                        }
                        fromApi={true}
                        labelKey={"name"}
                        valueKey={"id"}
                      />
                    </Col>
                    <Col sm="4">
                      <label>Doğum Tarihi</label>
                      <CustomDatePicker
                        placeholder="Doğum Tarihi Seçiniz..."
                        name="birthDate"
                      />
                    </Col>
                    <Col sm="4">
                      <label>Kimlik No.</label>
                      <Input type="text" name="identityNumber" onChange={handleChange} />
                      <label>{errors.identityNumber && errors.identityNumber}</label>
                    </Col>
                  </Row>
                  <Row>
                  <Col sm="4">
                      <label>Cinsiyet</label>
                      <CustomSelect
                        className={`react-select info`}
                        options={[{value:0,label:"Erkek"},{value:1,label:"Kadın"}]}
                        value={values.value}
                        onChange={(inputValue) =>
                          setFieldValue("genderId", inputValue.value)
                        }
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
  } else {
    return (
      <div className="content">
        <h2>Yükleniyor...</h2>
      </div>
    );
  }
};

export default CreatePollster;
