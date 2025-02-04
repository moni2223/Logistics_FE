/* eslint-disable */
import React from "react";
import "./styles.scss";

const Button = ({ text, style, disabled, onClick, selected, className, deleted, cancel, continuE, id, timer, compulsory, withIcon, boldClassName }) => {
  return (
    <div
      className={`flex items-center justify-center text-black text-sm cursor-pointer rounded-md bg-white px-5 py-2.5 button-container active:scale-95 ${className} ${selected && "selected "} ${timer && "timer "} ${disabled && "disabled"} ${cancel && "cancel"} ${deleted && "delete"} ${continuE && "continuE"}`}
      style={style}
      onClick={!disabled ? onClick : undefined}
      id={id}
    >
      <b className={`flex whitespace-nowrap uppercase ${withIcon && "w-full"} ${boldClassName} `} style={{ color: `${timer && "#15DD95"}` }}>
        {text}
        {compulsory && <div className="rounded-full w-2 h-2 ml-[3px] bg-[#e80111]" />}
      </b>
    </div>
  );
};
export default Button;
