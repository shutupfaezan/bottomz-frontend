import React from "react";
import { useState } from "react";

export default function Input(props) {
  const [eyeInstance, setEyeInstance] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  function hidepassword() {
    var temp = document.getElementById(props.id);
    if (temp.type === "password") {
      setEyeInstance(true);
      temp.type = "text";
    } else {
      temp.type = "password";
      setEyeInstance(false);
    }
  }
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        key={props.key}
        style={{
          ...props.style,
          borderBottom:
            isFocused || props.value
              ? "1px solid rgba(255, 255, 255)"
              : "1px solid rgba(255, 255, 255, 0.40)",
        }}
      >
        {props?.icon && (
          <i
            className={props.icon}
            style={{
              fontSize: "22px",
              // color: "gray",
              marginRight: "5px",
              color:
                isFocused || props.value
                  ? "rgba(255, 255, 255)"
                  : "rgba(255, 255, 255, 0.40)",
            }}
          ></i>
        )}
        {props.useInput === 1 ? (
          <input
            className="form-control w-100"
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            onChange={props.handleChange}
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
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            onChange={props.handleChange}
            type={props.type}
            style={{
              borderRadius: "0",
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255, 0.8)",
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
          onClick={hidepassword}
          className={eyeInstance ? props.icon3 : props.icon2}
        ></i>
      </div>
    </>
  );
}
