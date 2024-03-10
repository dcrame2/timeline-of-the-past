import { variables } from "@/styles/Variables";
import React from "react";
import styled from "styled-components";

const FieldContainer = styled.div`
  label {
    color: ${variables.black};
  }
`;

interface TextInputProps {
  type?: "text" | "password" | "file";
  label?: string;
  id?: string;
  name: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
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
    },
    ref
  ) => {
    return (
      <FieldContainer className={className}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          ref={ref}
        />
        {errorMessage && <label>{errorMessage}</label>}
      </FieldContainer>
    );
  }
);

export default TextInput;
