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
import { register } from "stores/Auth/authSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { FailAlert } from "components/Alerts/FailAlert";


const Register = () => {
  const [state, setState] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const history = useHistory();

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
              <Card className="card-register card-white">
                <CardHeader>
                  <CardImg
                    alt="..."
                    src={require("assets/img/card-primary.png").default}
                  />
                  <CardTitle tag="h4">Kayıt Ol</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form">
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
                      <Input
                        placeholder="Ad"
                        type="text"
                        onChange={(e) => {
                          setState({ ...state, firstName: e.target.value });
                        }}
                        onFocus={(e) => setState({ ...state, nameFocus: true })}
                        onBlur={(e) => setState({ ...state, nameFocus: false })}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Soyad"
                        type="text"
                        onChange={(e) => {
                          setState({ ...state, lastName: e.target.value });
                        }}
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
                      <Input
                        placeholder="Email"
                        type="text"
                        onFocus={(e) =>
                          setState({ ...state, emailFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, emailFocus: false })
                        }
                        onChange={(e) => {
                          setState({ ...state, email: e.target.value });
                        }}
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
                        type="text"
                        onChange={(e) => {
                          setState({ ...state, password: e.target.value });
                        }}
                        onFocus={(e) => setState({ ...state, passFocus: true })}
                        onBlur={(e) => setState({ ...state, passFocus: false })}
                      />
                    </InputGroup>
                    {/* <FormGroup check className="text-left">
                      <Label check>
                        <Input type="checkbox" />
                        <span className="form-check-sign" />I agree to the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          terms and conditions
                        </a>
                        .
                      </Label>
                    </FormGroup> */}
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-round"
                    color="primary"
                    onClick={(e) => {
                       dispatch(register(state));
                     
                    }}
                    size="lg"
                  >
                    Kayıt ol
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Register;
