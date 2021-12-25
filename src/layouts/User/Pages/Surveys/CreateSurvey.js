import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import ReactWizard from "react-bootstrap-wizard";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import { Formik } from "formik";
import { useState } from "react";

const CreateSurvey = () => {
  const [steps, setsteps] = useState([
    {
      stepName: "About",
      stepIcon: "tim-icons icon-single-02",
      component: Step1,
    },
    {
      stepName: "Account",
      stepIcon: "tim-icons icon-settings-gear-63",
      component: Step2,
    },
    {
      stepName: "Address",
      stepIcon: "tim-icons icon-delivery-fast",
      component: Step3,
    },
  ]);
  return (
    <>
      <Formik ini>
        <div className="content">
          <Col md="10" className="mx-auto">
            <ReactWizard
              steps={steps}
              navSurveys
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
