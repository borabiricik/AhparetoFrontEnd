
import React, { useState } from "react";
import classnames from "classnames";
// reactstrap components

import { useHistory } from 'react-router-dom';

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
} from "reactstrap";

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

  const history = useHistory()

  if (localStorage.getItem("token")) {
    history.push("/admin/dashboard")
  }





  const loginClick = async (e) => {
    await e.preventDefault();
  }

  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form className="form">
              <Card className="card-login card-white">
                <CardHeader>
                  {/* <img
                    alt="..."
                    src={require("assets/img/card-primary.png").default}
                  /> */}
                  <CardTitle className="text-dark font-weight-700 text-center" tag="h5">Giriş Yap</CardTitle>

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
                      placeholder="Kullanıcı Adı"
                      type="text"
                      onFocus={(e) => setState({ ...state, emailFocus: true })}
                      onBlur={(e) => setState({ ...state, emailFocus: false })}
                      value={username}
                      onChange={(e) => setusername(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": state.passFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Şifre"
                      type="password"
                      onFocus={(e) => setState({ ...state, passFocus: true })}
                      onBlur={(e) => setState({ ...state, passFocus: false })}
                      value={password}
                      onChange={(e) => { setpassword(e.target.value) }}
                    />
                  </InputGroup>
                </CardBody>
                <CardFooter>
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    href="#pablo"
                    onClick={loginClick}
                    size="lg"
                  >
                    Giriş Yap
                  </Button>
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
