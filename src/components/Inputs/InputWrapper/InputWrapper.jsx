const InputWrapper = ({ children, outerStyle, style, outerClassName, className, label, compulsory }) => {
  return (
    <div className={`${outerClassName || className} ${className === "error" && "border border-red-500"} flex flex-col items-start input-container`} style={outerStyle || style}>
      {label && (
        <label className="flex w-full text-sm mb-2">
          {label} {compulsory && <span className={"pl-2 text-[#E80111]"}>*</span>}
        </label>
      )}
      {children}
    </div>
  );
};

export default InputWrapper;
