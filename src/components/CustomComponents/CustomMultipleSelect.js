import { FieldProps } from "formik";
import React from "react";
import Select from "react-select";


export const CustomMultipleSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false
}) => {
  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? option.map((o) => o.value)
        : option.value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <Select
      className={"react-select info"}
      classNamePrefix="react-select"
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default CustomMultipleSelect;
