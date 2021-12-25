import React from "react";
import Select from "react-select";

const CustomSelect = ({
  onChange,
  options,
  value,
  className,
  fromApi,
  labelKey,
  valueKey,
  placeholder
}) => {


  if (fromApi === true) {
    const defaultValue = () => {
      return options ? options.find((option) => option.value === value) : "";
    };
    options.map(data =>({label:data.Name,value:data.value}))
    return (
      <>
        <Select
          className={className}
          classNamePrefix="react-select"
          value={defaultValue(options, value)}
          onChange={(value) => onChange(value)}
          options={options.map(data =>({label:data[labelKey],value:data[valueKey]}))}
          labelKey={labelKey}
          valueKey={valueKey}
          placeholder={placeholder ? placeholder : "Seçiniz..."}
        />
      </>
    );
  } else {
    const defaultValue = () => {
      return options ? options.find((option) => option.value === value) : "";
    };
    return (
      <>
        <Select
          className={className}
          classNamePrefix="react-select"
          value={defaultValue(options, value)}
          onChange={(value) => onChange(value)}
          options={options}
        />
      </>
    );
  }
};

export default CustomSelect;
