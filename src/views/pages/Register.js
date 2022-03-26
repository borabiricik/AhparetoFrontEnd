import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { register } from "stores/Auth/authSlice";

const Register = () => {
  const history = useHistory();
  const [state, setState] = React.useState({});
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    return function cleanup() {
      document.body.classList.toggle("register-page");
    };
  });

  return (
    <Formik
      initialValues={{
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
      }}
      onSubmit={(values, errors) => {
        if (values.Password === values.ConfirmPassword) {
          dispatch(register({ ...values, history }));
        } else {
          Swal.fire({
            title: "Password mismatch",
            icon: "error",
            timer: 2000,
          });
          return errors;
        }
      }}
    >
      {({ handleSubmit, errors, handleChange }) => {
        return (
          <div className="content">
            <Container>
              <Row className="justify-content-center">
                <Col md="7">
                  <Form className="form">
                    <Card className="card-register card-white">
                      <CardHeader>
                        <CardImg
                          data2alt="..."
                          src={require("assets/img/card-primary.png").default}
                        />
                        <CardTitle className="text-dark" tag="h4">
                          Register
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": state.nameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            className="form-control"
                            onChange={handleChange}
                            placeholder="First Name"
                            name="FirstName"
                            onFocus={(e) =>
                              setState({ ...state, nameFocus: true })
                            }
                            onBlur={(e) =>
                              setState({ ...state, nameFocus: false })
                            }
                          />
                          <small>{errors.FirstName && errors.LirstName}</small>
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          {/* <Input
                        placeholder="Soyad"
                        type="text"
                        onFocus={(e) => setState({ ...state, nameFocus: true })}
                        onBlur={(e) => setState({ ...state, nameFocus: false })}
                      /> */}
                          <input
                            className="form-control"
                            name="LastName"
                            placeholder="Last Name"
                            onChange={handleChange}
                            onFocus={(e) =>
                              setState({ ...state, nameFocus: true })
                            }
                            onBlur={(e) =>
                              setState({ ...state, nameFocus: false })
                            }
                          />
                          <small>{errors.LastName && errors.LastName}</small>
                        </InputGroup>
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
                            name="Email"
                            className="form-control"
                            placeholder="E-Mail"
                            onChange={handleChange}
                            onFocus={(e) =>
                              setState({ ...state, nameFocus: true })
                            }
                            onBlur={(e) =>
                              setState({ ...state, nameFocus: false })
                            }
                          />
                          <small>{errors.Email && errors.Email}</small>
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
                          {/* <Input
                        placeholder="Şifre"
                        type="password"
                        onFocus={(e) => setState({ ...state, passFocus: true })}
                        onBlur={(e) => setState({ ...state, passFocus: false })}
                      /> */}
                          <input
                            className="form-control"
                            placeholder="Password"
                            name="Password"
                            type={"password"}
                            onChange={handleChange}
                            onFocus={(e) =>
                              setState({ ...state, passFocus: true })
                            }
                            onBlur={(e) =>
                              setState({ ...state, passFocus: false })
                            }
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
                          {/* <Input
                        placeholder="Şifre"
                        type="password"
                        onFocus={(e) => setState({ ...state, passFocus: true })}
                        onBlur={(e) => setState({ ...state, passFocus: false })}
                      /> */}
                          <input
                            className="form-control"
                            placeholder="Confirm Password"
                            name="ConfirmPassword"
                            type={"password"}
                            onChange={handleChange}
                            onFocus={(e) =>
                              setState({ ...state, passFocus: true })
                            }
                            onBlur={(e) =>
                              setState({ ...state, passFocus: false })
                            }
                          />
                        </InputGroup>
                      </CardBody>
                      <CardFooter>
                        <Row className="justify-content-around">
                          <Button
                            type="submit"
                            className="btn-round"
                            color="success"
                            size="lg"
                            onClick={handleSubmit}
                          >
                            Register
                          </Button>
                          <Link to={"/auth/login"}>
                            <Button className="btn-simple" color="info">
                              Login
                            </Button>
                          </Link>
                        </Row>
                      </CardFooter>
                    </Card>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        );
      }}
    </Formik>
  );
};

export default Register;
