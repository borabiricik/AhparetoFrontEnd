import { CustomDatePicker } from "components/CustomComponents/CustomDatePicker";
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
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import { addSurvey } from "stores/Survyes/surveySlice";

const CreateSurvey = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="content">
      <Formik
        initialValues={{
          Name: "",
          Purpose: "",
          StartDate: "",
          EndDate: "",
          ParticipantsCount: 0,
          FirstDescription: "",
        }}
        onSubmit={(values) => {
          dispatch(addSurvey({...values, history}));
        }}
      >
        {({ handleChange, values, handleSubmit }) => {
          return (
            <Card>
              <CardHeader tag={"h2"}>Create Survey</CardHeader>
              <CardBody>
                <Row>
                  <Col sm="4" className="p-3">
                    <Label>Title*</Label>
                    <Input
                      name="Name"
                      value={values.Name}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="4" className="p-3">
                    <Label>Purpose*</Label>
                    <Input
                      name="Purpose"
                      value={values.Purpose}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="4" className="p-3">
                    <Label>Start Date*</Label>
                    <CustomDatePicker name="StartDate" />
                  </Col>
                  <Col sm="4" className="p-3">
                    <Label>End Date*</Label>
                    <CustomDatePicker name="EndDate" />
                  </Col>
                  <Col sm="4" className="p-3">
                    <Label>Participants Count*</Label>
                    <Input
                      type="number"
                      name="ParticipantsCount"
                      value={values.ParticipantsCount}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="p-3">
                    <Label>First Description*</Label>
                    <Input
                      type="textarea"
                      name="FirstDescription"
                      value={values.FirstDescription}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  color="info"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateSurvey;
