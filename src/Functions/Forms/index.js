import { useDispatch } from "react-redux";
import { Button, Col, Input } from "reactstrap";
import { setData } from "stores/Demografik/demografikSlice";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getLayoutName } from "Functions/Router";
import React from "react";
import { Redirect } from "react-router-dom";

const renderForms = (forms, options, formData) => {
  if (formData) {
    const renderedForms = forms.map((form, key) => {
      const foundForm = Object.keys(formData[0]).find(
        (d) => d === form.apiName
      );
      const dispatch = useDispatch();
      const history = useHistory();
      const dataCreate = useSelector((state) => state.demografik.dataCreate);
      if (formData === null || foundForm === null) {
        history.go(getLayoutName(history) + "/dashboard");
      } else if (form.type === "text" && formData) {
        return (
          <Col sm="4" key={key}>
            <label>{form.title}</label>
            <Input
              name={form.apiName}
              type={form.type}
              placeholder={form.placeholder}
              onChange={(e) =>
                dispatch(
                  setData({ apiName: form.apiName, data: e.target.value })
                )
              }
            />
          </Col>
        );
      } else if (form.type === "select" && options) {
        const apiName = form.apiName
        return (
          <Col sm="4" key={key}>
            <label>{form.title}</label>
            <Select
              className="react-select info"
              classNamePrefix="react-select"
              name="singleSelect"
              onChange={(selected) => {
                const value = selected.value
                dispatch(
                  setData({ ...dataCreate, apiName: form.apiName,data:value })
                );
              }}
              options={options}
              placeholder="Lütfen Seçiniz"
            />
          </Col>
        );
      }
     else {
        return null;
      }
    });
    return renderedForms;
  } else {
    return <Redirect to={"/"} />;
  }
};

export default renderForms;
