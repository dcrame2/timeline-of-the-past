import * as React from "react";
import { SVGProps } from "react";
const PurchaseIcon = ({ color }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    fill="none"
    viewBox="0 0 24 24"
  >
    <rect
      width={18}
      height={13}
      x={3}
      y={6}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      rx={2}
    />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h17.5M7 15h2"
    />
  </svg>
);
export default PurchaseIcon;
