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
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "stores/Auth/authSlice";

const Login = (props) => {
  const [state, setState] = React.useState({});
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });

  const dispatch = useDispatch();

  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(login({ ...data, history }));
  };

  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                    <input
                      name="email"
                      ref={register({
                        required: true,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                      className="form-control"
                      placeholder="E-Mail"
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
                    <input
                      ref={register({ reqired: true })}
                      name="password"
                      placeholder="Password"
                      type="password"
                      className="form-control"
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
                  >
                    Login
                  </Button>
                  <Row className="justify-content-center">
                  <small className="bg-dark btn-round text-white py-2 px-3">
                    No Account?
                    <Button color="success" className="btn-link p-0 ml-2" onClick={()=>history.push("/auth/register")}>
                      Register
                    </Button>
                  </small>
                  </Row>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default Login;
