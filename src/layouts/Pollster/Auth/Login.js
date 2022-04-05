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
import { loginPollster } from "stores/Auth/authSlice";

const PollsterLogin = (props) => {
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
          dispatch(loginPollster({ ...values, history }));
        }}
      >
        {({ handleSubmit, handleChange }) => {
          return (
            <div className="content">
              <Container className="d-flex w-100 justify-content-center align-items-center" style={{height:"80vh"}}>
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

export default PollsterLogin;
