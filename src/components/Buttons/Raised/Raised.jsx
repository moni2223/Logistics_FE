import { useEffect, useRef } from "react";
import "./styles.scss";

const Raised = ({ disabled, disabledRipple, text, reversed, children = "text", className = "", prefix, style, onClick = () => {}, ...props }) => {
  const buttonRef = useRef(null);

  const ripple = ({ clientX, clientY, target: { offsetTop, offsetLeft } }) => {
    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.top = `${clientY - offsetTop}px`;
    circle.style.left = `${clientX - offsetLeft}px`;
    buttonRef.current.appendChild(circle);
    setTimeout(() => {
      circle.remove();
    }, 500);
  };

  useEffect(() => {
    if (disabledRipple) return;
    const button = buttonRef.current;
    button.addEventListener("click", ripple);
    return () => button.removeEventListener("click", ripple);
  }, [disabledRipple]);

  return (
    <div ref={buttonRef} style={style} className={`buttons-raised-container ${disabled ? "disabled" : ""} ${reversed ? "reversed" : ""} ${className}`} onClick={onClick} {...props}>
      {prefix && prefix}
      {text || children}
    </div>
  );
};

export default Raised;
