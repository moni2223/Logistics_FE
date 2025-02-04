import React from "react";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "./styles.scss";
import InputWrapper from "../InputWrapper";

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <div className={`date-picker flex-container align-center ${props?.className} ${props?.disabled && "bg-[#e6edff]"}`}>
      <label onClick={props.onClick} ref={ref} className="flex items-center text-base" style={{ width: "88%", height: "100%", paddingLeft: "2%" }}>
        {props.value || props.placeholder}
      </label>
      <div className="date-icon w-1/10 h-3/5" onClick={props.onClick} />
    </div>
  );
});

const DateInput = forwardRef(function DateInput({ label, compulsory, outerClassName, outerStyle, disabled, value, ...props }, ref) {
  return (
    <InputWrapper label={label} compulsory={compulsory} outerClassName={outerClassName} outerStyle={outerStyle}>
      <DatePicker customInput={<CustomInput disabled={disabled} />} calendarStartDay={1} {...props} selected={value} disabled={disabled} dateFormat={"dd/MM/yyyy"} ref={ref} />
    </InputWrapper>
  );
});

export default DateInput;
