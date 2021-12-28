import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
} from "reactstrap";
import { rePassword } from "stores/Auth/authSlice";

const PasswordActions = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="content">
      <Container>
        <Col sm="12" md="6" className="mx-auto">
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              confirmPassword: "",
              userId: localStorage.getItem("userId"),
            }}
            onSubmit={(values) => {
              dispatch(rePassword({ ...values, history }));
            }}
          >
            {({ values, handleChange, handleSubmit }) => {
              return (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-weight-700 text-center" tag="h3">
                      Şifre Yenile
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <label>Eski Şifre</label>
                      <Input
                        type="password"
                        value={values.oldPassword}
                        onChange={handleChange}
                        name="oldPassword"
                      />
                    </div>
                    <div>
                      <label>Yeni Şifre</label>
                      <Input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label>Yeni Şifre Tekrar</label>
                      <Input
                        value={values.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                        type="password"
                      />
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button color="success" onClick={handleSubmit}>
                      Kaydet
                    </Button>
                  </CardFooter>
                </Card>
              );
            }}
          </Formik>
        </Col>
      </Container>
    </div>
  );
};

export default PasswordActions;
