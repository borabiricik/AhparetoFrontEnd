import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, Input, Row } from "reactstrap";
import { Field, useField, useFormikContext } from "formik";
import { CustomDatePicker } from "components/CustomComponents/CustomDatePicker";
import DatePicker from "react-datetime";
import "moment/locale/tr";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";

const Step1 = React.forwardRef((props, ref) => {
  /*eslint-disable-next-line*/
  const isValidated = () => {
    return true;
  };
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
  }));

  return (
    <div>
      <h2>Genel Bilgiler</h2>
      <Row>
        <Col sm="4" className="mb-2">
          <label>Anket Adı*</label>
          <Input type="text" name="name" onChange={props.handleChange} />
          {props.errors.name && <FormErrorMessage message={props.errors.name} />}
        </Col>
        <Col sm="4" className="mb-2">
          <label>Anket Amacı*</label>
          <Input type="text" name="purpose" onChange={props.handleChange} />
          {props.errors.purpose && <FormErrorMessage message={props.errors.purpose} />}

        </Col>
      </Row>
      <Row>
        <Col sm="4" className="mb-2">
          <label>Başlangıç Tarihi*</label>
          <CustomDatePicker
            name="startDate"
            placeholder={"Başlangıç Tarihi Seçiniz..."}
          />
          {props.errors.startDate && <FormErrorMessage message={props.errors.startDate} />}

        </Col>
        <Col sm="4" className="mb-2">
          <label>Bitiş Tarihi*</label>
          <CustomDatePicker
            name="endDate"
            placeholder={"Bitiş Tarihi Seçiniz..."}
          />
          {props.errors.endDate && <FormErrorMessage message={props.errors.endDate} />}

        </Col>
        <Col sm="4" className="mb-2">
          <label>Katılımcı Sayısı*</label>
          <Input
            type="number"
            name="participantsCount"
            onChange={props.handleChange}
          />
          {props.errors.participantsCount && <FormErrorMessage message={props.errors.participantsCount} />}

        </Col>

        <Col sm="12">
          <label>Ön Açıklama*</label>
          <Input
            type="textarea"
            name="firstDescription"
            onChange={props.handleChange}
            className="p-2"
          />
          {props.errors.firstDescription && <FormErrorMessage message={props.errors.firstDescription} />}

        </Col>
      </Row>
    </div>
  );
});

export default Step1;
