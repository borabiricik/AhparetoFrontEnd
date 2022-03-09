import Loading from "components/Common/Loading";
import Logo from "components/Common/Logo";
import { FieldArray, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap";
import Select from "react-select";
import { getSurvey } from "stores/Survyes/fillSurveySlice";
import Swal from "sweetalert2";

const SurveyDemografik = () => {
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.fillSurvey.survey);
  const { id, verificationCode } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSurvey(id));
  }, []);

  if (survey) {
    return (
      <>
        <Logo />

        <Container className="introduction-container">
          <Formik
            initialValues={{
              DemografikDetails: [],
            }}
            onSubmit={(values) => {
              console.log(values);
              if (
                values.DemografikDetails.length <
                JSON.parse(survey.DemografikJson).length
              ) {
                Swal.fire({
                  text: "Please answer all the questions",
                  timer: 2000,
                  showConfirmButton: false,
                });
              } else {
                localStorage.setItem(
                  "DemografikDetails",
                  JSON.stringify(values.DemografikDetails)
                );
                history.push("/survey/fill/" + id + "/" + verificationCode);
              }
            }}
          >
            {({ values, handleSubmit, handleChange }) => {
              return (
                <Card className="p-4">
                  <CardHeader
                    className="text-center font-weight-bolder"
                    tag={"h1"}
                  >
                    Please Answer All Demographic Questions
                  </CardHeader>
                  <CardBody className="my-3">
                    <FieldArray
                      render={(arrayHelpers) => {
                        return (
                          <Row>
                            {JSON.parse(survey.DemografikJson).map(
                              (item, index) => {
                                if (item) {
                                  return (
                                    <Col sm={12} md={4}>
                                      <Label>{item.Name}</Label>
                                      <Select
                                        name={`DemografikDetails.${index}.DemografikValue`}
                                        className="react-select info"
                                        classNamePrefix="react-select"
                                        options={item.Options.map(
                                          (option, index) => {
                                            return {
                                              label: option,
                                              value: index,
                                            };
                                          }
                                        )}
                                        onChange={(e) => {
                                          const foundValue =
                                            values.DemografikDetails.find(
                                              (d) => d.DemografikIndex === index
                                            );

                                          const tempArr = [
                                            ...values.DemografikDetails,
                                          ];

                                          if (foundValue) {
                                            tempArr.splice(
                                              tempArr.indexOf(foundValue),
                                              1
                                            );
                                          }

                                          tempArr.push({
                                            DemografikValue: e.label,
                                            DemografikIndex: index,
                                          })

                                          values.DemografikDetails = tempArr;

                                          
                                        }}
                                      />
                                    </Col>
                                  );
                                }
                              }
                            )}
                          </Row>
                        );
                      }}
                    />
                  </CardBody>
                  <CardFooter className="row justify-content-center">
                    <Button color="success" onClick={handleSubmit}>
                      Continue to Survey
                    </Button>
                  </CardFooter>
                </Card>
              );
            }}
          </Formik>
        </Container>
      </>
    );
  }
  return <Loading />;
};

export default SurveyDemografik;
