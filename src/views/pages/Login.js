import React, { useState } from "react";
import classnames from "classnames";
// reactstrap components

import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { login } from "stores/Auth/authSlice";

const Login = (props) => {
  const [state, setState] = useState({});
  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });

  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <>
      <Formik
        initialValues={{
          Email: "",
          Password: "",
        }}
        onSubmit={(values) => {
          dispatch(login({ ...values, history }));
        }}
      >
        {({ handleSubmit, handleChange }) => {
          return (
            <div className="content">
              <Container>
                <Col className="ml-auto mr-auto" lg="4" md="6">
                  <Card className="card-login card-white">
                    <CardHeader>
                      <CardTitle
                        className="text-dark font-weight-700 text-center"
                        tag="h5"
                      >
                        Login
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": state.emailFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={handleChange}
                          placeholder="Email"
                          type="email"
                          name="Email"
                        />
                      </InputGroup>

                      <InputGroup
                        className={`mb-0 ${classnames({
                          "input-group-focus": state.passFocus,
                        })}`}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="Password"
                          placeholder="Password"
                          type="password"
                          className="form-control"
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        block
                        className="mb-3 btn-round"
                        color="success"
                        size="lg"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Login
                      </Button>
                      <Row className="justify-content-center">
                        <small className="bg-dark btn-round text-white py-2 px-3">
                          No Account?
                          <Button
                            color="success"
                            className="btn-link p-0 ml-2"
                            onClick={() => history.push("/auth/register")}
                          >
                            Register
                          </Button>
                        </small>
                      </Row>
                    </CardFooter>
                  </Card>
                </Col>
              </Container>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default Login;
