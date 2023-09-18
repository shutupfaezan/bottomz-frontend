import React from "react";
import { useState, useRef } from "react";

export default function Input(props) {
  const inputRef = useRef(null);
  const [eyeInstance, setEyeInstance] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  function hidePassword() {
    if (inputRef.current.type === "password") {
      setEyeInstance(true);
      inputRef.current.type = "text";
    } else {
      setEyeInstance(false);
      inputRef.current.type = "password";
    }
  }
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        key={props.key}
        style={{
          ...props.style,
          borderBottom: props?.style?.borderSelfStyles ? props?.style?.borderSelfStyles :
            (isFocused || props.value
              ? "1px solid rgba(255, 255, 255)"
              : "1px solid rgba(255, 255, 255, 0.40)")
        }}
      >
        {props?.icon && (
          <i
            className={props.icon}
            style={{
              fontSize: !props.style.fontSize ? "22px" : props?.style?.fontSize,
              marginRight: "5px",
              color: !props.style.iconColor ? 
                (isFocused || props.value
                  ? "rgba(255, 255, 255)"
                  : "rgba(255, 255, 255, 0.40)") : props.style.iconColor,
            }}
          ></i>
        )}
        {props.useInput === 1 ? (
          <input
            className="form-control w-100"
            ref={inputRef}
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            onChange={props.handleChange}
            maxLength={props.maxLength}
            type={props.type}
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              fontSize: "12px",
              padding: "12px",
              color: "rgba(255,255,255, 0.8)",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></input>
        ) : (
          <input
            className="form-control w-100"
            id={props.id}
            ref={inputRef}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            maxLength={props.maxLength}
            onChange={props.handleChange}
            type={props.type}
            onKeyDown={props.onKeyDown}
            style={{
              ...props.style,
              borderRadius: "0",
              background: "transparent",
              border: "none",
              color: props?.style?.color ? props?.style?.color : "rgba(255,255,255, 0.8)",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></input>
        )}
        <i
          style={{
            float: "right",
            right: "35px",
            borderRadius: "20px",
            top: "0px",
            // width: "0px",
            zIndex: "1",
            fontSize: "20px",
            color: "gray",
          }}
          onClick={hidePassword}
          className={eyeInstance ? props.icon2 : props.icon3}
        ></i>
      </div>
    </>
  );
}
