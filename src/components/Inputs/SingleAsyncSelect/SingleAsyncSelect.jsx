/* eslint-disable */
import React from "react";
import { forwardRef } from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import ArrowDown from "../../../assets/icons/arrow-down-green.svg";
import AsyncCreatableSelect from "react-select/async-creatable";
import InputWrapper from "../InputWrapper";

const customStyles = {
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "#0083E5", // Custom colour
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "#0083E5" : "white",
    opacity: state.data.blocked ? 0.5 : 1,
    cursor: state.data.blocked ? "not-allowed" : "pointer",
    padding: 10,
    fontSize: "14px",
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: "100%",
    height: 39,
    display: "flex",
    border: "1px solid rgb(165, 164, 164)",
    borderRadius: "7px",
    fontSize: "14px",
    fontFamily: "Montserrat, sans-serif",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <div
        className="close-icon"
        style={{
          backgroundImage: `url(${ArrowDown})`,
          width: "20px",
          height: "20px",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </components.DropdownIndicator>
  );
};

const SingleAsyncSelect = forwardRef(({ creatable, optionsArray, loadOptions, disabled, onChange, label, compulsory, className, outerClassName, outerStyle, value, multi, noClear, ...props }, ref) => {
  const handleOnChange = (newValue, actionMeta) => {
    if (noClear && (actionMeta.action === "remove-value" || actionMeta.action === "pop-value")) return;
    onChange(newValue, actionMeta);
  };

  return (
    <InputWrapper label={label} compulsory={compulsory} outerClassName={outerClassName} outerStyle={outerStyle}>
      {creatable ? (
        <AsyncCreatableSelect
          defaultOptions={optionsArray}
          loadOptions={loadOptions}
          ref={ref}
          placeholder=""
          isMulti={multi}
          isDisabled={disabled}
          styles={customStyles}
          className={`w-full ${className}`}
          value={value}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          onChange={handleOnChange}
          {...props}
        />
      ) : (
        <AsyncSelect
          defaultOptions={optionsArray}
          loadOptions={loadOptions}
          ref={ref}
          placeholder=""
          isMulti={multi}
          isDisabled={disabled}
          styles={customStyles}
          className={`w-full ${className}`}
          value={value}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          onChange={handleOnChange}
          {...props}
        />
      )}
    </InputWrapper>
  );
});

export default SingleAsyncSelect;
