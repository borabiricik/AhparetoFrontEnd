import React, { Component } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, Col, Row } from "reactstrap";
import Select from "react-select";

const Step2 = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const desiredSurveyType = useSelector(
    (state) => state.wizard.desiredSurveyType
  );
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
      <h2>Demografik Bilgi Ekle</h2>
      <Col sm="4">
        <Select
          className="react-select info"
          classNamePrefix="react-select"
          placeholder="Choose City"
          name="multipleSelect"
          closeMenuOnSelect={false}
          isMulti
          // value={multipleSelect}
          // onChange={(value) => setmultipleSelect(value)}
          options={[
            {
              value: "",
              label: " Multiple Options",
              isDisabled: true,
            },
            { value: "2", label: "Paris " },
            { value: "3", label: "Bucharest" },
            { value: "4", label: "Rome" },
            { value: "5", label: "New York" },
            { value: "6", label: "Miami " },
            { value: "7", label: "Piatra Neamt" },
            { value: "8", label: "Paris " },
            { value: "9", label: "Bucharest" },
            { value: "10", label: "Rome" },
            { value: "11", label: "New York" },
            { value: "12", label: "Miami " },
            { value: "13", label: "Piatra Neamt" },
            { value: "14", label: "Paris " },
            { value: "15", label: "Bucharest" },
            { value: "16", label: "Rome" },
            { value: "17", label: "New York" },
            { value: "18", label: "Miami " },
            { value: "19", label: "Piatra Neamt" },
          ]}
        />
      </Col>
    </div>
  );
});

export default Step2;
