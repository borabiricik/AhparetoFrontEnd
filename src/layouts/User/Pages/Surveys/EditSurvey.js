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
import { useHistory } from "react-router-dom";

const EditSurvey = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const history= useHistory()
  const surveyData = useSelector((state) => state.surveys.surveysData);
  if (surveyData) {
    const editData = surveyData.find((survey) => survey.id == id);

    return (
      <div className="content">
        <Formik
          initialValues={{
            id,
            name: editData.name,
            purpose: editData.purpose,
            startDate: new Date(editData.startDate),
            endDate: new Date(editData.endDate),
            participantsCount: editData.participantsCount,
            firstDescription: editData.firstDescription,
          }}
          onSubmit={(values) => {
            dispatch(updateSurvey({ ...values, history }));
          }}
        >
          {({ handleChange, values, handleSubmit }) => {
            return (
              <Card>
                <CardHeader tag={"h2"}>Anket Düzenle</CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="4" className="p-3">
                      <label>Anket Adı*</label>
                      <Input
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                      />
                    </Col>
                    <Col sm="4" className="p-3">
                      <label>Anketin Amacı*</label>
                      <Input
                        name="name"
                        onChange={handleChange}
                        value={values.purpose}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="4" className="p-3">
                      <label>Başlangıç Tarihi*</label>
                      <CustomDatePicker
                        placeholder="Başlangıç Tarihi Seçiniz..."
                        name="startDate"
                        value={values.startDate}
                      />
                    </Col>
                    <Col sm="4" className="p-3">
                      <label>Bitiş Tarihi*</label>
                      <CustomDatePicker
                        placeholder="Bitiş Tarihi Seçiniz..."
                        name="endDate"
                        value={values.endDate}
                      />
                    </Col>
                    <Col sm="4" className="p-3">
                      <label>Katılımcı Sayısı*</label>
                      <Input
                        type="number"
                        name="participantsCount"
                        onChange={handleChange}
                        value={values.participantsCount}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6" className="p-3">
                      <label>Ön Açıklama*</label>
                      <Input
                        type="textarea"
                        onChange={handleChange}
                        value={values.firstDescription}
                        className="p-2"
                      />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="success" onClick={handleSubmit}>
                    Kaydet
                  </Button>
                </CardFooter>
              </Card>
            );
          }}
        </Formik>
      </div>
    );
  } else {
    <div className="content">
      <h2>Yükleniyor...</h2>
    </div>;
  }
};

export default EditSurvey;
