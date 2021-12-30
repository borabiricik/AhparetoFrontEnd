import React, { useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDemografik } from "stores/Demografik/demografikSlice";
import { Field, FieldArray, useField, useFormikContext } from "formik";
import { getPollsters } from "stores/Pollsters/pollsterSlice";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";

const Step3 = React.forwardRef((props, ref) => {
  const pollstersData = useSelector((state) => state.pollsters.pollstersData);
  const loading = useSelector((state) => state.pollsters.loading);
  const dispatch = useDispatch();
  const [field] = useField();
  const { setFieldValue } = useFormikContext();
  /*eslint-disable-next-line*/
  const isValidated = () => {
    return true;
  };
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
  }));
  const getData = async () => {
    dispatch(getPollsters());
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading === false) {
    return (
      <div>
        <h2>Create Pollster Info</h2>
        <Col sm="4">
          <FieldArray
            render={(arrayHelper) => {
              return (
                <Select
                  className="react-select info"
                  classNamePrefix="react-select"
                  placeholder="Select Pollster Info..."
                  name="pollsterJson"
                  closeMenuOnSelect={false}
                  isMulti
                  onChange={(value, selected) => {
                    console.log(selected);
                    console.log(value);
                    if (value) {
                      const tempArr = [...value];

                      setFieldValue(
                        "pollsterJson",
                        tempArr.map((i) => {
                          return { description: i.label, id: i.value };
                        })
                      );
                    }
                  }}
                  options={pollstersData.map((d) => {
                    return { label: d.nameSurName, value: d.pollsterId };
                  })}
                />
              );
            }}
          />
          {props.errors.pollsterJson && (
            <FormErrorMessage message={props.errors.pollsterJson} />
          )}
        </Col>
      </div>
    );
  } else {
    return <h2>Yükleniyor...</h2>;
  }
});

export default Step3;
