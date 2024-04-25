import * as React from "react";
const MediaIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="20px"
    viewBox="0 0 31.06 32.001"
  >
    <path
      d="M29.341 11.405 13.213 7.383a2.273 2.273 0 0 0-2.748 1.652L6.443 25.163a2.272 2.272 0 0 0 1.65 2.748l16.127 4.023a2.275 2.275 0 0 0 2.748-1.652l4.023-16.127a2.275 2.275 0 0 0-1.65-2.75zm-.732 2.933-2.926 11.731a.757.757 0 0 1-.915.549l-14.662-3.656a.758.758 0 0 1-.551-.916l2.926-11.729c.1-.404.513-.65.916-.551l14.661 3.658a.755.755 0 0 1 .551.914z"
      stroke={color}
      fill={color}
    />
    <circle cx={15.926} cy={13.832} r={2.052} stroke={color} fill={color} />
    <path
      d="M22.253 16.813c-.136-.418-.505-.51-.82-.205L18.49 19.45c-.315.303-.759.244-.985-.133l-.471-.781a.799.799 0 0 0-1.095-.273l-4.782 2.852c-.377.225-.329.469.096.576l3.099.771 1.549.389 3.661.912 1.549.385 3.098.773c.426.107.657-.121.521-.539l-2.477-7.569zM2.971 7.978l14.098-5.439a.758.758 0 0 1 .977.432l1.506 3.933 2.686.67-2.348-6.122A2.274 2.274 0 0 0 16.959.153L1.45 6.133A2.275 2.275 0 0 0 .151 9.065L5.156 22.06l.954-3.827-3.573-9.279a.757.757 0 0 1 .434-.976z"
      stroke={color}
      fill={color}
    />
  </svg>
);
export default MediaIcon;
