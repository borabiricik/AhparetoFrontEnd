import React, { useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDemografik } from "stores/Demografik/demografikSlice";
import { Field, FieldArray, useField, useFormikContext } from "formik";
import { getPollsters } from "stores/Pollsters/pollsterSlice";
import FormErrorMessage from "components/CustomComponents/FormErrorMessage";
import Loading from "components/Common/Loading";

const Step2 = React.forwardRef((props, ref) => {
  const demografikData = useSelector(
    (state) => state.demografik.demografikData
  );
  const loading = useSelector((state) => state.demografik.loading);
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
    dispatch(getDemografik());
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading === false) {
    return (
      <div>
        <h2>Demografik Bilgi Ekle</h2>
        <Col sm="4">
          <FieldArray
            render={(arrayHelper) => {
              return (
                <Select
                  className="react-select info"
                  classNamePrefix="react-select"
                  placeholder="Demografik Bilgi Seçiniz..."
                  name="demografikJson"
                  closeMenuOnSelect={false}
                  isMulti
                  onChange={(value, selected) => {
                    console.log(selected);
                    console.log(value);
                    if (value) {
                      const tempArr = [...value];

                      setFieldValue(
                        "demografikJson",
                        tempArr.map((i) => {
                          return {
                            description: i.label,
                            id: i.value,
                            demografikDetails: [],
                          };
                        })
                      );
                    }
                  }}
                  options={demografikData.map((d) => {
                    return { label: d.description, value: d.id };
                  })}
                />
              );
            }}
          />
          {props.errors.demografikJson && (
            <FormErrorMessage message={props.errors.demografikJson} />
          )}
        </Col>
      </div>
    );
  } else {
    return <Loading />
  }
});

export default Step2;
