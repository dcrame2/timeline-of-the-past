import { inputType, pXSmall } from "@/styles/Type";
import { variables } from "@/styles/Variables";
import React from "react";
import styled from "styled-components";
import { Input } from "@nextui-org/react";

interface TextInputProps {
  type?: "text" | "password" | "file" | "email" | "color" | "date";
  label?: string;
  id?: string;
  name?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  value?: string;
  onChange?: any;
  min?: string;
  max?: string;
  style?: any;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type,
      label,
      id,
      name,
      required,
      minLength,
      maxLength,
      placeholder,
      errorMessage,
      className,
      value,
      onChange,
      min,
      max,
      style,
    },
    ref
  ) => {
    return (
      <>
        <Input
          className={className}
          type={type}
          id={id}
          name={name}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={onChange}
          variant={"flat"}
          label={label}
          labelPlacement={"outside"}
          min={min}
          max={max}
          style={style}
        />

        {errorMessage && <label>{errorMessage}</label>}
      </>
    );
  }
);

export default TextInput;
