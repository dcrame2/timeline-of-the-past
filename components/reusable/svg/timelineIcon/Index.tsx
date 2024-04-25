import * as React from "react";
const TimelineIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 32 32"
    width="25px"
  >
    <path
      fill="none"
      stroke={color}
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M5 28V4"
    />
    <circle
      cx={16}
      cy={10}
      r={2}
      fill="none"
      stroke={color}
      strokeMiterlimit={10}
      strokeWidth={2}
    />
    <circle
      cx={23}
      cy={16}
      r={2}
      fill="none"
      stroke={color}
      strokeMiterlimit={10}
      strokeWidth={2}
    />
    <circle
      cx={11}
      cy={22}
      r={2}
      fill="none"
      stroke={color}
      strokeMiterlimit={10}
      strokeWidth={2}
    />
    <path
      fill="none"
      stroke={color}
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M28 16h-3M21 16H5M28 10H18M14 10H5M28 22H13M9 22H5"
    />
  </svg>
);
export default TimelineIcon;
