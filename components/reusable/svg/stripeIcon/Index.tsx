import * as React from "react";
import { SVGProps } from "react";
const StripeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30px"
    // height="1em"
    fill="none"
    viewBox="0 -9 58 58"
    {...props}
  >
    <rect
      width={57}
      height={39}
      x={0.5}
      y={0.5}
      fill="#fff"
      stroke="#F3F3F3"
      rx={3.5}
    />
    <path
      fill="#6772E5"
      fillRule="evenodd"
      d="m30.656 14.3-2.79.613V12.6l2.79-.601v2.3Zm5.8 1.281c-1.09 0-1.79.522-2.178.884l-.145-.702H31.69v13.214l2.778-.6.01-3.208c.4.295.99.714 1.967.714 1.99 0 3.8-1.632 3.8-5.224-.01-3.287-1.844-5.078-3.788-5.078Zm-.667 7.809c-.656 0-1.045-.238-1.311-.533l-.011-4.204c.289-.329.689-.556 1.322-.556 1.011 0 1.711 1.156 1.711 2.641 0 1.519-.689 2.652-1.711 2.652ZM49 20.772c0-2.901-1.378-5.19-4.011-5.19-2.645 0-4.245 2.289-4.245 5.167 0 3.412 1.89 5.134 4.6 5.134 1.323 0 2.323-.306 3.078-.736V22.88c-.755.385-1.622.623-2.722.623-1.078 0-2.033-.385-2.156-1.722h5.434c0-.063.004-.205.008-.368.007-.222.014-.484.014-.641Zm-5.489-1.077c0-1.28.767-1.813 1.467-1.813.678 0 1.4.533 1.4 1.813H43.51Zm-15.644-3.921h2.789v9.917h-2.79v-9.917Zm-3.167 0 .178.839c.655-1.224 1.955-.975 2.31-.839v2.607c-.344-.125-1.455-.284-2.11.589v6.72H22.3v-9.916h2.4Zm-5.378-2.46-2.71.59-.012 9.078c0 1.677 1.233 2.913 2.878 2.913.91 0 1.578-.17 1.944-.374V23.22c-.355.147-2.11.669-2.11-1.009v-4.023h2.11v-2.414h-2.11l.01-2.46Zm-6.566 4.727c-.59 0-.945.17-.945.612 0 .482.612.695 1.371.958 1.238.43 2.867.994 2.874 3.088 0 2.028-1.59 3.196-3.9 3.196-.956 0-2-.193-3.034-.646V22.55c.934.522 2.111.907 3.034.907.622 0 1.066-.17 1.066-.691 0-.535-.663-.78-1.464-1.074C10.538 21.243 9 20.677 9 18.789c0-2.006 1.5-3.208 3.756-3.208a7.2 7.2 0 0 1 2.755.522v2.663c-.844-.465-1.911-.725-2.755-.725Z"
      clipRule="evenodd"
    />
  </svg>
);
export default StripeIcon;