import { Button, Select, SelectItem, Tooltip } from "@nextui-org/react";
import React from "react";

function SelectInput({
  onChange,
  value,
  label,
  placeholder,
  options,
}: {
  onChange: any;
  value: any;
  label: any;
  placeholder: string;
  options: any;
}) {
  return (
    <>
      <Select
        label={label}
        placeholder={placeholder}
        className="max-w-xs"
        onChange={onChange}
        value={value}
        labelPlacement={"outside"}
      >
        {options.map((selectOption: any) => (
          <SelectItem
            key={selectOption.value}
            value={selectOption.value}
            style={{
              color: "black",
              fontFamily: selectOption.value,
            }}
          >
            {selectOption.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}

export default SelectInput;
