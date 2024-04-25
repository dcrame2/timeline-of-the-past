import * as React from "react";
import { SVGProps } from "react";
const ReturnIcon = ({ color }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
  >
    <path
      d="M118.4 68.4c-2.2.7-5.5 2.1-7.3 3.2-3.7 2.2-64.4 77.4-66.1 82-2.3 6.1-1.1 8 29.9 46.8 16.4 20.5 31.2 38.5 32.7 40.1 9.8 9.4 27.8 8.9 36.2-1 5.8-6.9 7.7-16.5 4.9-24.5-.7-1.9-5.5-9.7-10.6-17.3-5-7.6-9.5-14.4-9.8-15.2-.4-1.3 11.4-1.5 90.8-1.5 93.7 0 106.4.4 120.3 4 17.5 4.5 35.3 14.7 48.6 28 36.5 36.5 42 93.1 13.3 136.2-6.2 9.3-19.8 22.9-29.1 29.1-14.1 9.4-30.7 15.5-47.7 17.6-4.9.6-22.7 1.1-39.5 1.1-28.5 0-30.8.2-35 2.1-6 2.7-8.8 5.4-11.6 11.4-5.6 11.9-.9 25.4 11 31.8 3.9 2.1 5.5 2.2 34.1 2.5 41.6.5 57-1.2 78.5-8.5 45.9-15.5 82.3-52 97.5-97.7 13.4-40.3 10.5-81-8.5-119.1-22.3-44.7-63.2-74.9-114-84.1-8.5-1.6-20.3-1.8-109.3-2.1-54.9-.3-99.7-.7-99.5-1.1.2-.4 4.6-7 9.7-14.7 5.2-7.7 10.1-15.6 10.8-17.5 4.6-12.8-2.9-27.6-16.1-31.5-5.9-1.8-8.7-1.8-14.2-.1z"
      stroke={color}
    />
  </svg>
);
export default ReturnIcon;