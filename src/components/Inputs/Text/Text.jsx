/* eslint-disable */
import React from "react";
import "./styles.scss";
import { forwardRef } from "react";
import InputWrapper from "../InputWrapper";

const TextInput = forwardRef(({ outerStyle, outerClassName, inputClassName, innerStyle, style, label, compulsory, disabled, suffix, prefix, password, date, number, ...props }, ref) => {
  return (
    <InputWrapper outerStyle={outerStyle} outerClassName={outerClassName} label={label} compulsory={compulsory}>
      <div className={`flex items-center rounded-md h-10 w-full prefix-input-container bg-white ${disabled && "disabled"} ${inputClassName}`} style={innerStyle}>
        {prefix && prefix}
        <input className={`border-none outline-none text-base bg-white px-2  h-[90%] w-full rounded-md ${style} ${disabled && "opacity-30"}`} type={password ? "password" : number ? "number" : "text"} id={password && "input"} disabled={disabled} {...props} ref={ref} />
        <div className="font-bold whitespace-nowrap">{suffix && suffix}</div>
      </div>
    </InputWrapper>
  );
});

export default TextInput;
