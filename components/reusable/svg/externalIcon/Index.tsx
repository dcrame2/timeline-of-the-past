import * as React from "react";
import { SVGProps } from "react";
const ExternalIcon = ({ color }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15px"
    // height="2"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218.377-.192.683-.498.875-.874.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0-7 7"
    />
  </svg>
);
export default ExternalIcon;
