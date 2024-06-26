// import { inputType, pXSmall } from "@/styles/Type";
// import { variables } from "@/styles/Variables";
// import React from "react";
// import styled from "styled-components";

// const FieldContainer = styled.div`
//   width: 100%;
//   label {
//     color: ${variables.black};
//     ${pXSmall}
//   }
//   input {
//     ${inputType}
//   }
// `;

// interface TextInputProps {
//   type?: "text" | "password" | "file" | "email";
//   label?: string;
//   id?: string;
//   name?: string;
//   required?: boolean;
//   minLength?: number;
//   maxLength?: number;
//   placeholder?: string;
//   className?: string;
//   errorMessage?: string;
//   value?: string;
//   onChange?: any;
// }

// const TextInput1 = React.forwardRef<HTMLInputElement, TextInputProps>(
//   (
//     {
//       type,
//       label,
//       id,
//       name,
//       required,
//       minLength,
//       maxLength,
//       placeholder,
//       errorMessage,
//       className,
//       value,
//       onChange,
//     },
//     ref
//   ) => {
//     return (
//       <FieldContainer className={className}>
//         {label && <label htmlFor={name}>{label}</label>}
//         <input
//           type={type}
//           id={id}
//           name={name}
//           required={required}
//           minLength={minLength}
//           maxLength={maxLength}
//           placeholder={placeholder}
//           ref={ref}
//           value={value}
//           onChange={onChange}
//         />
//         {errorMessage && <label>{errorMessage}</label>}
//       </FieldContainer>
//     );
//   }
// );

// export default TextInput1;
