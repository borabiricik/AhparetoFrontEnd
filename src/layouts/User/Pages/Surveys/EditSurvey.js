import { Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
import { CustomDatePicker } from "components/CustomComponents/CustomDatePicker";
import { useDispatch } from "react-redux";
import { updateSurvey } from "stores/Survyes/surveySlice";
import { Redirect, useHistory } from "react-router-dom";
import { getLayoutName } from "Functions/Router";

const EditSurvey = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const surveyData = useSelector((state) => state.surveys.surveysData);
  if (surveyData) {
    const editData = surveyData.find((survey) => survey.Id == id);

    return (
      <div className="content">
        <Formik
          initialValues={{
            Id: parseInt(id),
            Name: editData.Name,
            Purpose: editData.Purpose,
            StartDate: new Date(editData.StartDate),
            EndDate: new Date(editData.EndDate),
            ParticipantsCount: editData.ParticipantsCount,
            FirstDescription: editData.FirstDescription,
          }}
          onSubmit={(values) => {
            dispatch(
              updateSurvey({
                ...values,
                StartDate: values.StartDate.toISOString(),
                EndDate: values.StartDate.toISOString(),
                history,
              })
            );
          }}
        >
          {({ handleChange, values, handleSubmit }) => {
            return (
              <Card>
                <CardHeader tag={"h2"}>Edit Survey</CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="4" className="p-3">
                      <label>Survey Title*</label>
                      <Input
                        name="Name"
                        onChange={handleChange}
                        value={values.Name}
                      />
                    </Col>
                    <Col sm="4" className="p-3">
                      <label>Survey Purpos*</label>
                      <Input
                        name="Purpose"
                        onChange={handleChange}
                        value={values.Purpose}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="4" className="p-3">
                      <label>Start Date*</label>
                      <CustomDatePicker
                        placeholder="Select Start Date..."
                        name="StartDate"
                        value={values.StartDate}
                      />
                    </Col>
                    <Col sm="4" className="p-3">
                      <label>End Date*</label>
                      <CustomDatePicker
                        placeholder="Select End Date...."
                        name="EndDate"
                        value={values.EndDate}
                      />
                    </Col>
                    <Col sm="4" className="p-3">
                      <label>Participant Count*</label>
                      <Input
                        type="number"
                        name="ParticipantsCount"
                        onChange={handleChange}
                        value={values.ParticipantsCount}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6" className="p-3">
                      <label>First Description*</label>
                      <Input
                        type="textarea"
                        onChange={handleChange}
                        value={values.FirstDescription}
                        className="p-2"
                        name="FirstDescription"
                      />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="success" onClick={handleSubmit}>
                    Save
                  </Button>
                </CardFooter>
              </Card>
            );
          }}
        </Formik>
      </div>
    );
  } else {
    return <Redirect to={getLayoutName(history) + "/surveys"} />;
  }
};

export default EditSurvey;
