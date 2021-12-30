import { Formik } from "formik";
import { getLayoutName } from "Functions/Router";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
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
import { addPrice } from "stores/Settings/priceSlice";

const CreatePrice = ({
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="content">
      <Formik
        initialValues={{
          title: "",
          detail: "",
          month: 0,
          priceValue: 0,
          tax: 0,
          row: 0,
        }}
        onSubmit={(values) => {
          dispatch(addPrice({...values,history}))
        }}
      >
        {({ values, handleSubmit, handleChange }) => {
          return (
            <Card>
              <CardHeader tag={"h2"}>Paket Düzenle</CardHeader>
              <CardBody>
                <Row>
                  <Col sm="3" className="my-2">
                    <label>Paket Başlığı</label>
                    <Input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="3" className="my-2">
                    <label>Paket Detayı</label>
                    <Input
                      name="detail"
                      value={values.detail}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="3" className="my-2">
                    <label>Ay</label>
                    <Input
                      type="number"
                      name="month"
                      value={values.month}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="3" className="my-2">
                    <label>Fiyat</label>
                    <Input
                      type="number"
                      name="priceValue"
                      value={values.priceValue}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="3" className="my-2">
                    <label>KDV</label>
                    <Input
                      type="number"
                      name="tax"
                      value={values.tax}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="3" className="my-2">
                    <label>Sıralama</label>
                    <Input
                      type="number"
                      name="row"
                      value={values.row}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
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
};

export default CreatePrice;
