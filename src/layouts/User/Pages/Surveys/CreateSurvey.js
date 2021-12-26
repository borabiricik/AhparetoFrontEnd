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

const CreateSurvey = () => {
  const steps = [
    {
      stepName: "Genel Bilgiler",
      stepIcon: "tim-icons icon-single-02",
      component: Step1,
    },
    {
      stepName: "Demografik Bilgiler",
      stepIcon: "tim-icons icon-settings-gear-63",
      component: Step2,
    },
    {
      stepName: "Anketör Bilgileri",
      stepIcon: "tim-icons icon-delivery-fast",
      component: Step3,
    },
    {
      stepName: "Seçenekler",
      stepIcon: "tim-icons icon-delivery-fast",
      component: Step4,
    },
    {
      stepName: "Sorular",
      stepIcon: "tim-icons icon-delivery-fast",
      component: Step5,
    },
  ];
  return (
    <>
      <Formik initialValues={{
          methodType:1,
      }}>
        <div className="content">
          <Col md="10" className="mx-auto">
            <ReactWizard
              steps={steps}
              navSteps
              title="Anket Oluştur"
              headerTextCenter
              finishButtonClasses="btn-wd btn-info"
              nextButtonClasses="btn-wd btn-info"
              previousButtonClasses="btn-wd"
              nextButtonText="SONRAKİ"
              previousButtonText="ÖNCEKİ"
              finishButtonText="BİTİR"
              progressbar
              description="Anketi oluşturmak için tüm adımları tamamlayın"
              color="blue"
            />
          </Col>
        </div>
      </Formik>
    </>
  );
};

export default CreateSurvey;
