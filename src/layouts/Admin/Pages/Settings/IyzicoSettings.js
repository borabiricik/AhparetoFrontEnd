import { Formik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input } from "reactstrap";
import { updatePaymentConfig } from "stores/Settings/iyzicoSlice";
import { getPaymentConfig } from "stores/Settings/iyzicoSlice";
import {useHistory} from "react-router-dom"

const IyzicoSettings = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.iyzico.loading);
  const data = useSelector((state) => state.iyzico.iyzicoData);
  const history = useHistory()
  const getData = async () => {
    await dispatch(getPaymentConfig());
  };
  useEffect(() => {
    getData();
  }, []);
  if (!loading && data) {
    return (
      <div className="content">
        <Formik
          initialValues={{
            apiKey: data.apiKey,
            baseUrl: data.baseUrl,
            id: 1,
            secretKey: data.secretKey,
          }}
          onSubmit={(values) => {
            dispatch(updatePaymentConfig({...values,history}))
          }}
        >
          {({ values, handleSubmit, handleChange }) => {
            return (
              <Card>
                <CardHeader tag={"h2"}>Iyzico Ayarları</CardHeader>
                <CardBody>
                  <Col sm="4">
                    <label>API Key</label>
                    <Input name="apiKey" value={values.apiKey} onChange={handleChange} />
                  </Col>
                  <label>Secret  Key</label>
                  <Col sm="4">
                    <Input name="secretKey" value={values.secretKey} onChange={handleChange} />
                  </Col>
                  <Col sm="4">
                  <label>Base Url</label>
                    <Input name="baseUrl" value={values.baseUrl} onChange={handleChange} />
                  </Col>
                </CardBody>
                <CardFooter>
                    <Button color="success" onClick={handleSubmit}>
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
    return (
      <div className="content">
        <h2>Yükleniyor ...</h2>
      </div>
    );
  }
};

export default IyzicoSettings;
