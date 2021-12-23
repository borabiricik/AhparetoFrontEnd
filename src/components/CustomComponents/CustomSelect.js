import React from "react";
import Select from "react-select";

const CustomSelect = ({ onChange, options, value, className }) => {
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
        options={options} />

    </>
  );
};

export default CustomSelect;
