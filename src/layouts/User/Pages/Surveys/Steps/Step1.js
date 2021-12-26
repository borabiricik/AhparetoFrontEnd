import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, Input, Row } from "reactstrap";

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
          <Input type="text" />
        </Col>
        <Col sm="4" className="mb-2">
          <label>Anket Amacı*</label>
          <Input type="text" />
        </Col>
      </Row>
      <Row>
        <Col sm="4" className="mb-2">
          <label>Başlangıç Tarihi*</label>
          <Input type="text" />
        </Col>
        <Col sm="4" className="mb-2">
          <label>Bitiş Tarihi*</label>
          <Input type="text" />
        </Col>
        <Col sm="4" className="mb-2">
          <label>Katılımcı Sayısı*</label>
          <Input type="text" />
        </Col>

        <Col sm="12">
          <label>Ön Açıklama*</label>
          <Input type="textarea" />
        </Col>
      </Row>
    </div>
  );
});

export default Step1;
