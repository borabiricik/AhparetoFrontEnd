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
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { registerF } from "stores/Auth/authSlice";
import { useForm } from "react-hook-form";

const Register = () => {
  const history = useHistory();
  const [state, setState] = React.useState({});
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      dispatch(registerF({...data,history}));
    }
  };

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    return function cleanup() {
      document.body.classList.toggle("register-page");
    };
  });

  return (
    <>
      <div className="content">
        <Container>
          <Row className="justify-content-center">
            <Col md="7">
              <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Card className="card-register card-white">
                  <CardHeader>
                    <CardImg
                      data2alt="..."
                      src={require("assets/img/card-primary.png").default}
                    />
                    <CardTitle className="text-primary" tag="h4">
                      Kayıt Ol
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
                        placeholder="Ad"
                        name="firstName"
                        ref={register({ required: true })}
                        onFocus={(e) => setState({ ...state, nameFocus: true })}
                        onBlur={(e) => setState({ ...state, nameFocus: false })}
                      />
                    </InputGroup>
                    {errors.firstName && errors.firstName.message}
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
                        ref={register({ required: true })}
                        name="lastName"
                        placeholder="Soyad"
                        onFocus={(e) => setState({ ...state, nameFocus: true })}
                        onBlur={(e) => setState({ ...state, nameFocus: false })}
                      />
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
                        ref={register({
                          pattern:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        name="email"
                        className="form-control"
                        placeholder="E-Mail"
                        onFocus={(e) => setState({ ...state, nameFocus: true })}
                        onBlur={(e) => setState({ ...state, nameFocus: false })}
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
                        ref={register}
                        className="form-control"
                        placeholder="Şifre"
                        name="password"
                        type={"password"}
                        onFocus={(e) => setState({ ...state, passFocus: true })}
                        onBlur={(e) => setState({ ...state, passFocus: false })}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Row className="justify-content-around">
                      <Button
                        type="submit"
                        className="btn-round"
                        color="primary"
                        size="lg"
                      >
                        Kayıt ol
                      </Button>
                      <Link to={"/auth/login"}>
                        <Button className="btn-simple" color="primary">
                          Giriş Yap
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
    </>
  );
};

export default Register;
