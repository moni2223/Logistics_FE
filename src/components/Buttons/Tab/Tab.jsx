import InputWrapper from "../../Inputs/InputWrapper";
import "./styles.scss";

const Tab = ({ label, classNameWrapper, innerClassName, options, value, disabled, onChange = () => {}, invalid, isMulti, navigation }) => {
  return (
    <InputWrapper label={label} className={classNameWrapper}>
      <div className={`buttons-tab-container flex row ${innerClassName} ${disabled ? " disabled" : ""}${invalid ? " invalid" : ""} ${navigation ? " navigation" : ""}`}>
        {options?.map((el, i) => {
          const selected = isMulti ? value?.includes(el?.value ?? el) : value === (el?.value ?? el);
          return (
            <button
              key={i}
              tabIndex={0}
              className={`underlined-tab ${selected ? "active" : ""} ${el?.invalid ? "invalid" : ""} ${el?.disabled ? " disabled" : ""}`}
              style={{ ...(selected && el.backgroundColor && { backgroundColor: el.backgroundColor, borderColor: "transparent" }) }}
              onClick={() => {
                if (isMulti) {
                  if (selected) onChange(value.filter((v) => v !== (el?.value ?? el)));
                  else onChange([...(value ?? []), el?.value ?? value]);
                } else onChange(el);
              }}
            >
              <span style={{ ...(selected && el.fontColor && { color: el.fontColor }) }}>{el?.label ?? el}</span>
            </button>
          );
        })}
      </div>
    </InputWrapper>
  );
};

export default Tab;
