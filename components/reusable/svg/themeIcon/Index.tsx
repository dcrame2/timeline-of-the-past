import * as React from "react";
import { SVGProps } from "react";
const ThemeIcon = ({ color }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    // height="1em"
    viewBox="0 0 512 512"
  >
    <path
      d="M123.9 40.4c-10.3 2.8-17.4 9.1-21 18.7-1.8 4.6-1.9 8.7-1.9 57.4v52.4l-47.6.3-47.6.3-2.9 3.3L0 176v103.6C0 392-.2 387.2 5.5 389.8c1.9.9 15.2 1.2 49 1.2H101v75l2.9 3.2 2.9 3.3 52.1.3c57.6.3 57.4.3 60.6-5.9 1.4-2.7 1.5-3.9.6-7-2.1-7.1-.6-6.9-52.6-6.9H121v-62h94l3.2-2.9 3.3-2.9.3-103.6c.2-92.8.1-104-1.4-106.7-3-5.8-3.8-5.9-53.9-5.9H121v-51.4c0-50.2 0-51.4 2-53.9 1.2-1.5 3.8-3.1 5.8-3.7 5.1-1.4 249.3-1.4 254.4 0 7 2 7.8 4.2 7.8 21.1V96H247.8l-2.9 2.9-2.9 2.9v195.4l2.9 2.9 2.9 2.9H391v42.9l-41.7.3-41.8.3-5.4 3c-6 3.3-12.2 10.4-14.3 16.2-.9 2.7-1.3 9.7-1.3 23.8 0 18.2.2 20.4 2.1 24.6 3.1 6.7 7.8 11.4 14.6 14.9l6.1 3H391v21h-46.5c-52 0-50.5-.2-52.6 6.9-.9 3.1-.8 4.3.6 7 3.2 6.2 3 6.2 60.5 5.9l52-.3 2.7-2.8c2.8-2.7 2.8-2.8 3.3-20l.5-17.2 17.5-.5c17.3-.5 17.6-.5 23-3.6 6.4-3.6 12.2-10.7 14.2-17.3.9-3.1 1.3-10.6 1.3-23.1 0-17.8-.1-18.7-2.6-24-3.5-7.4-6.7-11-13.1-14.5-5.2-3-5.5-3-23.1-3.3l-17.7-.4.2-21.1.3-21.2 47.7-.5 47.7-.5 2.3-2.3 2.3-2.3.3-96.7c.2-71.3-.1-97.4-.9-99.5-2.4-5.8-1.1-5.7-52.6-5.7H411V80c0-13.3-.3-16.8-1.9-21-2.9-7.7-7.3-12.5-14.9-16.2l-6.7-3.3-129.5-.2c-100.5-.1-130.5.1-134.1 1.1zM492 199.5V283h-44.5L412 249.8c-80.6-75.3-77.3-72.4-85.2-76.2-8.9-4.4-17-6-26.5-5.2-12.5 1-22.3 5.7-32.5 15.4l-5.8 5.5V116h230v83.5zm-174.8-8.2c4.1 1.9 15.9 12.3 52.6 46.6 25.9 24.3 47.2 44.4 47.2 44.7 0 .2-34.9.4-77.5.4H262v-66.5l12.3-11.4c11.9-11 17-14.6 23.2-16.2 5-1.3 14-.3 19.7 2.4zM201.5 280v90.5l-90.7.3-90.8.2v-90.3c0-49.7.3-90.7.7-91 .3-.4 41.2-.6 90.7-.5l90.1.3V280zm242.6 88.9 2.9 2.9v34.4l-2.9 2.9-2.9 2.9H313l-3.2-2.9-3.3-2.9v-34.4l3.3-2.9 3.2-2.9h128.2l2.9 2.9z"
      stroke={color}
      fill={color}
    />
    <path
      d="M419.5 137.4c-21.8 5.4-35.8 27.1-31.5 48.8 4.3 22.2 26.4 37.8 47.9 33.9 9.2-1.7 16.8-5.6 23.2-12 16.2-16.3 16.6-41.9.9-58.5-10.6-11.2-25.8-15.8-40.5-12.2zm21.1 22.1c13.6 8 14.2 28.4 1.2 37.2-10.2 6.8-24.3 3.8-30.9-6.5-12.4-19.6 9.7-42.4 29.7-30.7zM74.4 216.8c-5.2 4.1-5.5 10.9-.8 15.3 2.4 2.2 3.5 2.4 15 2.7l12.4.4V339l2.9 3.2c3.9 4.4 9.8 4.6 13.9.5l2.7-2.7.3-52.5.3-52.5h11c15.1 0 19.1-2.3 19.1-10.8 0-2.8-.7-4.3-3.1-6.4L145 215h-34.3c-30.9 0-34.4.2-36.3 1.8zM248.9 455.9c-4 4-4 8.9 0 13.3 2.4 2.7 3.6 3.3 7.1 3.3 3.5 0 4.7-.6 7.1-3.3 4-4.4 4-9.3 0-13.3-2.3-2.3-3.8-2.9-7.1-2.9s-4.8.6-7.1 2.9z"
      stroke={color}
      fill={color}
    />
  </svg>
);
export default ThemeIcon;