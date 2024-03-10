import {
  variables,
  desktopWidthInt,
  customSmallTabletInt,
  customXSTabletInt,
  mobileWidthInt,
  smallDesktop,
} from "./Variables";
import { css } from "styled-components";

export const MediaQueries = {
  desktop: `(min-width: ${desktopWidthInt}px)`,
  tablet: `(max-width: ${desktopWidthInt - 1}px)`,
  tabletOnly: `(max-width: ${desktopWidthInt - 1}px) and (min-width: ${
    mobileWidthInt + 1
  }px)`,
  customSmallTablet: `(max-width: ${customSmallTabletInt}px)`,
  customXSTablet: `(max-width: ${customXSTabletInt}px)`,
  mobile: `(max-width: ${mobileWidthInt}px)`,
  smallDesktop: `(max-width: ${smallDesktop}px)`,
};

export const BlurEffect = css`
  backdrop-filter: grayscale(0) blur(10px);
  box-shadow: inset 0 0 0 0px rgba(255, 255, 255, 0.08);
`;
