import Loading from "components/Common/Loading";
import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import { startPayment } from "stores/Payments/paymentsStore";
import { getPriceById } from "stores/Payments/paymentsStore";

const Buy = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const price = useSelector((state) => state.payments.price);
  useEffect(() => {
    dispatch(getPriceById(id));
  }, []);

  if (price) {
    return (
      <div className="content">
        <Formik
          initialValues={{
            Billing: {
              ContactName: "",
              City: "",
              Country: "",
              Address: "",
            },
            Price: parseInt(price.PriceValue),
            PriceId: parseInt(price.Id),
          }}
          onSubmit={(values) => {
            dispatch(
              startPayment({
                ...values,
                UserId: jwtDecode(localStorage.getItem("token")).Id,
              })
            );
          }}
        >
          {({ values, handleChange, handleSubmit }) => {
            return (
              <Card>
                <CardHeader tag={"h2"}>Buy {price.Title} Plan</CardHeader>
                <CardBody>
                  <h4>Billing Information</h4>
                  <Row>
                    <Col md="4">
                      <Label>Contact Name</Label>
                      <Input
                        name="Billing.ContactName"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md="4">
                      <Label>Country</Label>
                      <Input name="Billing.Country" onChange={handleChange} />
                    </Col>
                    <Col md="4">
                      <Label>City</Label>
                      <Input name="Billing.City" onChange={handleChange} />
                    </Col>
                    <Col md="4">
                      <Label>Address</Label>
                      <Input
                        type="textarea"
                        name="Billing.Address"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="row justify-content-center">
                  <Button color="success" onClick={handleSubmit}>
                    Buy Plan
                  </Button>
                </CardFooter>
              </Card>
            );
          }}
        </Formik>
      </div>
    );
  }
  return <Loading />;
};

export default Buy;
