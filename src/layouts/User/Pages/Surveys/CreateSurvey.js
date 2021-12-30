import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import ReactWizard from "react-bootstrap-wizard";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import { Formik } from "formik";
import { useState } from "react";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addSurvey } from "stores/Survyes/surveySlice";
import { useHistory } from "react-router-dom";

const validationSchema = Yup.object().shape({
  options: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().required("Required"),
      })
    )
    .min(1)
    .required("Required"),
  // questions: Yup.array().of(Yup.object().shape({
  //   description: Yup.object().required()
  // })).min(1).required("Zorunlu Alan"),
  name: Yup.string().required("Required"),
  purpose: Yup.string().required("Required"),
  startDate: Yup.date("Please Select Valid Date").required("Required"),
  endDate: Yup.date("Please Select Valid Date").required("Required"),
  participantsCount: Yup.number().required("Required"),
  firstDescription: Yup.string().required("Required").trim(),
});

const CreateSurvey = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          purpose: "",
          startDate: "",
          endDate: "",
          methodType: 1,
          participantsCount: 0,
          firstDescription: "",
          demografikJson: [],
          pollsterJson: [],
          options: [],
          questions: [
            {
              question: "",
              optionA: -1,
              optionB: -1,
            },
          ],
          userId: parseInt(localStorage.getItem("userId")),
          isSms: true,
          draft: true,
          shipmentText:"",
          participantJson: "[]",
          surveyAnswers:[]
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          dispatch(addSurvey({...values,history}));
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          isValid,
          errors,
          setFieldValue,
        }) => {
          const steps = [
            {
              stepName: "General Info",
              stepIcon: "tim-icons icon-single-02",
              component: Step1,
              stepProps: {
                handleChange,
                errors,
              },
            },
            {
              stepName: "Demographic Info",
              stepIcon: "tim-icons icon-settings-gear-63",
              component: Step2,
              stepProps: {
                handleChange,
                errors,
              },
            },
            {
              stepName: "Pollster Info",
              stepIcon: "tim-icons icon-delivery-fast",
              component: Step3,
              stepProps: {
                errors,
              },
            },
            {
              stepName: "Options",
              stepIcon: "tim-icons icon-delivery-fast",
              component: Step4,
              stepProps: {
                handleChange,
                errors,
                values,
                setFieldValue,
              },
            },
            {
              stepName: "Questions",
              stepIcon: "tim-icons icon-delivery-fast",
              component: Step5,
              stepProps: {
                errors,
                values,
                setFieldValue,
              },
            },
          ];

          return (
            <div className="content">
              <Col md="10" className="mx-auto">
                <ReactWizard
                  steps={steps}
                  navSteps
                  validate
                  title="Create Survey"
                  headerTextCenter
                  finishButtonClasses="btn-wd btn-info"
                  nextButtonClasses="btn-wd btn-info"
                  previousButtonClasses="btn-wd"
                  nextButtonText="SONRAKİ"
                  previousButtonText="ÖNCEKİ"
                  finishButtonText="BİTİR"
                  progressbar
                  description="Fill Every Form to Create New Survey"
                  color="blue"
                  finishButtonClick={handleSubmit}
                />
              </Col>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateSurvey;
