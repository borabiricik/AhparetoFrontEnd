import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datetime";
import "moment/locale/tr"
export const CustomDatePicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
//   console.log(props)
  return (
    <DatePicker
    timeFormat={false}
      {...field}
      {...props}
      inputProps={{placeholder:props.placeholder}}
      locale={"tr"}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    />
  );
};